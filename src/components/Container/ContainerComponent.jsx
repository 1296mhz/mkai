import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EnvComponent from '../Env/EnvComponent';
import { map } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ContainerComponentTheme';
import ContainerPortComponent from '../ContainerPort/ContainerPortComponent';
import ProbeComponent from '../Probe/ProbeComponent';
import ArgsComponent from '../ExecCommand/ExecCommandComponent';
// Добавить args массив

class ContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.newId = this.newId.bind(this);
        this.arg = {
            value: ""
        };
    }
    newId() {
        const d = new Date();
        const id = d.getTime();
        return id
    }

    render() {
        const {
            container,
            collectionState,
            componentId,
            containerId,
            classes,
            handlers,
            icon,
            label,
            itemName,
            envs,
            name,
            image,
            imagePullPolicy,
            restartPolicy,
            resourcesLimitsCpu,
            resourcesLimitsMemory,
            resourcesLimitsMemorySize,
            resourcesRequestsCpu,
            resourcesRequestsMemory,
            resourcesRequestsMemorySize,
            ports,
            args,
            readinessProbeProtocol,
            readinessProbeHttpGetPath,
            readinessProbeHttpGetPort,
            readinessProbeHttpGetInitialDelaySeconds,
            readinessProbeHttpGetPeriodSeconds,
            readinessProbeHttpGetSuccessThreshold,
            readinessProbeHttpGetFailureThreshold,
            readinessProbeHttpGetHttpHeaders,
            readinessProbeHttpGetScheme,
            readinessProbeTcpSocketPort,
            readinessProbeTcpSocketInitialDelaySeconds,
            readinessProbeTcpSocketPeriodSeconds,
            readinessProbeTcpSocketSuccessThreshold,
            readinessProbeTcpSocketFailureThreshold,
            readinessProbeExecCommand,
            livenessProbeProtocol,
            livenessProbeHttpGetPath,
            livenessProbeHttpGetPort,
            livenessProbeHttpGetInitialDelaySeconds,
            livenessProbeHttpGetPeriodSeconds,
            livenessProbeHttpGetSuccessThreshold,
            livenessProbeHttpGetFailureThreshold,
            livenessProbeHttpGetHttpHeaders,
            livenessProbeHttpGetScheme,
            livenessProbeTcpSocketPort,
            livenessProbeTcpSocketInitialDelaySeconds,
            livenessProbeTcpSocketPeriodSeconds,
            livenessProbeTcpSocketSuccessThreshold,
            livenessProbeTcpSocketFailureThreshold,
            livenessProbeExecCommand,
            volumeMounts,
        } = this.props;
        const policiesPullImagePolicies = ['Always', 'OnFailure', 'Never'];
        const restartPullPolicies = ['IfNotPresent', 'Always'];
        const specMems = ['Ki', 'Mi', 'Gi'];

        const port = {
            name: "",
            containerPort: "",
            hostIP: "",
            hostPort: "",
            protocol: "",
            changeTextFieldHandler: handlers.changeTextFieldHandler,
            deleteComponentHandler: handlers.deleteComponentHandler
        }

        const env = {
            envKey: "",
            envValue: "",
            envType: "",
        }
        console.log("container: ", container.componentPath)
        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            <span className={classes.message}>
                                <img className={classes.icon} src={icon} alt="container" height="24" width="24" />
                                {container.itemName}: {container.name.charAt(0).toUpperCase() + container.name.substr(1)}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newPort = Object.assign({}, {
                                    ...port,
                                    componentPath: `${container.componentPath}.ports.${id}`
                                })
                                handlers.addComponentHandler(newPort.componentPath, newPort);
                            }}
                        >
                            <Icon>usb</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newEnv = Object.assign({}, env)
                                handlers.addComponentHandler(`${collectionState}.${componentId}.containers.${containerId}.envs.${id}`, newEnv);
                            }}
                        >
                            <Icon>nature_people</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newArg = Object.assign({}, this.arg)
                                handlers.addComponentHandler(`${collectionState}.${componentId}.containers.${containerId}.args.${id}`, newArg);
                            }}
                        >
                            <Icon>label</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => handlers.deleteComponentHandler(`${collectionState}.${componentId}.containers.${containerId}`)}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.grid}>
                    <TextField
                        required
                        id="container-name"
                        label="Name"
                        value={name}
                        name={label}
                        className={classes.textField}
                        onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.name`)}
                        margin="dense"
                    />
                </Grid>

                <Grid container>
                    <Grid item xs={9} className={classes.grid}>
                        <TextField
                            required
                            id="image"
                            label="Image"
                            value={image}
                            name="image"
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.image`)}
                            margin="dense"
                        />
                    </Grid>

                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            id="image-pull-policy"
                            select
                            label="Image Pull Policy"
                            className={classes.textField}
                            value={imagePullPolicy}
                            name="imagePullPolicy"
                            helperText="Please select image policy"
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.imagePullPolicy`)}
                            margin="dense"
                        >
                            {policiesPullImagePolicies.map((policy, i) => {
                                return (
                                    <MenuItem key={i} value={policy}>{policy}</MenuItem>
                                );
                            })}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid item xs={3} className={classes.grid}>
                    <TextField
                        id="restart-policy"
                        select
                        label="Restart Policy"
                        className={classes.textField}
                        value={restartPolicy}
                        name="restartPloicy"
                        helperText="Please select restart policy"
                        onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.restartPolicy`)}
                        margin="dense"
                    >
                        {restartPullPolicies.map((policy, i) => {
                            return (
                                <MenuItem key={i} value={policy}>{policy}</MenuItem>
                            );
                        })}
                    </TextField>
                </Grid>

                <Grid container>
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            required
                            id="resources-limits-cpu"
                            label="Resources Limits Cpu"
                            value={resourcesLimitsCpu}
                            name="resourcesLimitsCpu"
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesLimitsCpu`)}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.grid}>
                        <Grid container>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    id="resources-limits-memory"
                                    label="Resources Limits Memory"
                                    value={resourcesLimitsMemory}
                                    name="resourcesLimitsMemory"
                                    className={classes.textField}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesLimitsMemory`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="resources-limits-memory-size"
                                    select
                                    label="Type"
                                    className={classes.textField}
                                    value={resourcesLimitsMemorySize}
                                    name="resourcesLimitsMemorySize"
                                    helperText="Please select size"
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesLimitsMemorySize`)}
                                    margin="dense"
                                >
                                    {specMems.map((specMem, i) => {
                                        return (
                                            <MenuItem key={i} value={specMem}>{specMem}</MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            required
                            id="resources-requests-cpu"
                            label="resourcesRequestsCpu"
                            value={resourcesRequestsCpu}
                            name="resourcesRequestsCpu"
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesRequestsCpu`)}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.grid}>
                        <Grid container>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    id="resources-requests-memory"
                                    label="Resources Requests Memory"
                                    value={resourcesRequestsMemory}
                                    name="resourcesRequestsMemory"
                                    className={classes.textField}
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesRequestsMemory`)}
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="resources-requests-memory-size"
                                    select
                                    label="Type"
                                    className={classes.textField}
                                    value={resourcesRequestsMemorySize}
                                    name="resourcesRequestsMemorySize"
                                    helperText="Please select size"
                                    onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.resourcesRequestsMemorySize`)}
                                    margin="dense"
                                >
                                    {specMems.map((specMem, i) => {
                                        return (
                                            <MenuItem key={i} value={specMem}>{specMem}</MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>


                        </Grid>

                    </Grid>
                </Grid>

                <Grid container>
                    <Grid container item xs={6}>
                        <Grid item xs={12}>
                            <ProbeComponent
                                componentId={componentId}
                                containerId={containerId}
                                collectionState={collectionState}
                                probe="liveness"
                                probeProtocol={livenessProbeProtocol}
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                ports={ports}
                                handlers={handlers}
                                probeHttpGetPort={livenessProbeHttpGetPort}
                                probeHttpGetPath={livenessProbeHttpGetPath}
                                probeHttpGetInitialDelaySeconds={livenessProbeHttpGetInitialDelaySeconds}
                                probeHttpGetPeriodSeconds={livenessProbeHttpGetPeriodSeconds}
                                probeHttpGetSuccessThreshold={livenessProbeHttpGetSuccessThreshold}
                                probeHttpGetFailureThreshold={livenessProbeHttpGetFailureThreshold}
                                probeHttpGetHttpHeaders={livenessProbeHttpGetHttpHeaders}
                                probeHttpGetScheme={livenessProbeHttpGetScheme}
                                probeTcpSocketPort={livenessProbeTcpSocketPort}
                                probeTcpSocketInitialDelaySeconds={livenessProbeTcpSocketInitialDelaySeconds}
                                probeTcpSocketPeriodSeconds={livenessProbeTcpSocketPeriodSeconds}
                                probeTcpSocketSuccessThreshold={livenessProbeTcpSocketSuccessThreshold}
                                probeTcpSocketFailureThreshold={livenessProbeTcpSocketFailureThreshold}
                                probeExecCommand={livenessProbeExecCommand}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid item xs={12}>
                            <ProbeComponent
                                componentId={componentId}
                                containerId={containerId}
                                collectionState={collectionState}
                                probe="readiness"
                                probeProtocol={readinessProbeProtocol}
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                ports={ports}
                                handlers={handlers}
                                probeHttpGetPort={readinessProbeHttpGetPort}
                                probeHttpGetPath={readinessProbeHttpGetPath}
                                probeHttpGetInitialDelaySeconds={readinessProbeHttpGetInitialDelaySeconds}
                                probeHttpGetPeriodSeconds={readinessProbeHttpGetPeriodSeconds}
                                probeHttpGetSuccessThreshold={readinessProbeHttpGetSuccessThreshold}
                                probeHttpGetFailureThreshold={readinessProbeHttpGetFailureThreshold}
                                probeHttpGetHttpHeaders={readinessProbeHttpGetHttpHeaders}
                                probeHttpGetScheme={readinessProbeHttpGetScheme}
                                probeTcpSocketPort={readinessProbeTcpSocketPort}
                                probeTcpSocketInitialDelaySeconds={readinessProbeTcpSocketInitialDelaySeconds}
                                probeTcpSocketPeriodSeconds={readinessProbeTcpSocketPeriodSeconds}
                                probeTcpSocketSuccessThreshold={readinessProbeTcpSocketSuccessThreshold}
                                probeTcpSocketFailureThreshold={readinessProbeTcpSocketFailureThreshold}
                                probeExecCommand={readinessProbeExecCommand}

                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>

                    <Grid item className={classes.grid} xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            Args: {Object.keys(args).length}
                        </Typography>
                    </Grid>

                    {map(args, (arg, index) => {
                        return (
                            <ArgsComponent
                                key={index}
                                componentId={componentId}
                                collectionState={collectionState}
                                containerId={containerId}
                                probeExecCommandField="123"
                                valueId={index}
                                value={arg.value}
                                extra={`containers.${containerId}.args`}
                                changeTextFieldHandler={this.props.handlers.changeTextFieldHandler}
                                deleteComponentHandler={this.props.handlers.deleteComponentHandler}
                            />
                        )
                    })}


                    <Grid item className={classes.grid} xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            Ports: {Object.keys(ports).length}
                        </Typography>
                    </Grid>

                    {map(ports, (port, index) => {
                        return <ContainerPortComponent
                            key={index}
                            componentId={port.componentId}
                            containerId={port.containerId}
                            collectionState={port.collectionState}
                            portId={index}
                            name={port.name}
                            containerPort={port.containerPort}
                            hostIP={port.hostIP}
                            hostPort={port.hostPort}
                            protocol={port.protocol}
                            changeTextFieldHandler={port.changeTextFieldHandler}
                            deleteComponentHandler={port.deleteComponentHandler}
                        />
                    })}

                    <Grid item className={classes.grid} xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            Environments: {Object.keys(envs).length}
                        </Typography>
                    </Grid>

                    {map(envs, (env, index) => {
                        return <EnvComponent
                            key={index}
                            envId={index}
                            envKey={env.envKey}
                            envValue={env.envValue}
                            envType={env.envType}
                            extra={env.extra}
                            changeTextFieldHandler={handlers.changeTextFieldHandler}
                            deleteEnvHandler={handlers.deleteComponentHandler}
                            collectionState={collectionState}
                            componentId={componentId}
                        />
                    })
                    }
                </Grid>
            </>
        );
    }
}

ContainerComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    resourcesLimitsCpu: PropTypes.number.isRequired,
    resourcesLimitsMemory: PropTypes.string.isRequired,
    resourcesRequestsCpu: PropTypes.number.isRequired,
    resourcesRequestsMemory: PropTypes.string.isRequired,
};

export default withStyles(styles)(ContainerComponent);