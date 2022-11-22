import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TodosAppliedFilterTypes } from "../../../types";

interface TodosStatusTabsProps {
  setAppliedFilter: (appliedFilter: TodosAppliedFilterTypes) => void;
}

export const TodosStatusTabs: React.FC<TodosStatusTabsProps> = ({
  setAppliedFilter,
}) => {
  return (
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="all"
        name="radio-buttons-group"
        row
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAppliedFilter(e.target.value as TodosAppliedFilterTypes)
        }
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel
          value="completed"
          control={<Radio />}
          label="Completed"
        />
        <FormControlLabel
          value="uncompleted"
          control={<Radio />}
          label="Not completed"
        />
      </RadioGroup>
  );
};
