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
    // Accept formats like "249", "249.00", "AED 249", "249 AED", "2,499.00"
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

    // Accept common field names from the UI
    const name =
      body.name ?? body.title ?? body.plan ?? body.planName ?? body.productName;
    const rawAmount =
      body.amount ?? body.price ?? body.planPrice ?? body.total ?? body.value;

    const amountMinor = parseAmountToMinor(rawAmount);
    const currency = (body.currency || "AED").toUpperCase();
    const description = body.description || name || "Payment";

    if (!name || amountMinor == null) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({
          error: "name and numeric amount are required",
          received: { name, rawAmount },
        }),
      };
    }

    const base = BASES[(MAMO_ENV || "production").toLowerCase()] || BASES.production;

    const payload = {
      name,
      title: name,
      description,
      amount: amountMinor,           // minor units
      amount_currency: currency,     // e.g. AED
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
      return {
        statusCode: resp.status,
        headers: { ...cors(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      body: JSON.stringify({ error: err.message }),
    };
  }
};
