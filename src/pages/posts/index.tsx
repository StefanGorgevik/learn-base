import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDeletePost, useGetPosts } from "../../queries";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../components/deleteModal";
import { AlertSettingsProps, DeleteModalSettingsProps } from "../../types";
import PreviewIcon from "@mui/icons-material/Preview";
const initialModalSettings: DeleteModalSettingsProps = {
  open: false,
  item: {
    id: "",
    titleToDelete: "",
  },
};

export const Posts: React.FC<{
  setAlert: (alertSettings: AlertSettingsProps) => unknown;
}> = ({ setAlert }) => {
  const { data, isLoading } = useGetPosts();
  const { mutate } = useDeletePost();
  const [deleteModalSettings, setDeleteModalSettings] =
    useState<DeleteModalSettingsProps>(initialModalSettings);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    if (deleteModalSettings.open && deleteModalSettings.item.id) {
      mutate(deleteModalSettings.item.id);
      setDeleteModalSettings(initialModalSettings);
      setAlert({
        show: true,
        text: "Item deleted!",
        type: "success",
      });
    }
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if ((data && data.length === 0 && !isLoading) || !data) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
        <Grid item>
          <Typography variant="h5">No items found!</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      {deleteModalSettings.open && (
        <DeleteModal
          deleteModalSettings={deleteModalSettings}
          handleClose={() => setDeleteModalSettings(initialModalSettings)}
          handleConfirm={handleDeletePost}
        />
      )}
      <Grid container spacing={3} padding={5}>
        {data?.map((item: any) => (
          <Grid item key={item.name}>
            <Card
              sx={{
                width: 300,
              }}
            >
              <CardHeader title={item.title} />
              <CardContent>
                <Typography variant="subtitle1">{item.description}</Typography>
                <Typography variant="subtitle2">{item.category}</Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  aria-label="delete post"
                  onClick={() =>
                    setDeleteModalSettings({
                      open: true,
                      item: {
                        id: item.name.substr(item.name.lastIndexOf("/")+ 1),
                        titleToDelete: item.title,
                      },
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() =>
                    navigate(
                      `/edit${item.name.substr(item.name.lastIndexOf("/"))}`
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() =>
                    navigate(
                      `/view${item.name.substr(item.name.lastIndexOf("/"))}`
                    )
                  }
                >
                  <PreviewIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
