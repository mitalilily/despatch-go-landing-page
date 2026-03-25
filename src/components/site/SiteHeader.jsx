import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE_URL } from "../../data/landingContent";
import { primaryNavLinks, utilityLinks } from "../../data/navigation";
import BrandMark from "../landing/BrandMark";

function navLinkClass(isActive) {
  return [
    "rounded-xl px-4 py-2 font-headline text-sm font-bold tracking-tight transition-colors",
    isActive ? "bg-primary text-on-primary" : "text-slate-600 hover:bg-surface-container-low hover:text-slate-900",
  ].join(" ");
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-screen-2xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="glass-panel ambient-shadow flex h-20 items-center justify-between rounded-[1.75rem] border border-white/50 px-4 sm:px-6">
            <Link className="origin-left scale-[0.72] sm:scale-[0.82]" to="/">
              <BrandMark compact />
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {primaryNavLinks.map((item) => (
                <NavLink className={({ isActive }) => navLinkClass(isActive)} key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                className="kinetic-gradient inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-on-primary"
                href={SITE_URL}
                rel="noreferrer"
                target="_blank"
              >
                Get Started
                <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
              </a>
            </div>

            <IconButton
              aria-label="Open navigation"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              sx={{ color: "#111c2d" }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </div>
        </div>
      </header>

      <Drawer anchor="right" onClose={() => setMobileOpen(false)} open={mobileOpen}>
        <div className="flex h-full w-[min(86vw,360px)] flex-col bg-surface-container-lowest px-6 py-8">
          <Link className="origin-left scale-[0.82]" onClick={() => setMobileOpen(false)} to="/">
            <BrandMark compact />
          </Link>

          <div className="mt-10 space-y-3">
            {primaryNavLinks.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    "block rounded-2xl px-4 py-4 font-headline text-base font-bold",
                    isActive ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface",
                  ].join(" ")
                }
                key={item.to}
                onClick={() => setMobileOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-10">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">Utilities</div>
            <div className="mt-4 space-y-3">
              {utilityLinks.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    [
                      "block rounded-2xl border px-4 py-4",
                      isActive
                        ? "border-primary bg-primary/[0.08]"
                        : "border-outline-variant/30 bg-surface-container-low",
                    ].join(" ")
                  }
                  key={item.to}
                  onClick={() => setMobileOpen(false)}
                  to={item.to}
                >
                  <div className="font-bold text-on-surface">{item.label}</div>
                  <div className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</div>
                </NavLink>
              ))}
            </div>
          </div>

          <a
            className="kinetic-gradient mt-auto inline-flex items-center justify-center rounded-2xl px-5 py-4 font-bold text-on-primary"
            href={SITE_URL}
            rel="noreferrer"
            target="_blank"
          >
            Get Started
          </a>
        </div>
      </Drawer>
    </>
  );
}
