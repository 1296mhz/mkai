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
            componentPath,
            classes,
            handlers,
            envs,
            name,
            type,
            itemName,
            icon,
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
                                const newEnv = Object.assign({}, {
                                    ...env,
                                    componentPath: `${componentPath}.envs.${id}`
                                })
                                handlers.addComponentHandler(`${componentPath}.envs.${id}`, newEnv);
                            }}
                        >
                            <Icon>nature_people</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => handlers.deleteComponentHandler(`${componentPath}`)}
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
                            onChange={(e) => handlers.changeTextFieldHandler(e, `${componentPath}.name`)}
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
                            onChange={(e) => { handlers.changeTextFieldHandler(e, `${componentPath}.type`) }}
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
                            componentPath={env.componentPath}
                            envKey={env.envKey}
                            envValue={env.envValue}
                            envType={env.envType}
                            changeTextFieldHandler={handlers.changeTextFieldHandler}
                            deleteComponentHandler={handlers.deleteComponentHandler}
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