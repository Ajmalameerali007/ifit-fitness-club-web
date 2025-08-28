import React, { useEffect, useState } from "react";

type Plan = { id?: string | number; name: string; price: string | number; description?: string; };
type Props = { isOpen: boolean; onClose: () => void; plan: Plan | null; };

function parsePriceAED(price: string | number): string {
  if (typeof price === "number") return String(Math.round(price));
  return price.replace(/[^\d.]/g, "").split(".")[0] || "0";
}

export default function CheckoutModal({ isOpen, onClose, plan }: Props) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setPaymentUrl(null); setError(null); setLoading(false); }, [isOpen, plan]);

  async function createLink() {
    if (!plan) return;
    setLoading(true); setError(null);
    try {
      const amount = parsePriceAED(plan.price);
      const res = await fetch("/.netlify/functions/create-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: plan.name, amount, currency: "AED" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Payment link failed (${res.status})`);
      const url = data?.link?.payment_url || data?.link?.url || data?.payment_url || null;
      if (!url) throw new Error("No payment URL returned.");
      setPaymentUrl(url);
    } catch (e: any) {
      setError(e?.message || "Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function openExternally() { if (paymentUrl) window.open(paymentUrl, "_blank", "noopener,noreferrer"); }
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white text-black shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Checkout — {plan.name}</h3>
          <button onClick={onClose} className="rounded-md px-3 py-1.5 bg-black text-white hover:opacity-80">Close</button>
        </div>
        <div className="p-6 space-y-4">
          {!paymentUrl && (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">Amount: <strong>AED {parsePriceAED(plan.price)}</strong></p>
              <button onClick={createLink} disabled={loading} className="rounded-lg px-4 py-2 bg-lime-400 font-semibold hover:opacity-90 disabled:opacity-60">
                {loading ? "Creating link…" : "Proceed to Payment"}
              </button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )}
          {paymentUrl && (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Secure checkout below. If it doesn’t appear,{" "}
                <button onClick={openExternally} className="underline text-blue-600">open in a new tab</button>.
              </p>
              <div className="h-[70vh] w-full overflow-hidden rounded-lg border">
                <iframe title="Mamo Checkout" src={paymentUrl} className="h-full w-full" allow="payment *; clipboard-write *" />
              </div>
              <div className="flex gap-3">
                <button onClick={openExternally} className="rounded-lg px-4 py-2 bg-black text-white hover:opacity-90">Open in new tab</button>
                <button onClick={onClose} className="rounded-lg px-4 py-2 border border-black hover:bg-black hover:text-white">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
