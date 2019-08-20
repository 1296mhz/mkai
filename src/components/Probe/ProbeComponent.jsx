import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ProbeComponentTheme';

class ProbeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            componentId,
            containerId,
            collectionState,
            probeProtocol,
            ports
        } = this.props;
        
        return (
            <>
                <Grid container className={classes.grid}>
                    <p>{probeProtocol}</p>
                </Grid>
            </>
        );
    }
}

ProbeComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProbeComponent);