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
            ingresses,
            services,
            volumes,
            imagePullSecrets,
            envs
        } = this.props;
        const annotation = {
            field: "",
        }

        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            <span className={classes.message}>
                                <img className={classes.icon} src={icon} alt="container" height="24" width="24" />
                                {itemName}: {deploymentName}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton onClick={() => {
                            const id = this.newId();
                            // const newEnv = Object.assign({}, env)
                            // handlers.addComponentHandler(`${collectionState}.${componentId}.envs.${id}`, newEnv);
                        }}>
                            <img src="icon/pod.svg" alt="container" height="24" width="24" />
                        </IconButton>
                        <IconButton>
                            <img src="icon/vol.svg" alt="container" height="24" width="24" />
                        </IconButton>
                        <IconButton>
                            <img src="icon/svc.svg" alt="container" height="24" width="24" />
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

            </>
        );
    }
}

MicroServiceComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MicroServiceComponent);