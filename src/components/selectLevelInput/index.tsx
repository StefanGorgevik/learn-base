import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryProps } from "../../types";

const CATEGORIES: CategoryProps[] = [
  { id: "all level", name: "All levels" },
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "senior", name: "Senior" },
];

interface SelectCategoryInputProps {
  onLevelChange: (level: string) => void;
  level: string;
}

export const SelectLevelInput: React.FC<SelectCategoryInputProps> = ({
  onLevelChange,
  level,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onLevelChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="categoty-select-label">Category</InputLabel>
        <Select
          labelId="level-label"
          id="level"
          value={level}
          label="Category"
          onChange={handleChange}
          required
        >
          {CATEGORIES.map((cat: CategoryProps) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
