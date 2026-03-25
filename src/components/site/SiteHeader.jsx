import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE_URL } from "../../data/landingContent";
import { primaryNavLinks } from "../../data/navigation";
import BrandMark from "../landing/BrandMark";
import Icon from "../landing/Icon";

function navLinkClass(isActive) {
  return [
    "rounded-xl px-4 py-2 font-headline text-sm font-bold tracking-tight transition-colors",
    isActive ? "bg-primary text-on-primary" : "text-slate-600 hover:bg-surface-container-low hover:text-slate-900",
  ].join(" ");
}

function mobileMenuLinkClass(isActive) {
  return [
    "flex items-center justify-between gap-4 rounded-[1.5rem] border px-4 py-4 transition-colors",
    isActive
      ? "border-primary bg-primary text-on-primary shadow-lg shadow-primary/20"
      : "border-outline-variant/20 bg-white/85 text-on-surface hover:bg-surface-container-low",
  ].join(" ");
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-screen-2xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="glass-panel ambient-shadow flex h-20 items-center justify-between rounded-[1.75rem] border border-white/50 px-4 sm:px-6">
            <Link className="origin-left scale-[0.72] sm:scale-[0.82]" to="/">
              <BrandMark compact />
            </Link>

            <nav className="hidden items-center gap-2 xl:flex">
              {primaryNavLinks.map((item) => (
                <NavLink className={({ isActive }) => navLinkClass(isActive)} key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                aria-expanded={mobileMenuOpen}
                aria-label="Open page menu"
                className="glass-panel inline-flex items-center gap-3 rounded-xl border border-white/60 px-3 py-2.5 text-on-surface xl:hidden"
                onClick={() => setMobileMenuOpen(true)}
                type="button"
              >
                <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant sm:block">
                  Pages
                </span>
                <span className="flex h-6 items-center gap-1.5">
                  <span className="h-5 w-[0.2rem] rounded-full bg-current" />
                  <span className="h-5 w-[0.2rem] rounded-full bg-current" />
                  <span className="h-5 w-[0.2rem] rounded-full bg-current" />
                </span>
              </button>

              <a
                className="kinetic-gradient hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-on-primary sm:inline-flex sm:px-5 sm:py-3"
                href={SITE_URL}
                rel="noreferrer"
                target="_blank"
              >
                Get Started
                <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <Drawer
        anchor="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        PaperProps={{
          sx: {
            width: { xs: "88vw", sm: 380 },
            maxWidth: "100%",
            borderRadius: { xs: "1.75rem 0 0 1.75rem", sm: "2rem 0 0 2rem" },
            background: "rgba(249, 249, 255, 0.96)",
            backdropFilter: "blur(18px)",
            padding: { xs: "1rem", sm: "1.25rem" },
            boxShadow: "0 24px 48px -12px rgba(17, 28, 45, 0.16)",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(17, 28, 45, 0.2)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-outline-variant/15 bg-white/70 px-4 py-3">
            <Link className="origin-left scale-[0.72] sm:scale-[0.8]" onClick={() => setMobileMenuOpen(false)} to="/">
              <BrandMark compact />
            </Link>

            <button
              aria-label="Close page menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface"
              onClick={() => setMobileMenuOpen(false)}
              type="button"
            >
              <Icon>close</Icon>
            </button>
          </div>

          <div className="mt-8">
            <div className="px-1 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
              Browse Pages
            </div>

            <nav className="mt-4 space-y-3">
              {primaryNavLinks.map((item) => (
                <NavLink
                  className={({ isActive }) => mobileMenuLinkClass(isActive)}
                  key={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  to={item.to}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container">
                      <Icon className="text-[1.4rem]">{item.icon}</Icon>
                    </div>
                    <div>
                      <div className="font-headline text-lg font-bold">{item.label}</div>
                      <div className="mt-1 text-sm opacity-75">
                        {item.mobileLabel ?? item.label}
                      </div>
                    </div>
                  </div>
                  <Icon className="text-[1.3rem]">arrow_forward</Icon>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-auto rounded-[1.75rem] bg-on-surface px-5 py-6 text-surface">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary-fixed">
              DespatchGO
            </div>
            <h3 className="font-headline mt-3 text-2xl font-bold">Open shipping tools when you need them.</h3>
            <p className="mt-3 text-sm leading-7 text-surface/75">
              Track, calculate, and manage deliveries from one clean menu without covering the page content.
            </p>
            <a
              className="kinetic-gradient mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-on-primary"
              href={SITE_URL}
              rel="noreferrer"
              target="_blank"
            >
              Get Started
              <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
}
