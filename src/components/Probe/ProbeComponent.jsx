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
import HttpHeaderComponent from '../HttpHeader/HttpHeaderComponent';
import ExecCommandComponent from '../ExecCommand/ExecCommandComponent';
class ProbeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onlyOne = this.onlyOne.bind(this);
        this.newId = this.newId.bind(this);
        this.probeProtocol = ['None', 'httpGet', 'tcpSocket', 'exec'];
        this.schemes = ['http', 'https'];
        this.httpHeader = {
            headerKey: "",
            headerValue: ""
        };
        this.command = {
            value: ""
        };
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
                                    name={this.props.probeHttpGetPortField}
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
                                    name={this.props.probeHttpGetPathField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetPathHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetPathField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            {map(this.props.probeHttpGetHttpHeaders, (header, index) => {
                                return (
                                    <HttpHeaderComponent
                                        key={index}
                                        componentId={this.props.componentId}
                                        containerId={this.props.containerId}
                                        probeHttpGetHttpHeadersField={this.props.probeHttpGetHttpHeadersField}
                                        httpHeaderId={index}
                                        httpHeaderKeyId="http-header-key"
                                        httpHeaderKey={header.headerKey}
                                        httpHeaderKeyField="headerKey"
                                        httpHeaderKeyLabel="Header Key"
                                        httpHeaderValueId="http-header-value"
                                        httpHeaderValue={header.headerValue}
                                        httpHeaderValueField="headerValue"
                                        httpHeaderValueLabel="Header Value"
                                        collectionState={this.props.collectionState}
                                        handlers={this.props.handlers}
                                    />
                                );
                            })}

                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetInitialDelaySecondsId}
                                    label={this.props.probeHttpGetInitialDelaySecondsLabel}
                                    value={this.props.probeHttpGetInitialDelaySeconds}
                                    name={this.props.probeHttpGetInitialDelaySecondsField}
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
                                    name={this.props.probeHttpGetPeriodSecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetPeriodSecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetPeriodSecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetFailureThresholdId}
                                    label={this.props.probeHttpGetFailureThresholdLabel}
                                    value={this.props.probeHttpGetFailureThreshold}
                                    name={this.props.probeHttpGetFailureThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetFailureThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetFailureThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeHttpGetSuccessThresholdId}
                                    label={this.props.probeHttpGetSuccessThresholdLabel}
                                    value={this.props.probeHttpGetSuccessThreshold}
                                    name={this.props.probeHttpGetSuccessThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeHttpGetSuccessThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetSuccessThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={6} className={this.props.classes.grid}>
                            <TextField
                                id={this.props.probeHttpGetSchemeId}
                                select
                                label={this.props.probeHttpGetSchemeLabel}
                                className={this.props.classes.textField}
                                value={this.props.probeHttpGetScheme}
                                name={this.props.probeHttpGetSchemeField}
                                helperText={this.props.probeHttpGetSchemeHelperText}
                                onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeHttpGetSchemeField}`)}
                                margin="dense"
                            >
                                {map(this.schemes, (schema, index) => {
                                    return (
                                        <MenuItem key={index} value={schema}>{schema}</MenuItem>
                                    );
                                })}

                            </TextField>
                        </Grid>

                    </Grid>
                </>

            case 'tcpSocket':
                return <>
                    <Grid container >
                        <Grid container item xs={12}>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeTcpSocketPortId}
                                    label={this.props.probeTcpSocketPortLabel}
                                    value={this.props.probeTcpSocketPort}
                                    name={this.props.probeTcpSocketPortField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeTcpSocketPortHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeTcpSocketPortField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>


                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeTcpSocketInitialDelaySecondsId}
                                    label={this.props.probeTcpSocketInitialDelaySecondsLabel}
                                    value={this.props.probeTcpSocketInitialDelaySeconds}
                                    name={this.props.probeTcpSocketInitialDelaySecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeTcpSocketInitialDelaySecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeTcpSocketInitialDelaySecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeTcpSocketPeriodSecondsId}
                                    label={this.props.probeTcpSocketPeriodSecondsLabel}
                                    value={this.props.probeTcpSocketPeriodSeconds}
                                    name={this.props.probeTcpSocketPeriodSecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeTcpSocketPeriodSecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeTcpSocketPeriodSecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeTcpSocketFailureThresholdId}
                                    label={this.props.probeTcpSocketFailureThresholdLabel}
                                    value={this.props.probeTcpSocketFailureThreshold}
                                    name={this.props.probeTcpSocketFailureThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeTcpSocketFailureThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeTcpSocketFailureThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.props.probeTcpSocketSuccessThresholdId}
                                    label={this.props.probeTcpSocketSuccessThresholdLabel}
                                    value={this.props.probeTcpSocketSuccessThreshold}
                                    name={this.props.probeTcpSocketSuccessThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.props.probeTcpSocketSuccessThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeTcpSocketSuccessThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </>
            case 'exec':
                return <>
                  <Grid container item xs={12}>
                        {map(this.props.probeExecCommand, (execCommand, index) => {
                            return (
                                <ExecCommandComponent
                                    key={index}
                                    componentId={this.props.componentId}
                                    collectionState={this.props.collectionState}
                                    containerId={this.props.containerId}
                                    probeExecCommandField={this.props.probeExecCommandField}
                                    valueId={index}
                                    value={execCommand.value}
                                    extra={`containers.${this.props.containerId}.${this.props.probeExecCommandField}`}
                                    changeTextFieldHandler={this.props.handlers.changeTextFieldHandler}
                                    deleteComponentHandler={this.props.handlers.deleteComponentHandler}
                                />
                            )
                        })}
</Grid>


              
                </>
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

                    <Grid item container xs justify="flex-end" >
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
                        {
                            (this.props.probeProtocol === 'exec') ?
                                <IconButton onClick={() => {
                                    const id = this.newId();
                                    const newCommand = Object.assign({}, this.command)
                                    this.props.handlers.addComponentHandler(`${this.props.collectionState}.${this.props.componentId}.containers.${this.props.containerId}.${this.props.probeExecCommandField}.${id}`, newCommand);
                                }}>
                                    <Icon>input</Icon>
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
                        name={this.props.probeProtocolField}
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