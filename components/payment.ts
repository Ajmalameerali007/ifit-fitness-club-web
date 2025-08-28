// components/payments.ts
function parsePriceAED(value: string | number): string {
  if (typeof value === "number") return String(Math.round(value));
  const n = parseFloat(String(value).replace(/[^\d.]/g, ""));
  return String(Math.round(isFinite(n) ? n : 0));
}

export async function startCheckout(planTitle: string, priceAED: string | number) {
  const amount = parsePriceAED(priceAED);
  const r = await fetch("/.netlify/functions/create-payment-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: planTitle, amount, currency: "AED" }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.error || `Payment link failed (${r.status})`);
  const url = j?.link?.payment_url || j?.link?.url;
  if (!url) throw new Error("No payment URL from Mamo");
  window.location.href = url;
}
