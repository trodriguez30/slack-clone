import AuthReducer from "./auth/reducers";

import { connectRouter } from "connected-react-router";
import localForage from "localforage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage: localForage,
  whitelist: ["info", "uid", "authenticated"]
};

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    Auth: persistReducer(authPersistConfig, AuthReducer)
  });

export default createRootReducer;
