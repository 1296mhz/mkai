import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import ContainerComponent from '../Container/ContainerComponent';
import EnvComponent from '../Env/EnvComponent';
import { map } from 'lodash';
import styles from './MicroServiceComponentTheme';

class MicroServiceComponent extends React.Component {
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
            classes,
            handlers,
            deploymentName,
            itemName,
            icon,
            strategy,
            maxSurge,
            maxUnavailable,
            containers,
            ingresses,
            services,
            volumes,
            imagePullSecrets,
            envs
        } = this.props;
        const strategies = ['Recreate', 'RollingUpdate'];

        const container = {
            handlers: {
                addComponentHandler: handlers.addComponentHandler,
                changeTextFieldHandler: handlers.changeTextFieldHandler,
                deleteComponentHandler: handlers.deleteComponentHandler
            },
            envs: {},
            name: "",
            image: "",
            imagePullPolicy: "Always",
            restartPolicy: "Always",
            resourcesLimitsCpu: 0.010,
            resourcesLimitsMemory: "10",
            resourcesLimitsMemorySize: "Mi",
            resourcesRequestsCpu: 0.010,
            resourcesRequestsMemory: "10",
            resourcesRequestsMemorySize: "Mi",
            ports: {},
            readinessProbe: "",
            readinessProbeProtocol: "None",
            readinessProbeHttpGet: "",
            readinessProbeHttpGetPath: "/healthz",
            readinessProbeHttpGetPort: 3000,
            readinessProbeHttpGetInitialDelaySeconds: 160,
            readinessProbeHttpGetPeriodSeconds: 10,
            readinessProbeHttpGetTimeoutSeconds: 1,
            readinessProbeHttpGetSuccessThreshold: 1,
            readinessProbeHttpGetFailureThreshold: 3,
            readinessProbeHttpGetHttpHeaders: {},
            readinessProbeHttpGetScheme: "",
            readinessProbeTcpSocketPort: 3000,
            readinessProbeTcpSocketInitialDelaySeconds: 160,
            readinessProbeTcpSocketPeriodSeconds: 10,
            readinessProbeTcpSocketTimeoutSeconds: 1,
            readinessProbeTcpSocketSuccessThreshold: 1,
            readinessProbeTcpSocketFailureThreshold: 3,
            livenessProbe: "",
            livenessProbeProtocol: "None",
            livenessProbeHttpGet: "",
            livenessProbeHttpGetPath: "/healthz",
            livenessProbeHttpGetPort: 3000,
            livenessProbeHttpGetInitialDelaySeconds: 160,
            livenessProbeHttpGetPeriodSeconds: 60,
            livenessProbeHttpGetTimeoutSeconds: 1,
            livenessProbeHttpGetSuccessThreshold: 1,
            livenessProbeHttpGetFailureThreshold: 3,
            livenessProbeHttpGetHttpHeaders: {},
            livenessProbeHttpGetScheme: "",
            livenessProbeTcpSocketPort: 3000,
            livenessProbeTcpSocketInitialDelaySeconds: 160,
            livenessProbeTcpSocketPeriodSeconds: 10,
            livenessProbeTcpSocketTimeoutSeconds: 1,
            livenessProbeTcpSocketSuccessThreshold: 1,
            livenessProbeTcpSocketFailureThreshold: 3,

            volumeMounts: {},
            icon: "icon/pod.svg",
            itemName: "Container"
        }
        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            <span className={classes.message}>
                                <img className={classes.icon} src={icon} alt="container" height="24" width="24" />
                                {itemName}: {deploymentName.charAt(0).toUpperCase() + deploymentName.substr(1)}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton onClick={() => {
                            const id = this.newId();
                            const newContainer = Object.assign({}, container);

                            handlers.addComponentHandler(`${collectionState}.${componentId}.containers.${id}`, newContainer);
                        }}>
                            <img src="icon/pod.svg" alt="container" height="24" width="24" />
                        </IconButton>
                        <IconButton>
                            <img src="icon/vol.svg" alt="container" height="24" width="24" />
                        </IconButton>
                        <IconButton>
                            <img src="icon/svc.svg" alt="container" height="24" width="24" />
                        </IconButton>
                        <IconButton>
                            <Icon>nature_people</Icon>
                        </IconButton>

                        <IconButton
                            onClick={() => handlers.deleteComponentHandler(`${collectionState}.${componentId}`)}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container justify="flex-start" className={classes.grid}>
                    <TextField
                        required
                        id="deployment-name"
                        label="Deployment Name"
                        value={deploymentName}
                        name="deploymentName"
                        className={classes.textField}
                        onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.deploymentName`)}
                        margin="dense"
                    />
                </Grid>
                <Grid container item xs={12} justify="flex-start" >
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            id="standard-select"
                            select
                            label="Strategy"
                            className={classes.textField}
                            value={strategy}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.strategy`)}
                            helperText="Please select update strategy"
                            margin="dense"
                        >
                            {strategies.map((n, i) => {
                                return (
                                    <MenuItem key={i} value={n}>{n}</MenuItem>
                                );
                            })}
                        </TextField>
                    </Grid>
                    {
                        (strategy === 'RollingUpdate')
                            ?
                            <>
                                <Grid item xs={3} className={classes.grid}>
                                    <TextField
                                        required
                                        id="standard-maxSurge"
                                        label="maxSurge"
                                        value={maxSurge}
                                        className={classes.textField}
                                        onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.maxSurge`)}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.grid}>
                                    <TextField
                                        required
                                        id="standard-maxUnavailable"
                                        label="maxUnavailable"
                                        value={maxUnavailable}
                                        className={classes.textField}
                                        onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.maxUnavailable`)}
                                        margin="dense"
                                    />
                                </Grid>
                            </>
                            : false
                    }
                    <Grid container item xs={12} justify="flex-start" >
                        {
                            map(containers, (container, index) => {
                                return <ContainerComponent
                                    key={index}
                                    containerId={index}
                                    icon={container.icon}
                                    itemName={container.itemName}
                                    name={container.name}
                                    image={container.image}
                                    imagePullPolicy={container.imagePullPolicy}
                                    restartPolicy={container.restartPolicy}
                                    resourcesLimitsCpu={container.resourcesLimitsCpu}
                                    resourcesLimitsMemory={container.resourcesLimitsMemory}
                                    resourcesLimitsMemorySize={container.resourcesLimitsMemorySize}
                                    resourcesRequestsCpu={container.resourcesRequestsCpu}
                                    resourcesRequestsMemory={container.resourcesRequestsMemory}
                                    resourcesRequestsMemorySize={container.resourcesRequestsMemorySize}
                                    envs={container.envs}
                                    ports={container.ports}
                                    readinessProbe={container.readinessProbe}
                                    readinessProbeProtocol={container.readinessProbeProtocol}
                                    readinessProbeHttpGet={container.readinessProbeHttpGet}
                                    readinessProbeHttpGetPath={container.readinessProbeHttpGetPath}
                                    readinessProbeHttpGetPort={container.readinessProbeHttpGetPort}
                                    readinessProbeHttpGetInitialDelaySeconds={container.readinessProbeHttpGetInitialDelaySeconds}
                                    readinessProbeHttpGetPeriodSeconds={container.readinessProbeHttpGetPeriodSeconds}
                                    readinessProbeHttpGetSuccessThreshold={container.readinessProbeHttpGetSuccessThreshold}
                                    readinessProbeHttpGetFailureThreshold={container.readinessProbeHttpGetFailureThreshold}
                                    readinessProbeTcpSocketPort={container.readinessProbeTcpSocketPort}
                                    readinessProbeTcpSocketInitialDelaySeconds={container.readinessProbeTcpSocketInitialDelaySeconds}
                                    readinessProbeTcpSocketPeriodSeconds={container.readinessProbeTcpSocketPeriodSeconds}
                                    readinessProbeTcpSocketSuccessThreshold={container.readinessProbeTcpSocketSuccessThreshold}
                                    readinessProbeTcpSocketFailureThreshold={container.readinessProbeTcpSocketFailureThreshold}
                                    readinessProbeHttpGetHttpHeaders={container.readinessProbeHttpGetHttpHeaders}
                                    readinessProbeHttpGetScheme={container.readinessProbeHttpGetScheme}
                                    livenessProbe={container.livenessProbe}
                                    livenessProbeProtocol={container.livenessProbeProtocol}
                                    livenessProbeHttpGet={container.livenessProbeHttpGet}
                                    livenessProbeHttpGetPath={container.livenessProbeHttpGetPath}
                                    livenessProbeHttpGetPort={container.livenessProbeHttpGetPort}
                                    livenessProbeHttpGetInitialDelaySeconds={container.livenessProbeHttpGetInitialDelaySeconds}
                                    livenessProbeHttpGetPeriodSeconds={container.livenessProbeHttpGetPeriodSeconds}
                                    livenessProbeHttpGetSuccessThreshold={container.livenessProbeHttpGetSuccessThreshold}
                                    livenessProbeHttpGetFailureThreshold={container.livenessProbeHttpGetFailureThreshold}
                                    livenessProbeHttpGetHttpHeaders={container.livenessProbeHttpGetHttpHeaders}
                                    livenessProbeHttpGetScheme={container.livenessProbeHttpGetScheme}
                                    livenessProbeTcpSocketPort={container.livenessProbeTcpSocketPort}
                                    livenessProbeTcpSocketInitialDelaySeconds={container.livenessProbeTcpSocketInitialDelaySeconds}
                                    livenessProbeTcpSocketPeriodSeconds={container.livenessProbeTcpSocketPeriodSeconds}
                                    livenessProbeTcpSocketSuccessThreshold={container.livenessProbeTcpSocketSuccessThreshold}
                                    livenessProbeTcpSocketFailureThreshold={container.livenessProbeTcpSocketFailureThreshold}
                                    volumeMounts={container.volumeMounts}
                                    collectionState={collectionState}
                                    componentId={componentId}
                                    handlers={{
                                        addComponentHandler: handlers.addComponentHandler,
                                        changeTextFieldHandler: handlers.changeTextFieldHandler,
                                        deleteComponentHandler: handlers.deleteComponentHandler
                                    }}
                                />
                            })
                        }
                    </Grid>
                </Grid>
            </>
        );
    }
}

MicroServiceComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MicroServiceComponent);