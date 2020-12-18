import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import {
  Box,
  Button,
  Card,
  Link,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const userId = sessionStorage.getItem("userId");
  let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken')));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Axios',
      'x-access-token': 'token',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const userObj = {
    username: userName,
    password: password,
    user_role: role
  }

  const update = () => {
    Axios.put(`http://localhost:5000/user/${userId}`, userObj, config)
    .then((response) => {
      if (response.data.message) {
        setErr(response.data.message);
        console.log(response.data);
      } else {
        setSuccess(response.data.result);
        console.log(response.data);
      }
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="You are adviced to relogin to load the changes"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the user name"
                label="User name"
                name="userName"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the user password"
                label="User Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the user role"
                label="User role"
                name="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          {err ? (
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              <Alert variant='danger'><h2>{err}</h2></Alert>
            </Typography>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              <Alert variant='danger'><h2>{success}</h2></Alert>
            </Typography>
          )}
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={update}
          >
            Save details
          </Button>
        </Box>
        <Typography
          color="textSecondary"
          variant="body1"
          align="right"
        >
          Go back to products?
          {' '}
          <Link
            component={RouterLink}
            to="/app/products"
            variant="h6"
          >
            Products
          </Link>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          align="right"
        >
          Have an account?
          {' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="h6"
          >
            Sign in
          </Link>
        </Typography>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
