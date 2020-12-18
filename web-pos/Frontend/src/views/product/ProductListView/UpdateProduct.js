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

const UpdateProduct = () => {
  const classes = useStyles();
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productImage, setProductImage] = useState('');
  const [category, setCategory] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('');

  const updateProduct = () => {
    let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken')));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Axios',
        'x-access-token': 'token',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const productObj = {
      prod_name: productName,
      prod_desc: productDesc,
      prod_image: productImage,
      category_id: category,
      price: price,
      quantity: quantity
    }

    // if user is logged in
    if (sessionStorage.getItem("accessToken") != null) {
      Axios.put(`http://localhost:5000/product/${productId}`, productObj, config)
      .then(res => {
        if (res.data.message) {
          setErr(res.data.message);
        }
        setSuccess(res.data.result.result);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <Page
      className={classes.root}
      title="Edit Product"
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
              prod_name: '',
              prod_desc: '',
              prod_image: '',
              category_id: 'uncategorquantity',
              price: 0,
              quantity: 0
            }}
            onSubmit={updateProduct}
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
                  error={Boolean(touched.prod_name && errors.prod_name)}
                  fullWidth
                  helperText={touched.prod_name && errors.prod_name}
                  label="Product Name"
                  margin="normal"
                  name="prod_name"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  variant="outlined"
                />
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
                <TextField
                  error={Boolean(touched.prod_desc && errors.prod_desc)}
                  fullWidth
                  helperText={touched.prod_desc && errors.prod_desc}
                  label="Product Description"
                  margin="normal"
                  name="prod_desc"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setProductDesc(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.prod_image && errors.prod_image)}
                  fullWidth
                  helperText={touched.prod_image && errors.prod_image}
                  label="Link to an online small sized product image"
                  margin="normal"
                  name="prod_image"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setProductImage(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.category_d && errors.category_d)}
                  fullWidth
                  helperText={touched.category_d && errors.category_d}
                  label="Category Id"
                  margin="normal"
                  name="category_d"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label="Price"
                  margin="normal"
                  name="price"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.quantity && errors.quantity)}
                  fullWidth
                  helperText={touched.quantity && errors.quantity}
                  label="Quantity"
                  margin="normal"
                  name="quantity"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setQuantity(e.target.value);
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
                    Edit Product
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

export default UpdateProduct;