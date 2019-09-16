import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { map, mapValues, values, filter, unset } from 'lodash';
import styles from './DrawerTreeComponentTheme';

function TreeModify(tree) {
    return mapValues(tree, (stacks, stacksIndex) => {
        const newStacks = {
            name: stacks.name,
            stacks: {
                ...stacks,
                ConfigMaps: stacks.configMaps,
                EndPoints: stacks.endPoints,
                MicroServices: stacks.microServices,
                Secrets: stacks.secrets
            }
        }

        unset(newStacks, 'stacks.name')
        unset(newStacks, 'stacks.stateDialog')
        unset(newStacks, 'stacks.mainFields')
        unset(newStacks, 'stacks.componentPath')
        unset(newStacks, 'stacks.configMaps')
        unset(newStacks, 'stacks.endPoints')
        unset(newStacks, 'stacks.microServices')
        unset(newStacks, 'stacks.secrets')

        return newStacks
    })
}

class PermanentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);

        this.stack = {
            name: "",
            stateDialog: true,
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
        }

                this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    handleDrawerOpen() {
        let newState = {
            ...this.state,
            drawerOpen: true
        };
        this.setState(newState);
    }

    handleDrawerClose() {
        let newState = {
            ...this.state,
            drawerOpen: false
        };
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                <IconButton onClick={() => {
                                    const id = this.props.handlers.newId();
                                    const newStack = {
                                        ...this.stack,
                                        stateDialog: true,
                                        componentPath: `${id}`
                                    }
                                    this.props.handlers.addComponentHandler(newStack.componentPath, newStack);

                                }}>
                                    <Icon>playlist_add</Icon>
                                </IconButton>
                            </Typography>
                        </Toolbar>
                    </div>

                    <Divider />
                    <List>
                        <TreeView
                            className={classes.rootTree}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >
                            {
                                map(TreeModify(this.props.tree), (stack, index) => {
                                    return <TreeItem key={index} nodeId={index} label={stack.name} >
                                        {
                                             map(stack.stacks, (a, i) => {
                                                    return  <TreeItem key={i} nodeId={i} label={i.replace(/([a-z])([A-Z])/g, '$1 $2') + " " + Object.keys(a).length}/>
                                             })
                                        }
                                        </TreeItem>
                                })
                            }
                        </TreeView>
                    </List>
                </Drawer>
            </div>
        );
    }

}
export default withStyles(styles)(PermanentDrawerLeft);