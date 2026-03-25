export const primaryNavLinks = [
  { label: "Home", mobileLabel: "Home", icon: "home", to: "/" },
  { label: "Tracking", mobileLabel: "Tracking", icon: "package_2", to: "/tracking" },
  { label: "Rate Calculator", mobileLabel: "Rate Calc", icon: "calculate", to: "/rate-calculator" },
  { label: "Weight Calculator", mobileLabel: "Weight Calc", icon: "scale", to: "/weight-calculator" },
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
