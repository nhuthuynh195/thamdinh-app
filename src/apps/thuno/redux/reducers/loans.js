export const initialState = {
  listLoans: {
    data: [],
    current_page: 0,
    per_page: 0,
    total_count: 0
  },
  listLoansUnCollected: {
    data: [],
    current_page: 0,
    per_page: 0,
    total_count: 0
  },
  listLoansSearch: false,
  listLoansUnCollectedSearch: false,
  detailLoans: false,
  readLimitList: false,
  uploadBankReciept: false,
  makeRepayment: false,
  collectLoanFailed: false,
  uploadAudio: false,

  // sort
  sortListLoans: {
    title: "Sớm nhất",
    sort: "average_pay_time",
    direction: "asc"
  },
  sortListLoansCollection: {
    title: "Sớm nhất",
    sort: "average_pay_time",
    direction: "asc"
  },

  // search

  sortListLoansSearch: {
    title: "Sớm nhất",
    sort: "average_pay_time",
    direction: "asc"
  },
  sortListLoansCollectionSearch: {
    title: "Sớm nhất",
    sort: "average_pay_time",
    direction: "asc"
  },
  detailLastTranscation: false
};

function appReducer(state = initialState, action) {
  let response = action.payload;
  switch (action.type) {
    case "GET_LAST_TRANSACTION_SUCCESS":
      return {
        ...state,
        detailLastTranscation: action.payload.data
      };
    case "GET_LIST_LOANS_SUCCESS":
      let responseLoans = action.payload;
      const meta = action.payload.meta
        ? action.payload.meta
        : { current_page: 0, per_page: 0, total_count: 0 };
      return {
        ...state,
        listLoans: {
          data:
            meta.current_page === 1
              ? responseLoans.data
              : state.listLoans.data.concat(responseLoans.data),
          current_page: meta.current_page,
          per_page: meta.per_page,
          total_count: meta.total_count
        }
      };
    case "GET_LIST_LOANS_UNCOLLECTED_SUCCESS":
      const meta2 = action.payload.meta
        ? action.payload.meta
        : { current_page: 0, per_page: 0, total_count: 0 };
      return {
        ...state,
        listLoansUnCollected: {
          data:
            meta2.current_page === 1
              ? response.data
              : state.listLoansUnCollected.data.concat(response.data),
          current_page: meta2.current_page,
          per_page: meta2.per_page,
          total_count: meta2.total_count
        }
      };
    case "GET_LIST_LOANS_SEARCH_SUCCESS":
      return {
        ...state,
        listLoansSearch: action.payload.data
      };
    case "GET_LIST_LOANS_UNCOLLECTED_SEARCH_SUCCESS":
      return {
        ...state,
        listLoansUnCollectedSearch: action.payload.data
      };
    case "GET_DETAIL_LOANS_SUCCESS":
      return {
        ...state,
        detailLoans: action.payload.data
      };
    case "GET_REACH_LIMIT_DATA_SUCCESS":
      return {
        ...state,
        readLimitList: action.payload.data
      };
    case "UPLOAD_BANK_RECEIPT_SUCCESS":
      return {
        ...state,
        uploadBankReciept: action.payload.data
      };
    case "MAKE_REPAYMENT_SUCCESS":
      return {
        ...state,
        makeRepayment: action.payload.data
      };
    case "COLLECT_LOAN_FAILED_SUCCESS":
      return {
        ...state,
        collectLoanFailed: action.payload.data
      };

    // case "GET_LIST_LOANS":
    //   console.log("asdkajsdklasdjkasjdlasasd", action);
    //   console.log("asdklasdlkasjdasdasd", state);
    //   return {
    //     ...state
    //   };
    // case "GET_LIST_LOANS_UNCOLLECTED":
    //   return {
    //     ...state,
    //     listLoansUnCollected: false
    //   };
    case "UPLOAD_AUDIO_SUCCESS":
      return {
        ...state,
        uploadAudio: action.payload.data
      };

    // Update filter
    case "UPDATE_CONDITION_SORT_LIST_LOANS":
      return {
        ...state,
        sortListLoans: action.payload
      };
    case "UPDATE_CONDITION_SORT_LIST_LOANS_COLLECTION":
      return {
        ...state,
        sortListLoansCollection: action.payload
      };

    // update filter search

    case "UPDATE_CONDITION_SORT_LIST_LOANS_SEARCH":
      return {
        ...state,
        sortListLoansSearch: action.payload
      };
    case "UPDATE_CONDITION_SORT_LIST_LOANS_COLLECTION_SEARCH":
      return {
        ...state,
        sortListLoansCollectionSearch: action.payload
      };
    case "REQUEST_LOCATION_BACKGROUND_SUCCESS":
      return {
        ...state
      };
    // clear state
    case "CLEAR_DETAIL_LOANS":
      return {
        ...state,
        detailLoans: false
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        listLoansSearch: false,
        listLoansUnCollectedSearch: false
      };
    default:
      return state;
  }
}

export default appReducer;
