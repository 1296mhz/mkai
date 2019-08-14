import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import EnvComponent from "./EnvComponent";
import { map } from "lodash";

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
    }
});

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
            collectionState,
            componentId,
            classes,
            handlers,
            envs,
            name,
            label } = this.props;
        const env = {
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
                            Config Map: {name}
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

ConfigMapComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigMapComponent);