import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';
import UserGuesses from '../../components/UserGuesses';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function Layout(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} style={{ marginBottom: '5rem' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            EB - Guess the number game
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <UserGuesses />
        </Grid>
      </Grid>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
