import actions from "./actions";

const initState = {
  info: {},
  uid: null,
  authenticated: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.USER_AUTH:
      console.log(action);
      return {
        ...state,
        info: action.payload.userInfo,
        uid: action.payload.uid,
        authenticated: true
      };

    case actions.USER_LOGOUT:
      const { authenticated, info, uid } = initState;
      return {
        ...state,
        info,
        uid,
        authenticated
      };

    default:
      return state;
  }
}
