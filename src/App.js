/** @format */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutes from "./Routes/Route";
import { ScrollToTop } from "./utils/utils";

import { AdminProvider } from "./pages/Admin Profile/AdminContext";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {allRoutes.map((routeConfig, index) => {
          const { route, component, isProtected } = routeConfig;

          return isProtected ? (
            <Route
              key={`routeConfig${index}`}
              path={route}
              element={<AdminProvider>{component}</AdminProvider>}
            />
          ) : (
            // Public routes
            <Route key={`routeConfig${index}`} path={route} element={component} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
