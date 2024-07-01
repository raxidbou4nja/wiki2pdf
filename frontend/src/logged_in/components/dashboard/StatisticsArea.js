import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import withTheme from '@mui/styles/withTheme';
import { useDispatch, useSelector } from "react-redux";
import { statisticsAction } from "../../../redux/slices/dashboardSlice";

function StatisticsArea(props) {
  const { theme, CardChart } = props;

  const dispatch = useDispatch();


  const params = {
    type: 'all',
    group_by: 'day',
  }

  useEffect(() => {
     dispatch(statisticsAction(params));
  }, [dispatch]);

  const { users, pdfs } = useSelector((state) => state.dashboard);




  return (
    CardChart &&
    pdfs.length >= 1 &&
    users.length >= 1 && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardChart
            data={users}
            type="users"
            color={theme.palette.secondary.light}
            height="70px"
            title="Profit"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart
            data={pdfs}
            type="pdfs"
            color={theme.palette.primary.light}
            height="70px"
            title="Views"
          />
        </Grid>
      </Grid>
    )
  );
}

StatisticsArea.propTypes = {
  theme: PropTypes.object.isRequired,
  // data: PropTypes.object.isRequired,
  CardChart: PropTypes.elementType
};

export default withTheme(StatisticsArea);
