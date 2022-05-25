import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetPosts } from "../../queries";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalSettingsProps } from "../../types";

interface PostsProps {
  setModalSettings: (settings: ModalSettingsProps) => unknown;
}
export const Posts: React.FC<PostsProps> = ({ setModalSettings }) => {
  const { data, isLoading } = useGetPosts();
  console.log("data POSTS", data, isLoading);
  if (isLoading) {
    return (
      <Grid container>
        <Grid item>Loading...</Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3} padding={5}>
      {data &&
        data.map((item: any) => (
          <Grid item key={item.id}>
            <Card
              sx={{
                width: 300,
              }}
            >
              <CardHeader title={item.title} />
              <CardContent>
                <Typography variant="subtitle1">{item.description}</Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                <IconButton aria-label="add to favorites">
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() =>
                    setModalSettings({ opened: true, edit: true, id: item.id })
                  }
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};
