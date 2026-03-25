import { Chip } from "@mui/material";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/landing/Icon";
import Reveal from "../components/landing/Reveal";
import {
  BRAND_NAME,
  COMPANY_NAME,
  SITE_URL,
} from "../data/landingContent";
import usePersistentState from "../hooks/usePersistentState";
import {
  buildShippingPreview,
  calculateShippingEstimate,
  validateShippingEstimate,
} from "../utils/shippingCalculator";

const ESTIMATE_STORAGE_KEY = "despatchgo-estimate-form";

const defaultEstimateForm = {
  pickup: "",
  delivery: "",
  weight: "",
  length: "",
  width: "",
  height: "",
  type: "Express",
};

const calculatorSteps = [
  {
    number: "01",
    title: "Enter route details",
    description:
      "Add pickup and delivery pincodes so DespatchGO can map the shipment lane and identify the right pricing zone.",
    highlightClass: "group-hover:text-primary-fixed",
  },
  {
    number: "02",
    title: "Add weight and dimensions",
    description:
      "Use actual weight plus carton dimensions to compare volumetric and actual weight before you book the shipment.",
    highlightClass: "group-hover:text-secondary-fixed",
  },
  {
    number: "03",
    title: "Get an instant estimate",
    description:
      "Review the estimated DespatchGO rate, billable weight, divisor, and route type in one clean quote panel.",
    highlightClass: "group-hover:text-tertiary-fixed",
  },
];

const pricingFaqs = [
  {
    question: "Are these final DespatchGO shipping charges?",
    answer:
      "This calculator gives a strong pre-booking estimate based on route, shipment type, and billable weight. Final charges can vary slightly if the pickup team measures a different actual or volumetric weight.",
  },
  {
    question: "How is billable weight decided?",
    answer:
      "DespatchGO compares actual weight with volumetric weight and bills the higher value. Express shipments use a 5000 divisor, while standard shipments use a 6000 divisor.",
  },
  {
    question: "Can I use this before creating a shipment?",
    answer:
      "Yes. This page is designed for planning before dispatch so you can compare lanes, check package measurements, and budget the shipment before booking on the platform.",
  },
];

function formatWeight(value) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

function formatCurrency(value) {
  if (value === null) {
    return "Enter shipment details";
  }

  return `Rs. ${value}`;
}

export default function RateCalculatorPage() {
  const [estimateForm, setEstimateForm] = usePersistentState(ESTIMATE_STORAGE_KEY, defaultEstimateForm);
  const [estimateError, setEstimateError] = usePersistentState("despatchgo-estimate-error", "");
  const [estimateResult, setEstimateResult] = usePersistentState("despatchgo-estimate-result", null);
  const [activeFaq, setActiveFaq] = useState(0);

  const estimatePreview = estimateResult ?? buildShippingPreview(estimateForm);

  const updateEstimateField = (field) => (event) => {
    setEstimateError("");
    setEstimateResult(null);
    setEstimateForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateShippingEstimate(estimateForm);
    if (validationMessage) {
      setEstimateResult(null);
      setEstimateError(validationMessage);
      return;
    }

    setEstimateError("");
    setEstimateResult(calculateShippingEstimate(estimateForm));
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(106,31,199,0.12),_transparent_45%),radial-gradient(circle_at_80%_15%,_rgba(255,106,0,0.12),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-screen-2xl items-center gap-12 md:grid-cols-2">
          <Reveal className="space-y-6">
            <span className="inline-block rounded-full bg-primary-fixed px-4 py-1.5 text-sm font-bold tracking-wide text-on-primary-fixed-variant">
              DESPATCHGO RATE CALCULATOR
            </span>

            <h1 className="font-headline text-5xl font-black leading-tight text-on-surface md:text-7xl">
              Transparent <span className="text-primary">Pricing</span>. Better Dispatch Decisions.
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Calculate estimated shipping charges instantly with {BRAND_NAME}. Compare route type,
              service type, and billable weight before you create the shipment.
            </p>

            <div className="flex flex-wrap gap-3">
              <Chip
                label="Volumetric billing"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Lane detection"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Saved locally"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
            </div>
          </Reveal>

          <Reveal className="relative flex items-center justify-center" delay={0.08}>
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-primary/[0.05] blur-3xl animate-pulse" />
              <img
                alt="DespatchGO pricing hero illustration."
                className="relative z-10 h-full w-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoYR9RmO9-anwaqRTvURMsavI5q8tDfCnPj1snB2Pg3He5obEgAPLkkPhrBSMghCeqOs_YAOAGMnnknDTxzAzqFfrNCmvgJFiDyBX40ICdVo0NUtfXiT11febzaK6fk8HUtkCbTDmpPFrZS_15_bYjSYCA6nrvC561SjRBoiOYsMgue4qktTJWdS_goJbmmwqYqDCvi3alyLBa9jEed6uQooz1CGPiHXrCfxOERE5L1W-Z05-Q4O4gPeKKhkx1rHkkKg_orRhP1rTN"
              />
              <div className="absolute bottom-6 left-0 z-20 rounded-[1.5rem] border border-outline-variant/10 bg-white/88 px-5 py-4 shadow-lg shadow-primary/10 backdrop-blur-md">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Typical result
                </div>
                <div className="mt-2 text-2xl font-black text-on-surface">
                  {estimatePreview.estimatedCost !== null ? `Rs. ${estimatePreview.estimatedCost}` : "Rs. --"}
                </div>
                <div className="mt-1 text-sm text-on-surface-variant">{estimatePreview.zoneLabel}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container text-on-secondary-container shadow-lg shadow-primary/15">
                  <Icon className="text-3xl">calculate</Icon>
                </div>
                <div>
                  <h2 className="font-headline text-3xl font-black text-on-surface">Instant Quote</h2>
                  <p className="mt-1 text-on-surface-variant">
                    Estimate a DespatchGO rate before dispatching the parcel.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip
                  label={estimateForm.type === "Express" ? "5000 divisor" : "6000 divisor"}
                  sx={{
                    backgroundColor: "rgba(17, 28, 45, 0.08)",
                    color: "#111c2d",
                    fontWeight: 700,
                  }}
                />
                <Chip
                  label={estimateForm.type}
                  sx={{
                    backgroundColor: "rgba(255, 106, 0, 0.12)",
                    color: "#b04b00",
                    fontWeight: 700,
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                      Pickup pincode
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</Icon>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container py-4 pl-12 pr-4 transition-all focus:ring-2 focus:ring-primary"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={updateEstimateField("pickup")}
                        placeholder="e.g. 560001"
                        type="text"
                        value={estimateForm.pickup}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                      Delivery pincode
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">local_shipping</Icon>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container py-4 pl-12 pr-4 transition-all focus:ring-2 focus:ring-primary"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={updateEstimateField("delivery")}
                        placeholder="e.g. 400001"
                        type="text"
                        value={estimateForm.delivery}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                      Service type
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">bolt</Icon>
                      <select
                        className="w-full appearance-none rounded-2xl border-none bg-surface-container py-4 pl-12 pr-4 transition-all focus:ring-2 focus:ring-primary"
                        onChange={updateEstimateField("type")}
                        value={estimateForm.type}
                      >
                        <option>Express</option>
                        <option>Standard</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 ml-1 block text-sm font-semibold text-on-surface-variant">
                      Weight (kg)
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">weight</Icon>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container py-4 pl-12 pr-4 transition-all focus:ring-2 focus:ring-primary"
                        min="0.1"
                        onChange={updateEstimateField("weight")}
                        placeholder="0.50"
                        step="0.01"
                        type="number"
                        value={estimateForm.weight}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 ml-1 block text-xs font-bold text-on-surface-variant">
                        Length
                      </label>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container px-4 py-4 text-center text-sm transition-all focus:ring-2 focus:ring-primary"
                        min="1"
                        onChange={updateEstimateField("length")}
                        placeholder="L"
                        step="0.1"
                        type="number"
                        value={estimateForm.length}
                      />
                    </div>
                    <div>
                      <label className="mb-1 ml-1 block text-xs font-bold text-on-surface-variant">
                        Width
                      </label>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container px-4 py-4 text-center text-sm transition-all focus:ring-2 focus:ring-primary"
                        min="1"
                        onChange={updateEstimateField("width")}
                        placeholder="W"
                        step="0.1"
                        type="number"
                        value={estimateForm.width}
                      />
                    </div>
                    <div>
                      <label className="mb-1 ml-1 block text-xs font-bold text-on-surface-variant">
                        Height
                      </label>
                      <input
                        className="w-full rounded-2xl border-none bg-surface-container px-4 py-4 text-center text-sm transition-all focus:ring-2 focus:ring-primary"
                        min="1"
                        onChange={updateEstimateField("height")}
                        placeholder="H"
                        step="0.1"
                        type="number"
                        value={estimateForm.height}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-surface-container px-5 py-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Billing note
                    </div>
                    <div className="mt-2 text-sm leading-7 text-on-surface-variant">
                      Billable weight is based on the higher of actual or volumetric weight for the selected service type.
                    </div>
                  </div>
                </div>
              </div>

              {estimateError ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {estimateError}
                </div>
              ) : null}

              <div className="mt-12 rounded-3xl border border-primary-fixed-dim bg-primary-fixed/30 p-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                      Estimated DespatchGO rate
                    </p>
                    <div className="flex flex-wrap items-end gap-2">
                      <span className="text-4xl font-black text-on-surface">
                        {formatCurrency(estimatePreview.estimatedCost)}
                      </span>
                      <span className="pb-1 font-medium text-on-surface-variant">INR</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-primary">
                        {estimatePreview.zoneLabel}
                      </span>
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-on-surface">
                        {estimatePreview.chargeableBasis}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full rounded-2xl bg-gradient-to-br from-primary to-primary-container px-10 py-5 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-[0.98] active:scale-95 md:w-auto"
                    type="submit"
                  >
                    Calculate Rate
                  </button>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-white px-5 py-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Actual weight
                    </div>
                    <div className="mt-3 text-2xl font-black text-on-surface">
                      {formatWeight(estimatePreview.actualWeight)} kg
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white px-5 py-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Volumetric weight
                    </div>
                    <div className="mt-3 text-2xl font-black text-on-surface">
                      {formatWeight(estimatePreview.volumetricWeight)} kg
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white px-5 py-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Billable weight
                    </div>
                    <div className="mt-3 text-2xl font-black text-on-surface">
                      {formatWeight(estimatePreview.billableWeight)} kg
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-24">
        <Reveal className="space-y-4 text-center">
          <h2 className="font-headline text-4xl font-black text-on-surface md:text-5xl">
            How to calculate your shipping cost
          </h2>
          <p className="mx-auto max-w-2xl font-medium text-on-surface-variant">
            Follow this quick DespatchGO flow to get a route-aware pricing estimate before pickup.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {calculatorSteps.map((step, index) => (
            <Reveal className="group relative" delay={index * 0.05} key={step.number}>
              <div className={`absolute -left-4 -top-8 z-0 font-headline text-8xl font-black text-surface-container-high transition-colors ${step.highlightClass}`}>
                {step.number}
              </div>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-bold text-on-surface">{step.title}</h3>
                <p className="mt-4 leading-8 text-on-surface-variant">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low/50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-headline text-center text-4xl font-black text-on-surface">
              Pricing &amp; Calculator FAQs
            </h2>
          </Reveal>

          <div className="mt-16 space-y-4">
            {pricingFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <div
                  className="overflow-hidden rounded-2xl border border-outline-variant/5 bg-surface-container-lowest p-6 shadow-sm transition-all"
                  key={faq.question}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setActiveFaq(isActive ? -1 : index)}
                    type="button"
                  >
                    <h3 className="text-lg font-bold text-on-surface">{faq.question}</h3>
                    <Icon className={isActive ? "rotate-180 text-primary transition-transform" : "text-primary transition-transform"}>
                      expand_more
                    </Icon>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <Motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        <div className="mt-4 leading-8 text-on-surface-variant">{faq.answer}</div>
                      </Motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-white px-6 py-8 text-center sm:flex-row sm:text-left">
            <div className="min-w-0">
              <div className="font-headline text-2xl font-bold text-on-surface">
                Want to validate parcel weight too?
              </div>
              <div className="mt-2 text-on-surface-variant">
                Open the DespatchGO weight calculator to compare actual, volumetric, and billable weight separately.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-3 font-bold text-on-surface"
                to="/weight-calculator"
              >
                Open Weight Calculator
              </Link>
              <a
                className="kinetic-gradient rounded-2xl px-5 py-3 font-bold text-on-primary"
                href={SITE_URL}
                rel="noreferrer"
                target="_blank"
              >
                Open Platform
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
