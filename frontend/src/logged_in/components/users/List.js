import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import UserTable from "./UserTable";

function UsersList(props) {
  const {
    selectUsers,
  } = props;

  useEffect(selectUsers, [selectUsers])

  return (
    <Fragment>
      <UserTable />
    </Fragment>
  );
}

UsersList.propTypes = {
};

export default UsersList;
