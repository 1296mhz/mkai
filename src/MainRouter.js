import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Status from './components/Status/Status';

function MainRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Status} />
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