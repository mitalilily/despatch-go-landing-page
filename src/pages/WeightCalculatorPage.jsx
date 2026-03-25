import WeightCalculatorPanel from "../components/site/WeightCalculatorPanel";
import UtilityHero from "../components/site/UtilityHero";
import usePersistentState from "../hooks/usePersistentState";
import {
  buildWeightPreview,
  validateWeightCalculation,
} from "../utils/shippingCalculator";

const WEIGHT_STORAGE_KEY = "despatchgo-weight-form";

const defaultWeightForm = {
  weight: "",
  length: "",
  width: "",
  height: "",
  type: "Express",
};

export default function WeightCalculatorPage() {
  const [weightForm, setWeightForm] = usePersistentState(WEIGHT_STORAGE_KEY, defaultWeightForm);
  const [weightError, setWeightError] = usePersistentState("despatchgo-weight-error", "");
  const [weightResult, setWeightResult] = usePersistentState("despatchgo-weight-result", null);

  const weightPreview = weightResult ?? buildWeightPreview(weightForm);

  const updateWeightField = (field) => (event) => {
    setWeightError("");
    setWeightResult(null);
    setWeightForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateWeightCalculation(weightForm);
    if (validationMessage) {
      setWeightResult(null);
      setWeightError(validationMessage);
      return;
    }

    setWeightError("");
    setWeightResult(buildWeightPreview(weightForm));
  };

  return (
    <UtilityHero
      description="Calculate volumetric weight from parcel dimensions and confirm whether actual or volumetric weight will be billed on the shipment."
      eyebrow="WEIGHT CALCULATOR"
      highlights={["5000 / 6000 divisor", "Billable-weight logic", "Persistent values"]}
      primaryAction={{ label: "Check Weight", to: "/weight-calculator" }}
      secondaryAction={{ label: "Open Tracking", to: "/tracking" }}
      title="Know the billable weight before you ship."
    >
      <WeightCalculatorPanel
        error={weightError}
        form={weightForm}
        onFieldChange={updateWeightField}
        onSubmit={handleSubmit}
        preview={weightPreview}
      />
    </UtilityHero>
  );
}
