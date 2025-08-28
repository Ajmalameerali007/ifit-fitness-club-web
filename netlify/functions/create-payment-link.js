const BASES = {
  sandbox: "https://sandbox.dev.business.mamopay.com/manage_api/v1",
  production: "https://business.mamopay.com/manage_api/v1",
};

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
});

const toMinor = (x) => {
  const n = typeof x === "number" ? x : Number(x);
  if (Number.isNaN(n)) return null;
  return Math.round(n * 100);
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors() };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };

  try {
    const { MAMO_PAY_SECRET_KEY, MAMO_ENV = "production", FRONTEND_URL } = process.env;
    if (!MAMO_PAY_SECRET_KEY) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Missing MAMO_PAY_SECRET_KEY" }) };
    }

    const body = JSON.parse(event.body || "{}");
    const name = body.name || body.title;
    const amountMinor = toMinor(body.amount);
    const currency = body.currency || "AED";
    const description = body.description || name || "Payment";

    if (!name || amountMinor == null) {
      return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "name and numeric amount are required" }) };
    }

    const base = BASES[(MAMO_ENV || "production").toLowerCase()] || BASES.production;

    const payload = {
      name,
      title: name,
      description,
      amount: amountMinor,           // e.g. 149 AED -> 14900
      amount_currency: currency,     // AED
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

    const resp = await fetch(`${base}/links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAMO_PAY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return { statusCode: resp.status, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify(data) };
    }

    return { statusCode: 200, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify({ error: err.message }) };
  }
};
