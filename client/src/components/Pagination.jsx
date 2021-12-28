import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state) => state.posts)

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      page={Number(page) || 1}
      count={numberOfPages}
      variant="outlined"
      color="secondary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
