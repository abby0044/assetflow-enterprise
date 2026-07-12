import React from "react";
import Dashboard from "./components/Dashboard";
import OrgSetup from "./components/OrgSetup";
import AssetDirectory from "./components/AssetDirectory";
import ResourceBooking from "./components/ResourceBooking";

function App() {
  return (
    <>
      <Dashboard />
      <OrgSetup />
      <AssetDirectory />
      <ResourceBooking />
    </>
  );
}

export default App;