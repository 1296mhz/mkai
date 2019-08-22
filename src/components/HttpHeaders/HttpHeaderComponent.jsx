import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './HttpHeaderComponentTheme';

class HttpHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentId,
            containerId,
            probeField,
            httpHeaderId,
            httpHeaderKey,
            httpHeaderValue,
            httpHeaderType,
            collectionState,
            changeTextFieldHandler,
            deleteComponentHandler,
        } = this.props;

        return (
            <>
                <Grid container justify="flex-start" >
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            required
                            id="http-header-key"
                            label="Http Header Key"
                            name="httpHeaderId"
                            value={httpHeaderKey}
                            className={classes.textFieldKey}
                            onChange={(e) => {
                                changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeField}`)
                            }
                            }

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
                            onChange={(e) => {
                                if (extra === null) {
                                    changeTextFieldHandler(e, `${collectionState}.${componentId}.envs.${envId}.envValue`)
                                } else {
                                    changeTextFieldHandler(e, `${collectionState}.${componentId}.${extra}.envs.${envId}.envValue`)
                                }
                            }}
                            margin="dense"
                        />
                    </Grid>



                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => {
                            if (extra === null) {
                                deleteEnvHandler(`${collectionState}.${componentId}.envs.${envId}`)
                            } else {
                                deleteEnvHandler(`${collectionState}.${componentId}.${extra}.envs.${envId}`)
                            }
                        }}>
                            <Icon>remove_circle_outline</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        );
    }
}

HttpHeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HttpHeaderComponent);