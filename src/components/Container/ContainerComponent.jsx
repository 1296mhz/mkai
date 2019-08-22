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
// Добавить args массив
class ContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.newId = this.newId.bind(this);
    }
    newId() {
        const d = new Date();
        const id = d.getTime();
        return id
    }

    render() {
        const {
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
            readinessProbe,
            readinessProbeProtocol,
            readinessProbeHttpGet,
            readinessProbeHttpGetPath,
            readinessProbeHttpGetPort,
            readinessProbeHttpGetInitialDelaySeconds,
            readinessProbeHttpGetPeriodSeconds,
            readinessProbeHttpGetSuccessThreshold,
            readinessProbeHttpGetFailureThreshold,
            readinessProbeHttpGetHttpHeaders,
            readinessProbeHttpGetScheme,
            livenessProbe,
            livenessProbeProtocol,
            livenessProbeHttpGet,
            livenessProbeHttpGetPath,
            livenessProbeHttpGetPort,
            livenessProbeHttpGetInitialDelaySeconds,
            livenessProbeHttpGetPeriodSeconds,
            livenessProbeHttpGetSuccessThreshold,
            livenessProbeHttpGetFailureThreshold,
            livenessProbeHttpGetHttpHeaders,
            livenessProbeHttpGetScheme,
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
            containerId: containerId,
            componentId: componentId,
            collectionState: collectionState,
            changeTextFieldHandler: handlers.changeTextFieldHandler,
            deleteComponentHandler: handlers.deleteComponentHandler
        }
        const extra = `containers.${containerId}`
        const env = {
            envKey: "",
            envValue: "",
            envType: "",
            extra: extra
        }
        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            <span className={classes.message}>
                                <img className={classes.icon} src={icon} alt="container" height="24" width="24" />
                                {itemName}: {name.charAt(0).toUpperCase() + name.substr(1)}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newPort = Object.assign({}, port)
                                handlers.addComponentHandler(`${collectionState}.${componentId}.containers.${containerId}.ports.${id}`, newPort);
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
                                probe={livenessProbe}
                                title="Liveness Probe"
                                id="liveness-probe-protocol"
                                label="Liveness Probe Protocol"
                                name="livenessProbeProtocol"
                                helperText="Please select protocol type"
                                probeProtocol={livenessProbeProtocol}
                                probeProtocolField="livenessProbeProtocol"
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                ports={ports}
                                handlers={handlers}
                                probeHttpGet={livenessProbeHttpGet}
                                probeHttpGetPort={livenessProbeHttpGetPort}
                                probeHttpGetPortId="liveness-probe"
                                probeHttpGetPortField="livenessProbeHttpGetPort"
                                probeHttpGetPortName="livenessProbeHttpGetPort"
                                probeHttpGetPortLabel="Port"
                                probeHttpGetPortHelperText="Please select port"
                                probeHttpGetPath={livenessProbeHttpGetPath}
                                probeHttpGetPathId="liveness-probe-httpGet-port"
                                probeHttpGetPathField="livenessProbeHttpGetPath"
                                probeHttpGetPathLabel="Probe Path"
                                probeHttpGetPathName="livenessProbeHttpGetPath"
                                probeHttpGetPathHelperText="Please input path"
                                probeHttpGetInitialDelaySeconds={livenessProbeHttpGetInitialDelaySeconds}
                                probeHttpGetInitialDelaySecondsId="liveness-probe-initial-delay-seconds"
                                probeHttpGetInitialDelaySecondsField="livenessProbeHttpGetInitialDelaySeconds"
                                probeHttpGetInitialDelaySecondsLabel="Initial Delay Seconds"
                                probeHttpGetInitialDelaySecondsName="livenessProbeHttpGetInitialDelaySeconds"
                                probeHttpGetInitialDelaySecondsHelperText="Please input delay"
                                probeHttpGetPeriodSeconds={livenessProbeHttpGetPeriodSeconds}
                                probeHttpGetPeriodSecondsId="liveness-probe-HttpGet-period-seconds"
                                probeHttpGetPeriodSecondsField="livenessProbeHttpGetPeriodSeconds"
                                probeHttpGetPeriodSecondsLabel="Period Seconds"
                                probeHttpGetPeriodSecondsName="livenessProbeHttpGetPeriodSeconds"
                                probeHttpGetPeriodSecondsHelperText="Please input period"
                                probeHttpGetSuccessThreshold={livenessProbeHttpGetSuccessThreshold}
                                probeHttpGetSuccessThresholdId="liveness-probe-httpGet-success-threshold"
                                probeHttpGetSuccessThresholdField="livenessProbeHttpGetSuccessThreshold"
                                probeHttpGetSuccessThresholdLabel="Success Threshold"
                                probeHttpGetSuccessThresholdName="livenessProbeHttpGetSuccessThreshold"
                                probeHttpGetSuccessThresholdHelperText="Please input success threshold"
                                probeHttpGetFailureThreshold={livenessProbeHttpGetFailureThreshold}
                                probeHttpGetFailureThresholdId="liveness-probe-httpGet-failure-threshold"
                                probeHttpGetFailureThresholdField="livenessProbeHttpGetFailureThreshold"
                                probeHttpGetFailureThresholdLabel="Failure Threshold"
                                probeHttpGetFailureThresholdName="livenessProbeHttpGetFailureThreshold"
                                probeHttpGetFailureThresholdHelperText="Please input failure threshold"
                                probeHttpGetHttpHeaders={livenessProbeHttpGetHttpHeaders}
                                probeHttpGetHttpHeadersId="liveness-probe-httpGet-http-headers"
                                probeHttpGetHttpHeadersField="livenessProbeHttpGetHttpHeaders"
                                probeHttpGetHttpHeadersLabel="Http Headers"
                                probeHttpGetHttpHeadersName="livenessProbeHttpGetHttpHeaders"
                                probeHttpGetHttpHeadersHelperText="Please input http headers"
                                probeHttpGetScheme={livenessProbeHttpGetScheme}
                                probeHttpGetSchemeId="liveness-probe-HttpGet-scheme"
                                probeHttpGetSchemeField="livenessProbeHttpGetScheme"
                                probeHttpGetSchemeLabel="Scheme"
                                probeHttpGetSchemeName="livenessProbeHttpGetScheme"
                                probeHttpGetSchemeHelperText="Please select scheme"

                  
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid item xs={12}>
                            <ProbeComponent
                                componentId={componentId}
                                containerId={containerId}
                                collectionState={collectionState}
                                probe={readinessProbe}
                                title="Readiness Probe"
                                id="readiness-probe-protocol"
                                label="Readiness Probe Protocol"
                                name="readinessProbeProtocol"
                                helperText="Please select readiness"
                                probeProtocol={readinessProbeProtocol}
                                probeProtocolField="readinessProbeProtocol"
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                ports={ports}
                                handlers={handlers}
                                probeProtocol={readinessProbeProtocol}
                                probeHttpGet={readinessProbeHttpGet}
                                probeHttpGetPort={readinessProbeHttpGetPort}
                                probeHttpGetPortId="readiness-probe"
                                probeHttpGetPortField="readinessProbeHttpGetPort"
                                probeHttpGetPortName="readinessProbeHttpGetPort"
                                probeHttpGetPortLabel="Port"
                                probeHttpGetPortHelperText="Please select port"
                                probeHttpGetPath={readinessProbeHttpGetPath}
                                probeHttpGetPathId="readiness-probe-httpGet-port"
                                probeHttpGetPathField="readinessProbeHttpGetPath"
                                probeHttpGetPathLabel="Probe Path"
                                probeHttpGetPathName="readinessProbeHttpGetPath"
                                probeHttpGetPathHelperText="Please input path"
                                probeHttpGetInitialDelaySeconds={readinessProbeHttpGetInitialDelaySeconds}
                                probeHttpGetInitialDelaySecondsId="readiness-probe-initial-delay-seconds"
                                probeHttpGetInitialDelaySecondsField="readinessProbeHttpGetInitialDelaySeconds"
                                probeHttpGetInitialDelaySecondsLabel="Initial Delay Seconds"
                                probeHttpGetInitialDelaySecondsName="readinessProbeHttpGetInitialDelaySeconds"
                                probeHttpGetInitialDelaySecondsHelperText="Please input delay"
                                probeHttpGetPeriodSeconds={readinessProbeHttpGetPeriodSeconds}
                                probeHttpGetPeriodSecondsId="readiness-probe-HttpGet-period-seconds"
                                probeHttpGetPeriodSecondsField="readinessProbeHttpGetPeriodSeconds"
                                probeHttpGetPeriodSecondsLabel="Period Seconds"
                                probeHttpGetPeriodSecondsName="readinessProbeHttpGetPeriodSeconds"
                                probeHttpGetPeriodSecondsHelperText="Please input period"
                                probeHttpGetSuccessThreshold={readinessProbeHttpGetSuccessThreshold}
                                probeHttpGetSuccessThresholdId="readiness-probe-httpGet-success-threshold"
                                probeHttpGetSuccessThresholdField="readinessProbeHttpGetSuccessThreshold"
                                probeHttpGetSuccessThresholdLabel="Success Threshold"
                                probeHttpGetSuccessThresholdName="readinessProbeHttpGetSuccessThreshold"
                                probeHttpGetSuccessThresholdHelperText="Please input success threshold"
                                probeHttpGetFailureThreshold={readinessProbeHttpGetFailureThreshold}
                                probeHttpGetFailureThresholdId="readiness-probe-httpGet-failure-threshold"
                                probeHttpGetFailureThresholdField="readinessProbeHttpGetFailureThreshold"
                                probeHttpGetFailureThresholdLabel="Failure Threshold"
                                probeHttpGetFailureThresholdName="readinessProbeHttpGetFailureThreshold"
                                probeHttpGetFailureThresholdHelperText="Please input failure threshold"
                                probeHttpGetHttpHeaders={readinessProbeHttpGetHttpHeaders}
                                probeHttpGetHttpHeadersId="readiness-probe-httpGet-http-headers"
                                probeHttpGetHttpHeadersField="readinessProbeHttpGetHttpHeaders"
                                probeHttpGetHttpHeadersLabel="Http Headers"
                                probeHttpGetHttpHeadersName="readinessProbeHttpGetHttpHeaders"
                                probeHttpGetHttpHeadersHelperText="Please input http headers"
                                probeHttpGetScheme={readinessProbeHttpGetScheme}
                                probeHttpGetSchemeId="readiness-probe-HttpGet-scheme"
                                probeHttpGetSchemeField="readinessProbeHttpGetScheme"
                                probeHttpGetSchemeLabel="Scheme"
                                probeHttpGetSchemeName="readinessProbeHttpGetScheme"
                                probeHttpGetSchemeHelperText="Please select scheme"

                             
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>
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