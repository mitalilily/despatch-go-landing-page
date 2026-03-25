import RateCalculatorPanel from "../components/site/RateCalculatorPanel";
import UtilityHero from "../components/site/UtilityHero";
import usePersistentState from "../hooks/usePersistentState";
import {
  buildShippingPreview,
  calculateShippingEstimate,
  validateShippingEstimate,
} from "../utils/shippingCalculator";

const ESTIMATE_STORAGE_KEY = "despatchgo-estimate-form";

const defaultEstimateForm = {
  pickup: "",
  delivery: "",
  weight: "",
  length: "",
  width: "",
  height: "",
  type: "Express",
};

export default function RateCalculatorPage() {
  const [estimateForm, setEstimateForm] = usePersistentState(ESTIMATE_STORAGE_KEY, defaultEstimateForm);
  const [estimateError, setEstimateError] = usePersistentState("despatchgo-estimate-error", "");
  const [estimateResult, setEstimateResult] = usePersistentState("despatchgo-estimate-result", null);

  const estimatePreview = estimateResult ?? buildShippingPreview(estimateForm);

  const updateEstimateField = (field) => (event) => {
    setEstimateError("");
    setEstimateResult(null);
    setEstimateForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateShippingEstimate(estimateForm);
    if (validationMessage) {
      setEstimateResult(null);
      setEstimateError(validationMessage);
      return;
    }

    setEstimateError("");
    setEstimateResult(calculateShippingEstimate(estimateForm));
  };

  return (
    <UtilityHero
      description="Check pickup and delivery lanes, compare actual and volumetric weight, and keep a reusable rate estimate ready for the next shipment."
      eyebrow="RATE CALCULATOR"
      highlights={["Volumetric billing", "Lane detection", "Saved locally"]}
      primaryAction={{ label: "Calculate Rates", to: "/rate-calculator" }}
      secondaryAction={{ label: "Check Weight", to: "/weight-calculator" }}
      title="Pricing clarity before every dispatch."
    >
      <RateCalculatorPanel
        estimateError={estimateError}
        estimateForm={estimateForm}
        estimatePreview={estimatePreview}
        onFieldChange={updateEstimateField}
        onSubmit={handleSubmit}
      />
    </UtilityHero>
  );
}
