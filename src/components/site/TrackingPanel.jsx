import { Chip, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { buildTrackingSnapshot } from "../../utils/trackingSimulator";
import Icon from "../landing/Icon";

const inputClasses =
  "w-full rounded-2xl border border-transparent bg-surface-container-high p-4 text-on-surface transition focus:border-primary/20 focus:bg-white focus:outline-none";

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default function TrackingPanel({ trackingNumber, onTrackingNumberChange }) {
  const [activeTrackingNumber, setActiveTrackingNumber] = useState(() => trackingNumber.trim().toUpperCase());
  const [error, setError] = useState("");
  const snapshot = buildTrackingSnapshot(activeTrackingNumber);

  useEffect(() => {
    const normalized = trackingNumber.trim().toUpperCase();

    if (normalized.length >= 8 && !activeTrackingNumber) {
      setActiveTrackingNumber(normalized);
    }
  }, [activeTrackingNumber, trackingNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = trackingNumber.trim().toUpperCase();

    if (normalized.length < 8) {
      setError("Enter a tracking number with at least 8 characters.");
      return;
    }

    setError("");
    onTrackingNumberChange(normalized);
    setActiveTrackingNumber(normalized);
  };

  return (
    <div className="space-y-6">
      <form
        className="glass-panel ambient-shadow rounded-[2rem] border border-white/60 p-6 sm:p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface">Shipment Tracking</h2>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Check the latest milestone, shipment lane, and delivery progress from one persistent
              dashboard.
            </p>
          </div>
          <Chip
            label="Persistent lookup"
            sx={{
              backgroundColor: "rgba(17, 28, 45, 0.08)",
              color: "#111c2d",
              fontWeight: 700,
            }}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={inputClasses}
            onChange={(event) => onTrackingNumberChange(event.target.value)}
            placeholder="Enter tracking number"
            type="text"
            value={trackingNumber}
          />
          <button
            className="kinetic-gradient rounded-2xl px-6 py-4 font-bold text-on-primary sm:min-w-44"
            type="submit"
          >
            Track Shipment
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}
      </form>

      {snapshot ? (
        <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                Tracking number
              </div>
              <div className="mt-2 font-headline text-3xl font-bold text-on-surface">
                {snapshot.trackingNumber}
              </div>
            </div>
            <Chip
              label={snapshot.status}
              sx={{
                backgroundColor: "rgba(255, 106, 0, 0.12)",
                color: "#b04b00",
                fontWeight: 700,
              }}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-surface-container-high px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">Route</div>
              <div className="mt-2 text-lg font-bold text-on-surface">
                {snapshot.origin} to {snapshot.destination}
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-high px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">Service</div>
              <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.service}</div>
            </div>
            <div className="rounded-2xl bg-surface-container-high px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">ETA</div>
              <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.eta}</div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  Current update
                </div>
                <div className="mt-2 text-lg font-bold text-on-surface">{snapshot.statusNote}</div>
              </div>
              <div className="text-right text-sm text-on-surface-variant">Last updated {snapshot.lastUpdated}</div>
            </div>
            <LinearProgress
              sx={{
                mt: 3,
                height: 10,
                borderRadius: "999px",
                backgroundColor: "rgba(17,28,45,0.08)",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(135deg, #6a1fc7 0%, #ff6a00 100%)",
                  borderRadius: "999px",
                },
              }}
              value={snapshot.progress}
              variant="determinate"
            />
          </div>

          <div className="mt-6 space-y-4">
            {snapshot.checkpoints.map((checkpoint) => (
              <div
                className={[
                  "flex gap-4 rounded-[1.5rem] border p-4 transition-colors",
                  checkpoint.complete
                    ? "border-primary/20 bg-primary/[0.06]"
                    : "border-outline-variant/30 bg-surface-container-low",
                ].join(" ")}
                key={checkpoint.label}
              >
                <div
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                    checkpoint.complete ? "bg-primary text-on-primary" : "bg-white text-on-surface-variant",
                  ].join(" ")}
                >
                  <Icon>{checkpoint.complete ? "check" : "schedule"}</Icon>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-bold text-on-surface">{checkpoint.label}</div>
                    <div className="text-sm text-on-surface-variant">{formatTimestamp(checkpoint.timestamp)}</div>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-on-surface-variant">{checkpoint.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-outline-variant/40 bg-white/60 p-8 text-center text-on-surface-variant">
          Enter a shipment ID to load the connected tracking board.
        </div>
      )}
    </div>
  );
}
