import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { utilityLinks } from "../../data/navigation";
import Reveal from "../landing/Reveal";
import Icon from "../landing/Icon";

function ActionLink({ action, filled = true }) {
  if (!action) {
    return null;
  }

  if (action.href) {
    return (
      <a
        className={
          filled
            ? "kinetic-gradient inline-flex items-center justify-center rounded-2xl px-6 py-3.5 font-bold text-on-primary"
            : "inline-flex items-center justify-center rounded-2xl border border-outline-variant/30 bg-white px-6 py-3.5 font-bold text-on-surface"
        }
        href={action.href}
        rel="noreferrer"
        target="_blank"
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      className={
        filled
          ? "kinetic-gradient inline-flex items-center justify-center rounded-2xl px-6 py-3.5 font-bold text-on-primary"
          : "inline-flex items-center justify-center rounded-2xl border border-outline-variant/30 bg-white px-6 py-3.5 font-bold text-on-surface"
      }
      to={action.to}
    >
      {action.label}
    </Link>
  );
}

export default function UtilityHero({
  eyebrow,
  title,
  description,
  highlights = [],
  primaryAction,
  secondaryAction,
  children,
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-[4.5rem] pt-8 sm:px-8 lg:pb-24 lg:pt-10">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(106,31,199,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(255,106,0,0.16),_transparent_34%)]" />
      <div className="absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute right-[-6rem] top-10 h-72 w-72 rounded-full bg-primary-container/[0.12] blur-[110px]" />

      <div className="relative mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[1.02fr,0.98fr] lg:items-start">
        <Reveal>
          <span className="font-label inline-flex rounded-full bg-primary-container px-4 py-1 text-sm font-bold text-on-primary-container">
            {eyebrow}
          </span>

          <h1 className="font-headline mt-6 text-5xl font-black leading-[0.92] tracking-tight text-on-surface md:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-xl">
            {description}
          </p>

          {highlights.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <Chip
                  key={highlight}
                  label={highlight}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.78)",
                    border: "1px solid rgba(17,28,45,0.08)",
                    color: "#111c2d",
                    fontWeight: 700,
                  }}
                />
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4">
            <ActionLink action={primaryAction} />
            <ActionLink action={secondaryAction} filled={false} />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {utilityLinks.map((item) => (
              <Link
                className="rounded-[1.6rem] border border-outline-variant/20 bg-white/75 p-5 transition-transform duration-300 hover:-translate-y-1"
                key={item.to}
                to={item.to}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container text-primary">
                  <Icon>{item.icon}</Icon>
                </div>
                <div className="mt-4 font-headline text-lg font-bold">{item.label}</div>
                <div className="mt-2 text-sm leading-6 text-on-surface-variant">{item.shortLabel}</div>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.08}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
