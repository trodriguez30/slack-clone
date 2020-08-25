import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import Loader from "./pages/Utilities/Loader";
import ErrorPage from "./pages/Utilities/ErrorPage";

const Dashboard = lazy(() => import("./pages/Dashboard"));

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
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorPage>
  );
}
