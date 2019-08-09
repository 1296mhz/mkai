import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    textField: {
      width: "100%"
    },
    margin: {
      margin: theme.spacing(1)
      // margin: '8px 0',
    },
    padding: {
      padding: theme.spacing(2)
    },
    iconButton: {
      padding: 0
    },
    title: {
      marginTop: theme.spacing(1)
    },
    grid: {
      padding: theme.spacing(1)
    }
  });
  
class ControlShelfComponent extends React.Component {
    render() {
        const { classes, shelf } = this.props;

        return (
            <div className={classes.grid}>
                {shelf.map((item, i) =>
                <React.Fragment key={item.id}>
                    <IconButton onClick={() => item.handler()}>
                        <Icon>{item.icon}</Icon>
                    </IconButton>
                </React.Fragment>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(ControlShelfComponent);