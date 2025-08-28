export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors(), body: "ok" };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method Not Allowed" });
  }

  const secret = process.env.MAMO_PAY_SECRET_KEY;
  if (!secret) return json(500, { error: "Missing MAMO_PAY_SECRET_KEY" });

  try {
    const body = JSON.parse(event.body || "{}");
    const name = String(body.name || body.title || "").trim();
    const currency = String(body.currency || "AED").trim().toUpperCase();
    const amount = String(body.amount ?? "").replace(/[^\d.]/g, ""); // major units

    if (!name || !amount) return json(400, { error: "name and amount are required" });

    const fe = String(process.env.FRONTEND_URL || "https://www.ifit-uae.com").replace(/\/$/, "");
    const payload = {
      title: name,
      amount,
      amount_currency: currency,
      return_url: `${fe}/payment/success`,
      failure_return_url: `${fe}/payment/failed`,
      is_widget: true,
    };

    const res = await fetch("https://business.mamopay.com/manage_api/v1/links", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = tryJSON(text);
    const reqId = res.headers.get("x-request-id") || null;

    if (!res.ok) {
      return json(res.status, { error: "Mamo API error", statusCode: res.status, requestId: reqId, data: data ?? text });
    }

    return json(200, { ok: true, requestId: reqId, link: data });
  } catch (e) {
    return json(500, { error: "Unhandled error", message: e?.message || String(e) });
  }
}
function cors() { return {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization"};}
function json(statusCode, obj) { return { statusCode, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify(obj) }; }
function tryJSON(t){ try{ return JSON.parse(t);}catch{ return null; } }