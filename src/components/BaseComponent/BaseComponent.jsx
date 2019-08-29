import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DrawerTree from '../DrawerTree/DrawerTreeComponent';
import styles from './BaseComponentTheme';
import { set, unset, map } from 'lodash';

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

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
                    tree={this.state}
                    handlers={{
                        newId: this.newId,
                        addComponentHandler: this.addComponentHandler,
                        changeTextFieldHandler: this.changeTextFieldHandler,
                        deleteComponentHandler: this.deleteComponentHandler,
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(BaseComponent);