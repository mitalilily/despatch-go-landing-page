import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BrandMark from "../components/landing/BrandMark";

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function VolumetricWeightPage() {
  const [form, setForm] = useState({
    length: "",
    width: "",
    height: "",
    divisor: "5000",
  });

  const volumetricWeight = useMemo(() => {
    const length = toNumber(form.length);
    const width = toNumber(form.width);
    const height = toNumber(form.height);
    const divisor = toNumber(form.divisor);
    if (!length || !width || !height || !divisor) {
      return 0;
    }
    return (length * width * height) / divisor;
  }, [form]);

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-on-surface sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link className="inline-block origin-left scale-[0.82]" to="/">
          <BrandMark compact />
        </Link>
        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
          <h1 className="font-headline text-4xl font-bold">Volumetric Weight Calculator</h1>
          <p className="mt-4 text-on-surface-variant">
            Calculate volumetric weight with the formula: (Length x Width x Height) / Divisor
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className="rounded-xl bg-surface-container-high p-4" min="1" onChange={(event) => setForm((current) => ({ ...current, length: event.target.value }))} placeholder="Length (cm)" type="number" value={form.length} />
            <input className="rounded-xl bg-surface-container-high p-4" min="1" onChange={(event) => setForm((current) => ({ ...current, width: event.target.value }))} placeholder="Width (cm)" type="number" value={form.width} />
            <input className="rounded-xl bg-surface-container-high p-4" min="1" onChange={(event) => setForm((current) => ({ ...current, height: event.target.value }))} placeholder="Height (cm)" type="number" value={form.height} />
            <select className="rounded-xl bg-surface-container-high p-4" onChange={(event) => setForm((current) => ({ ...current, divisor: event.target.value }))} value={form.divisor}>
              <option value="5000">5000 (Express)</option>
              <option value="6000">6000 (Standard)</option>
            </select>
          </div>
          <div className="mt-8 rounded-2xl bg-primary/10 p-6">
            <div className="text-sm font-bold uppercase tracking-widest text-primary">Volumetric Weight</div>
            <div className="mt-2 text-3xl font-black text-primary">{volumetricWeight.toFixed(2)} kg</div>
          </div>
          <Link className="mt-8 inline-flex font-bold text-primary underline" to="/utilities">
            Back to Utilities
          </Link>
        </div>
      </div>
    </div>
  );
}
