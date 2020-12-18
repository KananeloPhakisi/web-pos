import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  sellButton: {
    marginRight: theme.spacing(1)
  },
  editButton: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  let edit = false;

  if (sessionStorage.getItem("role") != null)
     edit = (sessionStorage.getItem("role") === "employee" ) ? false : true;

  const goToUpdateProduct = () => {
    navigate('/app/updateProduct', { replace: true })
  }

  const goToSellProduct = () => {
    navigate('/app/sellProduct', { replace: true })
  } 
   
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="left"
          mb={3}
        >
          <Avatar
            alt="Product"
            src={product.image}
            variant="square"
          />
        </Box>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Name: {product.product_name}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Product Id: {product.id}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Description: {product.description}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Price: M{product.price}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Quantity: {product.quantity}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              <Button 
                className={classes.sellButton}
                onClick={goToSellProduct}
              >
                Sell
              </Button>
            </Typography>
            {edit ? (
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                <Button 
                  className={classes.editButton}
                  onClick={goToUpdateProduct}
                >
                  Edit
                </Button>
              </Typography>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
