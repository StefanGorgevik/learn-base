import React, { useContext } from "react";
import { TextField, TextareaAutosize, Box } from "@mui/material";
import { SelectCategoryInput } from "../../selectCategoryInput";
import { PostContext } from "../../../contexts/PostContext";

export const MainPostForm: React.FC = () => {
  const { state, onValueChange } = useContext(PostContext);

  return (
    <Box
      style={{
        width: "300px",
        maxWidth: "300px",
        display: "flex",
        gap: "1.5em",
        flexDirection: "column",
      }}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={state.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange("title", e.target.value)
        }
      />
      <SelectCategoryInput
        category={state.category}
        onCategoryChange={onValueChange}
      />
      <TextareaAutosize
        className="textArea"
        maxRows={10}
        aria-label="description"
        placeholder="Description"
        style={{ height: 200, padding: 10 }}
        value={state.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onValueChange("description", e.target.value)
        }
      />
    </Box>
  );
};
