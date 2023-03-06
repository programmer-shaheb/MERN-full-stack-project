import React, { useEffect, useState, useCallback } from "react";
import { Button, Typography, Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Style";
import { Base64 } from "js-base64";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import { useHistory } from "react-router-dom";
import { notify } from "../../util/notify";

const Form = ({ currentID, setCurrentID }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [imageData, setImageData] = useState("");
  const [fileError, setFileError] = useState("");
  const classes = useStyles();
  const post = useSelector((state) =>
    currentID ? state.posts?.posts?.find((p) => p._id === currentID) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = useCallback(() => {
    setCurrentID(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [clear, post]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (currentID === 0) {
      dispatch(
        createPost(
          { ...postData, selectedFile: imageData, name: user?.result?.name },
          history
        )
      );
      clear();
    } else {
      dispatch(
        updatePost(currentID, {
          ...postData,
          selectedFile: imageData,
          name: user?.result?.name,
        })
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

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    if (file && file.size > 1024 * 1024) {
      notify("File size should be less than 1MB", "error");
      e.target.value = null;
      return;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
        notify("Image Uploaded Successfully", "success");
      };
      reader.readAsDataURL(file);
    }
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
          multiline
          rows={4}
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
          <Button component="label" variant="outlined">
            Upload Photo{" "}
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </Button>
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
};

export default Form;
