import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import createRootReducer from './configureReducer';
import createRootSaga from './configureSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];
export const history = createBrowserHistory();

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), ...middlewares))
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(createRootSaga);

  return { store, persistor };
}
