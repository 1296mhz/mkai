import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuItem from '@material-ui/core/MenuItem';
import EnvsComponent from "./EnvsComponent";

const styles = theme => ({
    textField: {
        width: "100%"
    },
    margin: {
        margin: theme.spacing(1)
        // margin: '8px 0',
    },
    padding: {
        padding: theme.spacing(2)
    },
    iconButton: {
        padding: 0
    },
    title: {
        marginTop: theme.spacing(1)
    },
    grid: {
        padding: theme.spacing(1)
    },
    gridRow: {
        padding: theme.spacing(1)
    },
});

class SecretComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            envTypes,
            componentId,
            classes,
            changeFieldNameSecretHandler,
            deleteConfigMapComponent,
            addEnvToSecretHandler,
            deleteEnvConfigMapComponent,
            changeEnvConfigMapHandler,
            changeSelectorTypeHandler,
            envs,
            name,
            label
        } = this.props;
        const types = ['Opaque', 'kubernetes.io/service-account-token', 'kubernetes.io/dockercfg', 'kubernetes.io/dockerconfigjson'];
        console.log(envs)
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
                            onClick={() => addEnvToSecretHandler(componentId)}
                        >
                            <Icon>title</Icon>
                        </IconButton>
                        <IconButton
                            onClick={() => deleteConfigMapComponent(componentId)}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container justify="flex-start" >
                    <Grid item xs={8} className={classes.grid}>
                        <TextField
                            required
                            id="standard-name"
                            label="Name"
                            value={name}
                            name={label}
                            className={classes.textField}
                            onChange={(e) => changeFieldNameSecretHandler(e, componentId)}
                            margin="dense"
                        />
                    </Grid>

                    <Grid item xs={3} className={classes.grid}>
                        <TextField
                            id="standard-secretType"
                            select
                            label="Type"
                            className={classes.textField}
                            value={this.props.type}
                            name="Type"
                            onChange={(e) => { changeSelectorTypeHandler(e, componentId) }}
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

                <EnvsComponent
                    envs={envs}
                    envTypes={envTypes}
                    handlers={{
                        changeEnvConfigMapHandler: changeEnvConfigMapHandler,
                        deleteEnvConfigMapComponent: deleteEnvConfigMapComponent
                    }}
                    componentId={componentId}
                />
            </>
        );
    }
}

SecretComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SecretComponent);