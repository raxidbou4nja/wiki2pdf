import React, { Fragment, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Box, TextField, Button } from "@mui/material";
import { updateProfileAction } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function MyProfile(props) {
  const { selectProfile, pushMessageToSnackbar } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    selectProfile();
  }, [selectProfile]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && password && oldPassword) {
      dispatch(updateProfileAction({ name, new_password: password, old_password: oldPassword }));
    }
  };


  useEffect(() => {
    setTimeout(() => {
      if (success) {
        pushMessageToSnackbar({
          isErrorMessage: false,
          text: "Profile updated successfully",
        });
      }
    }, 1200);
  }, [success]);

  return (
    <Fragment>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}  className="col-md-8 mx-auto">
        <Typography variant="h6">Update Profile</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={ error?.name }
          helperText={
            error?.name && error?.name[0]
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="oldPassword"
          label="old Password"
          type="password"
          id="oldPassword"
          autoComplete="Old-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          error={ error?.old_password }
          helperText={
            error?.old_password && error?.old_password[0]
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={ error?.new_password }
          helperText={
            error?.new_password && error?.new_password[0]
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
    </Fragment>
  );
}

MyProfile.propTypes = {
  selectProfile: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func.isRequired,
};

export default MyProfile;
