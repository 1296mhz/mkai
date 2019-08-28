import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from './ImagePullSecretComponentTheme';
import MenuItem from '@material-ui/core/MenuItem';
import { map } from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ImagePullSecretComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentPath,
            imagePullSecretId,
            stateDialog,
            value,
            secrets,
            changeTextFieldHandler,
            deleteComponentHandler,
        } = this.props;
        return (
            <>
                <Dialog open={stateDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose one</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Choose the map config that contains image pull secret.
                  </DialogContentText>
                        <TextField
                            id="image-pull-secret"
                            select
                            label="Image pull Secrets"
                            className={classes.textField}
                            value={value}
                            name="imagePullSecret"
                            helperText="Please select"
                            onChange={(e) => changeTextFieldHandler(e, `${componentPath}.value`)}
                            margin="dense"
                        >
                            {map(secrets, (secret, i) => {
                                return (
                                    (secret.type === "kubernetes.io/dockerconfigjson") ? <MenuItem key={i} value={secret.name}>{secret.name}</MenuItem> : false
                                );
                            })}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={
                            () => deleteComponentHandler(`${componentPath}`)
                        }>
                            Cancel
                  </Button>
                        <Button color="primary" onClick={
                            (e) => {
                                e.target.value = false
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

ImagePullSecretComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImagePullSecretComponent);