import React, { useState } from "react";
import "./index.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, TextareaAutosize } from "@mui/material";
import { SelectCategoryInput } from "../selectCategoryInput";
import { ContentEditor } from "../contentEditor";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

interface AddSubjectModalProps {
  open: boolean;
  handleClose: () => unknown;
}
export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  open,
  handleClose,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
                <SelectCategoryInput />
                <TextareaAutosize
                  className="textArea"
                  maxRows={10}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
                  style={{ width: "100%", height: 200 }}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Keywords"
                  variant="outlined"
                />
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
