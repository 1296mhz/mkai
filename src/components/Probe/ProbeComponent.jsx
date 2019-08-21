import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ProbeComponentTheme';
import { map } from 'lodash';
class ProbeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onlyOne = this.onlyOne.bind(this);
    }


    onlyOne() {
        const {
            classes,
            componentId,
            containerId,
            collectionState,
            probeProtocol,
            livenessProbeHttpGet,
            livenessProbeHttpGetPath,
            livenessProbeHttpGetPort,
            livenessProbeHttpGetInitialDelaySeconds,
            livenessProbeHttpGetPeriodSeconds,
            ports,
            handlers
        } = this.props;

        switch (probeProtocol) {
            case 'httpGet':
                return <>
                    <Grid container className={classes.grid}>
                        <Grid container item xs={6} className={classes.grid}>
                            <Grid item xs={12}>
                                <TextField
                                    id="liveness-probe-http-get-port"
                                    select
                                    label="Port"
                                    className={classes.textField}
                                    value={livenessProbeHttpGetPort}
                                    name="livenessProbeHttpGetPort"
                                    helperText="Please select port"
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.livenessProbeHttpGetPort`)}
                                    margin="dense"
                                >
                                    {map(ports, (port, index) => {
                                        return (
                                            <MenuItem key={index} value={port.name}>{port.name}</MenuItem>
                                        );
                                    })}

                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="livenessProbeHttpGetPath"
                                    label="Probe Path"
                                    value={livenessProbeHttpGetPath}
                                    name="livenessProbeHttpGetPath"
                                    className={classes.textField}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.livenessProbeHttpGetPath`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={6} className={classes.grid}>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="livenessProbeHttpGetPath"
                                    label="Probe Path"
                                    value={livenessProbeHttpGetPath}
                                    name="livenessProbeHttpGetPath"
                                    className={classes.textField}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.livenessProbeHttpGetPath`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="livenessProbeHttpGetPath"
                                    label="Probe Path"
                                    value={livenessProbeHttpGetPath}
                                    name="livenessProbeHttpGetPath"
                                    className={classes.textField}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.livenessProbeHttpGetPath`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </>
                break;
            case 'tcpSocket':
                break;
            case 'exec':
                break;
            default:
                break;
        }
    }

    render() {



        return (
            <>
                {
                    this.onlyOne()
                }

            </>
        );
    }
}

ProbeComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProbeComponent);