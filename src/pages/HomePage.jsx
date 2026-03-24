import { Chip } from "@mui/material";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandMark from "../components/landing/BrandMark";
import Icon from "../components/landing/Icon";
import Reveal from "../components/landing/Reveal";
import {
  BRAND_NAME,
  BRANCHES,
  carrierPartners,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_NAME,
  faqs,
  OPERATOR_NAME,
  SITE_URL,
  steps,
  testimonials,
} from "../data/landingContent";
import {
  buildShippingPreview,
  calculateShippingEstimate,
  validateShippingEstimate,
} from "../utils/shippingCalculator";

function formatWeight(value) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

const TRACKING_STORAGE_KEY = "despatch-go-tracking-number";
const LEGACY_TRACKING_STORAGE_KEY = "despatchgo-tracking-number";
const ESTIMATE_STORAGE_KEY = "despatch-go-estimate-form";
const LEGACY_ESTIMATE_STORAGE_KEY = "despatchgo-estimate-form";

function Header({ interactiveMotion }) {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="relative mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-8">
        <a className="origin-left scale-[0.68] sm:scale-[0.82]" href="#hero">
          <BrandMark compact />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a className="border-b-2 border-red-600 pb-1 font-headline font-bold tracking-tight text-red-600" href="#services">
            Services
          </a>
          <a className="font-headline font-bold tracking-tight text-slate-600 transition-colors hover:text-slate-900" href="#pricing">
            Pricing
          </a>
          <Link className="font-headline font-bold tracking-tight text-slate-600 transition-colors hover:text-slate-900" to="/tracking">
            Tracking
          </Link>
          <div className="group relative">
            <button className="inline-flex items-center gap-1 font-headline font-bold tracking-tight text-slate-600 transition-colors hover:text-slate-900" type="button">
              Utilities
              <Icon className="text-base">expand_more</Icon>
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 min-w-64 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <Link className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900" to="/utilities/volumetric-weight">
                Volumetric Weight Calculator
              </Link>
              <Link className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900" to="/utilities/rate-calculator">
                Rate Calculator
              </Link>
            </div>
          </div>
        </nav>

        <Motion.a
          {...interactiveMotion}
          className="kinetic-gradient rounded-xl px-6 py-2 font-bold text-on-primary"
          href={SITE_URL}
          rel="noreferrer"
          target="_blank"
        >
          Get Started
        </Motion.a>

        <div className="absolute bottom-0 left-0 h-px w-full bg-slate-100" />
      </div>
    </header>
  );
}

function Hero({
  estimateError,
  estimateForm,
  estimatePreview,
  handleEstimateSubmit,
  handleTrackSubmit,
  interactiveMotion,
  onNavigateTracking,
  onNavigateUtilities,
  setTrackingNumber,
  trackingNumber,
  updateEstimateField,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[921px] items-center overflow-hidden px-6 py-24 sm:px-8" id="hero">
      <div className="absolute right-0 top-0 hidden h-full w-1/3 pointer-events-none opacity-10 lg:block">
        <img
          alt="High-speed cargo container ship moving across blue ocean water at dusk."
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnOFnFt4_qPDU6w-QcYZzAAhSfPd89-6WvLC3rve3kzRe_VhIBASiJEzuYmxSWYmz62cPDYCZhiZp36O32ext9I1Mv6UwQOq5MSVhilV1RruSRERBzjWsAFHDXGA1QSuJxv_NyYkkGT9fp21uLGuHtHnKVuWZQ8TkBiALUUEulgzOxUdtk7R50GTcd3LSEaIF6b4razT2dla0aWvCgkvA466451-reSIlvVfxQPUXE9Sd0PBVgEeB-omHUipteKBKBST_FMNi2KEQ"
        />
      </div>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <Reveal className="z-10 lg:col-span-7">
          <span className="font-label inline-block rounded-full bg-primary-container px-4 py-1 text-sm font-bold text-on-primary-container">
            NEXT-GEN LOGISTICS
          </span>

          <h1 className="font-headline mb-8 text-6xl font-bold leading-[0.9] tracking-tight text-on-surface md:text-8xl">
            Global Reach.
            <br />
            <span className="text-primary italic">Shipping Simplified.</span>
          </h1>

          <p className="mb-12 max-w-xl text-xl leading-relaxed text-on-surface-variant">
            DespatchGo is the responsive logistics interface built for modern courier aggregation,
            volumetric billing clarity, and fast-moving operations across Bangalore, Hyderabad, and
            Chennai.
          </p>

          <div className="flex flex-wrap gap-4">
            <Motion.button
              {...interactiveMotion}
              className="kinetic-gradient ambient-shadow rounded-xl px-8 py-4 text-lg font-bold text-on-primary"
              onClick={onNavigateTracking}
              type="button"
            >
              Tracking
            </Motion.button>
            <Motion.button
              {...interactiveMotion}
              className="rounded-xl bg-surface-container-high px-8 py-4 text-lg font-bold text-on-surface transition-colors hover:bg-surface-container-highest"
              onClick={onNavigateUtilities}
              type="button"
            >
              Utilities
            </Motion.button>
          </div>

          <form
            className="ambient-shadow mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-2 sm:flex-row sm:items-center"
            id="track"
            onSubmit={handleTrackSubmit}
          >
            <div className="flex min-w-0 flex-1 items-center px-4">
              <Icon className="mr-3 text-outline">package_2</Icon>
              <input
                className="w-full border-none bg-transparent p-0 font-medium text-on-surface placeholder:text-outline/60 focus:outline-none"
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder="Enter tracking number..."
                type="text"
                value={trackingNumber}
              />
            </div>
            <Motion.button
              {...interactiveMotion}
              className="rounded-xl bg-on-surface px-8 py-3 font-headline font-bold tracking-tight text-surface transition-colors hover:bg-primary"
              type="submit"
            >
              Track Shipment
            </Motion.button>
          </form>
        </Reveal>

        <Reveal className="relative lg:col-span-5" delay={0.08}>
          <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary-container/20 blur-[100px]" />
          <Motion.form
            className="glass-panel ambient-shadow rounded-[2rem] border border-white/20 p-8"
            id="pricing"
            onSubmit={handleEstimateSubmit}
            {...(reduceMotion ? {} : { whileHover: { y: -4 } })}
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-headline text-2xl font-bold">Estimate Shipping</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Compare actual weight with volumetric weight before you ship.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label={estimateForm.type === "Express" ? "5000 divisor" : "6000 divisor"}
                  sx={{
                    backgroundColor: "rgba(179, 40, 47, 0.1)",
                    color: "#b3282f",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                />
                <Chip
                  label="Saved locally"
                  sx={{
                    backgroundColor: "rgba(17, 28, 45, 0.08)",
                    color: "#111c2d",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-on-surface-variant">PICKUP PINCODE</span>
                <input
                  className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  inputMode="numeric"
                  maxLength={6}
                  onChange={updateEstimateField("pickup")}
                  placeholder="e.g. 110001"
                  type="text"
                  value={estimateForm.pickup}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-on-surface-variant">DELIVERY PINCODE</span>
                <input
                  className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  inputMode="numeric"
                  maxLength={6}
                  onChange={updateEstimateField("delivery")}
                  placeholder="e.g. 400001"
                  type="text"
                  value={estimateForm.delivery}
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-on-surface-variant">WEIGHT (KG)</span>
                <input
                  className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  min="0.1"
                  onChange={updateEstimateField("weight")}
                  placeholder="0.5"
                  step="0.01"
                  type="number"
                  value={estimateForm.weight}
                />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-on-surface-variant">TYPE</span>
                  <select
                    className="w-full appearance-none rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onChange={updateEstimateField("type")}
                    value={estimateForm.type}
                  >
                    <option>Express</option>
                    <option>Standard</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-on-surface-variant">LENGTH (CM)</span>
                  <input
                    className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    min="1"
                    step="0.1"
                    onChange={updateEstimateField("length")}
                    placeholder="30"
                    type="number"
                    value={estimateForm.length}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-on-surface-variant">WIDTH (CM)</span>
                  <input
                    className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    min="1"
                    step="0.1"
                    onChange={updateEstimateField("width")}
                    placeholder="24"
                    type="number"
                    value={estimateForm.width}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-on-surface-variant">HEIGHT (CM)</span>
                  <input
                    className="w-full rounded-xl border-none bg-surface-container-high p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    min="1"
                    step="0.1"
                    onChange={updateEstimateField("height")}
                    placeholder="18"
                    type="number"
                    value={estimateForm.height}
                  />
                </label>
              </div>

              <p className="text-xs leading-6 text-on-surface-variant">
                Volumetric weight = (Length x Width x Height) / divisor. Dimensions are measured in
                centimeters.
              </p>

              {estimateError ? (
                <div
                  aria-live="polite"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {estimateError}
                </div>
              ) : null}

              <div aria-live="polite" className="rounded-[1.5rem] bg-surface-container-high p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white px-4 py-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Actual weight
                    </div>
                    <div className="mt-2 text-2xl font-bold text-on-surface">
                      {formatWeight(estimatePreview.actualWeight)} kg
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Volumetric weight
                    </div>
                    <div className="mt-2 text-2xl font-bold text-on-surface">
                      {formatWeight(estimatePreview.volumetricWeight)} kg
                    </div>
                  </div>
                  <div className="rounded-2xl bg-primary px-4 py-4 text-on-primary">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-primary/70">
                      Billable weight
                    </div>
                    <div className="mt-2 text-2xl font-bold">
                      {formatWeight(estimatePreview.billableWeight)} kg
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                        Estimated {estimateForm.type.toLowerCase()} rate
                      </div>
                      <div className="mt-2 text-3xl font-bold text-on-surface">
                        {estimatePreview.estimatedCost !== null
                          ? `Rs. ${estimatePreview.estimatedCost}`
                          : "Complete route details"}
                      </div>
                    </div>
                    <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                      {estimatePreview.zoneLabel}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Motion.button
                  {...interactiveMotion}
                  className="w-full rounded-xl bg-on-surface py-4 font-bold text-surface transition-colors hover:bg-on-surface-variant"
                  type="submit"
                >
                  Calculate Rates
                </Motion.button>
                <Motion.a
                  {...interactiveMotion}
                  className="flex items-center justify-center rounded-xl bg-primary py-4 font-bold text-on-primary transition-colors hover:bg-primary/90"
                  href={SITE_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  Get Started
                </Motion.a>
              </div>
            </div>
          </Motion.form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-4 sm:px-8">
        <div className="col-span-1">
          <BrandMark className="mb-6 origin-left scale-[0.88]" />
          <p className="mb-6 text-sm text-slate-500">
            DespatchGo keeps courier pricing, volumetric billing, and dispatch visibility aligned in
            one fast, responsive logistics experience.
          </p>
          <div className="flex gap-4">
            <a href={SITE_URL} rel="noreferrer" target="_blank">
              <Icon className="cursor-pointer text-slate-400 transition-colors hover:text-red-600">public</Icon>
            </a>
            <a href={SITE_URL} rel="noreferrer" target="_blank">
              <Icon className="cursor-pointer text-slate-400 transition-colors hover:text-red-600">language</Icon>
            </a>
            <a href="#track">
              <Icon className="cursor-pointer text-slate-400 transition-colors hover:text-red-600">local_shipping</Icon>
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Platform</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a className="transition-all hover:text-red-600 hover:underline" href="#services">Services</a></li>
            <li><a className="transition-all hover:text-red-600 hover:underline" href="#pricing">Pricing</a></li>
            <li><Link className="transition-all hover:text-red-600 hover:underline" to="/tracking">Live Track</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Company</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>{COMPANY_NAME}</li>
            <li>{BRAND_NAME}</li>
            <li>{OPERATOR_NAME}</li>
            <li>{COMPANY_EMAIL}</li>
          </ul>
        </div>

        <div>
          <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Network</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="transition-all hover:text-red-600 hover:underline" href={`mailto:${COMPANY_EMAIL}`}>
                {COMPANY_EMAIL}
              </a>
            </li>
            <li>
              <a className="transition-all hover:text-red-600 hover:underline" href={SITE_URL} rel="noreferrer" target="_blank">
                {SITE_URL}
              </a>
            </li>
            <li>{COMPANY_ADDRESS}</li>
            <li>Branches: {BRANCHES.join(" • ")}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl border-t border-slate-200 px-6 py-8 sm:px-8">
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [estimateForm, setEstimateForm] = useState({
    pickup: "",
    delivery: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    type: "Express",
  });
  const [estimateError, setEstimateError] = useState("");
  const [estimateResult, setEstimateResult] = useState(null);

  const interactiveMotion = reduceMotion ? {} : { whileHover: { y: -2, scale: 1.01 }, whileTap: { scale: 0.985 } };
  const estimatePreview = estimateResult ?? buildShippingPreview(estimateForm);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedTrackingNumber = window.localStorage.getItem(TRACKING_STORAGE_KEY)
      ?? window.localStorage.getItem(LEGACY_TRACKING_STORAGE_KEY);
    const savedEstimateForm = window.localStorage.getItem(ESTIMATE_STORAGE_KEY)
      ?? window.localStorage.getItem(LEGACY_ESTIMATE_STORAGE_KEY);

    if (savedTrackingNumber) {
      setTrackingNumber(savedTrackingNumber);
    }

    if (savedEstimateForm) {
      try {
        const parsed = JSON.parse(savedEstimateForm);
        setEstimateForm((current) => ({ ...current, ...parsed }));

        if (!validateShippingEstimate(parsed)) {
          setEstimateResult(calculateShippingEstimate(parsed));
        }
      } catch {
        window.localStorage.removeItem(ESTIMATE_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TRACKING_STORAGE_KEY, trackingNumber);
    }
  }, [trackingNumber]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ESTIMATE_STORAGE_KEY, JSON.stringify(estimateForm));
    }
  }, [estimateForm]);

  const updateEstimateField = (field) => (event) => {
    setEstimateError("");
    setEstimateResult(null);
    setEstimateForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleEstimateSubmit = (event) => {
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
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <Header interactiveMotion={interactiveMotion} />

      <main className="pt-20">
        <Hero
          estimateError={estimateError}
          estimateForm={estimateForm}
          estimatePreview={estimatePreview}
          handleEstimateSubmit={handleEstimateSubmit}
          handleTrackSubmit={(event) => {
            event.preventDefault();
            navigate("/tracking");
          }}
          interactiveMotion={interactiveMotion}
          onNavigateTracking={() => navigate("/tracking")}
          onNavigateUtilities={() => navigate("/utilities")}
          setTrackingNumber={setTrackingNumber}
          trackingNumber={trackingNumber}
          updateEstimateField={updateEstimateField}
        />

        <section className="bg-surface-container-low px-6 py-24 sm:px-8">
          <Reveal className="mx-auto max-w-screen-2xl text-center">
            <h2 className="font-headline mb-12 text-5xl font-bold">
              Functionalities Built for <span className="text-primary">Fast Dispatch</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-8 text-left shadow-sm">
                <Icon className="mb-4 text-4xl text-primary">monitoring</Icon>
                <h3 className="mb-3 text-2xl font-bold">Live Tracking</h3>
                <p className="text-on-surface-variant">Monitor each shipment movement in real time from pickup to delivery updates.</p>
              </div>
              <div className="rounded-3xl bg-white p-8 text-left shadow-sm">
                <Icon className="mb-4 text-4xl text-primary">payments</Icon>
                <h3 className="mb-3 text-2xl font-bold">COD Visibility</h3>
                <p className="text-on-surface-variant">Track COD collection, settlement status, and NDR actions in a single dashboard.</p>
              </div>
              <div className="rounded-3xl bg-white p-8 text-left shadow-sm">
                <Icon className="mb-4 text-4xl text-primary">calculate</Icon>
                <h3 className="mb-3 text-2xl font-bold">Rate Utilities</h3>
                <p className="text-on-surface-variant">Use calculators for volumetric weight and courier rates before every dispatch.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="overflow-hidden px-6 py-32 sm:px-8" id="services">
          <div className="mx-auto max-w-screen-2xl">
            <Reveal><h2 className="font-headline mb-20 text-5xl font-bold">Velocity in <span className="text-primary-container">4 Steps.</span></h2></Reveal>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <div className="group relative">
                    <div className="font-headline absolute -left-6 -top-12 text-9xl font-black text-surface-container opacity-20 transition-colors group-hover:text-primary-container">{step.number}</div>
                    <div className="relative z-10">
                      <Icon className="mb-6 text-4xl text-primary">{step.icon}</Icon>
                      <h4 className="mb-4 text-2xl font-bold">{step.title}</h4>
                      <p className="text-on-surface-variant">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-32 sm:px-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Reveal className="group relative overflow-hidden rounded-[2rem] bg-on-surface p-12 text-surface md:col-span-2">
                <div className="relative z-10 max-w-md">
                  <h3 className="font-headline mb-6 text-4xl font-bold">Real-Time Rate Comparison</h3>
                  <p className="text-lg leading-relaxed text-surface-variant">Stop overpaying. Our kinetic engine scouts top carriers to find the fastest and cheapest routes for every single parcel.</p>
                </div>
                <img alt="Dynamic logistic pricing charts on a dark glass background." className="absolute bottom-0 right-0 h-2/3 w-2/3 rounded-tl-[3rem] object-cover opacity-30 transition-opacity group-hover:opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHIE7j92lI-b9b_5tV8GUiwAb11MtV4zDzipRBxmv0WWBCRUAoOnKfeUMGnExoFHpfX7b0O4yeL32gA5zkMZGydDQ44SnuCrI1qfZ78p8q11Rxb0dPpXBKa7cwqKDEBt5EFF_MZLv-ctabJLscD9CWfgxCtbVUfTXe-8APf0CQ5HpJC-DgWpgAcgvcxCX3BpNSJX8p6MHu6iVZqrzLHAsDtTLZCHMU6TVao3CTPc32jD4KyopW_UHpYSyFGPK9s57NhP0sxcyj7_M" />
              </Reveal>

              <Reveal className="flex flex-col justify-between rounded-[2rem] bg-surface-container-high p-12" delay={0.06}>
                <div>
                  <Icon className="mb-8 text-5xl text-primary" filled>location_on</Icon>
                  <h3 className="font-headline mb-4 text-3xl font-bold">Hyper-Tracking</h3>
                  <p className="text-on-surface-variant">Unified tracking for every carrier. Send automated updates and keep buyers fully informed.</p>
                </div>
              </Reveal>

              <Reveal className="ambient-shadow rounded-[2rem] bg-white p-12" delay={0.08}>
                <h3 className="font-headline mb-4 text-3xl font-bold">COD &amp; NDR</h3>
                <p className="mb-8 text-on-surface-variant">Early COD remittance and faster non-delivery resolution to reduce friction and protect margins.</p>
                <div className="flex items-center gap-4 font-bold text-tertiary"><Icon>check_circle</Icon><span>5-Day Remittance Cycle</span></div>
              </Reveal>

              <Reveal className="flex items-center gap-12 rounded-[2rem] bg-primary-container p-12 text-on-primary-container md:col-span-2" delay={0.12}>
                <div className="max-w-lg">
                  <h3 className="font-headline mb-6 text-4xl font-bold">Dedicated Support Desk</h3>
                  <p className="text-lg text-on-primary-fixed-variant">Get operational help for escalations, pickup issues, and delivery exceptions from a single support queue.</p>
                  <Motion.a {...interactiveMotion} className="mt-8 inline-flex rounded-xl bg-on-primary-container px-6 py-3 font-bold text-on-primary" href={SITE_URL} rel="noreferrer" target="_blank">Contact Support</Motion.a>
                </div>
                <div className="hidden flex-1 md:block"><div className="rounded-xl bg-on-primary-container/10 p-4 text-sm text-on-primary-fixed-variant">Raise tickets, monitor resolution, and keep dispatches moving without delays.</div></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/10 px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-screen-2xl text-center">
            <Reveal><p className="font-label mb-12 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Connected with the World&apos;s Best</p></Reveal>
            <div className="flex flex-wrap items-center justify-center gap-16 opacity-60 md:gap-24">
              {carrierPartners.map((partner, index) => (
                <Reveal key={partner} delay={0.04 + index * 0.03}><span className="font-headline text-3xl font-black italic">{partner}</span></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest px-6 py-32 sm:px-8">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-24 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-headline mb-8 text-5xl font-bold">Cut Costs, Not <span className="text-primary">Corners.</span></h2>
              <p className="mb-12 text-xl text-on-surface-variant">Aggregated volumes mean pre-negotiated rates that smaller businesses could never get on their own. Save more on every shipment.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container p-6"><span className="font-bold">Traditional Single Carrier</span><span className="text-on-surface-variant">Rs. 12.50 / avg</span></div>
                <div className="flex items-center justify-between rounded-2xl border-l-4 border-primary bg-primary/10 p-6"><span className="font-bold text-primary">{COMPANY_NAME} Aggregation</span><span className="font-black text-primary">Rs. 6.80 / avg</span></div>
              </div>
              <Motion.a {...interactiveMotion} className="group mt-12 inline-flex items-center gap-2 font-bold text-primary" href={SITE_URL} rel="noreferrer" target="_blank">Try our detailed Cost Calculator<Icon className="transition-transform group-hover:translate-x-2">arrow_forward</Icon></Motion.a>
            </Reveal>

            <Reveal className="relative" delay={0.08}>
              <div className="kinetic-gradient absolute inset-0 -z-10 rotate-3 rounded-[3rem]" />
              <img alt="Clean logistics pricing and savings charts." className="ambient-shadow w-full rounded-[2.5rem]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXNF_PXEOHe4kcYVDs8IJbLaeXMN8_0hIpc0OJl3rE0wdez7VtFc7ctUQnI-5XNaA5yHE0ZF4g2bg3zekF6MrMEQ0X7EyToaYqJ30XCb4lZ7Tv2QE6NuqhwRpEepm_X1fnkfj6EUvrKXNqYIdkEq-47ue_dqtCGXVjBi49HdcKxrr6ymDFI5PDWOsYXHWRCQ9DtvxpPBJ6942vi8-61Q9X9q01o7qd_0xX8Dqnj7Ft_pTPb6VR3KodL04X8PcYT1CtOSehZir2jpE" />
            </Reveal>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 py-32 sm:px-8">
          <div className="mx-auto max-w-screen-2xl">
            <Reveal><h2 className="font-headline mb-20 text-center text-5xl font-bold">Voices of <span className="text-primary">Scale.</span></h2></Reveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 0.06}>
                  <div className="ambient-shadow rounded-[2rem] bg-white p-10">
                    <div className="mb-6 text-6xl leading-none text-primary-container">“</div>
                    <p className="mb-8 text-lg leading-relaxed italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-4">
                      <img alt={`${testimonial.name} portrait`} className="h-12 w-12 rounded-full object-cover" src={testimonial.image} />
                      <div><div className="font-bold">{testimonial.name}</div><div className="text-sm uppercase tracking-wider text-on-surface-variant">{testimonial.role}</div></div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-32 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal><h2 className="font-headline mb-16 text-center text-5xl font-bold">Questions?</h2></Reveal>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <Reveal key={faq.question} delay={index * 0.04}>
                    <div className="rounded-2xl bg-surface-container p-6">
                      <button className="group flex w-full items-center justify-between text-left text-xl font-bold" onClick={() => setActiveFaq(isActive ? -1 : index)} type="button">
                        {faq.question}
                        <Icon className={isActive ? "text-primary" : "group-hover:text-primary"}>expand_more</Icon>
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <Motion.p animate={{ height: "auto", opacity: 1 }} className="overflow-hidden text-on-surface-variant" exit={{ height: 0, opacity: 0 }} initial={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                            <span className="mt-4 block">{faq.answer}</span>
                          </Motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-32 sm:px-8">
          <div className="mx-auto max-w-screen-2xl">
            <Reveal>
              <div className="kinetic-gradient ambient-shadow relative overflow-hidden rounded-[3rem] p-12 text-center text-on-primary md:p-24">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
                  <img alt="Abstract shipping container terminal with vibrant primary color patterns." className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVD2LUSEvsRGsATc-2SWY2k9PnnE5nXm0R8MLBBCe588rGnYhIdyMtqTvwceax5WRORkD52cCcmz15rKE0wxog3XyEwKJTJPDVNDDO77P2unkbvol_wq1DIInfTrOjgHAsquK2x2Mu53t6NBpsIwtx9ebjBI_-Pz5ki84Td-jz7i_x3zeRyuKXYtwyZH3Zw20R-s-1yZwiY7GgjQFBgwvTOREvbgmhuvpbNDWOqccE7VGLbBkPQrXpnD9gNOlwkTBzdRVuzykCX_A" />
                </div>
                <div className="relative z-10">
                  <h2 className="font-headline mb-8 text-5xl font-bold md:text-7xl">Ready to Accelerate?</h2>
                  <p className="mx-auto mb-12 max-w-2xl text-xl text-on-primary/80 md:text-2xl">Join businesses scaling their logistics with {COMPANY_NAME} and the {BRAND_NAME} shipping network.</p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Motion.a {...interactiveMotion} className="rounded-xl bg-on-primary px-12 py-5 text-xl font-bold text-primary" href={SITE_URL} rel="noreferrer" target="_blank">Start Shipping Now</Motion.a>
                    <Motion.a {...interactiveMotion} className="rounded-xl border-2 border-on-primary px-12 py-5 text-xl font-bold text-on-primary transition-all hover:bg-on-primary/10" href={SITE_URL} rel="noreferrer" target="_blank">Book a Demo</Motion.a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
