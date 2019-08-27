import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
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
            httpHeaderId,
            probeHttpGetHttpHeadersField,
            httpHeaderKeyId,
            httpHeaderKey,
            httpHeaderKeyField,
            httpHeaderKeyLabel,
            httpHeaderValue,
            httpHeaderValueField,
            httpHeaderValueLabel,
            httpHeaderValueId,
            collectionState,
            handlers,
        } = this.props;

        return (
            <>
                <Grid container justify="flex-start" >
                    <Grid item xs={6} className={classes.grid}>
                        <TextField
                            required
                            id={httpHeaderKeyId}
                            label={httpHeaderKeyLabel}
                            name={httpHeaderKeyField}
                            value={httpHeaderKey}
                            className={classes.textFieldKey}
                            onChange={(e) => {
                                handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetHttpHeadersField}.${httpHeaderId}.${httpHeaderKeyField}`)
                            }}
                            margin="dense"
                        />
                    </Grid>

                    <Grid item xs={5} className={classes.grid}>
                        <TextField
                            required
                            id={httpHeaderValueId}
                            label={httpHeaderValueLabel}
                            name={httpHeaderValueField}
                            value={httpHeaderValue}
                            className={classes.textFieldKey}
                            onChange={(e) => {
                                handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetHttpHeadersField}.${httpHeaderId}.${httpHeaderValueField}`)
                            }}
                            margin="dense"
                        />
                    </Grid>
  
                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => {
                            handlers.deleteComponentHandler(`${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetHttpHeadersField}.${httpHeaderId}`);
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