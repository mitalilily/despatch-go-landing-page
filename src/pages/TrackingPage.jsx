import { Chip, LinearProgress } from "@mui/material";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/landing/Icon";
import Reveal from "../components/landing/Reveal";
import {
  BRAND_NAME,
  COMPANY_NAME,
  SITE_URL,
} from "../data/landingContent";
import usePersistentState from "../hooks/usePersistentState";
import { buildTrackingSnapshot } from "../utils/trackingSimulator";

const TRACKING_STORAGE_KEY = "despatchgo-tracking-number";
const TRACKING_HISTORY_KEY = "despatchgo-tracking-history";

const defaultRecentSearches = ["DG-BLR-1029", "DG-HYD-8821", "DG-CHN-5507"];

const trackingSteps = [
  {
    icon: "confirmation_number",
    title: "1. Get your tracking ID",
    description:
      "Find your Despatchgo shipment number in the booking confirmation, dispatch email, or merchant panel.",
    accentClass: "bg-primary/10 text-primary",
  },
  {
    icon: "keyboard_alt",
    title: "2. Enter it here",
    description:
      "Paste the tracking number into the search field and launch the connected shipment lookup in one tap.",
    accentClass: "bg-primary-container/10 text-primary-container",
  },
  {
    icon: "visibility",
    title: "3. Follow every milestone",
    description:
      "See pickup, hub movement, linehaul progress, ETA, and last-mile updates from one Despatchgo screen.",
    accentClass: "bg-tertiary/10 text-tertiary",
  },
];

const trackingFaqs = [
  {
    question: "Where do I find my Despatchgo tracking number?",
    answer:
      "You can find it in your shipment confirmation email, booking dashboard, or the order details shared by your store or operations team.",
  },
  {
    question: "How often does tracking get updated?",
    answer:
      "Tracking refreshes whenever the shipment reaches a new operational checkpoint such as pickup, hub scan, linehaul transfer, or last-mile dispatch.",
  },
  {
    question: "What should I do if a shipment looks delayed?",
    answer:
      "Check the latest milestone and ETA first. If the shipment has paused for longer than expected, contact the Despatchgo support team with the tracking number for a manual check.",
  },
];

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function normalizeHistory(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item.trim()) : [];
}

function updateHistory(currentHistory, trackingNumber) {
  return [trackingNumber, ...currentHistory.filter((item) => item !== trackingNumber)].slice(0, 4);
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = usePersistentState(TRACKING_STORAGE_KEY, "");
  const [trackingHistory, setTrackingHistory] = usePersistentState(TRACKING_HISTORY_KEY, []);
  const [activeTrackingNumber, setActiveTrackingNumber] = useState(() => trackingNumber.trim().toUpperCase());
  const [error, setError] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);

  const recentSearches = normalizeHistory(trackingHistory);
  const visibleRecentSearches = recentSearches.length ? recentSearches : defaultRecentSearches;
  const snapshot = buildTrackingSnapshot(activeTrackingNumber);

  useEffect(() => {
    const normalized = trackingNumber.trim().toUpperCase();

    if (normalized.length >= 8 && !activeTrackingNumber) {
      setActiveTrackingNumber(normalized);
    }
  }, [activeTrackingNumber, trackingNumber]);

  const submitTrackingSearch = (candidate) => {
    const normalized = candidate.trim().toUpperCase();

    if (normalized.length < 8) {
      setError("Enter a valid tracking number with at least 8 characters.");
      return;
    }

    setError("");
    setTrackingNumber(normalized);
    setActiveTrackingNumber(normalized);
    setTrackingHistory((current) => updateHistory(normalizeHistory(current), normalized));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitTrackingSearch(trackingNumber);
  };

  return (
    <>
      <section className="relative px-6 py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(106,31,199,0.12),_transparent_45%),radial-gradient(circle_at_75%_20%,_rgba(255,106,0,0.12),_transparent_25%)]" />
        <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center text-center">
          <Reveal className="w-full max-w-2xl">
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] bg-primary-fixed">
              <img
                alt="Despatchgo tracking hero visual."
                className="h-full w-full object-cover opacity-80 mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmmKLBtDiVgv5zpuykBG_3-XA4Q7HM_NbFOyoMqGduhLgdEHIXeDPNu65f_-AcduQqeSpJllAft1Hwx1KfI4xYJDesYZgwZ8CzgeWIdiFRLDnJe02vAgRRq90XmmyFA7HKdDnCSCZtcaN4adnRmDyFOfp4rsKekIu5-MoF9V25MNYOivKlZRARuMOoUZ5ht_jkWuT_uGhd5s6_I5_8Og58VnthwpDRPChNIAfkc3NW-eFERQxCnY-vTLkoMgl9W4RT-p4FPMkuqt5t"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/20 p-8 backdrop-blur-md">
                  <Icon className="text-7xl text-primary" filled>
                    local_shipping
                  </Icon>
                </div>
              </div>
            </div>

            <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface md:text-6xl">
              Track Your <span className="text-primary-container">{COMPANY_NAME}</span> Shipment
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">
              Follow pickup scans, hub movement, linehaul progress, and final delivery updates with
              one persistent tracking experience built for {BRAND_NAME}.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Chip
                label="Persistent search"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Live milestone view"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Despatchgo network"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 -mt-12 px-6">
        <Reveal className="mx-auto max-w-4xl rounded-[2.5rem] border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-xl shadow-primary/5 md:p-8">
          <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
            <div className="relative flex-grow">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</Icon>
              <input
                className="w-full rounded-2xl border-none bg-surface-container-low py-4 pl-12 pr-6 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary"
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder="Enter tracking number (e.g., DG-BLR-1029)"
                type="text"
                value={trackingNumber}
              />
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-container px-8 py-4 font-bold text-on-primary transition-all duration-200 hover:brightness-95 active:scale-95"
              type="submit"
            >
              Track Shipment
              <Icon>arrow_forward</Icon>
            </button>
          </form>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 px-2 sm:flex-row sm:items-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-outline">
              Recent Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {visibleRecentSearches.map((item) => (
                <button
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-on-primary"
                  key={item}
                  onClick={() => submitTrackingSearch(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          {snapshot ? (
            <Reveal className="rounded-[2.5rem] border border-outline-variant/10 bg-white p-6 shadow-lg shadow-primary/5 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    Tracking number
                  </div>
                  <div className="mt-2 font-headline text-3xl font-black text-on-surface">
                    {snapshot.trackingNumber}
                  </div>
                </div>
                <Chip
                  label={snapshot.status}
                  sx={{
                    backgroundColor: "rgba(255, 106, 0, 0.12)",
                    color: "#b04b00",
                    fontWeight: 700,
                  }}
                />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.75rem] bg-surface-container-low p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">Route</div>
                  <div className="mt-2 text-lg font-bold text-on-surface">
                    {snapshot.origin} to {snapshot.destination}
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-surface-container-low p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">Service</div>
                  <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.service}</div>
                </div>
                <div className="rounded-[1.75rem] bg-surface-container-low p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">ETA</div>
                  <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.eta}</div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] bg-surface-container-lowest p-5 ring-1 ring-outline-variant/10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                      Current update
                    </div>
                    <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.statusNote}</div>
                  </div>
                  <div className="text-sm text-on-surface-variant">
                    Last updated {snapshot.lastUpdated}
                  </div>
                </div>

                <LinearProgress
                  sx={{
                    mt: 3,
                    height: 10,
                    borderRadius: "999px",
                    backgroundColor: "rgba(17,28,45,0.08)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(135deg, #6a1fc7 0%, #ff6a00 100%)",
                      borderRadius: "999px",
                    },
                  }}
                  value={snapshot.progress}
                  variant="determinate"
                />
              </div>

              <div className="mt-6 space-y-4">
                {snapshot.checkpoints.map((checkpoint) => (
                  <div
                    className={[
                      "flex gap-4 rounded-[1.75rem] border p-4 transition-colors",
                      checkpoint.complete
                        ? "border-primary/20 bg-primary/[0.06]"
                        : "border-outline-variant/30 bg-surface-container-low",
                    ].join(" ")}
                    key={checkpoint.label}
                  >
                    <div
                      className={[
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                        checkpoint.complete ? "bg-primary text-on-primary" : "bg-white text-on-surface-variant",
                      ].join(" ")}
                    >
                      <Icon>{checkpoint.complete ? "check" : "schedule"}</Icon>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-bold text-on-surface">{checkpoint.label}</div>
                        <div className="text-sm text-on-surface-variant">
                          {formatTimestamp(checkpoint.timestamp)}
                        </div>
                      </div>
                      <div className="mt-2 text-sm leading-6 text-on-surface-variant">
                        {checkpoint.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal className="rounded-[2.5rem] border border-dashed border-outline-variant/40 bg-white/70 p-8 text-center text-on-surface-variant">
              Enter a shipment ID above to load the live Despatchgo tracking board.
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal className="text-center">
            <h2 className="font-headline text-3xl font-black text-on-surface md:text-5xl">
              How to track your shipment
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary-container" />
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {trackingSteps.map((step, index) => (
              <Reveal
                className="group flex flex-col items-center rounded-[2rem] bg-surface-container-low p-8 text-center transition-all hover:bg-surface-container-lowest hover:shadow-lg"
                delay={index * 0.05}
                key={step.title}
              >
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${step.accentClass} transition-transform group-hover:scale-110`}>
                  <Icon className="text-4xl">{step.icon}</Icon>
                </div>
                <h3 className="text-xl font-bold text-on-surface">{step.title}</h3>
                <p className="mt-3 leading-7 text-on-surface-variant">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <Reveal className="mx-auto rounded-[3rem] bg-surface-container-low px-6 py-16 md:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-black tracking-tight text-on-surface md:text-5xl">
                Tracking FAQs
              </h2>
              <p className="mt-4 text-on-surface-variant">
                Everything you need to know about tracking shipments with {COMPANY_NAME}.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {trackingFaqs.map((faq, index) => {
                const isActive = activeFaq === index;

                return (
                  <div
                    className="overflow-hidden rounded-2xl bg-surface-container-lowest"
                    key={faq.question}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                      onClick={() => setActiveFaq(isActive ? -1 : index)}
                      type="button"
                    >
                      <span className="text-lg font-bold text-on-surface">{faq.question}</span>
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
                          <div className="px-6 pb-6 leading-7 text-on-surface-variant">{faq.answer}</div>
                        </Motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-white px-6 py-8 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon>hub</Icon>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-headline text-2xl font-bold text-on-surface">
                  Need shipping pricing too?
                </div>
                <div className="mt-2 text-on-surface-variant">
                  Switch from tracking to rate calculation without leaving the Despatchgo workflow.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-3 font-bold text-on-surface"
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
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
