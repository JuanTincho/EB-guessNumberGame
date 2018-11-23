import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';

const messages = {
  win: 'You win',
  smaller: 'My number is smaller',
  bigger: 'My number is bigger',
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
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

class UserGuesses extends Component {
  state = {
    numberValue: 0,
    numberAnswer: Math.floor(Math.random() * 101),
    winState: false,
    message: '',
  };

  onChangeNumber = (e) => {
    this.setState({
      numberValue: e.target.value,
    });
  };

  checkAnswer = () => {
    const { numberAnswer, numberValue } = this.state;

    const intNumberValue = parseInt(numberValue, 10);

    if (intNumberValue === numberAnswer) {
      this.setState({ winState: true });
    }

    if (intNumberValue <= numberAnswer) {
      this.setState({ message: messages.bigger });
    }

    if (intNumberValue >= numberAnswer) {
      this.setState({ message: messages.smaller });
    }
  };

  validateNumber = () => {
    const { numberValue } = this.state;
    return numberValue < 0 || numberValue > 100;
  };

  render() {
    const { classes } = this.props;
    const { message, numberValue, winState } = this.state;
    return (
      <>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Choose a number between 1 and 100</Paper>
        </Grid>
        <Grid item xs={1}>
          <TextField
            id="outlined"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="number"
            label={this.validateNumber() ? 'Error' : 'Number'}
            error={this.validateNumber()}
            value={numberValue}
            onChange={e => this.onChangeNumber(e)}
            inputProps={{ min: '0', max: '100', step: '1' }}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.checkAnswer}
            disabled={this.validateNumber()}
          >
            Check Answer
          </Button>
        </Grid>
        {!winState ? message : messages.win}
      </>
    );
  }
}

UserGuesses.propTypes = {};

export default withStyles(styles)(UserGuesses);
