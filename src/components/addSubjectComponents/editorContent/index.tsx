import React, { useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import { AllEditorContentsProps, EditorStateProps } from "../../../types";
import { DraftInput } from "../../../components";
import { EditorState, convertToRaw } from "draft-js";
import { PostContext } from "../../../contexts";
import { useForm } from "react-hook-form";

const initialCurrentEditorState: EditorStateProps = {
  id: "",
  editorState: EditorState.createEmpty(),
  gistData: {
    url: "",
    name: "",
  },
  editorStateName: "",
};

interface EditorContentProps {}

export const EditorContent: React.FC<EditorContentProps> = () => {
  const { control } = useForm();
  const {
    setAllEditorContents,
    currentEditorState,
    setCurrentEditorState,
    isEditingContent,
    setIsEditingContent,
  } = useContext(PostContext);

  const changeEditorState = (editorState: EditorState) => {
    setCurrentEditorState((prevEditorState: EditorStateProps) => ({
      ...prevEditorState,
      editorState,
    }));
  };

  const setGistData = (type: "url" | "name", value: string) => {
    setCurrentEditorState((prevEditorState: EditorStateProps) => ({
      ...prevEditorState,
      gistData: {
        ...prevEditorState.gistData,
        [type]: value,
      },
    }));
  };

  const handleFinishContentEditing = () => {
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
      setIsEditingContent(false);
    } else {
      setAllEditorContents((prevEditorContents: AllEditorContentsProps[]) => [
        ...prevEditorContents,
        current,
      ]);
    }

    setCurrentEditorState(initialCurrentEditorState);
  };

  const setEditorName = (editorStateName: string) => {
    setCurrentEditorState((prevEditorState: EditorStateProps) => ({
      ...prevEditorState,
      editorStateName,
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "50%",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Editor State Name"
          variant="outlined"
          value={currentEditorState.editorStateName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditorName(e.target.value as string)
          }
        />
      </Box>
      <Box
        sx={{
          minWidth: "100%",
        }}
      >
        <DraftInput
          name="content"
          control={control}
          editorState={currentEditorState.editorState}
          setEditorState={(editorState: EditorState) =>
            changeEditorState(editorState)
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Gist URL"
          variant="outlined"
          value={currentEditorState.gistData.url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGistData("url", e.target.value)
          }
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Gist name"
          variant="outlined"
          value={currentEditorState.gistData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGistData("name", e.target.value)
          }
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          onClick={handleFinishContentEditing}
        >
          Save Content
        </Button>
      </Box>
    </Box>
  );
};
