import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Paper,
  Toolbar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Switch,
  Box,
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const styles = theme => ({
  paper: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  toolbar: { justifyContent: "space-between" },
  "@keyframes spin": {
    from: { transform: "rotate(359deg)" },
    to: { transform: "rotate(0deg)" }
  },
  spin: { animation: "$spin 2s infinite linear" },
  listItemSecondaryAction: { paddingRight: theme.spacing(1) }
});

function AccountInformationArea(props) {
  const { classes, toggleAccountActivation, isAccountActivated } = props;
  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <ListItemText
              primary="Status"
              secondary={!isAccountActivated ? "Activated" : "Not activated"}
              className="mr-2"
            />
          </Box>
          <ListItemIcon>
            <CheckCircleIcon
              className={classNames(
                isAccountActivated ? classes.spin : null,
              )}
            />
          </ListItemIcon>
        </Box>
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
        </ListItemSecondaryAction>
      </Toolbar>
    </Paper>
  );
}

AccountInformationArea.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(AccountInformationArea);
