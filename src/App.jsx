import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RateCalculatorPage from "./pages/RateCalculatorPage";
import TrackingPage from "./pages/TrackingPage";
import UtilitiesPage from "./pages/UtilitiesPage";
import VolumetricWeightPage from "./pages/VolumetricWeightPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<TrackingPage />} path="/tracking" />
      <Route element={<UtilitiesPage />} path="/utilities" />
      <Route element={<RateCalculatorPage />} path="/utilities/rate-calculator" />
      <Route element={<VolumetricWeightPage />} path="/utilities/volumetric-weight" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default App;
