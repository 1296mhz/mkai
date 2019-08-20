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
            livenessProbe,
            livenessProbeProtocol,
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
        const probeProtocol = ['None', 'httpGet', 'tcpSocket', 'exec'];
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
                    <Grid item xs={6}>
                        <Grid item>
                            <Typography variant="h6" className={classes.title}>
                                <span className={classes.message}>
                                    Liveness Probe
                        </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="liveness-probe-protocol"
                                select
                                label="Liveness Probe Protocol"
                                className={classes.textField}
                                value={livenessProbeProtocol}
                                name="livenessProbeProtocol"
                                helperText="Please select liveness"
                                onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.livenessProbeProtocol`)}
                                margin="dense"
                            >
                                {probeProtocol.map((probe, i) => {
                                    return (
                                        <MenuItem key={i} value={probe}>{probe}</MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <ProbeComponent
                                livenessProbe={livenessProbe}
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                probeProtocol={livenessProbeProtocol}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item xs={6}>
                        <Grid item>
                            <Typography variant="h6" className={classes.title}>
                                <span className={classes.message}>
                                    Readiness Probe
                        </span>
                            </Typography>
                        </Grid>

                    </Grid>
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