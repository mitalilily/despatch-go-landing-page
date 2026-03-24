import { Link } from "react-router-dom";
import BrandMark from "../components/landing/BrandMark";
import Icon from "../components/landing/Icon";

export default function UtilitiesPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-10 text-on-surface sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-block origin-left scale-[0.82]" to="/">
          <BrandMark compact />
        </Link>
        <div className="mt-10">
          <h1 className="font-headline text-4xl font-bold">Utilities</h1>
          <p className="mt-4 text-on-surface-variant">
            Choose a utility to calculate shipment chargeability and route costs.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link className="rounded-[2rem] bg-white p-8 shadow-sm transition-transform hover:-translate-y-1" to="/utilities/volumetric-weight">
              <Icon className="mb-4 text-4xl text-primary">calculate</Icon>
              <h2 className="text-2xl font-bold">Volumetric Weight Calculator</h2>
              <p className="mt-3 text-on-surface-variant">
                Convert package dimensions into volumetric weight using standard divisors.
              </p>
            </Link>
            <Link className="rounded-[2rem] bg-white p-8 shadow-sm transition-transform hover:-translate-y-1" to="/utilities/rate-calculator">
              <Icon className="mb-4 text-4xl text-primary">payments</Icon>
              <h2 className="text-2xl font-bold">Rate Calculator</h2>
              <p className="mt-3 text-on-surface-variant">
                Estimate courier charges based on route, service type, and billable weight.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
