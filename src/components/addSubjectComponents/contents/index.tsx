import { Box, Typography, Stack, Button, IconButton } from "@mui/material";
import { isEmpty, map } from "lodash-es";
import React, { useContext } from "react";
import {
  AllEditorContentsProps,
  DeleteModalSettingsProps,
  EditorStateProps,
} from "../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { PostContext } from "../../../contexts";

interface EditorContentsProps {
  setDeleteModalSettings: (settings: DeleteModalSettingsProps) => void;
}
const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  cursor: "pointer",
  width: "80%",
}));

export const EditorContents: React.FC<EditorContentsProps> = ({
  setDeleteModalSettings,
}) => {
  const theme = useTheme();
  const {
    addNewContent,
    allEditorContents,
    setAllEditorContents,
    currentEditorState,
    setCurrentEditorState,
    isEditingContent,
    setIsEditingContent,
  } = useContext(PostContext);

  const handleSelectEditorContent = (editorStateData: any) => {
    if (currentEditorState?.id) {
      const contentState = convertToRaw(
        currentEditorState.editorState.getCurrentContent()
      );

      const current = { ...currentEditorState, editorState: contentState };
      if (isEditingContent) {
        setAllEditorContents((prevEditorContents: AllEditorContentsProps[]) => {
          const existingContentIndex = prevEditorContents.findIndex(
            ({ id }) => id === current.id
          );
          let newContents = [...prevEditorContents];
          if (existingContentIndex !== -1) {
            newContents[existingContentIndex] = current;
          }
          return newContents;
        });
      } else {
        setAllEditorContents((prevEditorContents: AllEditorContentsProps[]) => [
          ...prevEditorContents,
          current,
        ]);
      }
    }

    const obj = { ...editorStateData.editorState, entityMap: {} };
    const contentState = convertFromRaw(obj);
    setCurrentEditorState({
      ...editorStateData,
      editorState: EditorState.createWithContent(contentState),
    });
    setIsEditingContent(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          borderBottom: `1px solid ${theme?.palette.primary.dark}`,
          paddingBottom: "0.5rem",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography>Editor Contents</Typography>
        </Box>
        <Box>
          <Button variant="contained" type="button" onClick={addNewContent}>
            <AddIcon />
          </Button>
        </Box>
      </Box>
      {!isEmpty(allEditorContents) && (
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "20vh",
            overflow: "auto",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          {map(allEditorContents, (editorContent: EditorStateProps) => (
            <Box
              key={editorContent.editorStateName}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <StackItem
                onClick={() => handleSelectEditorContent(editorContent)}
              >
                {editorContent.editorStateName}
              </StackItem>
              <IconButton
                onClick={() =>
                  setDeleteModalSettings({
                    open: true,
                    item: {
                      id: editorContent.id,
                      titleToDelete: editorContent.editorStateName,
                    },
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};
