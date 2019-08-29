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
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { map, mapValues } from 'lodash';
import styles from './DrawerTreeComponentTheme';

function TreeModify(tree) {
    const t = mapValues(tree, (stacks, stacksIndex) => {
        return stacks
    })

    const a = mapValues(t, (stacks, stacksIndex) => {
        return stacks
    })
    console.log("f ", a)
    
}

class PermanentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.stack = {
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
                    <div className={classes.toolbar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                <IconButton onClick={() => {
                                    const id = this.props.handlers.newId();
                                    const newStack = {
                                        ...this.stack,
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

                        </TreeView>
                    </List>

                </Drawer>
                {
                    TreeModify(this.props.tree)
                }
            </div>
        );
    }

}
export default withStyles(styles)(PermanentDrawerLeft);