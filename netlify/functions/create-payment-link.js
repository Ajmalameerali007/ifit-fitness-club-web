// netlify/functions/create-payment-link.js  (ESM)

const BASES = {
  sandbox: "https://sandbox.dev.business.mamopay.com/manage_api/v1",
  production: "https://business.mamopay.com/manage_api/v1",
};

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
});

const toMinor = (v) => {
  if (v == null) return null;
  if (typeof v === "number") return Math.round(v * 100);
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^0-9.,-]/g, "").replace(/,/g, ""));
    return Number.isFinite(n) ? Math.round(n * 100) : null;
  }
  return null;
};

async function postJSON(url, headers, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
    body: JSON.stringify(payload || {}),
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  return { status: res.status, data };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors() };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };

  const DEBUG = (process.env.MAMO_DEBUG || "") === "1";

  try {
    const { MAMO_PAY_SECRET_KEY, MAMO_ENV = "production", FRONTEND_URL } = process.env;
    if (!MAMO_PAY_SECRET_KEY) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Missing MAMO_PAY_SECRET_KEY" }) };
    }

    const body = JSON.parse(event.body || "{}");
    const name =
      body.name ?? body.title ?? body.plan ?? body.planName ?? body.productName;
    const rawAmount =
      body.amount ?? body.price ?? body.planPrice ?? body.total ?? body.value;

    const amountMinor = toMinor(rawAmount);
    const currency = (body.currency || "AED").toUpperCase();
    const description = body.description || name || "Payment";

    if (!name || amountMinor == null) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "name and numeric amount are required" }),
      };
    }

    const base = BASES[(MAMO_ENV || "production").toLowerCase()] || BASES.production;

    const payload = {
      name,
      title: name,
      description,
      amount: amountMinor,          // 249 -> 24900
      amount_currency: currency,    // "AED"
      payment_methods: ["card", "wallet"],
      is_widget: true,
      platform: "api",
      ...(FRONTEND_URL
        ? {
            return_url: `${FRONTEND_URL}/payment/success`,
            failure_return_url: `${FRONTEND_URL}/payment/failed`,
          }
        : {}),
    };

    const { status, data } = await postJSON(
      `${base}/links`,
      { Authorization: `Bearer ${MAMO_PAY_SECRET_KEY}` },
      payload
    );

    if (status < 200 || status >= 300) {
      return {
        statusCode: status,
        headers: { ...cors(), "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Mamo API error",
          statusCode: status,
          data,
          ...(DEBUG ? { debug: { base, payload } } : {}),
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...cors(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...cors(), "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Function exception",
        message: err.message,
        ...(DEBUG ? { stack: err.stack } : {}),
      }),
    };
  }
}
