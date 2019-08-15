import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { map } from 'lodash';
import PortComponent from '../Port/PortComponent';
import styles from './EndPointComponentTheme';

class EndPointComponent extends React.Component {
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
            name,
            externalName,
            ports,
            itemName,
            icon
        } = this.props;
        const port = {
            name: '',
            externalName: '',
            port: '',
            targetPort: '',
            protocol: '',
        };
        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            <span className={classes.message}>
                                <img className={classes.icon} src={icon} alt="container" height="24" width="24" />
                                {itemName}: {name.charAt(0).toUpperCase()+name.substr(1)}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newEnv = Object.assign({}, port)
                                handlers.addComponentHandler(`${collectionState}.${componentId}.ports.${id}`, newEnv);
                            }}
                        >
                            <Icon>usb</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => handlers.deleteComponentHandler(`${collectionState}.${componentId}`)}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container justify="flex-start" className={classes.grid}>
                    <Grid item xs={12} className={classes.grid}>
                        <TextField
                            required
                            id="endpoint-name"
                            label="Name"
                            value={name}
                            name="endpoint-name"
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.name`)}
                            margin="dense"
                        />
                        <TextField
                            required
                            id="external-name"
                            label="External Name DNS name"
                            value={externalName}
                            name="external-name"
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.externalName`)}
                            margin="dense"
                        />
                    </Grid>
                    {
                        map(ports, (port, index) => {
                            return <PortComponent
                                key={index}
                                componentId={componentId}
                                portId={index}
                                collectionState={collectionState}
                                name={port.name}
                                port={port.port}
                                targetPort={port.targetPort}
                                protocol={port.protocol}
                                addComponentHandler={handlers.addComponentHandler}
                                changeTextFieldHandler={handlers.changeTextFieldHandler}
                                deleteComponentHandler={handlers.deleteComponentHandler}
                            />
                        })
                    }
                </Grid>
            </>
        );
    }
}

EndPointComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EndPointComponent);