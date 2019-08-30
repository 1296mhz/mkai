import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from './NewStackComponentTheme';
import MenuItem from '@material-ui/core/MenuItem';
import { map } from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewStackComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentPath,
            stateDialog,
            value,
            changeTextFieldHandler,
            deleteComponentHandler,
        } = this.props;
        
        return (
            <>
                <Dialog open={stateDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create new stack</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Enter the name of the stack here.
                  </DialogContentText>
                  <TextField
                        required
                        id="standard-name"
                        label="Name"
                        value={value}
                        name="name"
                        className={classes.textField}
                        onChange={(e) => changeTextFieldHandler(e, `${componentPath}.name`)}
                        margin="dense"
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={
                            () => {
                                console.log("Delete ",`${componentPath}`)
                                deleteComponentHandler(`${componentPath}`)
                            }
                        }>
                            Cancel
                  </Button>
                        <Button color="primary" onClick={
                            (e) => {
                                console.log(`${componentPath}.stateDialog`)
                                e.target.value = false;
                                changeTextFieldHandler(e, `${componentPath}.stateDialog`)
                            }
                        }>
                            Add
                  </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

NewStackComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewStackComponent);