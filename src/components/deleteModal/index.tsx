import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DeleteModalSettingsProps } from "../../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  deleteModalSettings: DeleteModalSettingsProps;
  handleClose: () => unknown;
  handleConfirm: () => unknown;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteModalSettings,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      open={deleteModalSettings.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deleteModalSettings.open}>
        <Box sx={style}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Deleting post
          </Typography>
          <Typography>
            Are you sure you want to delete{" "}
            {deleteModalSettings.item.titleToDelete}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: 2,
            }}
          >
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleConfirm}>Yes</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
