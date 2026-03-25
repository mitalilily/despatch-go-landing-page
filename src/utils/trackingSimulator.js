const ORIGINS = ["Bangalore Hub", "Hyderabad Hub", "Chennai Hub", "Delhi Hub"];
const DESTINATIONS = ["Mumbai", "Pune", "Coimbatore", "Jaipur", "Ahmedabad", "Kolkata"];
const SERVICES = ["Express Air", "Surface Priority", "Express Ground"];

function buildSeed(value) {
  return value.split("").reduce((total, character, index) => total + character.charCodeAt(0) * (index + 1), 0);
}

export function buildTrackingSnapshot(rawTrackingNumber) {
  const trackingNumber = rawTrackingNumber.trim().toUpperCase();

  if (trackingNumber.length < 8) {
    return null;
  }

  const seed = buildSeed(trackingNumber);
  const origin = ORIGINS[seed % ORIGINS.length];
  const destination = DESTINATIONS[(seed * 3) % DESTINATIONS.length];
  const service = SERVICES[(seed * 5) % SERVICES.length];
  const stageIndex = Math.min(4, (seed % 4) + 1);
  const baseTime = Date.now() - (seed % 18 + 18) * 60 * 60 * 1000;
  const statusLabels = ["Booked", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
  const stageNotes = [
    `Shipment manifest created for ${origin}.`,
    `Parcel collected and scanned at ${origin}.`,
    `Shipment moved through the national linehaul toward ${destination}.`,
    `Local delivery partner assigned for the ${destination} route.`,
    `Recipient handover completed and proof of delivery logged.`,
  ];

  const checkpoints = statusLabels.map((label, index) => ({
    label,
    note: stageNotes[index],
    timestamp: new Date(baseTime + index * 6 * 60 * 60 * 1000),
    complete: index <= stageIndex,
  }));

  const currentStatus = checkpoints[stageIndex];
  const progress = ((stageIndex + 1) / checkpoints.length) * 100;
  const eta =
    stageIndex === checkpoints.length - 1
      ? "Delivered"
      : new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(baseTime + (stageIndex + 2) * 6 * 60 * 60 * 1000));

  return {
    trackingNumber,
    origin,
    destination,
    service,
    status: currentStatus.label,
    statusNote: currentStatus.note,
    eta,
    progress,
    checkpoints,
    lastUpdated: new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(baseTime + stageIndex * 6 * 60 * 60 * 1000)),
  };
}
