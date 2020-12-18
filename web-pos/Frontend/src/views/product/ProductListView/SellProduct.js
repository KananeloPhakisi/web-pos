import React, { useState } from 'react';
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

const SellProduct = () => {
  const classes = useStyles();
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('');
  const [change, setChange] = useState(0);
  const [priceShort, setPriceShort] = useState(0);
  const [noQuantity, setNoQuantity] = useState('');

  const sellProduct = async () => {
    let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken')));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Axios',
        'x-access-token': 'token',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    let response = await Axios.get(`http://localhost:5000/product/${productId}`, config);

    const productObj = {
      admin_id: 5,
      total_price: (quantity * response.data.result[0].price),
      detail_order: [
        {
          prod_id: productId,
          quantity: quantity,
          sub_total: (quantity * response.data.result[0].quantity)
        }
      ]
    }

    if (response.data.result[0].quantity < 1) {
      setNoQuantity('The product has been depleted');
    } else {
      if (price < (quantity * response.data.result[0].price)) {
        setPriceShort((quantity * response.data.result[0].price) - price);
      } else {
        setChange(price - (quantity * response.data.result[0].price));
        Axios.post(`http://localhost:5000/order/`, productObj, config)
        .then(res => {
          if (res.data.message) {
            setErr(res.data.message);
          }
          console.log(res.data.result);
          setSuccess(res.data.result);
        }).catch((err) => {
          console.log(err);
        });

        const updateProductObj = {
          prod_name: response.data.result[0].product_name,
          prod_desc: response.data.result[0].description,
          prod_image: response.data.result[0].image,
          category_id: response.data.result[0].category,
          price: response.data.result[0].price,
          quantity: response.data.result[0].quantity - quantity
        }

        Axios.put(`http://localhost:5000/product/${productId}`, updateProductObj, config)
        .then(res => {
          if (res.data.message) {
            console.log(res.data.message);
          }
          console.log(res.data.result.result);
        }).catch((err) => {
          console.log(err);
        });
      }
    }


  }

  return (
    <Page
      className={classes.root}
      title="Sell Product"
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
              price: 0,
              quantity: 0
            }}
            onSubmit={sellProduct}
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
                <Box my={2}>
                  <Button
                    color="primary"
                    enabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sell Product
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
                  {noQuantity ? (
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      <Alert variant='danger'><h2>{noQuantity}</h2></Alert>
                    </Typography>
                  ) : (
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      <Alert variant='danger'><h2>{noQuantity}</h2></Alert>
                    </Typography>
                  )}
                  {priceShort ? (
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      <Alert variant='danger'><h2>The money entered is short M{priceShort}</h2></Alert>
                    </Typography>
                  ) : (
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      <Alert variant='danger'><h2>The Change is M{change}</h2></Alert>
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

export default SellProduct;