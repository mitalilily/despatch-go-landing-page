import { Link } from "react-router-dom";
import BrandMark from "../components/landing/BrandMark";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-10 text-on-surface sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link className="inline-block origin-left scale-[0.82]" to="/">
          <BrandMark compact />
        </Link>
        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
          <h1 className="font-headline text-4xl font-bold">Tracking</h1>
          <p className="mt-4 text-on-surface-variant">
            Enter your AWB number on the live DespatchGo tracking dashboard to get real-time shipment
            movement updates.
          </p>
          <a
            className="kinetic-gradient mt-8 inline-flex rounded-xl px-8 py-3 font-bold text-on-primary"
            href="https://share.google/FYAlcK6HjsIz5UQjO"
            rel="noreferrer"
            target="_blank"
          >
            Open Tracking Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
