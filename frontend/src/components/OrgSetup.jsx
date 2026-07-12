import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function OrgSetup() {
  const [tabIndex, setTabIndex] = useState(0);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Organization Setup
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Departments" />
        <Tab label="Asset Categories" />
        <Tab label="Employee Directory" />
      </Tabs>

      {/* ---------------- Departments ---------------- */}

      {tabIndex === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Department Management
          </Typography>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Add Department
            </Typography>

            <TextField
              label="Department Name"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained">
              Add Department
            </Button>
          </Paper>

          <Paper>
            <Typography sx={{ p: 2 }} variant="subtitle1">
              Department List
            </Typography>

            <List>
              {departments.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No departments available" />
                </ListItem>
              ) : (
                departments.map((dept) => (
                  <ListItem key={dept.id}>
                    <ListItemText
                      primary={dept.name}
                      secondary={dept.status}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Box>
      )}

      {/* ---------------- Asset Categories ---------------- */}

      {tabIndex === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Asset Category Management
          </Typography>

          <Paper sx={{ p: 2 }}>
            <TextField
              label="Category Name"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained">
              Add Category
            </Button>

            <List sx={{ mt: 3 }}>
              <ListItem>
                <ListItemText primary="Electronics" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Furniture" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Vehicles" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      )}

      {/* ---------------- Employee Directory ---------------- */}

      {tabIndex === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Employee Directory
          </Typography>

          <TableContainer component={Paper}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Employee</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>Asset Manager</TableCell>
                </TableRow>

              </TableBody>

            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}