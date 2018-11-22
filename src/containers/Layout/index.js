import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, TextField, Typography, withStyles}  from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
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
        <Grid item xs={12} style={{ marginBottom: "5rem" }}>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            EB - Guess the number game
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Choose a number between 1 and 100
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-bare"
              className={classes.textField}
              defaultValue="Bare"
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
