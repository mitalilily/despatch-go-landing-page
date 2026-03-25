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
  buildWeightPreview,
  validateWeightCalculation,
} from "../utils/shippingCalculator";

const WEIGHT_STORAGE_KEY = "despatchgo-weight-form";

const defaultWeightForm = {
  weight: "",
  length: "",
  width: "",
  height: "",
  type: "Express",
};

const measurementSteps = [
  {
    number: "01",
    title: "Measure the carton",
    description:
      "Take the outer length, width, and height of the package at its widest points before pickup.",
    accentClass: "bg-primary-fixed text-primary",
  },
  {
    number: "02",
    title: "Enter the dimensions",
    description:
      "Add the measurements and actual shipment weight into the Despatchgo calculator to generate the dimensional weight.",
    accentClass: "bg-secondary-fixed text-secondary",
  },
  {
    number: "03",
    title: "Compare the chargeable weight",
    description:
      "The higher of actual and volumetric weight becomes the billable weight used for shipping charges.",
    accentClass: "bg-tertiary-fixed text-tertiary",
  },
];

const weightFaqs = [
  {
    question: "What is volumetric weight?",
    answer:
      "Volumetric weight represents the space a parcel occupies in transit. Large but light cartons can cost more because they consume more vehicle capacity than their actual scale weight suggests.",
  },
  {
    question: "Why does Despatchgo compare actual and volumetric weight?",
    answer:
      "Carrier pricing depends on whichever measurement impacts capacity more. Despatchgo compares both values so you can see the likely billable weight before booking the shipment.",
  },
  {
    question: "Which divisor should I use?",
    answer:
      "Express shipments use a divisor of 5000 and standard shipments use 6000 in this tool, so the selected service type changes the volumetric result automatically.",
  },
];

function formatWeight(value) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export default function WeightCalculatorPage() {
  const [weightForm, setWeightForm] = usePersistentState(WEIGHT_STORAGE_KEY, defaultWeightForm);
  const [weightError, setWeightError] = usePersistentState("despatchgo-weight-error", "");
  const [weightResult, setWeightResult] = usePersistentState("despatchgo-weight-result", null);
  const [activeFaq, setActiveFaq] = useState(0);

  const weightPreview = weightResult ?? buildWeightPreview(weightForm);

  const updateWeightField = (field) => (event) => {
    setWeightError("");
    setWeightResult(null);
    setWeightForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateWeightCalculation(weightForm);
    if (validationMessage) {
      setWeightResult(null);
      setWeightError(validationMessage);
      return;
    }

    setWeightError("");
    setWeightResult(buildWeightPreview(weightForm));
  };

  return (
    <>
      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <span className="mb-6 inline-block rounded-full bg-primary-fixed px-4 py-1.5 text-sm font-bold tracking-wide text-primary">
            DESPATCHGO SHIPPING TOOLS
          </span>

          <h1 className="font-headline mb-8 text-5xl font-black leading-[1.08] text-on-surface md:text-7xl">
            Smart Volume
            <br />
            <span className="text-primary-container">Calculation.</span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-on-surface-variant">
            Shipping efficiency starts with accurate measurements. Use the {COMPANY_NAME} weight
            calculator to estimate volumetric weight, compare it with actual weight, and confirm
            what will be billed before dispatch.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-on-primary transition-all hover:shadow-lg active:scale-95"
              href="#weight-calculator-tool"
            >
              <Icon>calculate</Icon>
              Start Measuring
            </a>
            <Link
              className="rounded-xl px-8 py-4 font-bold text-primary transition-all hover:bg-surface-container-low"
              to="/rate-calculator"
            >
              View Rates
            </Link>
          </div>
        </Reveal>

        <Reveal className="order-1 flex items-center justify-center lg:order-2" delay={0.08}>
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-[3rem] bg-surface-container-low p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-container/8" />
            <img
              alt="Despatchgo box measurement illustration."
              className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA-TuNExyh_O_iWDdMTXTu66BRNapURFIezfzHGPLVa1A6OupVvX71viDgzbHbKa5ke4IEmdAstbrFl5ZqnuBQMoyltzGJZB9MdQ7nKP2nHe12t0aiYVgeoeTX7HzbcnfbDEUG8Ld_u04ICxjX19UN59BhDy1jM2FMiEavAn8WNpduhEloXfAgbTx_vdlvsCAECpHWrSKtEFn_d7cLrkQ2Zq41iM-X7dGxqrUl1E-bxX5ybEtP4fo3v7ilgBypc7T43rNrZcMQXh56"
            />

            <div className="absolute right-10 top-1/4 z-20 flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md">
              <span className="text-xs font-bold text-primary">HEIGHT</span>
              <span className="font-headline font-bold text-primary-container">
                {weightForm.height || "45"}cm
              </span>
            </div>

            <div className="absolute bottom-1/4 left-10 z-20 flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md">
              <span className="text-xs font-bold text-primary">WIDTH</span>
              <span className="font-headline font-bold text-primary-container">
                {weightForm.width || "60"}cm
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-container-low py-24" id="weight-calculator-tool">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <Reveal className="rounded-[2.5rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-16">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-16 lg:flex-row">
                <div className="flex-1">
                  <h2 className="mb-8 flex items-center gap-3 text-3xl font-black text-on-surface">
                    <Icon className="text-4xl text-primary">square_foot</Icon>
                    Dimensional Inputs
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <label className="ml-1 block text-sm font-bold text-on-surface-variant">
                          Length (cm)
                        </label>
                        <input
                          className="w-full rounded-2xl border-none bg-surface-container-low p-4 font-headline text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary/50"
                          min="1"
                          onChange={updateWeightField("length")}
                          placeholder="0.00"
                          step="0.1"
                          type="number"
                          value={weightForm.length}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 block text-sm font-bold text-on-surface-variant">
                          Width (cm)
                        </label>
                        <input
                          className="w-full rounded-2xl border-none bg-surface-container-low p-4 font-headline text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary/50"
                          min="1"
                          onChange={updateWeightField("width")}
                          placeholder="0.00"
                          step="0.1"
                          type="number"
                          value={weightForm.width}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 block text-sm font-bold text-on-surface-variant">
                          Height (cm)
                        </label>
                        <input
                          className="w-full rounded-2xl border-none bg-surface-container-low p-4 font-headline text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary/50"
                          min="1"
                          onChange={updateWeightField("height")}
                          placeholder="0.00"
                          step="0.1"
                          type="number"
                          value={weightForm.height}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,1fr]">
                      <div className="space-y-2">
                        <label className="ml-1 block text-sm font-bold text-on-surface-variant">
                          Actual Weight (kg)
                        </label>
                        <input
                          className="w-full rounded-2xl border-none bg-surface-container-low p-4 font-headline text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary/50"
                          min="0.1"
                          onChange={updateWeightField("weight")}
                          placeholder="0.00"
                          step="0.01"
                          type="number"
                          value={weightForm.weight}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 block text-sm font-bold text-on-surface-variant">
                          Service Type
                        </label>
                        <select
                          className="w-full rounded-2xl border-none bg-surface-container-low p-4 font-headline text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary/50"
                          onChange={updateWeightField("type")}
                          value={weightForm.type}
                        >
                          <option>Express</option>
                          <option>Standard</option>
                        </select>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-primary/10 bg-primary-fixed/30 p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-bold text-primary">Current Formula</span>
                        <span className="font-headline font-bold text-on-surface">
                          (L x W x H) / {weightPreview.divisor}
                        </span>
                      </div>
                    </div>

                    {weightError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {weightError}
                      </div>
                    ) : null}

                    <button
                      className="kinetic-gradient inline-flex items-center justify-center rounded-2xl px-8 py-4 font-bold text-on-primary"
                      type="submit"
                    >
                      Calculate Billable Weight
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:w-1/3">
                  <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-on-primary">
                    <div className="relative z-10">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-on-primary/80">
                        Volumetric Weight
                      </p>
                      <div className="mb-4 font-headline text-5xl font-black">
                        {formatWeight(weightPreview.volumetricWeight)}{" "}
                        <span className="text-2xl text-on-primary/70">KG</span>
                      </div>
                      <p className="text-xs leading-relaxed text-on-primary/70">
                        Estimated using the current {weightForm.type.toLowerCase()} divisor for {BRAND_NAME}.
                      </p>
                    </div>
                    <div className="absolute -bottom-8 -right-8 opacity-10">
                      <Icon className="text-9xl" filled>
                        weight
                      </Icon>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-high p-8">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Actual Weight
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="font-headline text-3xl font-black text-on-surface">
                        {formatWeight(weightPreview.actualWeight)}
                      </div>
                      <span className="text-xl font-bold text-on-surface-variant">KG</span>
                    </div>

                    <div className="mt-6 border-t border-outline-variant/30 pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold uppercase text-primary-container">
                          Chargeable
                        </span>
                        <span className="rounded-lg bg-primary-container px-3 py-1 text-xs font-bold text-on-primary">
                          {weightPreview.chargeableBasis.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4">
                        <span className="text-sm font-bold text-on-surface-variant">Billable weight</span>
                        <span className="font-headline text-xl font-black text-on-surface">
                          {formatWeight(weightPreview.billableWeight)} kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4">
                        <span className="text-sm font-bold text-on-surface-variant">Divisor</span>
                        <span className="font-headline text-xl font-black text-on-surface">
                          {weightPreview.divisor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-24 md:px-12">
        <Reveal>
          <h2 className="text-center text-4xl font-black text-on-surface">
            How to measure <span className="text-primary">volumetric weight</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {measurementSteps.map((step, index) => (
            <Reveal
              className="group rounded-[2.5rem] border border-outline-variant/10 bg-surface-container-lowest p-10 shadow-sm transition-all duration-500 hover:bg-primary"
              delay={index * 0.05}
              key={step.number}
            >
              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors group-hover:bg-white/20 ${step.accentClass}`}>
                <span className="text-2xl font-black group-hover:text-white">{step.number}</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-on-surface transition-colors group-hover:text-white">
                {step.title}
              </h3>
              <p className="leading-relaxed text-on-surface-variant transition-colors group-hover:text-white/80">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <Reveal className="text-center">
            <h2 className="text-4xl font-black text-on-surface">
              Volumetric Weight <span className="text-primary-container">FAQs</span>
            </h2>
            <p className="mt-4 text-on-surface-variant">
              Everything you need to know about billable parcel volume on {COMPANY_NAME}.
            </p>
          </Reveal>

          <div className="mt-16 space-y-4">
            {weightFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <div
                  className="cursor-pointer rounded-3xl bg-surface-container-low p-8 transition-colors hover:bg-surface-container"
                  key={faq.question}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setActiveFaq(isActive ? -1 : index)}
                    type="button"
                  >
                    <h4 className="text-xl font-bold text-on-surface">{faq.question}</h4>
                    <Icon className={isActive ? "rotate-45 text-primary transition-transform" : "text-primary transition-transform"}>
                      add
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
                        <p className="mt-4 leading-relaxed text-on-surface-variant">{faq.answer}</p>
                      </Motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-surface-container-low px-6 py-8 text-center sm:flex-row sm:text-left">
            <div className="min-w-0">
              <div className="font-headline text-2xl font-bold text-on-surface">
                Need route pricing too?
              </div>
              <div className="mt-2 text-on-surface-variant">
                Move from measurement to estimated courier charges with the Despatchgo rate calculator.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-2xl border border-outline-variant/30 bg-white px-5 py-3 font-bold text-on-surface"
                to="/rate-calculator"
              >
                Open Rate Calculator
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
