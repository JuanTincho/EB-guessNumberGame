import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';

export const messages = {
  win: 'You win!!!',
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

class HumanPlayer extends Component {
  state = {
    numberValue: 0,
    numberAnswer: Math.floor(Math.random() * 101),
    winState: false,
    message: '',
  };

  handleChangeNumber = (e) => {
    this.setState({
      numberValue: e.target.value,
    });
  };

  handleKeyPress = (e) => {
    if (e.which === 13) {
      this.checkAnswer();
    }
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

  restartGame = () => {
    this.setState({
      winState: false,
      numberAnswer: Math.floor(Math.random() * 101),
      numberValue: 0,
      message: '',
    });
  };

  render() {
    const { classes } = this.props;
    const { message, numberValue, winState } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <>
              Choose a number between 1 and 100 <br /> and press Enter or click on the button below
            </>
          </Paper>
        </Grid>
        <Grid container justify="center">
          <TextField
            id="outlined"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="number"
            label={this.validateNumber() ? 'Error' : 'Number'}
            error={this.validateNumber()}
            value={numberValue}
            onChange={this.handleChangeNumber}
            onKeyPress={this.handleKeyPress}
            inputProps={{ min: '0', max: '100', step: '1' }}
            disabled={winState}
          />
        </Grid>
        <Grid container justify="center">
          {!winState ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.checkAnswer}
              disabled={this.validateNumber()}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.restartGame}
            >
              Play again
            </Button>
          )}
        </Grid>

        <Typography variant="h6" className={classes.paper} style={{ textAlign: 'center' }}>
          {!winState ? message : messages.win}
        </Typography>
      </Grid>
    );
  }
}

HumanPlayer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HumanPlayer);
