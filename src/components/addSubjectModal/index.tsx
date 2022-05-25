import React, { useEffect, useState } from "react";
import "./index.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, TextareaAutosize, IconButton, Chip } from "@mui/material";
import { SelectCategoryInput } from "../selectCategoryInput";
import { ContentEditor } from "../contentEditor";
import CheckIcon from "@mui/icons-material/Check";
import { KeywordProps, ModalSettingsProps } from "../../types";
import { useGetPost, useSavePost } from "../../queries";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

interface AddSubjectModalProps {
  modalSettings: ModalSettingsProps;
  open: boolean;
  handleClose: () => unknown;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  modalSettings,
  open,
  handleClose,
}) => {
  const { data } = useGetPost(modalSettings.id);
  // console.log("dataaa", data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [keywords, setKeywords] = useState<KeywordProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const savePost = useSavePost();

  useEffect(() => {
    console.log("OUTSIDE");
    if (data) {
      console.log("INSIDE");

      setTitle(data.title);
      setDescription(data.description);
      setKeywords(data.keywords);
      setCategory(data.category);
    }
  }, [data]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      keywords,
      category,
    };
    savePost(newPost);
    handleClose();
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

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1em" }}
          >
            Add a new subject
          </Typography>
          <form
            onSubmit={(e) => e.preventDefault()}
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
              <ContentEditor />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "1.5em",
                gap: "1em",
              }}
            >
              <Button onClick={handleClose}>Close</Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
