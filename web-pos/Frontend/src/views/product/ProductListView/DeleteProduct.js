import React, { useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import {
  Box,
  Button,
  Container,
  Link,
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

const DeleteProduct = () => {
  const classes = useStyles();
  const [productId, setProductId] = useState(0);
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');

  const deleteProduct = () => {
    let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken')));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Axios',
        'x-access-token': 'token',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    // if user is logged in
    if (sessionStorage.getItem("accessToken") != null) {
      Axios.delete(`http://localhost:5000/product/${productId}`, config)
      .then(res => {
        if (res.data.message) {
          setErr(res.data.message.message);
          console.log(res.data.message.message);
        }
        setSuccess(res.data.result.message);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <Page
      className={classes.root}
      title="Delete Product"
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
              prod_id: 0,
            }}
            onSubmit={deleteProduct}
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
                <TextField
                  error={Boolean(touched.prod_id && errors.prod_id)}
                  fullWidth
                  helperText={touched.prod_id && errors.prod_id}
                  label="Product Id"
                  margin="normal"
                  name="prod_id"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setProductId(e.target.value);
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
                    Delete Product
                  </Button>

                </Box>
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
                <Typography
                  align="right"
                  color="textSecondary"
                  variant="body1"
                >
                  Go to products?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/app/products"
                    variant="h6"
                  >
                    Products
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

export default DeleteProduct;