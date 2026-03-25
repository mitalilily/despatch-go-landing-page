import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/site/SiteLayout";
import HomePage from "./pages/HomePage";
import RateCalculatorPage from "./pages/RateCalculatorPage";
import TrackingPage from "./pages/TrackingPage";
import WeightCalculatorPage from "./pages/WeightCalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<TrackingPage />} path="tracking" />
          <Route element={<RateCalculatorPage />} path="rate-calculator" />
          <Route element={<WeightCalculatorPage />} path="weight-calculator" />
          <Route element={<HomePage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
