import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, Typography, withStyles,
} from '@material-ui/core';

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

class ComputerPlayer extends Component {
  state = {
    minNumber: 0,
    maxNumber: 100,
    guessNumber: -1,
    winState: false,
    gameStarted: false,
  };

  setMinNumber = () => {
    const { guessNumber } = this.state;
    this.setState({
      minNumber: guessNumber,
    });
  };

  setMaxNumber = () => {
    const { guessNumber } = this.state;
    this.setState({
      maxNumber: guessNumber,
    });
  };

  startGame = () => {
    this.setState({
      gameStarted: true,
      guessNumber: Math.floor(Math.random() * 101),
    });
  };

  restartGame = () => {
    this.setState({
      gameStarted: false,
      winState: false,
      minNumber: 0,
      maxNumber: 100,
    });
  };

  setGuessNumber = (min, max) => {
    // const { minNumber, maxNumber } = this.state;
    this.setState({
      minNumber: min,
      maxNumber: max,
      guessNumber: this.getRandomNumber(min, max),
    });
  };

  winGame = () => {
    this.setState({
      winState: true,
    });
  };

  getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min - 1) + min + 1);

  render() {
    const { classes } = this.props;
    const {
      gameStarted, guessNumber, winState, minNumber, maxNumber,
    } = this.state;
    return (
      <>
        {!gameStarted ? (
          <>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Think of a number between 1 and 100</Paper>
            </Grid>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.startGame}
              >
                Start game!
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid container justify="center">
              <Grid item xs={3}>
                <Typography variant="h6" className={classes.paper} style={{ textAlign: 'center' }}>
                  {!winState ? `Is your number ${guessNumber}?` : 'Yay!!'}
                </Typography>
              </Grid>
            </Grid>
            {!winState ? (
              <>
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setGuessNumber(minNumber, guessNumber)}
                  >
                    My number is SMALLER
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.setGuessNumber(guessNumber, maxNumber)}
                  >
                    My number is BIGGER
                  </Button>
                </Grid>
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.winGame}
                  >
                    You guessed!
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.restartGame}
                  >
                    Play again!
                  </Button>
                </Grid>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

ComputerPlayer.propTypes = {};

export default withStyles(styles)(ComputerPlayer);
