import TrackingPanel from "../components/site/TrackingPanel";
import UtilityHero from "../components/site/UtilityHero";
import usePersistentState from "../hooks/usePersistentState";

const TRACKING_STORAGE_KEY = "despatchgo-tracking-number";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = usePersistentState(TRACKING_STORAGE_KEY, "");

  return (
    <UtilityHero
      description="Track a shipment from booking through final delivery with a dedicated Despatchgo page that keeps the design, spacing, and navigation consistent with the rest of the site."
      eyebrow="TRACKING WORKSPACE"
      highlights={["Persistent search", "Connected milestones", "Shared theme"]}
      primaryAction={{ label: "Track a Shipment", to: "/tracking" }}
      secondaryAction={{ label: "Open Rate Calculator", to: "/rate-calculator" }}
      title="Shipment updates without the clutter."
    >
      <TrackingPanel
        onTrackingNumberChange={setTrackingNumber}
        trackingNumber={trackingNumber}
      />
    </UtilityHero>
  );
}
