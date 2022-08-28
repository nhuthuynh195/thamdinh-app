const initialState = {
  loading: false,
  isConnectPrinter: false
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false
      };
    case "PRINTER_CONNECT":
      return {
        ...state,
        isConnectPrinter: action.payload
      };
    default:
      return state;
  }
}

module.exports = appReducer;
