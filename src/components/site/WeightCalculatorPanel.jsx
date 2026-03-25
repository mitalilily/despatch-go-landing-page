import { Chip } from "@mui/material";

function formatWeight(value) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

const inputClasses =
  "w-full rounded-2xl border border-transparent bg-surface-container-high p-4 text-on-surface transition focus:border-primary/20 focus:bg-white focus:outline-none";

export default function WeightCalculatorPanel({
  form,
  preview,
  error,
  onFieldChange,
  onSubmit,
}) {
  return (
    <form
      className="glass-panel ambient-shadow rounded-[2rem] border border-white/60 p-6 sm:p-8"
      onSubmit={onSubmit}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">Weight Calculator</h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            Use actual weight and carton dimensions to confirm what will be billed.
          </p>
        </div>

        <Chip
          label={preview.chargeableBasis}
          sx={{
            backgroundColor: "rgba(106, 31, 199, 0.1)",
            color: "#6a1fc7",
            fontWeight: 700,
          }}
        />
      </div>

      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Actual weight (kg)
            </span>
            <input
              className={inputClasses}
              min="0.1"
              onChange={onFieldChange("weight")}
              placeholder="0.50"
              step="0.01"
              type="number"
              value={form.weight}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Service type
            </span>
            <select className={inputClasses} onChange={onFieldChange("type")} value={form.type}>
              <option>Express</option>
              <option>Standard</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Length (cm)
            </span>
            <input
              className={inputClasses}
              min="1"
              onChange={onFieldChange("length")}
              placeholder="30"
              step="0.1"
              type="number"
              value={form.length}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Width (cm)
            </span>
            <input
              className={inputClasses}
              min="1"
              onChange={onFieldChange("width")}
              placeholder="24"
              step="0.1"
              type="number"
              value={form.width}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-on-surface-variant">
              Height (cm)
            </span>
            <input
              className={inputClasses}
              min="1"
              onChange={onFieldChange("height")}
              placeholder="18"
              step="0.1"
              type="number"
              value={form.height}
            />
          </label>
        </div>

        <div className="rounded-[1.5rem] bg-surface-container-high p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Actual weight
              </div>
              <div className="mt-2 text-2xl font-bold text-on-surface">
                {formatWeight(preview.actualWeight)} kg
              </div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Volumetric weight
              </div>
              <div className="mt-2 text-2xl font-bold text-on-surface">
                {formatWeight(preview.volumetricWeight)} kg
              </div>
            </div>
            <div className="rounded-2xl bg-primary px-4 py-4 text-on-primary">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-primary/70">
                Billable weight
              </div>
              <div className="mt-2 text-2xl font-bold">
                {formatWeight(preview.billableWeight)} kg
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Divisor in use
              </div>
              <div className="mt-2 text-3xl font-bold text-on-surface">{preview.divisor}</div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Chargeable basis
              </div>
              <div className="mt-2 text-3xl font-bold text-on-surface">{preview.chargeableBasis}</div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <button
          className="kinetic-gradient w-full rounded-2xl px-6 py-4 font-bold text-on-primary"
          type="submit"
        >
          Check Billable Weight
        </button>
      </div>
    </form>
  );
}
