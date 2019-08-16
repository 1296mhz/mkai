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
            resourcesRequestsCpu,
            resourcesRequestsMemory,
            ports,
            readinessProbe,
            livenessProbe,
            volumeMounts,
        } = this.props;
        const policiesPullImagePolicies = ['Always', 'OnFailure', 'Never'];
        const restartPullPolicies = ['IfNotPresent', 'Always'];
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
                                // const newEnv = Object.assign({}, env)
                                // handlers.addComponentHandler(`${collectionState}.${componentId}.envs.${id}`, newEnv);
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
                </Grid>
            </>
        );
    }
}

ContainerComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainerComponent);