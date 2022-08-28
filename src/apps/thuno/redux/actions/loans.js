import apiConfigs from "@configs/api";

export function getListLoans(
  latitude,
  longitude,
  sortBy = { sort: "", direction: "" },
  page = 1
) {
  return {
    type: "GET_LIST_LOANS",
    method: "GET",
    api: `${
      apiConfigs.BASE_API
      }loans?current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&per_page=15&sort=${
      sortBy.sort
      }&direction=${sortBy.direction}&collected_amount=1`,
    token: true,
    page: page
  };
}

export function getListLoansUnCollected(
  latitude,
  longitude,
  sortBy = { sort: "", direction: "" },
  page = 1
) {
  return {
    type: "GET_LIST_LOANS_UNCOLLECTED",
    method: "GET",
    api: `${
      apiConfigs.BASE_API
      }loans?current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${
      sortBy.sort
      }&direction=${sortBy.direction}&collected_amount=2&per_page=15`,
    token: true
  };
}

export function getLastTransaction(id) {
  return {
    type: "GET_LAST_TRANSACTION",
    method: "GET",
    api: `${apiConfigs.BASE_API}loans/${id}/get_last_transaction_info`,
    token: true
  };
}

export function getListLoansSearch(
  latitude,
  longitude,
  sortBy = { sort: "", direction: "" },
  textSearch,
  page = 1
) {
  return {
    type: "GET_LIST_LOANS_SEARCH",
    method: "GET",
    api: `${
      apiConfigs.BASE_API
      }loans?current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${
      sortBy.sort
      }&direction=${sortBy.direction}&collected_amount=1&full_name=${textSearch}`,
    token: true
  };
}

export function getListLoansUnCollectedSearch(
  latitude,
  longitude,
  sortBy = { sort: "", direction: "" },
  textSearch,
  page = 1
) {
  return {
    type: "GET_LIST_LOANS_UNCOLLECTED_SEARCH",
    method: "GET",
    api: `${
      apiConfigs.BASE_API
      }loans?current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${
      sortBy.sort
      }&direction=${sortBy.direction}&collected_amount=2&full_name=${textSearch}`,
    token: true
  };
}

export function uploadAudio(body, media) {
  return {
    type: "UPLOAD_AUDIO",
    method: "POST",
    api: `${apiConfigs.BASE_API}/documents/upload_document`,
    media,
    body,
    token: true
  };
}

export function getDetailLoans(id) {
  return {
    type: "GET_DETAIL_LOANS",
    method: "GET",
    api: `${apiConfigs.BASE_API}/loans/${id}`,
    token: true
  };
}

export function getReachLimitData() {
  return {
    type: "GET_REACH_LIMIT_DATA",
    method: "GET",
    api: `${apiConfigs.BASE_API}/staffs/get_reach_limit_data`,
    token: true
  };
}

export function uploadBankReceipt(body, media) {
  return {
    type: "UPLOAD_BANK_RECEIPT",
    method: "POST",
    api: `${apiConfigs.BASE_API}/staffs/upload_bank_receipt`,
    token: true,
    media,
    body
  };
}

export function makeRepayment(id, body, periodMoney) {
  return {
    type: "MAKE_REPAYMENT",
    method: "POST",
    api: `${apiConfigs.BASE_API}loans/${id}/make_repayment`,
    inputMoney: periodMoney,
    token: true,
    body
  };
}

export function collectLoanFailed(id, body, media) {
  return {
    type: "COLLECT_LOAN_FAILED",
    method: "POST",
    api: `${apiConfigs.BASE_API}loans/${id}/collect_loan_failed_note`,
    token: true,
    media: media,
    body
  };
}

export function requestLocationBackground(body) {
  return {
    type: "REQUEST_LOCATION_BACKGROUND",
    method: "POST",
    api: `${apiConfigs.BASE_API}/staffs/tracking_location`,
    token: true,
    body
  };
}

export function clearDetailLoans() {
  return {
    type: "CLEAR_DETAIL_LOANS"
  };
}

export function clearSearch() {
  return {
    type: "CLEAR_SEARCH"
  };
}

export function updateConditionSortListLoans(payload) {
  return {
    type: "UPDATE_CONDITION_SORT_LIST_LOANS",
    payload
  };
}

export function updateConditionSortListLoansCollection(payload) {
  return {
    type: "UPDATE_CONDITION_SORT_LIST_LOANS_COLLECTION",
    payload
  };
}

export function updateConditionSortListLoansSearch(payload) {
  return {
    type: "UPDATE_CONDITION_SORT_LIST_LOANS_SEARCH",
    payload
  };
}

export function updateConditionSortListLoansCollectionSearch(payload) {
  return {
    type: "UPDATE_CONDITION_SORT_LIST_LOANS_COLLECTION_SEARCH",
    payload
  };
}
