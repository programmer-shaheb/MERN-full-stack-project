import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const [currentID, setCurrentID] = useState(0);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}$tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          alignItems="stretch"
          justify="space-between"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                label="Search Photo"
                fullWidth
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                variant="outlined"
                label="Search Tags"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>

            <Form
              currentID={currentID}
              setCurrentID={setCurrentID}
              open={handleSnackbarOpen}
            />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Post Created Successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Grow>
  );
};

export default Home;
