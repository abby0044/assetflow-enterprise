import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

export default function AssetDirectory() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Fetch assets from backend API
    fetch("http://localhost:8000/api/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error("Error fetching assets:", err));
  }, []);

  const getChipColor = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "Allocated":
        return "warning";
      case "Reserved":
        return "info";
      case "Under Maintenance":
        return "error";
      case "Lost":
        return "error";
      case "Retired":
        return "default";
      case "Disposed":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Asset Directory
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        View and manage all registered assets.
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Asset Tag</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No assets registered yet.
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.asset_tag}>
                  <TableCell>{asset.asset_tag}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={asset.status}
                      color={getChipColor(asset.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}