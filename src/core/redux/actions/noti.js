import apiConfigs from "../../configs/api";

export function getNotificationHistory(page = 1) {
  return {
    type: "GET_NOTIFICATION_HISTORY",
    method: "GET",
    api: `${apiConfigs.BASE_API}notification_histories?page=${page}&per_page=15`,
    token: true
  };
}

export function getNotificationHistoryEvaluate(page = 1) {
  return {
    type: "GET_NOTIFICATION_HISTORY",
    method: "GET",
    api: `${apiConfigs.BASE_API}notification_histories?notification_kind=evaluate&page=${page}&per_page=15`,
    token: true
  };
}

export function readNoti(body) {
  return {
    type: "READ_NOTI",
    method: "POST",
    api: `${apiConfigs.BASE_API}notification_histories/update_noti_histories`,
    token: true,
    body: body
  };
}

export function getNumberNotiUnRead() {
  return {
    type: "GET_NUMBER_NOTI_UNREAD",
    method: "GET",
    api: `${apiConfigs.BASE_API}/staffs/get_reach_limit_data`,
    token: true
  };
}
