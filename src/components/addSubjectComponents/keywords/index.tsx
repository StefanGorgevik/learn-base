import { Box, Chip, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Keyword } from "../../../types";
import { PostContext } from "../../../contexts";

export const Keywords: React.FC = () => {
  const { state, saveKeyword, deleteKeyword, onValueChange } =
    useContext(PostContext);

  const onAddKeyword = () => {
    if (state.keywordValue.length === 0 || state.keywords.length >= 10) return;
    saveKeyword();
  };

  const onDelete = (keyword: Keyword) => {
    deleteKeyword(keyword);
  };
  const handleKeywordEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onAddKeyword();
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Keywords"
          variant="outlined"
          sx={{ width: "70%" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onValueChange("keywordValue", e.target.value)
          }
          onKeyDown={handleKeywordEnterPress}
        />
        <Box>
          <Typography>{state.keywords.length}/10</Typography>
        </Box>
        <IconButton onClick={onAddKeyword}>
          <CheckIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          minHeight: "150px",
          width: "100%",
          maxHeight: "150px",
          overflowY: "auto",
          display: "flex",
          alignItems: "flex-start",
          marginTop: "1em",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {state.keywords.map((keyword: Keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            onDelete={() => onDelete(keyword)}
          />
        ))}
      </Box>
    </Box>
  );
};
