import { Chip } from "@mui/material";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/landing/Reveal";
import Icon from "../components/landing/Icon";
import UtilityMenu from "../components/site/UtilityMenu";
import {
  carrierPartners,
  faqs,
  integrations,
  SITE_URL,
  steps,
  testimonials,
  trustLogos,
} from "../data/landingContent";
import { utilityLinks } from "../data/navigation";

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
              CONNECTED SHIPPING UTILITIES
            </span>

            <h1 className="font-headline mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-on-surface md:text-7xl">
              Logistics pages that start fast, stay aligned, and keep the workflow connected.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-xl">
              Despatchgo now opens with the hero anchored higher on the screen and routes directly
              into dedicated tracking, rate calculator, and weight calculator pages with the same
              responsive design system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Chip
                label="Responsive layout"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Tailwind + Material UI"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
              <Chip
                label="Persistent utility forms"
                sx={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#111c2d", fontWeight: 700 }}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link className="kinetic-gradient inline-flex items-center justify-center rounded-2xl px-6 py-3.5 font-bold text-on-primary" to="/tracking">
                Open Tracking
              </Link>
              <Link className="inline-flex items-center justify-center rounded-2xl border border-outline-variant/30 bg-white px-6 py-3.5 font-bold text-on-surface" to="/rate-calculator">
                Calculate Rates
              </Link>
              <div className="w-full sm:w-auto sm:min-w-64">
                <UtilityMenu buttonLabel="Choose Utility" fullWidth />
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-outline-variant/20 bg-white/75 p-5">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">Utilities</div>
                <div className="mt-3 font-headline text-3xl font-black text-on-surface">3</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-variant">Tracking, rates, and billable weight.</div>
              </div>
              <div className="rounded-[1.75rem] border border-outline-variant/20 bg-white/75 p-5">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">Persistence</div>
                <div className="mt-3 font-headline text-3xl font-black text-on-surface">Local</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-variant">Saved values stay available between visits.</div>
              </div>
              <div className="rounded-[1.75rem] border border-outline-variant/20 bg-white/75 p-5">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">Theme</div>
                <div className="mt-3 font-headline text-3xl font-black text-on-surface">One</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-variant">Consistent hero, forms, cards, and footer on every page.</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative" delay={0.08}>
            <div className="absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
            <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    Utility Hub
                  </div>
                  <h2 className="font-headline mt-3 text-3xl font-bold text-on-surface">
                    Jump into the exact shipping task you need.
                  </h2>
                </div>
                <a
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                  href={SITE_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  Platform Access
                </a>
              </div>

              <div className="mt-6 space-y-4">
                {utilityLinks.map((item) => (
                  <Link
                    className="group block rounded-[1.6rem] border border-outline-variant/20 bg-white/85 p-5 transition-transform duration-300 hover:-translate-y-1"
                    key={item.to}
                    to={item.to}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container text-primary">
                        <Icon>{item.icon}</Icon>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-headline text-xl font-bold text-on-surface">{item.label}</h3>
                          <Icon className="text-on-surface-variant transition-transform group-hover:translate-x-1">
                            arrow_forward
                          </Icon>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-20 sm:px-8">
        <Reveal className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex items-baseline gap-12">
            <div>
              <div className="font-headline text-5xl font-black text-primary">99.8%</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Precision Delivery
              </div>
            </div>
            <div className="hidden h-16 w-px bg-outline-variant/30 md:block" />
            <div>
              <div className="font-headline text-5xl font-black text-on-surface">220+</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Global Countries
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-10 opacity-55 grayscale transition-all duration-700 hover:grayscale-0">
            {trustLogos.map((logo, index) => (
              <Reveal key={logo} delay={0.04 + index * 0.03}>
                <img alt={`Partner logo ${index + 1}`} className="h-8" src={logo} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 py-24 sm:px-8" id="services">
        <div className="mx-auto max-w-screen-2xl">
          <Reveal>
            <h2 className="font-headline text-5xl font-black text-on-surface">
              Connected logistics in <span className="text-primary-container">4 steps.</span>
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
        <div className="mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal className="rounded-[2.25rem] bg-on-surface p-10 text-surface sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-primary-container">
              <Icon className="text-3xl">hub</Icon>
            </div>
            <h3 className="font-headline mt-8 text-4xl font-bold">A utility-first landing flow.</h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-surface-variant">
              Instead of forcing every visitor into one oversized hero panel, the site now routes
              people directly into the action they need while preserving one clear visual language.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {carrierPartners.map((partner) => (
                <span
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-surface"
                  key={partner}
                >
                  {partner}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-8">
            <Reveal className="rounded-[2rem] bg-surface-container-high p-8">
              <h3 className="font-headline text-3xl font-bold">Native Store Sync</h3>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                Keep operations connected with store integrations and a shared shipping layer.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {integrations.map((integration) => (
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white"
                    key={integration.name}
                  >
                    <img alt={integration.name} className="h-10 w-10" src={integration.src} />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-[2rem] bg-primary-container p-8 text-on-primary-container" delay={0.08}>
              <h3 className="font-headline text-3xl font-bold">Fast utility switching</h3>
              <p className="mt-4 text-sm leading-7 text-on-primary-fixed-variant">
                The header and hero both include clear utility navigation, so users can move between
                tracking, rate checks, and weight checks without losing context.
              </p>
            </Reveal>
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
                Move from tracking to pricing to billable-weight checks without breaking the flow.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link className="rounded-2xl bg-white px-6 py-3.5 font-bold text-primary" to="/tracking">
                  Start with Tracking
                </Link>
                <a
                  className="rounded-2xl border border-white/30 px-6 py-3.5 font-bold text-on-primary"
                  href={SITE_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Platform
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
