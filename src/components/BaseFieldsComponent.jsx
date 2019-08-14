import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { map } from "lodash";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  grid: {
    padding: theme.spacing(1)
  },
});

class BaseFields extends React.Component {

  render() {
    const { classes, collection, handlers, fields } = this.props;

    return <Grid container>
      {map(fields, (field, index) => {
        return <Grid key={index} item xs={4} className={classes.grid} >
          <TextField
            required
            id={index}
            name={field.name}
            label={field.label}
            className={classes.textField}
            value={field.value}
            onChange={(e) => handlers.changeTextFieldHandler(e, `${collection}.${index}.value`)}
            margin="dense"
          />
        </Grid>
      })}
    </Grid>
  }
}

export default withStyles(styles)(BaseFields);
