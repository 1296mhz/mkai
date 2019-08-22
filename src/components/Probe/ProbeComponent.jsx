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
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
class ProbeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onlyOne = this.onlyOne.bind(this);
        this.newId = this.newId.bind(this);
        this.probeProtocol = ['None', 'httpGet', 'tcpSocket', 'exec'];
        this.httpHeader = {
            headerKey: "",
            headerValue: ""
        }
    }

    newId() {
        const d = new Date();
        const id = d.getTime();
        return id
    }

    onlyOne() {
        switch (this.props.probeProtocol) {
            case 'httpGet':
                return <>
                    <Grid container >


                        <Grid container item xs={12}>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    id={this.props.probeHttpGetPortId}
                                    select
                                    label={this.props.probeHttpGetPortLabel}
                                    className={this.props.classes.textField}
                                    value={this.props.probeHttpGetPort}
                                    name={this.props.probeHttpGetPortName}
                                    helperText={this.props.probeHttpGetPortHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetPortField}`)}
                                    margin="dense"
                                >
                                    {map(this.props.ports, (port, index) => {
                                        return (
                                            <MenuItem key={index} value={port.name}>{port.name}</MenuItem>
                                        );
                                    })}

                                </TextField>
                            </Grid>


                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetPathId}
                                    label={this.props.probeHttpGetPathLabel}
                                    value={this.props.probeHttpGetPath}
                                    name={this.props.probeHttpGetPathName}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetPathHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetPathField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetInitialDelaySecondsId}
                                    label={this.props.probeHttpGetInitialDelaySecondsLabel}
                                    value={this.props.probeHttpGetInitialDelaySeconds}
                                    name={this.props.probeHttpGetInitialDelaySecondsName}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetInitialDelaySecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetInitialDelaySecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetPeriodSecondsId}
                                    label={this.props.probeHttpGetPeriodSecondsLabel}
                                    value={this.props.probeHttpGetPeriodSeconds}
                                    name={this.props.probeHttpGetPeriodSecondsName}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetPeriodSecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetPeriodSecondsField}`)}
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
                <Grid container item xs={12}>

                    <Grid item xs>
                        <Typography variant="h6" className={this.props.classes.title}>
                            <span className={this.props.classes.message}>
                                {this.props.title}
                            </span>
                        </Typography>
                    </Grid>

                    <Grid item container xs justify="flex-end" className={this.props.classes.grid}>
                        {
                            (this.props.probeProtocol === 'httpGet') ?
                                <IconButton onClick={() => {
                                    const id = this.newId();
                                    const newHeader = Object.assign({}, this.httpHeader)
                                    this.props.handlers.addComponentHandler(`${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetHttpHeadersField}.${id}`, newHeader);
                                }}>
                                    <Icon>http</Icon>
                                </IconButton>
                                : false
                        }


                    </Grid>
                </Grid>
                <Grid item xs={12} className={this.props.classes.grid}>
                    <TextField
                        id={this.props.id}
                        select
                        label={this.props.label}
                        className={this.props.classes.textField}
                        value={this.props.probeProtocol}
                        name={this.props.name}
                        helperText={this.props.helperText}
                        onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeProtocolField}`)}
                        margin="dense"
                    >
                        {this.probeProtocol.map((probe, i) => {
                            return (
                                <MenuItem key={i} value={probe}>{probe}</MenuItem>
                            );
                        })}
                    </TextField>
                </Grid>
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