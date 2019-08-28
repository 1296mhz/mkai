import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './EnvComponentTheme';

class EnvComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentPath,
            envKey,
            envValue,
            envType,
            changeTextFieldHandler,
            deleteComponentHandler,
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
                            onChange={(e) => { changeTextFieldHandler(e, `${componentPath}.envKey`) }}
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
                            onChange={(e) => { changeTextFieldHandler(e, `${componentPath}.envValue`) }}
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
                            onChange={(e) => { changeTextFieldHandler(e, `${componentPath}.envType`) }}
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
                        <IconButton onClick={(e) => { deleteComponentHandler(`${componentPath}`) }} >
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