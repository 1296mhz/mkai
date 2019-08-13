import React from 'react';
import { findIndex, filter } from "lodash";
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ControlShelfComponent from './ControlShelfComponent';
import BaseFieldsComponent from './BaseFieldsComponent';
import ConfigMapsComponent from "./ConfigMapsComponent";
import SecretsComponent from "./SecretsComponent";
import { set } from "lodash";
import styles from './StackComponentTheme';

class StackComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainFields: {
                hostnameId: "1",
                hostnameLabel: "Hostname",
                hostname: "",
                namespaceId: "2",
                namespaceLabel: "Namespace",
                namespace: "",
                branchId: "3",
                branchLabel: "Branch",
                branch: ""
            },
            configMaps: {},
            secrets: {},
            endPoints: {},
            microServices: {},
            secretTypes: ['Opaque', 'kubernetes.io/service-account-token', 'kubernetes.io/dockercfg', 'kubernetes.io/dockerconfigjson'],
            envTypes: ['string', 'base64']
        };
        //Shelf handlers
        this.saveStateHandler = this.saveStateHandler.bind(this);

    }

    saveStateHandler() {
        console.log("save")
        console.log(this.state)
    }

    changeFieldHandler(e, path, componentId) {
        let newState = Object.assign({}, this.state);
        newState.mainFields = {
            ...this.state[path],
            [e.target.name]: e.target.value
        }
        this.setState(newState);
    }

    addComponentHandler() {
        const d = new Date();
        const id = d.getTime();
        console.log("New Component id: ", id - 1000000000000);

        this.setState({...this.state, configMaps: {
            ...this.state.configMaps,
            [id]: {
                name: "",
                envs: {
                },
                deleteComponentHandler: this.deleteComponentHandler,
            },
        }});
    }

   

    deleteComponent(id, collectionInState) {
        this.setState({ [collectionInState]: filter(this.state[collectionInState], item => item.id !== id) });
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
                                    { id: 1, icon: 'no_encryption', command: 'configMap', handler: this.addHandler },
                                    { id: 2, icon: 'enhanced_encryption', command: 'secret', handler: this.addHandler },
                                    { id: 3, icon: 'swap_horiz', command: 'configMap', handler: this.addEndPointHandler },
                                    { id: 4, icon: 'view_module',command: 'configMap', handler: this.addMicroServiceHandler }
                                ]}
                            />
                        </Grid>
                        <Divider />
                        <BaseFieldsComponent fields={
                            [
                                {
                                    id: this.state.mainFields.namespaceId,
                                    name: "namespace",
                                    label: this.state.mainFields.namespaceLabel,
                                    value: this.state.mainFields.namespace,
                                    handler: this.changeFieldHandler
                                },
                                {
                                    id: this.state.mainFields.hostnameId,
                                    name: "hostname",
                                    label: this.state.mainFields.hostnameLabel,
                                    value: this.state.mainFields.hostname,
                                    handler: this.changeFieldHandler
                                },
                                {
                                    id: this.state.mainFields.branchId,
                                    name: "branch",
                                    label: this.state.mainFields.branchLabel,
                                    value: this.state.mainFields.branch,
                                    handler: this.changeFieldHandler
                                }
                            ]
                        } />
                        <ConfigMapsComponent
                            configMaps={this.state.configMaps}
                        />

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