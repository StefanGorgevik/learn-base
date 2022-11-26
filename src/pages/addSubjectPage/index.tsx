import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { Grid, Button, Box, CircularProgress } from "@mui/material";
import {
  AllEditorContentsProps,
  DeleteModalSettingsProps,
  PostProps,
} from "../../types";
import { useGetPost, useSavePost, useUpdatePost } from "../../queries";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { DeleteModal } from "../../components/deleteModal";
import SaveIcon from "@mui/icons-material/Save";
import { useMainContext } from "../../contexts/MainContext";
import { Keywords } from "../../components/addSubjectComponents/keywords";
import { EditorContents } from "../../components";
import { PostContext } from "../../contexts/PostContext";
import { MainPostForm } from "../../components/addSubjectComponents/mainPostForm";
import { EditorContent } from "../../components/addSubjectComponents/editorContent";

const initialModalSettings: DeleteModalSettingsProps = {
  open: false,
  item: {
    id: "",
    titleToDelete: "",
  },
};

export const AddSubjectPage: React.FC = () => {
  const { setAlert, setEditing, editing, currentCollection } = useMainContext();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetPost(id || "", currentCollection);
  const [deleteModalSettings, setDeleteModalSettings] =
    useState<DeleteModalSettingsProps>(initialModalSettings);
  const savePost = useSavePost();
  const updatePost = useUpdatePost();
  const theme = useTheme();

  const {
    state,
    setDataHandler,
    allEditorContents,
    setAllEditorContents,
    currentEditorState,
  } = useContext(PostContext);

  const { handleSubmit } = useForm();
  useEffect(() => {
    if (data) {
      setDataHandler(data);
      if (data.contents) {
        setAllEditorContents(data.contents);
      }
    }
  }, [data, setEditing, setDataHandler, setAllEditorContents]);

  const handleSubmitForm = () => {
    const newPost: PostProps = {
      title: state.title,
      description: state.description,
      keywords: state.keywords,
      category: state.category,
      contents: allEditorContents,
    };
    let message = "Item added!";
    if (editing && id) {
      newPost.id = id;
      message = "Item updated!";
      updatePost(newPost);
    } else {
      savePost(newPost);
    }
    setAlert({
      show: true,
      text: message,
      type: "success",
    });
  };

  const handleDeleteContent = () => {
    setAllEditorContents((prevEditorContents: AllEditorContentsProps[]) => {
      return prevEditorContents.filter(
        ({ id }) => id !== deleteModalSettings.item.id
      );
    });
    setDeleteModalSettings(initialModalSettings);
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 300 }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid sx={{ padding: 5 }}>
      {deleteModalSettings.open && (
        <DeleteModal
          deleteModalSettings={deleteModalSettings}
          handleClose={() => setDeleteModalSettings(initialModalSettings)}
          handleConfirm={handleDeleteContent}
        />
      )}
      <Box>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          style={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "1.5em",
              gap: "1em",
              position: "absolute",
              top: "-10px",
              right: 10,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: theme?.palette.primary.contrastText,
                color: theme?.palette.primary.dark,
                "&:hover": {
                  backgroundColor: theme?.palette.primary.light,
                },
              }}
            >
              <SaveIcon />
            </Button>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "2em",
            }}
          >
            <Box
              style={{
                width: "300px",
                maxWidth: "300px",
                display: "flex",
                gap: "1.5em",
                flexDirection: "column",
              }}
            >
              <MainPostForm />
              <Box>
                <Keywords />
                <EditorContents
                  setDeleteModalSettings={setDeleteModalSettings}
                />
              </Box>
            </Box>
            {currentEditorState?.id && <EditorContent />}
          </Box>
        </form>
      </Box>
    </Grid>
  );
};
