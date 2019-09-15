import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from './StatusThemes';

class StatusComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
        } = this.props;
        
        return (
            <>
              <h1>Status</h1>
            </>
        );
    }
}

StatusComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StatusComponent);