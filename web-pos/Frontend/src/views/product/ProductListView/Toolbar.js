import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import Alert from 'react-bootstrap/Alert'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import { Search } from 'react-feather';
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
  },
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searched, setSearched] = useState('');
  const [err, setErr] = useState('');

  const goToAddProduct = () => {
    navigate('/app/addProduct', { replace: true })
  }

  const goToDeleteProduct = () => {
    navigate('/app/deleteProduct', { replace: true })
  }

  const goToSellHistory = () => {
    navigate('/app/sellHistory', { replace: true })
  }

  const search = () => {
    let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken')));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Axios',
        'x-access-token': 'token',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    Axios.get(`http://localhost:5000/product/?search=${searchItem}`, config)
    .then(res => {
      if (res.data.message) {
        setErr('Product Not Found');
      } else {
        setSearchResult(res.data.result.data[0]);
        setSearched('true');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button 
          variant="contained"
          color="secondary"
          className={classes.button} 
          onClick={goToDeleteProduct}
          startIcon={<DeleteIcon />}
        >
          Delete Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button} 
          onClick={goToAddProduct}
          startIcon=<AddIcon />
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button} 
          onClick={goToSellHistory}
          startIcon=<HistoryIcon />
        >
          History
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
                placeholder="Search product"
                variant="outlined"
              />
              <Button 
                variant="contained"
                color="defualt"
                className={classes.button} 
                onClick={search}
                startIcon={<Search />}
              >
                Search Product
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {searched ? (
        err ? (
          <Typography
            align="center"
            color="textSecondary"
            variant="body1"
          >
            <Alert variant='danger'><h2>{err}</h2></Alert>
          </Typography>
        ) : (
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              <ProductCard
                className={classes.productCard}
                product={searchResult}
              />
            </Grid>
          </Box>
        )
      ) : <div></div>}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
