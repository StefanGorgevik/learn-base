import React from "react";
import "./index.css";
import { Grid, Typography, CircularProgress } from "@mui/material";

import { useGetPost } from "../../queries";
import { useParams } from "react-router-dom";
import { Prose } from "../../components/prose";
import Gist from "super-react-gist";
import { useCurrentCollection } from "../../contexts/MainContext";

export const ViewSubject: React.FC = () => {
  const {currentCollection} = useCurrentCollection();
  const params = useParams();
  const { data, isLoading } = useGetPost(params?.id || "", currentCollection);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 300 }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return data ? (
    <Grid sx={{ padding: 5 }}>
      <Typography id="transition-modal-title" variant="h3" textAlign="center">
        {data.title}
      </Typography>
      <Typography
        id="transition-modal-title"
        variant="subtitle1"
        textAlign="center"
      >
        {data.description}
      </Typography>
      {data.contents?.map((content: any) => (
        <Grid key={content.id}>
          <Grid className="prose-div">
          <Prose
            value={{ blocks: content.editorState.blocks, entityMap: {} }}
          />
          </Grid>
          {content?.gistData && (
            <Grid className="include-grid">
              <Gist
                className="gist-div"
                url={content.gistData.url}
                file={content.gistData.name}
              />
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  ) : null;
};
