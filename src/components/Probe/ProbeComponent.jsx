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
                                    id={`${this.probe}-http-get-port-id`}
                                    select
                                    label="Port"
                                    className={this.props.classes.textField}
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetPort`]}
                                    name={`${this.props.probe}ProbeHttpGetPort`}
                                    helperText="Please select port"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${`${this.props.probe}ProbeHttpGetPort`}`)}
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
                                    id={`${this.probe}-http-get-path-id`}
                                    label="Probe Path"
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetPath`]}
                                    name={`${this.props.probe}ProbeHttpGetPath`}
                                    className={this.props.classes.textField}
                                    helperText="Please input path"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetPath`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            {map(this.props.probeHttpGetHttpHeaders, (header, index) => {
                                return (
                                    <HttpHeaderComponent
                                        key={index}
                                        componentPath={header.componentPath}
                                        httpHeaderKey={header.headerKey}
                                        httpHeaderValue={header.headerValue}
                                        handlers={this.props.handlers}
                                    />
                                );
                            })}

                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-http-get-initial-delay-seconds`}
                                    label="Initial Delay Seconds"
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetInitialDelaySeconds`]}
                                    name={`${this.props.probe}ProbeHttpGetInitialDelaySeconds`}
                                    className={this.props.classes.textField}
                                    helperText="Please input delay"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetInitialDelaySeconds`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-http-get-period-seconds`}
                                    label="Period Seconds"
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetPeriodSeconds`]}
                                    name={`${this.props.probe}ProbeHttpGetPeriodSeconds`}
                                    className={this.props.classes.textField}
                                    helperText="Please input period"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetPeriodSeconds`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-http-get-failure-threshold`}
                                    label="Failure Threshold"
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetFailureThreshold`]}
                                    name={`${this.props.probe}ProbeHttpGetFailureThreshold`}
                                    className={this.props.classes.textField}
                                    helperText="Please input failure threshold"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetFailureThreshold`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-http-get-success-threshold`}
                                    label="Success Threshold"
                                    value={this.props.container[`${this.props.probe}ProbeHttpGetSuccessThreshold`]}
                                    name={`${this.props.probe}ProbeHttpGetSuccessThreshold`}
                                    className={this.props.classes.textField}
                                    helperText="Please input success threshold"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetSuccessThreshold`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={6} className={this.props.classes.grid}>
                            <TextField
                                id={`${this.probe}-http-get-scheme`}
                                select
                                label="Scheme"
                                className={this.props.classes.textField}
                                value={this.props.container[`${this.props.probe}ProbeHttpGetScheme`]}
                                name={`${this.props.probe}ProbeHttpGetScheme`}
                                helperText="Please select scheme"
                                onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetScheme`)}
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
                                    id={`${this.probe}-tcp-socket-port`}
                                    label="TCP Port"
                                    value={this.props.container[`${this.props.probe}ProbeTcpSocketPort`]}
                                    name={`${this.props.probe}ProbeTcpSocketPort`}
                                    className={this.props.classes.textField}
                                    helperText="Please input TCP port"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeTcpSocketPort`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>


                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-tcp-socket-delay-seconds`}
                                    label="Initial Delay Seconds"
                                    value={this.props.container[`${this.props.probe}ProbeTcpSocketInitialDelaySeconds`]}
                                    name={`${this.props.probe}ProbeTcpSocketInitialDelaySeconds`}
                                    className={this.props.classes.textField}
                                    helperText="Please input delay"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeTcpSocketInitialDelaySeconds`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-tcp-socket-period-seconds`}
                                    label={this.probeTcpSocketPeriodSecondsLabel}
                                    value={this.props.container[`${this.props.probe}ProbeTcpSocketPeriodSeconds`]}
                                    name={`${this.props.probe}ProbeTcpSocketPeriodSeconds`}
                                    className={this.props.classes.textField}
                                    helperText="Please input period"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeTcpSocketPeriodSeconds`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} >
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-tcp-socket-failure-threshold`}
                                    label="Failure Threshold"
                                    value={this.props.container[`${this.props.probe}ProbeTcpSocketFailureThreshold`]}
                                    name={`${this.props.probe}ProbeTcpSocketFailureThreshold`}
                                    className={this.props.classes.textField}
                                    helperText="Please input failure threshold"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeTcpSocketFailureThreshold`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={6} className={this.props.classes.grid}>
                                <TextField
                                    required
                                    id={`${this.probe}-tcp-socket-success-threshold`}
                                    label={this.probeTcpSocketSuccessThresholdLabel}
                                    value={this.props.container[`${this.props.probe}ProbeTcpSocketSuccessThreshold`]}
                                    name={`${this.props.probe}ProbeTcpSocketSuccessThreshold`}
                                    className={this.props.classes.textField}
                                    helperText="Please input success threshold"
                                    onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${this.props.probe}ProbeTcpSocketSuccessThreshold`)}
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </>
            case 'exec':
                return <Grid container item xs={12}>
                    {map(this.props.container[this.probeExecCommandField], (execCommand, index) => {
                        return <ExecCommandComponent
                            key={index}
                            componentPath={execCommand.componentPath}
                            probeExecCommandField={this.probeExecCommandField}
                            value={execCommand.value}
                            changeTextFieldHandler={this.props.handlers.changeTextFieldHandler}
                            deleteComponentHandler={this.props.handlers.deleteComponentHandler}
                        />
                    })}
                </Grid>

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
                                {`${this.props.probe.charAt(0).toUpperCase() + this.props.probe.substr(1)} Probe`}
                            </span>
                        </Typography>
                    </Grid>

                    <Grid item container xs justify="flex-end" >
                        {
                            (this.props.probeProtocol === 'httpGet') ?
                                <IconButton onClick={() => {
                                    const id = this.newId();
                                    const newHeader = {
                                        ...this.httpHeader,
                                        componentPath: `${this.props.container.componentPath}.${this.props.probe}ProbeHttpGetHttpHeaders.${id}`
                                    }
                                    this.props.handlers.addComponentHandler(newHeader.componentPath, newHeader);
                                }}>
                                    <Icon>http</Icon>
                                </IconButton>
                                : false
                        }
                        {
                            (this.props.probeProtocol === 'exec') ?
                                <IconButton onClick={() => {
                                    const id = this.newId();
                                    const newCommand = {
                                        ...this.command,
                                        componentPath: `${this.props.container.componentPath}.${this.probeExecCommandField}.${id}`
                                    }
                                    this.props.handlers.addComponentHandler(newCommand.componentPath, newCommand);
                                }}>
                                    <Icon>input</Icon>
                                </IconButton>
                                : false
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} className={this.props.classes.grid}>
                    <TextField
                        id={`${this.probe}-protocol-id`}
                        select
                        label="Proto"
                        className={this.props.classes.textField}
                        value={this.props.container[`${this.props.probe}ProbeProtocol`]}
                        name={`${this.props.probe}ProbeProtocol`}
                        helperText="Select probe type"
                        onChange={(e) => this.props.handlers.changeTextFieldHandler(e, `${this.props.container.componentPath}.${`${this.props.probe}ProbeProtocol`}`)}
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