const initialState = {
  listNotifications: {
    data: [],
    current_page: 0,
    per_page: 0,
    total_count: 0
  },
  readNoti: false
};

function appReducer(state = initialState, action) {
  let response = action.payload;
  switch (action.type) {
    case "GET_NOTIFICATION_HISTORY_SUCCESS":
      const meta = action.payload.meta
        ? action.payload.meta
        : { current_page: 0, per_page: 0, total_count: 0 };
      return {
        ...state,
        listNotifications: {
          data:
            meta.current_page === 1
              ? response.data
              : state.listNotifications.data.concat(response.data),
          current_page: meta.current_page,
          per_page: meta.per_page,
          total_count: meta.total_count
        }
      };
    case "READ_NOTI_SUCCESS":
      return {
        ...state,
        readNoti: true
      };
    default:
      return state;
  }
}

module.exports = appReducer;
