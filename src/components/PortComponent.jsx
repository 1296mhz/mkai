import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    textFieldKey: {
        width: '100%'
    },
    textFieldValue: {
        width: '100%'
    },
    margin: {
        margin: theme.spacing(1)
        // margin: '8px 0',
    },
    padding: {
        padding: theme.spacing(1)
    },
    iconButton: {
        padding: 0
    },
    title: {
        marginTop: theme.spacing(1)
    },
    grid: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)
    },
    gridDelete: {
        padding: theme.spacing(1),
        paddingRight: theme.spacing(0),
        textAlign: 'right'
    },
    container: {
        alignItems: 'center',
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    formControl: {
        margin: theme.spacing(0),
    },
});

class PortComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentId,
            collectionState,
            portId,
            name,
            protocol,
            port,
            targetPort,
            changeTextFieldHandler,
            deleteComponentHandler
        } = this.props;
        const protocols = ['TCP', 'UDP', 'HTTP'];
        return (
            <>
                <Grid container >
                    <Grid container item xs={11}>

                        <Grid item xs={7} className={classes.grid}>
                            <TextField
                                required
                                id="port-name"
                                label="Port Name"
                                name="portName"
                                className={classes.textFieldKey}
                                value={name}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.ports.${portId}.name`) }}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item xs={1} className={classes.grid}>
                            <TextField
                                id="standard-select-protocol"
                                select
                                label="Protocol"
                                name="protocol"
                                className={classes.textField}
                                value={protocol}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.ports.${portId}.protocol`) }}
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
                                id="port"
                                label="Port"
                                name="port"
                                value={port}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.ports.${portId}.port`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item xs={2} className={classes.grid}>
                            <TextField
                                required
                                id="target-port"
                                label="Target Port"
                                name="targetport"
                                value={targetPort}
                                onChange={(e) => { changeTextFieldHandler(e, `${collectionState}.${componentId}.ports.${portId}.targetPort`) }}
                                className={classes.textFieldKey}
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={1} item className={classes.gridDelete}>
                        <IconButton onClick={() => deleteComponentHandler(`${collectionState}.${componentId}.ports.${portId}`)}>
                            <Icon>remove_circle_outline</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </>
        );
    }
}

PortComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PortComponent);