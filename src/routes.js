import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import Dash from "./pages/Dash";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

export default function Routes() {
  return (
    <ErrorPage>
      <Router>
        <Switch>
          <Route exact path="/" component={Dash} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </ErrorPage>
  );
}
