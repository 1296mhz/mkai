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
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    buttonStyle: {
        margin: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}
);

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
            configMaps: [],
            secrets: [],
            endPoints: [],
            microServices: []
        };
        //Shelf handlers
        this.addConfigMapHandler = this.addConfigMapHandler.bind(this);
        this.addSecretHandler = this.addSecretHandler.bind(this);
        this.addEndPointHandler = this.addEndPointHandler.bind(this);
        this.addMicroServiceHandler = this.addMicroServiceHandler.bind(this);


        this.changeMainFieldHandler = this.changeMainFieldHandler.bind(this);
        this.deleteConfigMapComponent = this.deleteConfigMapComponent.bind(this);
        this.addEnvToConfigMapHandler = this.addEnvToConfigMapHandler.bind(this);
        this.changeFieldNameConfigMap = this.changeFieldNameConfigMap.bind(this);

        this.changeEnvConfigMap = this.changeEnvConfigMap.bind(this);

        this.deleteSecretComponent = this.deleteSecretComponent.bind(this);
        this.changeFieldNameSecret = this.changeFieldNameSecret.bind(this);
        this.addEnvToSecret = this.addEnvToSecret.bind(this);
        this.changeEnvSecret = this.changeEnvSecret.bind(this);

        this.changeFieldNameEndPoint = this.changeFieldNameEndPoint.bind(this);
        this.deleteEndPointComponent = this.deleteEndPointComponent.bind(this);
        this.addPortToEndPoint = this.addPortToEndPoint.bind(this);
        this.changePortEndPoint = this.changePortEndPoint.bind(this);

        this.deleteMicroServiceHandler = this.deleteMicroServiceHandler.bind(this);
        this.changeMaxSurgeHandler = this.changeMaxSurgeHandler.bind(this);
        this.changeMaxUnavailableHandler = this.changeMaxUnavailableHandler.bind(this);
        this.changeProbePathHandler = this.changeProbePathHandler.bind(this);

        this.saveStateHandler = this.saveStateHandler.bind(this);

    }

    saveStateHandler() {
        console.log("save")
        console.log(this.state)
    }

    changeMainFieldHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        let newState = Object.assign({}, this.state);
        switch (name) {
            case 'Namespace':
                newState.mainFields = {
                    ...this.state.mainFields,
                    namespace: value
                }
                break;
            case 'Hostname':
                newState.mainFields = {
                    ...this.state.mainFields,
                    hostname: value
                }
                break;
            case 'Branch':
                newState.mainFields = {
                    ...this.state.mainFields,
                    branch: value
                }
                break;
            default:
                break;
        }
        this.setState(newState);
    }

    addConfigMapHandler() {
        const d = new Date();
        const id = d.getTime();
        console.log("Config Map id ", id - 1000000000000)
        this.setState(state => ({
            configMaps: [...state.configMaps, {
                id: id,
                componentId: id,
                title: "Config Map",
                label: "Name",
                name: "",
                env: [],
                changeFieldNameConfigMap: this.changeFieldNameConfigMap,
                panelButton: [{
                    id: 0,
                    name: 'Add Env',
                    handler: this.addEnvToConfigMapHandler
                }],
            }]
        }));
    }

    changeFieldNameConfigMap(e, componentId) {
        const configMapId = findIndex(this.state.configMaps, { 'id': componentId })
        let newState = Object.assign({}, this.state);
        newState.configMaps[configMapId].name = e.target.value
        this.setState(newState)
    }

    addEnvToConfigMapHandler(id) {
        console.log("Add env to configMap " + id);
        const d = new Date();
        const idEnv = d.getTime();
        const configMapId = findIndex(this.state.configMaps, { 'id': id })
        let newState = Object.assign({}, this.state);
        newState.configMaps[configMapId].env.push({ id: idEnv, key: "", value: "" });
        this.setState(newState)
    }

    changeEnvConfigMap(e, componentId, envId) {
        const configMapIndex = findIndex(this.state.configMaps, { 'id': componentId });
        const envIndex = findIndex(this.state.configMaps[configMapIndex].env, { 'id': envId });
        let newState = Object.assign({}, this.state);
        switch (e.target.name) {
            case 'delete':
                newState.configMaps[configMapIndex].env.splice(envIndex, 1);
                break;
            case 'key':
                newState.configMaps[configMapIndex].env[envIndex] = {
                    ...this.state.configMaps[configMapIndex].env[envIndex],
                    key: e.target.value
                }
                break;
            case 'value':
                newState.configMaps[configMapIndex].env[envIndex] = {
                    ...this.state.configMaps[configMapIndex].env[envIndex],
                    value: e.target.value
                }
                break;
            default:
                break;
        }
        this.setState(newState)
    }

    deleteConfigMapComponent(id) {
        console.log(id)
        this.setState({ 'configMaps': filter(this.state.configMaps, item => item.id !== id) });
    }

    addSecretHandler() {
        const d = new Date();
        const id = d.getTime();
        console.log("Secret id ", id - 1000000000000)
        this.setState(previousState => ({
            secrets: [...previousState.secrets, {
                id: id,
                componentId: id,
                title: "Secrets",
                label: "Name",
                name: "My Secret Name",
                env: [],
                panelButton: [{
                    id: 0,
                    name: 'Add Env',
                    handler: this.addEnvToSecret
                }],
            }]
        }));
    }

    deleteSecretComponent(id) {
        this.setState({ 'secrets': filter(this.state.secrets, item => item.id !== id) });
    }

    changeFieldNameSecret(e, componentId) {
        const secretId = findIndex(this.state.secrets, { 'id': componentId })
        let newState = Object.assign({}, this.state);
        newState.secrets[secretId].name = e.target.value
        this.setState(newState)
    }

    addEnvToSecret(id) {
        console.log("Add env to secret " + id);
        const d = new Date();
        const idEnv = d.getTime();
        const secretId = findIndex(this.state.secrets, { 'id': id })
        let newState = Object.assign({}, this.state);
        newState.secrets[secretId].env.push({ id: idEnv, key: "", value: "", type: "Opaque", dataType: "data" });
        this.setState(newState)
    }

    changeEnvSecret(e, componentId, envId) {
        const secretIndex = findIndex(this.state.secrets, { 'id': componentId });
        const envIndex = findIndex(this.state.secrets[secretIndex].env, { 'id': envId });
        let newState = Object.assign({}, this.state);
        switch (e.target.name) {
            case 'dataType':
                newState.secrets[secretIndex].env[envIndex] = {
                    ...this.state.secrets[secretIndex].env[envIndex],
                    dataType: e.target.value
                }
                break;
            case 'selectType':
                newState.secrets[secretIndex].env[envIndex] = {
                    ...this.state.secrets[secretIndex].env[envIndex],
                    type: e.target.value
                }
                break;
            case 'delete':
                newState.secrets[secretIndex].env.splice(envIndex, 1)
                break;
            case 'key':
                newState.secrets[secretIndex].env[envIndex] = {
                    ...this.state.secrets[secretIndex].env[envIndex],
                    key: e.target.value
                }
                break;
            case 'value':
                newState.secrets[secretIndex].env[envIndex] = {
                    ...this.state.secrets[secretIndex].env[envIndex],
                    value: e.target.value
                }
                break;
            default:
                break;
        }
        this.setState(newState)
    }

    addEndPointHandler() {
        const d = new Date();
        const id = d.getTime();
        console.log("End point id ", id - 1000000000000)
        this.setState(previousState => ({
            endPoints: [...previousState.endPoints, {
                id: id,
                title: "End Point",
                label: "Name",
                name: {
                    name: "Name",
                    value: ""
                },
                externalName: {
                    name: "ExternalName",
                    value: ""
                },
                ports: [],
                panelButton: [{
                    id: 0,
                    name: 'Add Ports',
                    handler: this.addPortToEndPoint
                }],
            }]
        }));
    }

    changeFieldNameEndPoint(e, componentId) {
        const endPointId = findIndex(this.state.endPoints, { 'id': componentId });
        let newState = Object.assign({}, this.state);
        switch (e.target.name) {
            case 'Name':
                newState.endPoints[endPointId].name.value = e.target.value
                break;
            case 'ExternalName':
                newState.endPoints[endPointId].externalName.value = e.target.value
                break;
            default:
                break;
        }
        this.setState(newState)
    }

    changePortEndPoint(e, componentId, portId) {
        const endPointIndex = findIndex(this.state.endPoints, { 'id': componentId });
        const portIndex = findIndex(this.state.endPoints[endPointIndex].ports, { 'id': portId });
        let newState = Object.assign({}, this.state);
        switch (e.target.name) {
            case 'delete':
                newState.endPoints[endPointIndex].ports.splice(portIndex, 1)
                break;
            case 'portName':
                newState.endPoints[endPointIndex].ports[portIndex] = {
                    ...this.state.endPoints[endPointIndex].ports[portIndex],
                    portName: e.target.value
                }
                break;
            case 'protocol':
                newState.endPoints[endPointIndex].ports[portIndex] = {
                    ...this.state.endPoints[endPointIndex].ports[portIndex],
                    protocol: e.target.value
                }
                break;
            case 'port':
                newState.endPoints[endPointIndex].ports[portIndex] = {
                    ...this.state.endPoints[endPointIndex].ports[portIndex],
                    port: e.target.value
                }
                break;
            case 'targetPort':
                newState.endPoints[endPointIndex].ports[portIndex] = {
                    ...this.state.endPoints[endPointIndex].ports[portIndex],
                    targetPort: e.target.value
                }
                break;
            default:
                break;
        }
        this.setState(newState);
    }

    deleteEndPointComponent(id) {
        this.setState({ 'endPoints': filter(this.state.endPoints, item => item.id !== id) });
    }

    addPortToEndPoint(id) {
        console.log("add port to end point " + id);
        const d = new Date();
        const idPort = d.getTime();
        const endPointId = findIndex(this.state.endPoints, { 'id': id })
        let newState = Object.assign({}, this.state);
        newState.endPoints[endPointId].ports.push({ id: idPort, portName: "", port: 80, targetPort: 80, protocol: "TCP" });
        this.setState(newState)
    }

    addMicroServiceHandler() {
        const d = new Date();
        const id = d.getTime();
        console.log("Micro service id ", id - 1000000000000)
        this.setState(state => ({
            microServices: [...state.microServices, {
                id: id,
                title: "Micro Service",
                servicePorts: [],
                env: [],
                ingressAnnotations: []
            }]
        }));
    }

    changeMaxSurgeHandler() {
        console.log("changeMaxSurgeHandler")
    }
    changeMaxUnavailableHandler() {
        console.log("changeMaxUnavailableHandler")
    }
    changeProbePathHandler() {
        console.log("changeProbePathHandler")
    }
    changeIngressAnnotationHandler() {
        console.log("changeIngressAnnotationHandler")
    }
    deleteMicroServiceHandler(id) {
        this.setState({ 'microServices': filter(this.state.microServices, item => item.id !== id) });
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
                                    { id: 1, icon: 'no_encryption', handler: this.addConfigMapHandler },
                                    { id: 2, icon: 'enhanced_encryption', handler: this.addSecretHandler },
                                    { id: 3, icon: 'swap_horiz', handler: this.addEndPointHandler },
                                    { id: 4, icon: 'view_module', handler: this.addMicroServiceHandler }
                                ]}
                            />
                        </Grid>
                        <Divider />
                        <BaseFieldsComponent fields={
                            [
                                {
                                    id: this.state.mainFields.namespaceId,
                                    name: "Namespace",
                                    label: this.state.mainFields.namespaceLabel,
                                    value: this.state.mainFields.namespace,
                                    handler: this.changeMainFieldHandler
                                },
                                {
                                    id: this.state.mainFields.hostnameId,
                                    name: "Hostname",
                                    label: this.state.mainFields.hostnameLabel,
                                    value: this.state.mainFields.hostname,
                                    handler: this.changeMainFieldHandler
                                },
                                {
                                    id: this.state.mainFields.branchId,
                                    name: "Branch",
                                    label: this.state.mainFields.branchLabel,
                                    value: this.state.mainFields.branch,
                                    handler: this.changeMainFieldHandler
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