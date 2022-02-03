import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./Style";
import { Grid, LinearProgress } from "@material-ui/core";

const Posts = ({ setCurrentID }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentID={setCurrentID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
