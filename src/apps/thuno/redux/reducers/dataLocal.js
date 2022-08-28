const initialState = {
  profile: {},
  headers: {},
  idPrinter: "-"
};

function dataLocal(state = initialState, action) {
  switch (action.type) {
    case "SAVE_PROFILE_LOCAL":
      return {
        ...state,
        profile: action.payload.profile,
        headers: action.payload.headers
      };
    case "UPDATE_PROFILE_LOCAL":
      return {
        ...state,
        profile: action.payload
      };
    case "PRINTER_ID":
      return {
        ...state,
        idPrinter: action.payload
      };
    case "CLEAR_PROFILE_LOCAL":
      return {
        ...state,
        profile: {},
        headers: {}
      };
    default:
      return state;
  }
}

module.exports = dataLocal;
