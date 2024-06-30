import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import PdfTable from "./PdfTable";

function List(props) {
  const {
    selectPdf,
  } = props;

  useEffect(selectPdf, [selectPdf])

  return (
    <Fragment>
      <PdfTable />
    </Fragment>
  );
}

List.propTypes = {
};

export default List;
