import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ControlShelfComponent from '../ControlShelf/ControlShelfComponent';
import BaseFieldsComponent from '../BaseFields/BaseFieldsComponent';
import ConfigMapComponent from '../ConfigMap/ConfigMapComponent';
import SecretComponent from '../Secret/SecretComponent';
import EndPointComponent from '../EndPoint/EndPointComponent';
import MicroServiceComponent from '../MicroService/MicroServiceComponent';
import DrawerTree from '../DrawerTree/DrawerTreeComponent';
import styles from './StackComponentTheme';
import { set, unset, map } from 'lodash';

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
        };

        this.addComponentHandler = this.addComponentHandler.bind(this);
        this.deleteComponentHandler = this.deleteComponentHandler.bind(this);
        this.changeTextFieldHandler = this.changeTextFieldHandler.bind(this);
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
        console.log("Add component handler")
        console.log(path, value)
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
                <DrawerTree
                    tree={this.state}
                    handlers={{
                        addComponentHandler: this.addComponentHandler,
                        changeTextFieldHandler: this.changeTextFieldHandler,
                        deleteComponentHandler: this.deleteComponentHandler,
                    }}
                />
                <Paper className={classes.paper}>
                    <Grid item >
                        <Grid item xs>
                            <Typography variant="h6" gutterBottom>
                                Stack name: 
                                </Typography>
                        </Grid>
                        <Grid container item xs>
                            <ControlShelfComponent
                                shelf={[
                                    {
                                        id: 1,
                                        icon: 'icon/cm.svg',
                                        command: 'configMaps',
                                        item: {
                                            itemName: 'Config Map',
                                            icon: 'icon/cm.svg',
                                            name: "",
                                            envs: {},
                                            componentPath: ""
                                        },
                                        handlers: {
                                            addComponentHandler: this.addComponentHandler,
                                            changeTextFieldHandler: this.changeTextFieldHandler,
                                            deleteComponentHandler: this.deleteComponentHandler,
                                        }
                                    },
                                    {
                                        id: 2,
                                        icon: 'icon/secret.svg',
                                        command: 'secrets',
                                        item: {
                                            itemName: 'Secrets',
                                            icon: 'icon/secret.svg',
                                            name: "",
                                            type: "",
                                            nameLabel: "",
                                            envs: {
                                            },
                                            componentPath: ""
                                        },
                                        handlers: {
                                            addComponentHandler: this.addComponentHandler,
                                            changeTextFieldHandler: this.changeTextFieldHandler,
                                            deleteComponentHandler: this.deleteComponentHandler,
                                        }
                                    },
                                    {
                                        id: 3,
                                        icon: 'icon/ep.svg',
                                        command: 'endPoints',
                                        item: {
                                            itemName: 'End Point',
                                            icon: 'icon/ep.svg',
                                            name: "",
                                            type: "",
                                            externalName: "",
                                            ports: {},
                                            componentPath: ""
                                        },
                                        handlers: {
                                            addComponentHandler: this.addComponentHandler,
                                            changeTextFieldHandler: this.changeTextFieldHandler,
                                            deleteComponentHandler: this.deleteComponentHandler,
                                        }
                                    },
                                    {
                                        id: 4,
                                        icon: 'icon/deploy.svg',
                                        command: 'microServices',
                                        item: {
                                            itemName: 'Micro Service',
                                            icon: 'icon/deploy.svg',
                                            deploymentName: "",
                                            strategy: "",
                                            maxUnavailable: "1",
                                            maxSurge: "1",
                                            services: {},
                                            ingresses: {},
                                            ports: {},
                                            containers: {},
                                            volumes: {},
                                            imagePullSecrets: {},
                                            envs: {},
                                            componentPath: ""
                                        },
                                        handlers: {
                                            addComponentHandler: this.addComponentHandler,
                                            changeTextFieldHandler: this.changeTextFieldHandler,
                                            deleteComponentHandler: this.deleteComponentHandler,
                                        }
                                    }
                                ]}
                            />
                        </Grid>
                        <Divider />

                        <BaseFieldsComponent
                            fields={this.state.mainFields}
                            componentPath="mainFields"
                            handlers={{ changeTextFieldHandler: this.changeTextFieldHandler }} />
                        {
                            map(this.state.configMaps, (configMap, index) => {
                                return <ConfigMapComponent
                                    key={index}
                                    componentPath={configMap.componentPath}
                                    label={configMap.label}
                                    name={configMap.name}
                                    envs={configMap.envs}
                                    itemName={configMap.itemName}
                                    icon={configMap.icon}
                                    handlers={{
                                        addComponentHandler: this.addComponentHandler,
                                        changeTextFieldHandler: this.changeTextFieldHandler,
                                        deleteComponentHandler: this.deleteComponentHandler
                                    }}
                                />
                            })
                        }
                        {
                            map(this.state.secrets, (secret, index) => {
                                return <SecretComponent
                                    key={index}
                                    componentPath={secret.componentPath}
                                    label={secret.label}
                                    name={secret.name}
                                    type={secret.type}
                                    envs={secret.envs}
                                    itemName={secret.itemName}
                                    icon={secret.icon}
                                    handlers={{
                                        addComponentHandler: this.addComponentHandler,
                                        changeTextFieldHandler: this.changeTextFieldHandler,
                                        deleteComponentHandler: this.deleteComponentHandler
                                    }}
                                />
                            })
                        }
                        {
                            map(this.state.endPoints, (endpoint, index) => {
                                return <EndPointComponent
                                    key={index}
                                    componentPath={endpoint.componentPath}
                                    label={endpoint.label}
                                    name={endpoint.name}
                                    type={endpoint.type}
                                    ports={endpoint.ports}
                                    itemName={endpoint.itemName}
                                    icon={endpoint.icon}
                                    handlers={{
                                        addComponentHandler: this.addComponentHandler,
                                        changeTextFieldHandler: this.changeTextFieldHandler,
                                        deleteComponentHandler: this.deleteComponentHandler
                                    }}
                                />
                            })
                        }
                        {
                            map(this.state.microServices, (microService, index) => {
                                return <MicroServiceComponent
                                    key={index}
                                    componentPath={microService.componentPath}
                                    componentId={index}
                                    collectionState={microService.collectionState}
                                    label={microService.label}
                                    deploymentName={microService.deploymentName}
                                    ports={microService.ports}
                                    containers={microService.containers}
                                    strategy={microService.strategy}
                                    ingresses={microService.ingresses}
                                    services={microService.services}
                                    volumes={microService.volumes}
                                    imagePullSecrets={microService.imagePullSecrets}
                                    envs={microService.envs}
                                    itemName={microService.itemName}
                                    maxSurge={microService.maxSurge}
                                    maxUnavailable={microService.maxUnavailable}
                                    icon={microService.icon}
                                    secrets={this.state.secrets}
                                    handlers={{
                                        addComponentHandler: this.addComponentHandler,
                                        changeTextFieldHandler: this.changeTextFieldHandler,
                                        deleteComponentHandler: this.deleteComponentHandler
                                    }}
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