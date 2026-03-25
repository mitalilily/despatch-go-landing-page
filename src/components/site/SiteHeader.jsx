import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Link, NavLink } from "react-router-dom";
import { SITE_URL } from "../../data/landingContent";
import { primaryNavLinks } from "../../data/navigation";
import BrandMark from "../landing/BrandMark";

function navLinkClass(isActive) {
  return [
    "rounded-xl px-4 py-2 font-headline text-sm font-bold tracking-tight transition-colors",
    isActive ? "bg-primary text-on-primary" : "text-slate-600 hover:bg-surface-container-low hover:text-slate-900",
  ].join(" ");
}

export default function SiteHeader() {
  return (
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

          <a
            className="kinetic-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-on-primary sm:px-5 sm:py-3"
            href={SITE_URL}
            rel="noreferrer"
            target="_blank"
          >
            Get Started
            <NorthEastRoundedIcon sx={{ fontSize: 18 }} />
          </a>
        </div>
      </div>
    </header>
  );
}
