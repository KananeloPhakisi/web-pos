import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Alert from 'react-bootstrap/Alert';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const register = () => {
    Axios.post('http://localhost:5000/user/register', {
      username: userName,
      password: password,
      user_role: role
    }).then((response) => {
      if (response.data.message) {
        setErr(response.data.message);;
      } else {
        setSuccess(response.data.result);
      }
    });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              userName: '',
              password: '',
              role: '',
            }}
            onSubmit={register}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="User name"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.role && errors.role)}
                  fullWidth
                  helperText={touched.role && errors.role}
                  label="Role"
                  margin="normal"
                  name="role"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    enabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
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
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
