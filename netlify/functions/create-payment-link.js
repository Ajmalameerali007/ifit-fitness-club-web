import axios from "axios";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { MAMO_PAY_SECRET_KEY, FRONTEND_URL } = process.env;
  if (!MAMO_PAY_SECRET_KEY || !FRONTEND_URL) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing env vars" }) };
  }

  try {
    const { name, price } = JSON.parse(event.body || "{}");
    if (!name || !price) {
      return { statusCode: 400, body: JSON.stringify({ error: "Plan name and price are required." }) };
    }

    // TODO: Replace with your real Mamo Pay API call (match your old Express logic).
    // Example (illustrative only):
    // const resp = await axios.post("https://api.mamopay.com/v1/payment-links", {
    //   title: name, amount: price, currency: "AED",
    //   redirect_url: `${FRONTEND_URL}/thank-you`
    // }, { headers: { Authorization: `Bearer ${MAMO_PAY_SECRET_KEY}` }});
    // return { statusCode: 200, body: JSON.stringify(resp.data) };

    // Temporary mock so frontend works right now:
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, mock: true, name, price, redirect: `${FRONTEND_URL}/thank-you` })
    };
  } catch (err) {
    console.error("create-payment-link", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to create payment link" }) };
  }
}
