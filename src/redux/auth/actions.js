const actions = {
  USER_AUTH: "USER_AUTH",
  USER_LOGOUT: "USER_LOGOUT",

  userLogin: payload => ({
    type: actions.USER_AUTH,
    payload
  }),

  userLogout: payload => ({
    type: actions.USER_LOGOUT,
    payload
  })
};
export default actions;
