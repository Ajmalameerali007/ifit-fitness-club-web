const BASES = {
  sandbox: "https://sandbox.dev.business.mamopay.com/manage_api/v1",
  production: "https://business.mamopay.com/manage_api/v1",
};

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
});

const parseAmountToMinor = (value) => {
  if (value == null) return null;
  if (typeof value === "number") return Math.round(value * 100);
  if (typeof value === "string") {
    // Accept "249", "249.00", "AED 249", "249 AED", "2,499.00"
    const cleaned = value.replace(/[^0-9.,-]/g, "").replace(/,/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? Math.round(n * 100) : null;
  }
  return null;
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

    // Accept flexible field names
    const name = body.name ?? body.title ?? body.plan ?? body.planName ?? body.productName;
    const rawAmount = body.amount ?? body.price ?? body.planPrice ?? body.total ?? body.value;

    const amountMinor = parseAmountToMinor(rawAmount);
    const currency = (body.currency || "AED").toUpperCase();
    const description = body.description || name || "Payment";

    if (!name || amountMinor == null) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "name and numeric amount are required", received: { name, rawAmount } }),
      };
    }

    const base = BASES[(MAMO_ENV || "production").toLowerCase()] || BASES.production;
