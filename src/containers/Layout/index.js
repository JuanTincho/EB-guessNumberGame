import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Grid, Tabs, Tab, Typography, withStyles,
} from '@material-ui/core';
import HumanPlayer from '../../components/HumanPlayer';
import ComputerPlayer from '../../components/ComputerPlayer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    textTransform: 'initial',
  },
});

class Layout extends Component {
  state = {
    tabValue: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              EB - Guess the number game
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.tabs}>
              <AppBar position="static" style={{ marginBottom: '2rem' }}>
                <Tabs value={tabValue} onChange={this.handleTabChange} centered>
                  <Tab className={classes.tab} label="Human Player" />
                  <Tab className={classes.tab} label="Computer Player" />
                </Tabs>
              </AppBar>
              <Grid container direction="row" justify="center" alignItems="center">
                {tabValue === 0 && <HumanPlayer />}
                {tabValue === 1 && <ComputerPlayer />}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
