import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./Style";
import { Grid, CircularProgress } from "@material-ui/core";

function Posts({ setCurrentID }) {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentID={setCurrentID} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
