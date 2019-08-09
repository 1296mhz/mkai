import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import EnvsComponent from "./EnvsComponent";

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

    render() {
        const {
            id,
            componentId,
            classes,
            changeFieldNameConfigMap,
            deleteConfigMapComponent,
            addEnvToConfigMapHandler,
            deleteEnvConfigMapComponent,
            envs,
            name,
            label } = this.props;

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
                            onClick={() => addEnvToConfigMapHandler(componentId)}
                        >
                            <Icon>title</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => deleteConfigMapComponent(componentId)}
                        >
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
                <EnvsComponent
                    envs={envs}
                    componentId={componentId}
                    deleteEnvConfigMapComponent={deleteEnvConfigMapComponent}
                />
            </>
        );
    }
}

ConfigMapComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigMapComponent);