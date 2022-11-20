import React, { useEffect, useState } from "react";
import "./index.css";
import {
  TextField,
  TextareaAutosize,
  IconButton,
  Chip,
  Grid,
  Button,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import { SelectCategoryInput } from "../../components/selectCategoryInput";
// import { ContentEditor } from "../../components/contentEditor";
import CheckIcon from "@mui/icons-material/Check";
import {
  AllEditorContentsProps,
  DeleteModalSettingsProps,
  EditorStateProps,
  Keyword,
  PostProps,
} from "../../types";
import { useGetPost, useSavePost, useUpdatePost } from "../../queries";
import { useParams } from "react-router-dom";
import { DraftInput } from "../../components/draftEditor/draftInput";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { isEmpty, map, uniqueId } from "lodash-es";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteModal } from "../../components/deleteModal";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useMainContext } from "../../contexts/MainContext";

const initialCurrentEditorState: EditorStateProps = {
  id: "",
  editorState: EditorState.createEmpty(),
  gistData: {
    url: "",
    name: "",
  },
  editorStateName: "",
};

const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  cursor: "pointer",
  width: "80%",
}));

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [category, setCategory] = useState<string>("javascript");
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [deleteModalSettings, setDeleteModalSettings] =
    useState<DeleteModalSettingsProps>(initialModalSettings);
  const savePost = useSavePost();
  const updatePost = useUpdatePost();
  const theme = useTheme();

  const [currentEditorState, setCurrentEditorState] =
    useState<EditorStateProps>(initialCurrentEditorState as EditorStateProps);

  const [allEditorContents, setAllEditorContents] = useState<
    AllEditorContentsProps[]
  >([]);

  const { handleSubmit, control } = useForm();
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setKeywords(data.keywords || []);
      setCategory(data.category);
      setEditing(true);
      if (data.contents) {
        setAllEditorContents(data.contents);
      }
    }
  }, [data, setEditing]);

  const handleSubmitForm = () => {
    const newPost: PostProps = {
      title,
      description,
      keywords,
      category,
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

  const handleAddKeyword = () => {
    if (keywordValue.length === 0 || keywords.length >= 10) return;
    setKeywords((prevKeywords: Keyword[]) => [...prevKeywords, keywordValue]);
  };

  const handleDeleteKeyword = (keyword: Keyword) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((k: Keyword) => k !== keyword)
    );
  };

  const handleKeywordEnterPress = (e: any) => {
    if (e.keyCode === 13) {
      setKeywordValue("");
      handleAddKeyword();
    }
  };

  const addNewContent = () => {
    const newEditorState = {
      id: uniqueId(),
      editorState: EditorState.createEmpty(),
      gistData: {
        url: "",
        name: "",
      },
      editorStateName: "",
    };

    setCurrentEditorState(newEditorState);
  };

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
              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <SelectCategoryInput
                category={category}
                onCategoryChange={setCategory}
              />
              <TextareaAutosize
                className="textArea"
                maxRows={10}
                aria-label="description"
                placeholder="Description"
                style={{ height: 200, padding: 10 }}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
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
                      setKeywordValue(e.target.value)
                    }
                    onKeyDown={handleKeywordEnterPress}
                  />
                  <Box>
                    <Typography>{keywords.length}/10</Typography>
                  </Box>
                  <IconButton onClick={handleAddKeyword}>
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
                  {keywords.map((keyword: Keyword) => (
                    <Chip
                      key={keyword}
                      label={keyword}
                      onDelete={() => handleDeleteKeyword(keyword)}
                    />
                  ))}
                </Box>

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
                      <Button
                        variant="contained"
                        type="button"
                        onClick={addNewContent}
                      >
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
                      {map(
                        allEditorContents,
                        (editorContent: EditorStateProps) => (
                          <Box
                            key={editorContent.editorStateName}
                            sx={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <StackItem
                              onClick={() =>
                                handleSelectEditorContent(editorContent)
                              }
                            >
                              {editorContent.editorStateName}
                            </StackItem>
                            <IconButton
                              onClick={() =>
                                setDeleteModalSettings({
                                  open: true,
                                  item: {
                                    id: editorContent.id,
                                    titleToDelete:
                                      editorContent.editorStateName,
                                  },
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )
                      )}
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>

            {currentEditorState?.id && (
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
            )}
            {/* <iframe
              title="Title"
              src="https://docs.google.com/gview?url=https://onedrive.live.com/edit.aspx?resid=D94321BEFEEFA7EE%213996&nd=1"
            ></iframe> */}
          </Box>
        </form>
      </Box>
    </Grid>
  );
};
