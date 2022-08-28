const initialState = {
  // ==== login ====
  loadingLogin: false,
  errorLogin: "",
  loginSuccess: false,
  // ==== change password ===
  loadingChangePassword: false,
  errorChangePassword: "",
  changePasswordSuccess: false,
  // ==== update endpoint push ===
  statusUpdateEndPoint: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_APP":
      return {
        ...state,
        loadingLogin: true,
        errorLogin: "",
        loginSuccess: false
      };
    case "LOGIN_APP_SUCCESS":
      return {
        ...state,
        loadingLogin: false,
        loginSuccess: true
      };
    case "LOGIN_APP_FAIL":
      return {
        ...state,
        loadingLogin: false,
        loginSuccess: false,
        errorLogin: action.payload
      };
    case "RESET_STATE_LOGIN":
      return {
        ...state,
        loginSuccess: false
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        loadingChangePassword: true,
        errorChangePassword: ""
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        loadingChangePassword: false,
        changePasswordSuccess: true
      };
    case "CHANGE_PASSWORD_FAIL":
      return {
        ...state,
        loadingChangePassword: false,
        changePasswordSuccess: false,
        errorChangePassword: action.payload.errors.full_messages[0]
      };
    case "RESET_STATE_CHANGE_PASSWORD":
      return {
        ...state,
        errorChangePassword: "",
        changePasswordSuccess: false
      };
    case "UPDATE_ENDPOINT_NOTIFICAITON_SUCCESS":
      return {
        ...state,
        statusUpdateEndPoint: true
      };

    case "UPDATE_ENDPOINT_NOTIFICAITON_FAIL":
      return {
        ...state,
        statusUpdateEndPoint: false
      };

    default:
      return state;
  }
}

module.exports = authReducer;
