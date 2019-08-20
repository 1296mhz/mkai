import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ContainerPortComponentTheme';

class ContainerPortComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentId,
            containerId,
            collectionState,
            portId,
            name,
            containerPort,
            hostIP,
            hostPort,
            protocol,
            changeTextFieldHandler,
            deleteComponentHandler
        } = this.props;
        const protocols = ['TCP', 'UDP', 'SCTP'];
        return (
            <>
                <Grid container >
                    <Grid container item xs={11}>
                        <Grid item xs={3} className={classes.grid}>
                            <TextField
                                required
                                id="name"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.ports.${portId}.name`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item xs={3} className={classes.grid}>
                            <TextField
                                required
                                id="containerPort"
                                label="ContainerPort"
                                name="containerPort"
                                value={containerPort}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.ports.${portId}.containerPort`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item xs={2} className={classes.grid}>
                            <TextField
                                id="protocol"
                                select
                                label="Protocol"
                                name="protocol"
                                className={classes.textField}
                                value={protocol}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.ports.${portId}.protocol`) }}
                                helperText="Please select protocol"
                                margin="dense"
                            >
                                {protocols.map((protocol, i) => {
                                    return (
                                        <MenuItem key={i} value={protocol}>{protocol}</MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>

                        <Grid item xs={2} className={classes.grid}>
                            <TextField
                                required
                                id="hostIP"
                                label="HostIP"
                                name="hostIP"
                                value={hostIP}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.ports.${portId}.hostIP`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item xs={2} className={classes.grid}>
                            <TextField
                                required
                                id="hostPort"
                                label="HostPort"
                                name="hostPort"
                                value={hostPort}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.containers.${containerId}.ports.${portId}.hostPort`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => deleteComponentHandler(`${collectionState}.${componentId}.containers.${containerId}.ports.${portId}`)}>
                            <Icon>remove_circle_outline</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        );
    }
}

ContainerPortComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainerPortComponent);