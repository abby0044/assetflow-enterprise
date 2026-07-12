import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setKpis(data))
      .catch((err) => console.error("Error fetching KPIs:", err));
  }, []);

  if (!kpis) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const kpiCards = [
    {
      title: "Assets Available",
      value: kpis.assets_available,
      color: "#4caf50",
    },
    {
      title: "Assets Allocated",
      value: kpis.assets_allocated,
      color: "#2196f3",
    },
    {
      title: "Under Maintenance",
      value: kpis.maintenance_today,
      color: "#ff9800",
    },
    {
      title: "Active Bookings",
      value: kpis.active_bookings,
      color: "#9c27b0",
    },
    {
      title: "Overdue Returns",
      value: kpis.overdue_returns,
      color: "#f44336",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Operational Dashboard
      </Typography>

      <Grid container spacing={3}>
        {kpiCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderTop: `5px solid ${card.color}`,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {card.title}
                </Typography>

                <Typography variant="h3">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}