import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BrandMark from "../components/landing/BrandMark";
import { buildShippingPreview } from "../utils/shippingCalculator";

export default function RateCalculatorPage() {
  const [form, setForm] = useState({
    pickup: "",
    delivery: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    type: "Express",
  });

  const preview = useMemo(() => buildShippingPreview(form), [form]);

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-on-surface sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-block origin-left scale-[0.82]" to="/">
          <BrandMark compact />
        </Link>
        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
          <h1 className="font-headline text-4xl font-bold">Rate Calculator</h1>
          <p className="mt-4 text-on-surface-variant">
            Estimate charges using pickup/delivery pincodes and package dimensions.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className="rounded-xl bg-surface-container-high p-4" inputMode="numeric" maxLength={6} onChange={(event) => setForm((current) => ({ ...current, pickup: event.target.value }))} placeholder="Pickup pincode" type="text" value={form.pickup} />
            <input className="rounded-xl bg-surface-container-high p-4" inputMode="numeric" maxLength={6} onChange={(event) => setForm((current) => ({ ...current, delivery: event.target.value }))} placeholder="Delivery pincode" type="text" value={form.delivery} />
            <input className="rounded-xl bg-surface-container-high p-4" min="0.1" onChange={(event) => setForm((current) => ({ ...current, weight: event.target.value }))} placeholder="Weight (kg)" step="0.01" type="number" value={form.weight} />
            <select className="rounded-xl bg-surface-container-high p-4" onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} value={form.type}>
              <option>Express</option>
              <option>Standard</option>
            </select>
            <input className="rounded-xl bg-surface-container-high p-4" min="1" onChange={(event) => setForm((current) => ({ ...current, length: event.target.value }))} placeholder="Length (cm)" step="0.1" type="number" value={form.length} />
            <input className="rounded-xl bg-surface-container-high p-4" min="1" onChange={(event) => setForm((current) => ({ ...current, width: event.target.value }))} placeholder="Width (cm)" step="0.1" type="number" value={form.width} />
            <input className="rounded-xl bg-surface-container-high p-4 sm:col-span-2" min="1" onChange={(event) => setForm((current) => ({ ...current, height: event.target.value }))} placeholder="Height (cm)" step="0.1" type="number" value={form.height} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-surface-container p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Volumetric</div>
              <div className="mt-2 text-2xl font-bold">{preview.volumetricWeight.toFixed(2)} kg</div>
            </div>
            <div className="rounded-2xl bg-surface-container p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Billable</div>
              <div className="mt-2 text-2xl font-bold">{preview.billableWeight.toFixed(2)} kg</div>
            </div>
            <div className="rounded-2xl bg-primary/10 p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Estimated Rate</div>
              <div className="mt-2 text-2xl font-bold text-primary">
                {preview.estimatedCost !== null ? `Rs. ${preview.estimatedCost}` : "Complete details"}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link className="font-bold text-primary underline" to="/utilities">
              Back to Utilities
            </Link>
            <Link className="font-bold text-primary underline" to="/utilities/volumetric-weight">
              Go to Volumetric Weight Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
