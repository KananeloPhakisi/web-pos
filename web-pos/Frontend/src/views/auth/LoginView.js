import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  // user logged out
  if (sessionStorage.getItem("accessToken") != null) {
    sessionStorage.removeItem("accessToken");
  }

  const login = () => {
    Axios.post('http://localhost:5000/user/login', {
      username: userName,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setErr(response.data.message);
      } else {
        sessionStorage.setItem("accessToken", response.data.result.token);
        console.log(response.data);
        sessionStorage.setItem("name", response.data.result.username);
        sessionStorage.setItem("role", response.data.result.role);
        sessionStorage.setItem("userId", response.data.result.user_id);
        navigate('/app/products', { replace: true });
      }
    });
  };

  return (
    <Page
      className={classes.root}
      title="Login"
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
              userName: 'Noob12',
              password: 'Pass@1234',
              err: ''
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().max(255).required('User name is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={login}
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
                    Sign in
                  </Typography>
                </Box>
                
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
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
                <Box my={2}>
                  <Button
                    color="primary"
                    enabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  <Alert variant='danger'><h2>{err}</h2></Alert>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
