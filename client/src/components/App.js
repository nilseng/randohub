import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "../utils/history";

import NavBar from "./NavBar";
import Profile from "./Profile";
import Feed from "./Feed";
import Summits from "./Summits";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/summits" component={Summits} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
