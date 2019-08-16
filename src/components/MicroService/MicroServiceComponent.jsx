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
            imagePullPolicy: "",
            restartPolicy: "",
            resourcesLimitsCpu: "",
            resourcesLimitsMemory: "",
            resourcesRequestsCpu: "",
            resourcesRequestsMemory: "",
            ports: {},
            readinessProbe: {},
            livenessProbe: {},
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
                                    resourcesRequestsCpu={container.resourcesRequestsCpu}
                                    resourcesRequestsMemory={container.resourcesRequestsMemory}
                                    ports={container.ports}
                                    readinessProbe={container.readinessProbe}
                                    livenessProbe={container.livenessProbe}
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