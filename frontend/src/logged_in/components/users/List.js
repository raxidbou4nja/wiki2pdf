import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import PdfTable from "./PdfTable";

function UsersList(props) {
  const {
    selectUsers,
  } = props;

  useEffect(selectUsers, [selectUsers])

  return (
    <Fragment>
      <PdfTable />
    </Fragment>
  );
}

UsersList.propTypes = {
};

export default UsersList;
