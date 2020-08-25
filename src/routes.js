import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import ErrorPage from "./ErrorPage";

const Dashboard = lazy(() => import("./pages/Dash"));

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./pages/Auth/Login"))
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/Auth/Login"))
  },
  {
    path: "/register",
    component: lazy(() => import("./pages/Auth/Register"))
  }
];

function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.Auth.uid);

  if (isLoggedIn) return <Route {...rest}>{children}</Route>;

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location }
      }}
    />
  );
}

export default function Routes() {
  return (
    <ErrorPage>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/dash">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorPage>
  );
}
