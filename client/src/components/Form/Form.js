import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Style";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";

function Form({ currentID, setCurrentID }) {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentID ? state.posts.find((p) => p._id === currentID) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();
  const handleForm = (e) => {
    e.preventDefault();

    if (currentID) {
      dispatch(updatePost(currentID, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentID(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handleForm}
        className={`${classes.root} ${classes.form}`}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6">
          {currentID ? `Updating` : `Creating`} A Memory
        </Typography>
        <TextField
          fullWidth
          name="creator"
          label="Creator"
          variant="outlined"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          fullWidth
          name="title"
          label="Title"
          variant="outlined"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          fullWidth
          name="message"
          label="Message"
          variant="outlined"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          fullWidth
          name="tags"
          label="Tags (coma separated) "
          variant="outlined"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          onClick={clear}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
