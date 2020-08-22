import { REHYDRATE } from "redux-persist/lib/constants";
import { all, take } from "redux-saga/effects";

import authSaga from "./auth/saga";

export default function* rootSaga(getState) {
  yield take(REHYDRATE);
  yield all([authSaga()]);
}
