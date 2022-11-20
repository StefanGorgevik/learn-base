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
import { DeleteModalSettingsProps, PostProps } from "../../types";
import PreviewIcon from "@mui/icons-material/Preview";
import { useMainContext } from "../../contexts/MainContext";
const initialModalSettings: DeleteModalSettingsProps = {
  open: false,
  item: {
    id: "",
    titleToDelete: "",
  },
};

export const Posts: React.FC = () => {
  const { setAlert, currentCollection } = useMainContext();
  const { data, isLoading } = useGetPosts(currentCollection);
  console.log("data", data, isLoading);
  const { mutate } = useDeletePost(currentCollection);
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

  console.log("data POSTS", data);
  if ((data?.length === 0 && !isLoading) || !data) {
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
        {data?.map((item: PostProps) => (
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
                        id: item?.id,
                        titleToDelete: item.title,
                      },
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => {
                    if (item.id) {
                      console.log("DATA POSTS", item?.id);
                    }
                    navigate(`/edit/${item.id?.trim()}`);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => navigate(`/view/${item.id}`)}
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
