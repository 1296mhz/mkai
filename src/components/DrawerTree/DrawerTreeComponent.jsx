import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { map } from 'lodash';
import styles from './DrawerTreeComponentTheme';
import ControlShelfComponent from '../ControlShelf/ControlShelfComponent';
class PermanentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Kubernetes Application Integrate
                  </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} >
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
                                            envs: {
                                            },
                                            collectionState: 'configMaps',
                                        },
                                        handlers: {
                                            addComponentHandler: this.props.handlers.addComponentHandler,
                                            changeTextFieldHandler: this.props.handlers.changeTextFieldHandler,
                                            deleteComponentHandler: this.props.handlers.deleteComponentHandler,
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
                                            collectionState: 'secrets',
                                        },
                                        handlers: {
                                            addComponentHandler: this.props.handlers.addComponentHandler,
                                            changeTextFieldHandler: this.props.handlers.changeTextFieldHandler,
                                            deleteComponentHandler: this.props.handlers.deleteComponentHandler,
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
                                            ports: {
                                            },
                                            collectionState: 'endPoints',
                                        },
                                        handlers: {
                                            addComponentHandler: this.props.handlers.addComponentHandler,
                                            changeTextFieldHandler: this.props.handlers.changeTextFieldHandler,
                                            deleteComponentHandler: this.props.handlers.deleteComponentHandler,
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
                                            collectionState: 'microServices',
                                        },
                                        handlers: {
                                            addComponentHandler: this.props.handlers.addComponentHandler,
                                            changeTextFieldHandler: this.props.handlers.changeTextFieldHandler,
                                            deleteComponentHandler: this.props.handlers.deleteComponentHandler,
                                        }
                                    }
                                ]}
                            />
                    </div>

                    <Divider />
                    <List>
                        {map()}
                    </List>
                    <Divider />
                    <List>
                        <TreeView
                            className={classes.rootTree}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >
                            <TreeItem nodeId="1" label="Applications.com.com">
                                <TreeItem nodeId="2" label="Calendar" />
                                <TreeItem nodeId="3" label="Chrome" />
                                <TreeItem nodeId="4" label="Webstorm" />
                            </TreeItem>
                            <TreeItem nodeId="5" label="Documents">
                                <TreeItem nodeId="6" label="Material-UI">
                                    <TreeItem nodeId="7" label="src">
                                        <TreeItem nodeId="8" label="index.js" />
                                        <TreeItem nodeId="9" label="tree-view.js" />
                                    </TreeItem>
                                </TreeItem>
                            </TreeItem>
                        </TreeView>
                    </List>
                </Drawer>

            </div>
        );
    }

}
export default withStyles(styles)(PermanentDrawerLeft);