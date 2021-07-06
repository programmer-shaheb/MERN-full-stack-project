import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import { useSnackbar } from "notistack";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentID, setCurrentID] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]);

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("Successfully Submitted!", { variant });
  };

  return (
    <Grow in>
      <Container>
        <Grid
          container
          alignItems="stretch"
          justify="space-between"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form
              currentID={currentID}
              setCurrentID={setCurrentID}
              handleClickVariant={handleClickVariant}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
