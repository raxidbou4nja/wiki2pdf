import React, { Fragment, useState, useRef } from "react";
import PropTypes, { func } from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Button, Hidden, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WaveBorder from "../../../shared/components/WaveBorder";
import { useSelector } from "react-redux";
import MuiAlert from '../../../shared/components/MuiAlert';
import { ResultPanel } from "./ResultPanel";
import { ConverterForm } from "./ConverterForm";
import { PanelEditor } from "./PanelEditor";


const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
});




function HeadSection(props) {
  const { classes, theme } = props;
  // const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const showResultPage = useSelector((state) => state.pdf.showResultPage);
  const showEditorPanel = useSelector((state) => state.pdf.showEditorPanel);
  const error = useSelector((state) => state.pdf.error);

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
          <Card
              className={`${classes.card} p-4 shadow-lg`}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className="row justify-content-between align-items-center">
                <div className="col-md-6 p-5">
                    <h1 className="fw-bold heading position-relative">Convert Wikipedia Pages <br /> Into PDF.</h1>
                    <p className="mt-3 pt-md-3 text-muted fs-4">Easy 3 Steps to Convert Wikipedia Articles To Stylish PDF Files.</p>
                    <div className="mb-4">
                      <ConverterForm />
                    </div>
                    <div className="feature-icon">
                        <p className="align-items-center mb-0 pe-3 fw-bold">Support:</p>
                        <div className="row p-3">
                          <Card variant="outlined" className="col-md-2 p-2">
                            <img src="https://www.svgrepo.com/show/50882/wikipedia-logotype-of-earth-puzzle.svg" alt="" width="100%" />
                            <Typography gutterBottom variant="h7" className="w-100 text-center" component="div">
                              Wikipedia
                            </Typography>
                          </Card>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-5">
                    <img src="https://themesdesign.in/heroxa/layouts/images/user-3/home.png" className="img-fluid" alt="img" />
                </div>
              </div>

              <div>
                { showResultPage && <ResultPanel />}
                { showEditorPanel && <PanelEditor />}
                { error && <MuiAlert severity="error" message={error} /> }
              </div>
            
            </Card>

          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);
