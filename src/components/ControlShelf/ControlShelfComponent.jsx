import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import styles from './ControlShelfComponentTheme';

class ControlShelfComponent extends React.Component {
  constructor(props) {
    super(props);
    this.newId = this.newId.bind(this);
  }
  newId() {
    const d = new Date();
    const id = d.getTime();
    return id
  }
  render() {
    const { classes, shelf } = this.props;

    return (
      <div className={classes.grid}>
        {shelf.map((item, i) =>
          <React.Fragment key={item.id}>
            <IconButton onClick={() => {
              const id = this.newId();
              item.handlers.addComponentHandler(`${item.command}.${id}`, {
                ...item.item,
                componentPath: `${item.command}.${id}`
              })
            }}>
              <img src={item.icon} alt={item.command} height="24" width="24" />
            </IconButton>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(ControlShelfComponent);