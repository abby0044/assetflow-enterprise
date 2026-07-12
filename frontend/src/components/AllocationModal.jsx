import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";

export default function AllocationModal({
  open,
  onClose,
  assetTag,
  onSuccess,
}) {
  const [userId, setUserId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState("");

  const handleAllocate = async () => {
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/allocations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asset_tag: assetTag,
            user_id: parseInt(userId),
            expected_return_date: returnDate,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to allocate asset.");
        return;
      }

      onSuccess();
      onClose();

      setUserId("");
      setReturnDate("");
      setError("");
    } catch (err) {
      setError("Unable to connect to the server.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Allocate Asset: {assetTag}</DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="User ID"
          type="number"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <TextField
          label="Expected Return Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleAllocate}
        >
          Confirm Allocation
        </Button>
      </DialogActions>
    </Dialog>
  );
}