import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTE_PATHS } from "../libs/constant/paths";
import LandingPage from "./LandingPage";
import AnalyzingPage from "./AnalyzingPage";
import DataPage from "./DataPage";

export const Router = () => {
  // const LandingPage = lazy(() => import("./LandingPage"));
  // const DataPage = lazy(() => import("./DataPage"));
  // const AnalyzingPage = lazy(() => import("./AnalyzingPage"));
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path={ROUTE_PATHS.LANDING} element={<LandingPage />} />
        <Route path={ROUTE_PATHS.ANALYZING} element={<AnalyzingPage />} />
        <Route path={ROUTE_PATHS.DATA} element={<DataPage />} />
      </Routes>
    </Suspense>
  );
};
