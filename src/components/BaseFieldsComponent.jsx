import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  grid: {
    padding: theme.spacing(1)
  },
});

class BaseFields extends React.Component {

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, fields } = this.props;

    return <Grid container>
      {fields.map((field, i) => (
          <Grid key={field.id} item xs={4} className={classes.grid} >
            <TextField
              required
              id={field.id}
              name={field.name}
              label={field.label}
              className={classes.textField}
              value={field.value}
              onChange={(e) => field.handler(e, 'mainFields')}
              margin="dense"
            />
          </Grid>
      ))}
    </Grid>
  }
}

export default withStyles(styles)(BaseFields);
