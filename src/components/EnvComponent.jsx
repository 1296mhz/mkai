import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    textFieldKey: {
        width: '100%'
    },
    textFieldValue: {
        width: '100%'
    },
    margin: {
        margin: theme.spacing(1)
        // margin: '8px 0',
    },
    padding: {
        padding: theme.spacing(1)
    },
    iconButton: {
        padding: 0
    },
    title: {
        marginTop: theme.spacing(1)
    },
    grid: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)
    },
    gridDelete: {
        padding: theme.spacing(1),
        paddingRight: theme.spacing(0),
        textAlign: 'right'
    },
    container: {
        alignItems: 'center',
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    formControl: {
        margin: theme.spacing(0),
    },
});

class EnvComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, componentId, id, envKey, envValue, parentComponentId, deleteEnvConfigMapComponent } = this.props;

        return (
            <>
                <Grid item xs={3} className={classes.grid}>
                    <TextField
                        required
                        id="env-key"
                        label="Key"
                        name={envKey}
                        className={classes.textFieldKey}
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3} className={classes.grid}>
                    <TextField
                        required
                        id="env-value"
                        label="Value"
                        name={envValue}
                        className={classes.textFieldValue}
                        margin="dense"
                    />
                </Grid>

                <Grid xs={1} item className={classes.gridDelete}>
                    <IconButton onClick={() => deleteEnvConfigMapComponent(componentId, id)}>
                        <Icon>remove_circle_outline</Icon>
                    </IconButton>
                </Grid>
            </>
        );
    }
}

EnvComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnvComponent);