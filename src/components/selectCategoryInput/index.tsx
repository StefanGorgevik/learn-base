import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryProps } from "../../types";

const CATEGORIES: CategoryProps[] = [
  { id: "history", name: "History" },
  { id: "javascript", name: "Javascript" },
  { id: "react", name: "React" },
  { id: "it", name: "IT" },
  { id: "music", name: "Music" },
];

interface SelectCategoryInputProps {
  onCategoryChange: (category: string) => void;
  category: string;
}

export const SelectCategoryInput: React.FC<SelectCategoryInputProps> = ({
  onCategoryChange,
  category,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onCategoryChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="categoty-select-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {CATEGORIES.map((cat: CategoryProps) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
