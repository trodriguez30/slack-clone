import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./routes";

import configureStore, { history } from "./redux/configureStore";

const { persistor, store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
