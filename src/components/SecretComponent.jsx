import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EnvComponent from './EnvComponent';
import { map } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './SecretComponentTheme';

class SecretComponent extends React.Component {
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
            envs,
            name,
            type,
            label } = this.props;
        const env = {
            envKey: "",
            envValue: "",
            envType: ""
        }
        const types = ['Opaque', 'kubernetes.io/service-account-token', 'kubernetes.io/dockercfg', 'kubernetes.io/dockerconfigjson'];
        return (
            <>
                <Divider />
                <Grid item container xs={12} sm>
                    <Grid item xs>
                        <Typography variant="h6" className={classes.title}>
                            Secret: {name}
                        </Typography>
                    </Grid>
                    <Grid item container xs justify="flex-end" className={classes.grid}>
                        <IconButton
                            onClick={() => {
                                const id = this.newId();
                                const newEnv = Object.assign({}, env)
                                handlers.addComponentHandler(`${collectionState}.${componentId}.envs.${id}`, newEnv);
                            }}
                        >
                            <Icon>title</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => handlers.deleteComponentHandler(`${collectionState}.${componentId}`)}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container justify="flex-start" className={classes.grid}>
                    <Grid item xs={9} className={classes.grid}>
                        <TextField
                            required
                            id="standard-name"
                            label="Name"
                            value={name}
                            name={label}
                            className={classes.textField}
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.name`)}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            id="standard-secretType"
                            select
                            label="Type"
                            className={classes.textField}
                            value={type}
                            name="Type"
                            onChange={(e) => { handlers.changeTextFieldHandler(e, `${collectionState}.${componentId}.type`) }}
                            helperText="Please select type"
                            margin="dense"
                        >

                            {types.map((type, i) => {
                                return (
                                    <MenuItem key={i} value={type}>{type}</MenuItem>
                                );
                            })}

                        </TextField>
                    </Grid>

                </Grid>
                {
                    map(envs, (env, index) => {
                        return <EnvComponent
                            key={index}
                            envId={index}
                            envKey={env.envKey}
                            envValue={env.envValue}
                            envType={env.envType}
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

SecretComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SecretComponent);