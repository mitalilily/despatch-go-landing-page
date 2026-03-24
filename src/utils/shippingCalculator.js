const PINCODE_REGEX = /^\d{6}$/;

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function detectZone(pickup, delivery) {
  if (pickup.slice(0, 3) === delivery.slice(0, 3)) {
    return { label: "Local lane", baseRate: 52, perKgRate: 24 };
  }

  if (pickup.slice(0, 1) === delivery.slice(0, 1)) {
    return { label: "Regional lane", baseRate: 68, perKgRate: 31 };
  }

  return { label: "National lane", baseRate: 94, perKgRate: 41 };
}

export function validateShippingEstimate(form) {
  if (!PINCODE_REGEX.test(form.pickup)) {
    return "Enter a valid 6-digit pickup pincode.";
  }

  if (!PINCODE_REGEX.test(form.delivery)) {
    return "Enter a valid 6-digit delivery pincode.";
  }

  if (toNumber(form.weight) <= 0) {
    return "Add the actual shipment weight in kilograms.";
  }

  if (toNumber(form.length) <= 0 || toNumber(form.width) <= 0 || toNumber(form.height) <= 0) {
    return "Add package length, width, and height in centimeters.";
  }

  return "";
}

export function calculateShippingEstimate(form) {
  const actualWeight = toNumber(form.weight);
  const length = toNumber(form.length);
  const width = toNumber(form.width);
  const height = toNumber(form.height);
  const divisor = form.type === "Express" ? 5000 : 6000;
  const volumetricWeight = (length * width * height) / divisor;
  const billableWeight = Math.max(actualWeight, volumetricWeight);
  const zone = detectZone(form.pickup, form.delivery);
  const serviceMultiplier = form.type === "Express" ? 1.18 : 1;
  const estimatedCost = Math.round(zone.baseRate + billableWeight * zone.perKgRate * serviceMultiplier);

  return {
    actualWeight,
    volumetricWeight,
    billableWeight,
    divisor,
    estimatedCost,
    zoneLabel: zone.label,
  };
}
