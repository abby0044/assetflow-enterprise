import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import Dashboard from "./components/Dashboard";
import OrgSetup from "./components/OrgSetup";
import AssetDirectory from "./components/AssetDirectory";
import ResourceBooking from "./components/ResourceBooking";
import AssetAudit from "./components/AssetAudit";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        centered
      >
        <Tab label="Dashboard" />
        <Tab label="Organization" />
        <Tab label="Assets" />
        <Tab label="Bookings" />
        <Tab label="Audit" />
      </Tabs>

      {tab === 0 && <Dashboard />}
      {tab === 1 && <OrgSetup />}
      {tab === 2 && <AssetDirectory />}
      {tab === 3 && <ResourceBooking />}
      {tab === 4 && <AssetAudit />}
    </Box>
  );
}