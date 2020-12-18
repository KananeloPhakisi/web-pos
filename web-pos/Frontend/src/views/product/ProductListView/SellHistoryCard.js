import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const SellHistoryCard = ({ className, all_history, ...rest }) => {
  const classes = useStyles();

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
        </Box>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Order Id: {all_history.order_id}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Status: {all_history.status}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Total Price: M{all_history.total_price}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Created: {new Date(all_history.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
    </Card>
  );
};

SellHistoryCard.propTypes = {
  className: PropTypes.string,
  all_history: PropTypes.object.isRequired
};

export default SellHistoryCard;
