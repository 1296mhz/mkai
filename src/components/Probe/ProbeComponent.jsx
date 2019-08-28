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
        this.probe = `${this.probe}-probe`

        // Title
        this.title = `${this.props.probe.charAt(0).toUpperCase()+this.props.probe.substr(1)} Probe`
        this.probeProtocolId = `${this.probe}-protocol-id`;
        this.probeProtocolField = `${this.props.probe}ProbeProtocol`
        this.probeProtocolLabel = `Proto`

        // HttpGetPort
        this.probeHttpGetPortId = `${this.probe}-http-get-port-id`;
        this.probeHttpGetPortLabel = "Port";
        this.probeHttpGetPortHelperText = "Please select port";
        this.probeHttpGetPortField = `${this.props.probe}ProbeHttpGetPort`;

        // HttpGetPath
        this.probeHttpGetPathId = `${this.probe}-http-get-path-id`;
        this.probeHttpGetPathLabel = "Probe Path";
        this.probeHttpGetPathHelperText = "Please input path";
        this.probeHttpGetPathField = `${this.props.probe}ProbeHttpGetPath`;

        // HttpGetInitialDelaySecondsId
        this.probeHttpGetInitialDelaySecondsId = `${this.probe}-http-get-initial-delay-seconds`;
        this.probeHttpGetInitialDelaySecondsField = `${this.props.probe}ProbeHttpGetInitialDelaySeconds`;
        this.probeHttpGetInitialDelaySecondsLabel = "Initial Delay Seconds";
        this.probeHttpGetInitialDelaySecondsHelperText = "Please input delay";

        // HttpGetPeriodSeconds
        this.probeHttpGetPeriodSecondsId = `${this.probe}-http-get-period-seconds`
        this.probeHttpGetPeriodSecondsField = `${this.props.probe}ProbeHttpGetPeriodSeconds`
        this.probeHttpGetPeriodSecondsLabel = "Period Seconds";
        this.probeHttpGetPeriodSecondsHelperText = "Please input period"

        // HttpGetSuccessThreshold
        this.probeHttpGetSuccessThresholdId = `${this.probe}-http-get-success-threshold`
        this.probeHttpGetSuccessThresholdField = `${this.props.probe}ProbeHttpGetSuccessThreshold`
        this.probeHttpGetSuccessThresholdLabel = "Success Threshold"
        this.probeHttpGetSuccessThresholdHelperText = "Please input success threshold"

        // HttpGetFailureThreshold
        this.probeHttpGetFailureThresholdId = `${this.probe}-http-get-failure-threshold`
        this.probeHttpGetFailureThresholdField = `${this.props.probe}ProbeHttpGetFailureThreshold`
        this.probeHttpGetFailureThresholdLabel = "Failure Threshold"
        this.probeHttpGetFailureThresholdHelperText = "Please input failure threshold"

        // HttpGetHeaders
        this.probeHttpGetHttpHeadersId = `${this.probe}-http-get-http-headers`
        this.probeHttpGetHttpHeadersField = `${this.props.probe}ProbeHttpGetHttpHeaders`
        this.probeHttpGetHttpHeadersLabel = "Http Headers"
        this.probeHttpGetHttpHeadersHelperText = "Please input http headers"

        // HttpGetScheme
        this.probeHttpGetSchemeId = `${this.probe}-http-get-scheme`
        this.probeHttpGetSchemeField = `${this.props.probe}ProbeHttpGetScheme`
        this.probeHttpGetSchemeLabel = "Scheme"
        this.probeHttpGetSchemeHelperText = "Please select scheme"

        // TcpSocketPort
        this.probeTcpSocketPortId = `${this.probe}-tcp-socket-port`
        this.probeTcpSocketPortField = `${this.props.probe}ProbeTcpSocketPort`
        this.probeTcpSocketPortLabel = "TCP Port"
        this.probeTcpSocketPortHelperText = "Please input TCP port"

        // TcpSocketInitialDelaySeconds
        this.probeTcpSocketInitialDelaySecondsId = `${this.probe}-tcp-socket-delay-seconds`
        this.probeTcpSocketInitialDelaySecondsField = `${this.props.probe}ProbeTcpSocketInitialDelaySeconds`
        this.probeTcpSocketInitialDelaySecondsLabel = "Initial Delay Seconds"
        this.probeTcpSocketInitialDelaySecondsHelperText = "Please input delay"

        // TcpSocketPeriodSeconds
        this.probeTcpSocketPeriodSecondsId = `${this.probe}-tcp-socket-period-seconds`
        this.probeTcpSocketPeriodSecondsField = `${this.props.probe}ProbeTcpSocketPeriodSeconds`
        this.probeTcpSocketPeriodSecondsLabel = "Period Seconds"
        this.probeTcpSocketPeriodSecondsHelperText = "Please input period"

        // TcpSocketSuccessThreshold
        this.probeTcpSocketSuccessThresholdId = `${this.probe}-tcp-socket-success-threshold`
        this.probeTcpSocketSuccessThresholdField = `${this.props.probe}ProbeTcpSocketSuccessThreshold`
        this.probeTcpSocketSuccessThresholdLabel = "Success Threshold"
        this.probeTcpSocketSuccessThresholdHelperText = "Please input success threshold"

        // TcpSocketFailureThreshold
        this.probeTcpSocketFailureThresholdId = `${this.probe}-tcp-socket-failure-threshold`
        this.probeTcpSocketFailureThresholdField = `${this.props.probe}ProbeTcpSocketFailureThreshold`
        this.probeTcpSocketFailureThresholdLabel = "Failure Threshold"
        this.probeTcpSocketFailureThresholdHelperText = "Please input failure threshold"

        // ExecCommand
        this.probeExecCommandField = `${this.props.probe}ProbeExecCommand`
      
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
                                    label={this.probeHttpGetPortLabel}
                                    className={this.props.classes.textField}
                                    value={this.props.container[this.probeHttpGetPortField]}
                                    name={this.probeHttpGetPortField}
                                    helperText={this.probeHttpGetPortHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetPortField}`)}
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
                                    id={this.probeHttpGetPathId}
                                    label={this.probeHttpGetPathLabel}
                                    value={this.props.container[this.probeHttpGetPathField]}
                                    name={this.probeHttpGetPathField}
                                    className={this.props.classes.textField}
                                    helperText={this.helperTextPath}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetPathField}`)}
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
                                    id={this.probeHttpGetInitialDelaySecondsId}
                                    label={this.probeHttpGetInitialDelaySecondsLabel}
                                    value={this.props.container[this.probeHttpGetInitialDelaySecondsField]}
                                    name={this.probeHttpGetInitialDelaySecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeHttpGetInitialDelaySecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetInitialDelaySecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeHttpGetPeriodSecondsId}
                                    label={this.probeHttpGetPeriodSecondsLabel}
                                    value={this.props.container[this.probeHttpGetPeriodSecondsField]}
                                    name={this.probeHttpGetPeriodSecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeHttpGetPeriodSecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetPeriodSecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeHttpGetFailureThresholdId}
                                    label={this.probeHttpGetFailureThresholdLabel}
                                    value={this.props.container[this.probeHttpGetFailureThresholdField]}
                                    name={this.probeHttpGetFailureThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeHttpGetFailureThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetFailureThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeHttpGetSuccessThresholdId}
                                    label={this.probeHttpGetSuccessThresholdLabel}
                                    value={this.props.container[this.probeHttpGetSuccessThresholdField]}
                                    name={this.probeHttpGetSuccessThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeHttpGetSuccessThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetSuccessThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={6} className={this.props.classes.grid}>
                            <TextField
                                id={this.probeHttpGetSchemeId}
                                select
                                label={this.probeHttpGetSchemeLabel}
                                className={this.props.classes.textField}
                                value={this.props.container[this.probeHttpGetSchemeField]}
                                name={this.probeHttpGetSchemeField}
                                helperText={this.probeHttpGetSchemeHelperText}
                                onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeHttpGetSchemeField}`)}
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
                                    id={this.probeTcpSocketPortId}
                                    label={this.probeTcpSocketPortLabel}
                                    value={this.props.container[this.probeTcpSocketPortField]}
                                    name={this.probeTcpSocketPortField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeTcpSocketPortHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeTcpSocketPortField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>


                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeTcpSocketInitialDelaySecondsId}
                                    label={this.probeTcpSocketInitialDelaySecondsLabel}
                                    value={this.props.container[this.probeTcpSocketInitialDelaySecondsField]}
                                    name={this.probeTcpSocketInitialDelaySecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeTcpSocketInitialDelaySecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeTcpSocketInitialDelaySecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeTcpSocketPeriodSecondsId}
                                    label={this.probeTcpSocketPeriodSecondsLabel}
                                    value={this.props.container[this.probeTcpSocketPeriodSecondsField]}
                                    name={this.probeTcpSocketPeriodSecondsField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeTcpSocketPeriodSecondsHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeTcpSocketPeriodSecondsField}`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeTcpSocketFailureThresholdId}
                                    label={this.probeTcpSocketFailureThresholdLabel}
                                    value={this.props.container[this.probeTcpSocketFailureThresholdField]}
                                    name={this.probeTcpSocketFailureThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeTcpSocketFailureThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeTcpSocketFailureThresholdField}`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={this.probeTcpSocketSuccessThresholdId}
                                    label={this.probeTcpSocketSuccessThresholdLabel}
                                    value={this.props.container[this.probeTcpSocketSuccessThresholdField]}
                                    name={this.probeTcpSocketSuccessThresholdField}
                                    className={this.props.classes.textField}
                                    helperText={this.probeTcpSocketSuccessThresholdHelperText}
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeTcpSocketSuccessThresholdField}`)}
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
                                    probeExecCommandField={this.probeExecCommandField}
                                    valueId={index}
                                    value={execCommand.value}
                                    extra={`containers.${this.props.containerId}.${this.probeExecCommandField}`}
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
                                {this.title}
                            </span>
                        </Typography>
                    </Grid>

                    <Grid item container xs justify="flex-end" >
                        {
                            (this.props.probeProtocol === 'httpGet') ?
                                <IconButton onClick={() => {
                                    const id = this.newId();
                                    const newHeader = Object.assign({}, this.httpHeader)
                                    this.props.handlers.addComponentHandler(`${this.props.container.componentPath}.${this.probeHttpGetHttpHeadersField}.${id}`, newHeader);
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
                                    this.props.handlers.addComponentHandler(`${this.props.container.componentPath}.${this.probeExecCommandField}.${id}`, newCommand);
                                }}>
                                    <Icon>input</Icon>
                                </IconButton>
                                : false
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} className={this.props.classes.grid}>
                    <TextField
                        id={this.probeProtocolId}
                        select
                        label={this.probeProtocolLabel}
                        className={this.props.classes.textField}
                        value={this.props.container[this.probeProtocolField]}
                        name={this.probeProtocolField}
                        helperText="Select probe type"
                        onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.probeProtocolField}`)}
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