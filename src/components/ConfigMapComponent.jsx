import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// import Env from "../Env/index.jsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { filter } from 'lodash';

const styles = theme => ({
  textField: {
    width: "100%"
  },
  margin: {
    margin: theme.spacing(1)
    // margin: '8px 0',
  },
  padding: {
    padding: theme.spacing(2)
  },
  iconButton: {
    padding: 0
  },
  title: {
    marginTop: theme.spacing(1)
  },
  grid: {
    padding: theme.spacing(1)
  }
});
class ConfigMapComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  handleChange = name => event => {
    this.setState({ name: event.target.value });
  };

  handleDelete = key => () => {
      /*
    this.setState({
      env: filter(
        this.state.env,
        item => item.key !== key
      )
    });
    */
  };

  handlerClickControlShelf = (command) => {
    switch (command) {
      case "addEnvTextField":
        console.log("addEnvTextField")
/*        
        this.setState({
          'componentFormCounter': this.state.componentFormCounter + 1,
          'env': [
            ...this.state.env,
            <Env handleDelete={this.handleDelete(this.state.componentFormCounter)} id={`${this.props.id}.env.${this.state.componentFormCounter}`} key={this.state.componentFormCounter} />
          ]
        });
*/
        break;
      case "addEnvTextBox":
        console.log("addEnvTextBox");
        break;
      default:
        console.log("Command " + command + " not found, sorry.");
    }
  };

  render() {
    const { id, componentId, classes, changeFieldNameConfigMap, deleteCopmponentHandler, env, name, label } = this.props;
    console.log("changeFieldNameConfigMap ", changeFieldNameConfigMap)
    return (
      <>
        <Divider />
        <Grid item container xs={12} sm>
          <Grid item xs>
            <Typography variant="h6" className={classes.title}>
              Config Map: {name}
            </Typography>
          </Grid>
          <Grid item container xs justify="flex-end" className={classes.grid}>
            <IconButton
              onClick={() => this.handlerClickControlShelf("addEnvTextField")}
            >
              <Icon>title</Icon>
            </IconButton>
            <IconButton onClick={() => deleteCopmponentHandler(id)}>
              <Icon>delete_forever</Icon>
            </IconButton>
          </Grid>
        </Grid>

        <Grid container justify="flex-start" className={classes.grid}>
          <TextField
            required
            id="standard-name"
            label="Name"
            value={name}
            name={label}
            className={classes.textField}
            onChange={(e) => changeFieldNameConfigMap(e, componentId)}
            margin="dense"
          />
        </Grid>
        {env.map((n, i) => {
          return (
            <Grid container justify="flex-start" key={n.key + 1}>
              {n}
            </Grid>
          );
        })}
      </>
    );
  }
}

ConfigMapComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigMapComponent);