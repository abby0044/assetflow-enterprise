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
  Button,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

export default function AssetAudit() {
  const [assets, setAssets] = useState([]);
  const [auditData, setAuditData] = useState({});
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/assets")
      .then((res) => res.json())
      .then((data) => {
        setAssets(data);

        const initialAudit = {};
        data.forEach((asset) => {
          initialAudit[asset.asset_tag] = "Verified";
        });

        setAuditData(initialAudit);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = (tag, status) => {
    setAuditData((prev) => ({
      ...prev,
      [tag]: status,
    }));
  };

  const handleSubmitAudit = async () => {
    const records = Object.keys(auditData).map((tag) => ({
      asset_tag: tag,
      status: auditData[tag],
    }));

    try {
      const response = await fetch("http://localhost:8000/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Q3 General Audit",
          records,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReport(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Asset Audit
      </Typography>

      {report && (
        <Alert
          severity={
            report.discrepancies_found > 0 ? "warning" : "success"
          }
          sx={{ mb: 3 }}
        >
          Audit completed. Discrepancies Found:{" "}
          {report.discrepancies_found}
        </Alert>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Tag</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Audit Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.asset_tag}>
                <TableCell>{asset.asset_tag}</TableCell>
                <TableCell>{asset.name}</TableCell>

                <TableCell>
                  <Select
                    size="small"
                    value={auditData[asset.asset_tag] || "Verified"}
                    onChange={(e) =>
                      handleStatusChange(
                        asset.asset_tag,
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="Verified">Verified</MenuItem>
                    <MenuItem value="Missing">Missing</MenuItem>
                    <MenuItem value="Damaged">Damaged</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitAudit}
          >
            Submit & Close Audit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}