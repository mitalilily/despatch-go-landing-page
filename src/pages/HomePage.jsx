import { Chip } from "@mui/material";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/landing/Reveal";
import Icon from "../components/landing/Icon";
import {
  COMPANY_NAME,
  faqs,
  SITE_URL,
  steps,
  testimonials,
} from "../data/landingContent";

const quickActionCards = [
  {
    title: "Ship Now",
    description: "Book a delivery in seconds with the best courier options available.",
    cta: "Get rates & ship",
    icon: "local_shipping",
    to: "/rate-calculator",
  },
  {
    title: "Track Shipment",
    description: "Enter your tracking ID and get real-time updates across all couriers.",
    cta: "Track package",
    icon: "package_2",
    to: "/tracking",
  },
  {
    title: "Manage Deliveries",
    description: "View, edit, and manage all your shipments in one place.",
    cta: "Go to dashboard",
    icon: "dashboard",
    href: SITE_URL,
  },
];

const heroHighlights = [
  {
    icon: "bolt",
    title: "Best courier selection",
    description: "Compare serviceability and cost before you ship.",
  },
  {
    icon: "route",
    title: "Real-time tracking",
    description: "Check shipment movement across pickup, hubs, and last-mile delivery.",
  },
  {
    icon: "inventory_2",
    title: "Delivery management",
    description: "Keep shipment actions, status, and customer updates in one place.",
  },
];

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-[4.5rem] pt-8 sm:px-8 lg:pb-24 lg:pt-10" id="hero">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(106,31,199,0.18),_transparent_42%),radial-gradient(circle_at_85%_15%,_rgba(255,106,0,0.18),_transparent_28%)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-primary/[0.12] blur-[100px]" />
        <div className="absolute right-[-6rem] top-16 h-80 w-80 rounded-full bg-primary-container/[0.14] blur-[110px]" />

        <div className="relative mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[1.04fr,0.96fr] lg:items-start">
          <Reveal>
            <span className="font-label inline-flex rounded-full bg-primary-container px-4 py-1 text-sm font-bold text-on-primary-container">
              {COMPANY_NAME.toUpperCase()} SHIPPING PLATFORM
            </span>

            <h1 className="font-headline mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-on-surface md:text-7xl">
              Ship faster. Track clearly. Manage every delivery from one place.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-xl">
              {COMPANY_NAME} brings shipping, tracking, and delivery control into one clean,
              responsive workflow built for everyday operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Chip
                label="Best courier options"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Real-time tracking"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="One delivery dashboard"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                className="kinetic-gradient inline-flex items-center justify-center rounded-2xl px-6 py-3.5 font-bold text-on-primary"
                href={SITE_URL}
                rel="noreferrer"
                target="_blank"
              >
                Get Started
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-2xl border border-outline-variant/30 bg-white px-6 py-3.5 font-bold text-on-surface"
                to="/tracking"
              >
                Track Shipment
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative" delay={0.08}>
            <div className="absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
            <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    Everyday Workflow
                  </div>
                  <h2 className="font-headline mt-3 text-3xl font-bold text-on-surface">
                    Built for teams that ship every day.
                  </h2>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                  Fast actions
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {heroHighlights.map((item) => (
                  <div
                    className="rounded-[1.6rem] border border-outline-variant/20 bg-white/85 p-5"
                    key={item.title}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container text-primary">
                        <Icon>{item.icon}</Icon>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-headline text-xl font-bold text-on-surface">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8" id="services">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal>
            <h2 className="font-headline text-5xl font-black text-on-surface">
              From booking to dispatch in <span className="text-primary-container">4 steps.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="relative h-full rounded-[2rem] bg-surface-container-low p-8">
                  <div className="font-headline absolute right-6 top-4 text-7xl font-black text-surface-container-high">
                    {step.number}
                  </div>
                  <div className="relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary">
                      <Icon className="text-3xl">{step.icon}</Icon>
                    </div>
                    <h3 className="mt-8 text-2xl font-bold text-on-surface">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-on-surface-variant">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-24 sm:px-8">
        <div className="mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Reveal className="rounded-[2.25rem] bg-on-surface p-10 text-surface sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-primary-container">
              <Icon className="text-3xl">hub</Icon>
            </div>
            <h3 className="font-headline mt-8 text-4xl font-bold">Ship, Track, or Manage - instantly</h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-surface-variant">
              No confusion, no scrolling. Choose what you need and get it done.
            </p>
          </Reveal>

          <div className="grid gap-6">
            {quickActionCards.map((card, index) => (
              <Reveal
                className="rounded-[2rem] border border-outline-variant/15 bg-surface-container-high p-8"
                delay={0.04 + index * 0.05}
                key={card.title}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary">
                    <Icon>{card.icon}</Icon>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline text-2xl font-bold text-on-surface">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-on-surface-variant">{card.description}</p>
                    {card.to ? (
                      <Link
                        className="mt-5 inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
                        to={card.to}
                      >
                        {card.cta}
                        <Icon>arrow_forward</Icon>
                      </Link>
                    ) : (
                      <a
                        className="mt-5 inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
                        href={card.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {card.cta}
                        <Icon>arrow_forward</Icon>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal>
            <h2 className="font-headline text-center text-5xl font-black text-on-surface">
              Voices of <span className="text-primary">scale.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.05}>
                <div className="ambient-shadow h-full rounded-[2rem] bg-white p-8">
                  <div className="text-5xl leading-none text-primary-container">"</div>
                  <p className="mt-5 text-lg leading-8 text-on-surface italic">{testimonial.quote}</p>
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      alt={`${testimonial.name} portrait`}
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonial.image}
                    />
                    <div>
                      <div className="font-bold text-on-surface">{testimonial.name}</div>
                      <div className="text-sm uppercase tracking-[0.14em] text-on-surface-variant">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-headline text-center text-5xl font-black text-on-surface">Questions?</h2>
          </Reveal>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal key={faq.question} delay={index * 0.04}>
                  <div className="rounded-[1.75rem] bg-surface-container-low p-6">
                    <button
                      className="flex w-full items-center justify-between gap-4 text-left text-xl font-bold text-on-surface"
                      onClick={() => setActiveFaq(isActive ? -1 : index)}
                      type="button"
                    >
                      {faq.question}
                      <Icon className={isActive ? "text-primary" : "text-on-surface-variant"}>expand_more</Icon>
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <Motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <p className="mt-4 text-base leading-7 text-on-surface-variant">{faq.answer}</p>
                        </Motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal>
            <div className="kinetic-gradient ambient-shadow rounded-[2.5rem] px-8 py-14 text-center text-on-primary sm:px-12 sm:py-20">
              <h2 className="font-headline text-4xl font-black md:text-6xl">Ready to ship smarter?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-on-primary/[0.82]">
                Start using {COMPANY_NAME} for shipping, tracking, and delivery management in one place.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  className="kinetic-gradient inline-flex items-center justify-center rounded-2xl px-7 py-3.5 font-bold text-on-primary shadow-xl shadow-primary/25 ring-1 ring-white/35"
                  href={SITE_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  Get Started
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
