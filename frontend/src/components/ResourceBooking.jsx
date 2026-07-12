import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";

export default function ResourceBooking() {
  const [assetTag, setAssetTag] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset_tag: assetTag,
          user_id: 1,
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.detail || "Booking failed.");
        setIsError(true);
        return;
      }

      setMessage("Resource booked successfully!");
      setIsError(false);

      setAssetTag("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setMessage("Unable to connect to the backend.");
      setIsError(true);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Book a Shared Resource
        </Typography>

        {message && (
          <Alert
            severity={isError ? "error" : "success"}
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        <form onSubmit={handleBooking}>
          <TextField
            label="Asset Tag"
            fullWidth
            margin="normal"
            value={assetTag}
            onChange={(e) => setAssetTag(e.target.value)}
            required
          />

          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Confirm Booking
          </Button>
        </form>
      </Paper>
    </Box>
  );
}