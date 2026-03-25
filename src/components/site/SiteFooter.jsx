import { Link } from "react-router-dom";
import {
  BRANCHES,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_NAME,
  SITE_URL,
} from "../../data/landingContent";
import { utilityLinks } from "../../data/navigation";
import BrandMark from "../landing/BrandMark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface-container-lowest">
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.2fr,0.8fr,0.8fr,1fr]">
        <div>
          <BrandMark className="origin-left scale-[0.84]" />
          <p className="mt-6 max-w-md text-sm leading-7 text-on-surface-variant">
            {COMPANY_NAME} keeps tracking, rate checks, and billable-weight decisions connected in one
            clean logistics surface.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-on-surface">Utilities</div>
          <div className="mt-5 space-y-3">
            {utilityLinks.map((item) => (
              <Link
                className="block text-sm text-on-surface-variant transition-colors hover:text-primary"
                key={item.to}
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-on-surface">Company</div>
          <div className="mt-5 space-y-3 text-sm text-on-surface-variant">
            <div>{COMPANY_NAME}</div>
            <a className="block transition-colors hover:text-primary" href={`mailto:${COMPANY_EMAIL}`}>
              {COMPANY_EMAIL}
            </a>
            <a className="block transition-colors hover:text-primary" href={SITE_URL} rel="noreferrer" target="_blank">
              {COMPANY_NAME} platform
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-on-surface">Network</div>
          <div className="mt-5 space-y-3 text-sm leading-7 text-on-surface-variant">
            <div>{COMPANY_ADDRESS}</div>
            <div>Branches: {BRANCHES.join(" | ")}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-outline-variant/10">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-6 py-6 text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</div>
          <Link className="font-medium text-primary transition-colors hover:text-primary/80" to="/tracking">
            Track your next shipment
          </Link>
        </div>
      </div>
    </footer>
  );
}
