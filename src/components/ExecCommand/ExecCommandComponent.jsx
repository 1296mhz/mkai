import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import styles from './ExecCommandComponentTheme';
class ExecCommandComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentPath,
            value,
            changeTextFieldHandler,
            deleteComponentHandler,
        } = this.props;

        return (
            <>
                <Grid container justify="flex-start" >
                    <Grid item xs={11} className={classes.grid}>
                        <TextField
                            required
                            id="arg-id"
                            label="Command or args"
                            name="value"
                            value={value}
                            className={this.props.classes.textField}
                            onChange={(e) => {
                                changeTextFieldHandler(e, `${componentPath}.value`)
                            }
                            }
                            margin="dense"
                        />
                    </Grid>

                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => {
                            deleteComponentHandler(`${componentPath}`)
                        }}>
                            <Icon>remove_circle_outline</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        );
    }
}

ExecCommandComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExecCommandComponent);