import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Box,
  Chip,
  OutlinedInput,
} from "@mui/material";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker"; // Requires @mui/x-date-pickers package
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dataType, formDataType } from "../pages/Dashboard";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { api } from "../utils/axios";

const FilterForm = ({
  formData,
  setFormData,
  allPositions,
  allDepartments,
  setLoading,
  setData,
  setError,
}: {
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  allPositions: { [key: string]: string };
  allDepartments: string[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const positionsOptions = Object.entries(allPositions).map(([id, title]) => ({
    id,
    title,
  }));
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setLoading(true)
    api
      .get(`/dashboard/`, {
        params: {
          positions: formData.positions, // Pass multiple position IDs
          departments: formData.departments, // Pass multiple departments
          start_date: formData.dateRange[0]?.toISOString(),
          end_date: formData.dateRange[1]?.toISOString(),
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data); // Set data from response
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log error
        setError(`${err?.response?.detail || err?.code} `); // Set error state
        setLoading(false); // Turn off loading
      });
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Positions Multiselect */}

      <Grid size={{ xs: 12, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Positions</InputLabel>
          <Select
            multiple
            input={<OutlinedInput label="Positions" />}
            value={formData.positions}
            onChange={(e) => handleChange("positions", e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((id) => (
                  <Chip
                    key={id}
                    label={positionsOptions.find((pos) => pos.id === id)?.title}
                  />
                ))}
              </Box>
            )}
          >
            {positionsOptions.map((position) => (
              <MenuItem key={position.id} value={position.id}>
                <Checkbox checked={formData.positions.includes(position.id)} />
                <ListItemText primary={position.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Departments Multiselect */}
      <Grid size={{ xs: 12, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Departments</InputLabel>
          <Select
            multiple
            input={<OutlinedInput label="Departments" />}
            value={formData.departments}
            onChange={(e) => handleChange("departments", e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allDepartments.map((department) => (
              <MenuItem key={department} value={department}>
                <Checkbox checked={formData.departments.includes(department)} />
                <ListItemText primary={department} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            onChange={(newValue) => handleChange("dateRange", newValue)}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Grid>
      {/* Submit Button */}
      <Grid size={{ xs: 12, md: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{height:"100%", borderRadius:"10px"}}
        >
          Modify Search
        </Button>
      </Grid>
    </Grid>
    // </LocalizationProvider>
  );
};

export default FilterForm;
