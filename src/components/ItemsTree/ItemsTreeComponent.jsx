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
import styles from './ItemsTreeComponentTheme';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
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

class ItemsTreeComponent extends React.Component {
  constructor(props) {
    super(props);

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
      <div>
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={() => {
                const id = this.props.handlers.newId();
                const newStack = {
                  ...this.stack,
                  stateDialog: true,
                  componentPath: `${id}`
                }
                this.props.handlers.addComponentHandler(newStack.componentPath, newStack);

              }}>

                <PlaylistAdd />
              </IconButton>
            }
            title="Stacks"
            subheader="Welcome to hell"
          />

          <CardContent>
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
                          return <TreeItem key={i} nodeId={i} label={i.replace(/([a-z])([A-Z])/g, '$1 $2') + " " + Object.keys(a).length} />
                        })
                      }
                    </TreeItem>
                  })
                }
              </TreeView>
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }

}
export default withStyles(styles)(ItemsTreeComponent);