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
} from "@mui/material";
import { SelectCategoryInput } from "../../components/selectCategoryInput";
// import { ContentEditor } from "../../components/contentEditor";
import CheckIcon from "@mui/icons-material/Check";
import { AlertSettingsProps, KeywordProps, PostProps } from "../../types";
import { useGetPost, useSavePost, useUpdatePost } from "../../queries";
import { useParams } from "react-router-dom";
import { DraftInput } from "../../components/draftEditor/draftInput";
import { useForm } from "react-hook-form";
import { EditorState, ContentState } from "draft-js";

export const AddSubjectPage: React.FC<{
  setAlert: (alertSettings: AlertSettingsProps) => unknown;
}> = ({ setAlert }) => {
  const params = useParams();
  console.log("params", params);
  const { data, isLoading } = useGetPost(params?.id || "");
  // console.log("dataaa", data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [keywords, setKeywords] = useState<KeywordProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const savePost = useSavePost();
  const updatePost = useUpdatePost();

  // const [editorState, setEditorState] = useState(() => {
  //   return defaultValue
  //     ? EditorState.createWithContent(defaultValue, decorators)
  //     : EditorState.createEmpty(decorators);
  // });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { handleSubmit, control } = useForm();
  console.log("CONTROl", control);
  useEffect(() => {
    console.log("OUTSIDE", data);
    if (data) {
      console.log("INSIDE");
      setTitle(data.title);
      setDescription(data.description);
      setKeywords(data.keywords || []);
      setCategory(data.category);
      setEditing(true);
      if (data.content) {
        console.log("CLOBCS", data.content);
        //load the content here
      }
    }
  }, [data]);

  const handleSubmitForm = (params: any) => {
    console.log("params", params);
    const newPost: PostProps = {
      title,
      description,
      keywords,
      category,
      content: editorState.getCurrentContent(),
    };
    const contentState = editorState.getCurrentContent();
    console.log("CONTENT STATE", contentState);
    let message = "Item added!";
    if (editing) {
      newPost["id"] = params?.id;
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
    setKeywords((prevKeywords) => [
      ...prevKeywords,
      { id: `keyword-${prevKeywords.length + 1}`, keyword: keywordValue },
    ]);
  };

  const handleDeleteKeyword = (keyword: KeywordProps) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((k: KeywordProps) => k.id !== keyword.id)
    );
  };

  const handleKeywordEnterPress = (e: any) => {
    if (e.keyCode === 13) {
      handleAddKeyword();
    }
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
      <Box>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "1em" }}
        >
          {editing ? `Editing ${title}` : "Add a new subject"}
        </Typography>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          style={{
            width: "100%",
          }}
        >
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
                width: "30%",
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
                  {keywords.map((keyword: KeywordProps) => (
                    <Chip
                      label={keyword.keyword}
                      onDelete={() => handleDeleteKeyword(keyword)}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            <DraftInput
              name="content"
              control={control}
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "1.5em",
              gap: "1em",
            }}
          >
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
};
