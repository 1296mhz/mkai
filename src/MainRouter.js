import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';

function MainRouter() {
  return (
    <Router>
      <div>
        <List>
        <ListItem button component={Link} to="/">
                <ListItemIcon><InboxIcon /> </ListItemIcon>
                <ListItemText primary="Status" />
          </ListItem>

          <ListItem button component={Link} to="/stacks">
                <ListItemIcon><InboxIcon /> </ListItemIcon>
                <ListItemText primary="Stacks" />
          </ListItem>
          </List>
 
         
      </div>
    </Router>
  );
}


/*
function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}
*/


export default MainRouter;