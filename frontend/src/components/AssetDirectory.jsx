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
  Button,
} from "@mui/material";

import AllocationModal from "./AllocationModal";

export default function AssetDirectory() {
  const [assets, setAssets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");

  const fetchAssets = () => {
    fetch("http://localhost:8000/api/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAssets();
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
      case "Disposed":
        return "default";
      default:
        return "default";
    }
  };

  const handleAllocateClick = (assetTag) => {
    setSelectedAsset(assetTag);
    setOpenModal(true);
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

              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
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

                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={asset.status !== "Available"}
                      onClick={() =>
                        handleAllocateClick(asset.asset_tag)
                      }
                    >
                      Allocate
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <AllocationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        assetTag={selectedAsset}
        onSuccess={fetchAssets}
      />
    </Box>
  );
}