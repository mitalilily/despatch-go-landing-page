export const primaryNavLinks = [
  { label: "Home", to: "/" },
  { label: "Tracking", to: "/tracking" },
  { label: "Rate Calculator", to: "/rate-calculator" },
  { label: "Weight Calculator", to: "/weight-calculator" },
];

export const utilityLinks = [
  {
    label: "Tracking",
    shortLabel: "Track Shipment",
    to: "/tracking",
    icon: "package_2",
    description: "Follow milestone updates, current shipment status, and delivery ETA from one screen.",
  },
  {
    label: "Rate Calculator",
    shortLabel: "Calculate Rates",
    to: "/rate-calculator",
    icon: "calculate",
    description: "Estimate courier charges from pickup and delivery pincodes with volumetric billing built in.",
  },
  {
    label: "Weight Calculator",
    shortLabel: "Check Weight",
    to: "/weight-calculator",
    icon: "scale",
    description: "Compare actual, volumetric, and billable weight before you dispatch the parcel.",
  },
];
