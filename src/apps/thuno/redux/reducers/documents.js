const initialState = {
    listLoans: false,
    detailLoans: {}
  };
  
  function appReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_LIST_LOANS_SUCCESS":
        return {
          ...state,
          listLoans: action.payload.data
        };
      case "GET_DETAIL_LOANS_SUCCESS":
        return {
          ...state,
          detailLoans: action.payload.data
        };
      case "GET_LIST_LOANS":
        return {
          ...state,
          listLoans: false
        };
      default:
        return state;
    }
  }
  
  module.exports = appReducer;
  