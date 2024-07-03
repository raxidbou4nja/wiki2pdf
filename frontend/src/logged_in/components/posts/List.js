import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import PostTable from "./PostTable";
import CreateModal from "./CreateModal";
function PostsList(props) {
  const {
    selectPosts,
    pushMessageToSnackbar
  } = props;

  useEffect(selectPosts, [selectPosts])

  return (
    <Fragment>
      <CreateModal pushMessageToSnackbar={pushMessageToSnackbar} />
      <PostTable pushMessageToSnackbar={pushMessageToSnackbar} />
    </Fragment>
  );
}

PostsList.propTypes = {
};

export default PostsList;
