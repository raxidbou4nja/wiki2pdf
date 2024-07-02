import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import PostTable from "./PostTable";

function PostsList(props) {
  const {
    selectPosts,
  } = props;

  useEffect(selectPosts, [selectPosts])

  return (
    <Fragment>
      <PostTable />
    </Fragment>
  );
}

PostsList.propTypes = {
};

export default PostsList;
