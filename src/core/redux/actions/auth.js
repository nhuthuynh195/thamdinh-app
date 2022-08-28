import apiConfigs from "../../configs/api";

export function login(body) {
  return {
    type: "LOGIN_APP",
    body,
    method: "POST",
    api: `${apiConfigs.BASE_API}staffs/auth/sign_in`
  };
}

export function resetStateLogin() {
  return {
    type: "RESET_STATE_LOGIN",
    payload: false
  };
}

export function changePassword(body) {
  return {
    type: "CHANGE_PASSWORD",
    method: "PUT",
    api: `${apiConfigs.BASE_API}staffs/auth`,
    token: true,
    body
  };
}

export function updateEndPointPushNoti(body) {
  return {
    type: "UPDATE_ENDPOINT_NOTIFICAITON",
    method: "POST",
    api: `${apiConfigs.BASE_API}staffs/update_push_endpoint`,
    token: true,
    body
  };
}

export function resetStateChangePassword(body) {
  return {
    type: "RESET_STATE_CHANGE_PASSWORD",
    payload: {}
  };
}

export function logout() {
  return {
    type: "LOGOUT_APP",
    method: "DELETE",
    api: `${apiConfigs.BASE_API}staffs/auth/sign_out`,
    token: true
  };
}
