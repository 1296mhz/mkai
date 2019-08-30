import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DrawerTree from '../DrawerTree/DrawerTreeComponent';
import styles from './BaseComponentTheme';
import { set, unset, map } from 'lodash';
import Grid from '@material-ui/core/Grid';
import NewStackComponent from '../NewStack/NewStackComponent'

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };

        this.newStack = {
            value: "",
            stateDialog: true
        };

        this.addComponentHandler = this.addComponentHandler.bind(this);
        this.deleteComponentHandler = this.deleteComponentHandler.bind(this);
        this.changeTextFieldHandler = this.changeTextFieldHandler.bind(this);
        this.saveStateHandler = this.saveStateHandler.bind(this);
        this.newId = this.newId.bind(this);
    }

    saveStateHandler() {
        console.log("save")
        console.log(this.state)
    }

    changeTextFieldHandler(e, path) {
        console.log(path, e.target.value);
        let newState = {
            ...this.state
        };
        set(newState, `items.${path}`, e.target.value);
        this.setState(newState);
    }

    addComponentHandler(path, value) {
        console.log("Add component handler")
        console.log(path, value)
        let newState = {
            ...this.state
        }
        set(newState, "items."+path, value);
        this.setState(newState);
    }

    deleteComponentHandler(item) {
        console.log("Delte component: " + item)
        const newState = {
            ...this.state
        };
        unset(newState, "items."+item);
        this.setState(newState, () => {
            console.log("after delete ", this)
        });
    }

    newId() {
        const d = new Date();
        const id = d.getTime();
        return id
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <DrawerTree
                    tree={this.state.items}
                    handlers={{
                        newId: this.newId,
                        addComponentHandler: this.addComponentHandler,
                        changeTextFieldHandler: this.changeTextFieldHandler,
                        deleteComponentHandler: this.deleteComponentHandler,
                    }}
                />
                <Grid container item xs={12} justify="flex-start" >
                        {
                            map(this.state.items, (state, index) => {
                                return <NewStackComponent
                                    key={index}
                                    stateDialog={state.stateDialog}
                                    componentPath={state.componentPath}
                                    changeTextFieldHandler={this.changeTextFieldHandler}
                                    deleteComponentHandler={this.deleteComponentHandler}
                                />
                            })
                        }
                    </Grid>
            </>
        )
    }
}

export default withStyles(styles)(BaseComponent);