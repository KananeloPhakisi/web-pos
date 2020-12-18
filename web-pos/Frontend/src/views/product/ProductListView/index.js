import React, { Component } from 'react';
import Axios from 'axios';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoaded: false
    };
  }

  componentDidMount() {
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
      Axios.get('http://localhost:5000/product/', config)
      .then(res => {
        let allProducts = [];
        Array.from(res.data.result.data).forEach((prod) => {
          allProducts.push(prod);
        })
        this.setState({
          isLoaded: true,
          products: allProducts
        });
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  render() {

    let {isLoaded, products } = this.state;

    const classes = useStyles;

    if (isLoaded) {
      return (
        <Page
          className={classes.root}
          title="Products"
        >
          <Container maxWidth={false}>
            <Toolbar />
            <Box mt={3}>
              <Grid
                container
                spacing={3}
              >
                {products.map((product) => (
                  <Grid
                    item
                    key={product.id}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <ProductCard
                      className={classes.productCard}
                      product={product}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              mt={3}
              display="flex"
              justifyContent="center"
            >
              <Pagination
                color="primary"
                count={3}
                size="small"
              />
            </Box>
          </Container>
        </Page>
      );
    } else {
      return (
        <Page
          className={classes.root}
          title="Products"
        >  
          <div>
            <Toolbar />
            <h1>
              Product List is Empty... <br /> User might not be logged in
            </h1>
          </div>
        </Page>
      )
    }
  }

};

export default ProductList;
