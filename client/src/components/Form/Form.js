import React, { useCallback, useEffect, useState } from "react";
import { Button, Typography, Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Style";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import { useHistory } from "react-router-dom";

const Form = ({ currentID, setCurrentID, open }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const post = useSelector((state) =>
    currentID ? state.posts?.posts?.find((p) => p._id === currentID) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = () => {
    setCurrentID(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (currentID === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentID, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In To Create Your Photo Memory.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
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
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
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
          onClick={open}
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
};

export default Form;
