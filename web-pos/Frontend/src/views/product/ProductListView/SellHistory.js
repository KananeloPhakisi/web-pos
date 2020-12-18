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
import SellHistoryCard from './SellHistoryCard';

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

class SellHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHistory: [],
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
      Axios.get('http://localhost:5000/order/', config)
      .then(res => {
        let history = [];
        console.log(res.data.result.data);
        Array.from(res.data.result.data).forEach((order) => {
          //console.log(order);
          history.push(order);
        });
        this.setState({
          isLoaded: true,
          allHistory: history
        });
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  render() {

    let {isLoaded, allHistory } = this.state;

    const classes = useStyles;

    if (isLoaded) {
      return (
        <Page
          className={classes.root}
          title="Products"
        >
          <Container maxWidth={false}>
            <Box mt={3}>
              <Grid
                container
                spacing={3}
              >
                {allHistory.map((all_history) => (
                  <Grid
                    item
                    key={all_history.id}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <SellHistoryCard
                      className={classes.productCard}
                      all_history={all_history}
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
      return <div><h1>Product List is Empty... <br /> User might not be logged in</h1></div>
    }
  }

};

export default SellHistory;