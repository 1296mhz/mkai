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
        const {
            classes,
            componentId,
            envId,
            envKey,
            envValue,
            envType,
            collectionState,
            changeTextFieldHandler,
            deleteEnvHandler,
        } = this.props;
        const types = ['string', 'base64'];
        return (
            <>
                <Grid container justify="flex-start" >
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            required
                            id="env-key"
                            label="Key"
                            name="key"
                            value={envKey}
                            className={classes.textFieldKey}
                            onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.envs.${envId}.envKey`) }}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={7} className={classes.grid}>
                        <TextField
                            required
                            id="env-value"
                            label="Value"
                            name="value"
                            value={envValue}
                            className={classes.textFieldValue}
                            onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.envs.${envId}.envValue`) }}
                            margin="dense"
                        />
                    </Grid>

                    <Grid item xs={1} className={classes.grid}>
                        <TextField
                            id="standard-type"
                            select
                            label="Type"
                            name="secretType"
                            className={classes.textField}
                            value={envType}
                            onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.envs.${envId}.envType`) }}
                            helperText="Please select type"
                            margin="dense"
                        >
                            {types.map((type, i) => {
                                return (
                                    <MenuItem key={i} value={type}>{type}</MenuItem>
                                );
                            })}
                        </TextField>
                    </Grid>

                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => deleteEnvHandler(`${collectionState}.${componentId}.envs.${envId}`)}>
                            <Icon>remove_circle_outline</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        );
    }
}

EnvComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnvComponent);