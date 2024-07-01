import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import format from "date-fns/format";
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { statisticsAction } from "../../redux/slices/dashboardSlice";

const styles = (theme) => ({
  cardContentInner: {
    marginTop: theme.spacing(-4),
  },
});

function labelFormatter(label) {
  return format(new Date(label * 1000), "MMMM d, p yyyy");
}

function calculateMin(data, yKey, factor) {
  let max = Number.POSITIVE_INFINITY;
  data.forEach((element) => {
    if (max > element[yKey]) {
      max = element[yKey];
    }
  });
  return Math.round(max - max * factor);
}

const itemHeight = 216;
const options = ["Day", "Week", "Month"];



function CardChart(props) {
  const dispatch = useDispatch();

  const { color, type, data, title, classes, theme, height } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Day");





  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const formatter = useCallback(
    (value) => {
      return [value, title];
    },
    [title]
  );

  const getSubtitle = useCallback(() => {
    switch (selectedOption) {
      case "Day":
        return "By Day";
      case "Week":
        return "By Week";
      case "Month":
        return "By Month";
      default:
        throw new Error("No branch selected in switch-statement");
    }
  }, [selectedOption]);


  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const selectOption = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption);
      dispatch(statisticsAction({ type: type, group_by: selectedOption.toLowerCase() }));
      handleClose();
    },
    [setSelectedOption, handleClose]
  );

  const isOpen = Boolean(anchorEl);


  return (
    <Card>
      <Box pt={2} px={2} pb={4}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {getSubtitle()}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="More"
              aria-owns={isOpen ? "long-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              size="large">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: itemHeight,
                  width: 200,
                },
              }}
              disableScrollLock
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === selectedOption}
                  onClick={() => {
                    selectOption(option);
                  }}
                  name={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Box>
      </Box>
      <CardContent>
        <Box className={classes.cardContentInner} height={height}>
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

CardChart.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardChart);
