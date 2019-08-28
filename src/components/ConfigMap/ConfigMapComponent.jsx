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
import styles from './ConfigMapComponentTheme';

class ConfigMapComponent extends React.Component {
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
            itemName,
            icon,
            label } = this.props;

        const env = {
            componentPath: "",
            envKey: "",
            envValue: "",
            envType: ""
        }

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
                {
                    map(envs, (env, index) => {
                        return <EnvComponent
                            key={index}
                            componentPath={env.componentPath}
                            envId={index}
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

ConfigMapComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigMapComponent);