// netlify/functions/create-payment-link.js
// Final production script using Node's https (no external dependencies)

const https = require("https");
const { URL } = require("url");

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

function postJSON(urlStr, headers, payload, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const options = {
      method: "POST",
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: { "Content-Type": "application/json", ...headers },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        let data;
        try {
          data = body ? JSON.parse(body) : {};
        } catch {
          data = { raw: body };
        }
        resolve({ statusCode: res.statusCode || 500, data });
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("Request timeout"));
    });

    req.on("error", reject);
    req.write(JSON.stringify(payload || {}));
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors() };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };

  try {
    const { MAMO_PAY_SECRET_KEY, MAMO_ENV = "production", FRONTEND_URL } = process.env;
    if (!MAMO_PAY_SECRET_KEY) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Missing MAMO_PAY_SECRET_KEY" }) };
    }

    const body = JSON.parse(event.body || "{}");
    const name = body.name ?? body.title ?? body.plan ?? body.planName ?? body.productName;
    const rawAmount = body.amount ?? body.price ?? body.planPrice ?? body.total ?? body.value;
    const amountMinor = toMinor(rawAmount);
    const currency = (body.currency || "AED").toUpperCase();
    const description = body.description || name || "Payment";

    if (!name || amountMinor == null) {
      return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "name and numeric amount are required" }) };
    }

    const base = BASES[(MAMO_ENV || "production").toLowerCase()] || BASES.production;

    const payload = {
      name,
      title: name,
      description,
      amount: amountMinor,          // minor units (e.g., 249 AED -> 24900)
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

    const { statusCode, data } = await postJSON(`${base}/links`, { Authorization: `Bearer ${MAMO_PAY_SECRET_KEY}` }, payload);

    return {
      statusCode: statusCode,
      headers: { ...cors(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...cors(), "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
