import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ControlShelfComponent from './ControlShelfComponent';
import BaseFieldsComponent from './BaseFieldsComponent';
import ConfigMapComponent from "./ConfigMapComponent";

import styles from './StackComponentTheme';
import { set, unset, map } from "lodash";

class StackComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainFields: {
                1: {
                    label: "Hostname",
                    name: "namespace",
                    value: ""
                },
                2: {
                    label: "Namespace",
                    name: "namespace",
                    value: ""
                },
                3: {
                    label: "Branch",
                    name: "branch",
                    value: ""
                }
            },
            configMaps: {},
            secrets: {},
            endPoints: {},
            microServices: {},
            secretTypes: ['Opaque', 'kubernetes.io/service-account-token', 'kubernetes.io/dockercfg', 'kubernetes.io/dockerconfigjson'],
        };

        this.addComponentHandler = this.addComponentHandler.bind(this);
        this.deleteComponentHandler = this.deleteComponentHandler.bind(this);
        this.changeTextFieldHandler = this.changeTextFieldHandler.bind(this);
        //Shelf handlers

        this.saveStateHandler = this.saveStateHandler.bind(this);

    }

    saveStateHandler() {
        console.log("save")
        console.log(this.state)
    }

    changeTextFieldHandler(e, path) {
        console.log(path, e.target.value);
        let newState = Object.assign({}, this.state);
        set(newState, `${path}`, e.target.value);
        this.setState(newState);
    }

    addComponentHandler(path, value) {
        let newState = Object.assign({}, this.state);
        set(newState, path, value);
        this.setState(newState);
    }

    deleteComponentHandler(item) {
        console.log("Delte component: " + item)
        const newState = Object.assign({}, this.state);
        unset(newState, item);
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper className={classes.paper}>
                    <Grid item >
                        <Grid item xs>
                            <Typography variant="h6" gutterBottom>
                                Kubernetes Application Integrate
                                </Typography>
                        </Grid>
                        <Grid container item xs>
                            <ControlShelfComponent
                                shelf={[
                                    {
                                        id: 1,
                                        icon: 'no_encryption',
                                        command: 'configMaps',
                                        item: {
                                            name: "",
                                            envs: {
                                            },
                                            collectionState: 'configMaps',
                                            addEnvHandler: this.addComponentHandler,
                                            changeTextFieldHandler: this.changeTextFieldHandler,
                                            deleteComponentHandler: this.deleteComponentHandler,
                                        },
                                        handler: this.addComponentHandler
                                    },
                                    { id: 2, icon: 'enhanced_encryption', command: 'secrets', handler: this.addComponentHandler },
                                    { id: 3, icon: 'swap_horiz', command: 'endPoints', handler: this.addComponentHandler },
                                    { id: 4, icon: 'view_module', command: 'microServices', handler: this.addComponentHandler }
                                ]}
                            />
                        </Grid>
                        <Divider />

                        <BaseFieldsComponent
                            fields={this.state.mainFields}
                            collection="mainFields"
                            handlers={{ changeTextFieldHandler: this.changeTextFieldHandler }} />
                        {

                            map(this.state.configMaps, (configMap, index) => {
                                return <ConfigMapComponent
                                    key={index}
                                    componentId={index}
                                    collectionState={configMap.collectionState}
                                    label={configMap.label}
                                    name={configMap.name}
                                    envs={configMap.envs}
                                    env={configMap.env}
                                    addEnvHandler={configMap.addEnvHandler}
                                    changeTextFieldHandler={configMap.changeTextFieldHandler}
                                    deleteComponentHandler={configMap.deleteComponentHandler}
                                />
                            })
                        }

                    </Grid>
                    <Divider />
                    <Button onClick={this.saveStateHandler} color="primary" className={classes.buttonStyle}>
                        Save
                    </Button>

                </Paper>
            </>
        )
    }
}

export default withStyles(styles)(StackComponent);