import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryProps } from "../../types";

const CATEGORIES: CategoryProps[] = [
  { id: "javascript", name: "Javascript" },
  { id: "react", name: "React" },
  { id: "typescript", name: "Typescript" },
  { id: "htmlcss", name: "HTML/CSS" },
];

interface SelectCategoryInputProps {
  onCategoryChange: (type: string, value: string) => void;
  category: string;
}

export const SelectCategoryInput: React.FC<SelectCategoryInputProps> = ({
  onCategoryChange,
  category,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onCategoryChange("category", event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
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
