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

            probeHttpGetPort,
            probeHttpGetPortField,
            probeHttpGetPortId,
            probeHttpGetPortLabel,
            probeHttpGetPortName,
            probeHttpGetPortHelperText,

            probeHttpGetPath,
            probeHttpGetPathField,
            probeHttpGetPathId,
            probeHttpGetPathLabel,
            probeHttpGetPathName,
            probeHttpGetPathHelperText,

            probeHttpGetInitialDelaySeconds,
            probeHttpGetInitialDelaySecondsField,
            probeHttpGetInitialDelaySecondsId,
            probeHttpGetInitialDelaySecondsLabel,
            probeHttpGetInitialDelaySecondsName,
            probeHttpGetInitialDelaySecondsHelperText,

            probeHttpGetPeriodSeconds,
            probeHttpGetPeriodSecondsField,
            probeHttpGetPeriodSecondsId,
            probeHttpGetPeriodSecondsLabel,
            probeHttpGetPeriodSecondsName,
            probeHttpGetPeriodSecondsHelperText,


            ports,
            handlers
        } = this.props;

        switch (probeProtocol) {
            case 'httpGet':
                return <>
                    <Grid container >
                        <Grid container item xs={12}>
                            <Grid item xs={6} className={classes.grid}>
                                <TextField
                                    id={probeHttpGetPortId}
                                    select
                                    label={probeHttpGetPortLabel}
                                    className={classes.textField}
                                    value={probeHttpGetPort}
                                    name={probeHttpGetPortName}
                                    helperText={probeHttpGetPortHelperText}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetPortField}`)}
                                    margin="dense"
                                >
                                    {map(ports, (port, index) => {
                                        return (
                                            <MenuItem key={index} value={port.name}>{port.name}</MenuItem>
                                        );
                                    })}

                                </TextField>
                            </Grid>
                            <Grid item xs={6} className={classes.grid}>
                                <TextField
                                    required
                                    id={probeHttpGetPathId}
                                    label={probeHttpGetPathLabel}
                                    value={probeHttpGetPath}
                                    name={probeHttpGetPathName}
                                    className={classes.textField}
                                    helperText={probeHttpGetPathHelperText}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetPathField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={classes.grid}>
                                <TextField
                                    required
                                    id={probeHttpGetInitialDelaySecondsId}
                                    label={probeHttpGetInitialDelaySecondsLabel}
                                    value={probeHttpGetInitialDelaySeconds}
                                    name={probeHttpGetInitialDelaySecondsName}
                                    className={classes.textField}
                                    helperText={probeHttpGetInitialDelaySecondsHelperText}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetInitialDelaySecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={classes.grid}>
                                <TextField
                                    required
                                    id={probeHttpGetPeriodSecondsId}
                                    label={probeHttpGetPeriodSecondsLabel}
                                    value={probeHttpGetPeriodSeconds}
                                    name={probeHttpGetPeriodSecondsName}
                                    className={classes.textField}
                                    helperText={probeHttpGetPeriodSecondsHelperText}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.${probeHttpGetPeriodSecondsField}`)}
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