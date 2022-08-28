const initialState = {
  isLoadingGetDetailClient: true,
  clientDetail: {},
  cityFields: {},
  districtFields: {},
  wardFields: {},
  financeInfo: {},
  supportProfileInfo: {},
  documentInfo: {},

  // ---- Update ----
  isUpdateClient: false,
  // --- Bank ----
  citiesBank: {},
  openBranchBank: {},
  isUpdateAccountBank: false,

  // ------- Relationship-----
  relationshipOtions: [],
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case "TIME_OUT":
      return {
        ...state,
        // isLoadingGetDetailClient: false,
        isUpdateClient: false,
        isUpdateAccountBank: false,
      };
    case "NET_WORK_REQUEST_FAIL":
      return {
        ...state,
        // isLoadingGetDetailClient: false,
        isUpdateClient: false,
        isUpdateAccountBank: false,
      };
    case "RESET_STATE_GET_DETAIL_CLIENT":
      return initialState;
    case "GET_DETAIL_CLIENT_SUCCESS":
      const { data } = action.payload;
      return {
        ...state,
        clientDetail: action.payload.data,
        isLoadingGetDetailClient: false,
        cityFields:
          action.clientType === "business_evaluate"
            ? data.business_evaluate_field_options.city_fields
              ? data.business_evaluate_field_options.city_fields
              : {}
            : data.property_evaluate_field_options.city_fields
            ? data.property_evaluate_field_options.city_fields
            : {},
        isUpdateClient: false,
      };
    case "GET_DISTRICT_SUCCESS":
      return {
        ...state,
        districtFields: action.payload.data,
      };
    case "GET_WARD_SUCCESS":
      return {
        ...state,
        wardFields: action.payload.data,
      };
    case "RESET_STATE_DISTRICT":
      return {
        ...state,
        districtFields: {},
      };
    case "RESET_STATE_WARD":
      return {
        ...state,
        wardFields: {},
      };
    case "GET_FINANCE_INFO_SUCCESS":
      return {
        ...state,
        financeInfo: action.payload.data,
      };
    case "GET_SUPPORT_PROFILE_INFO_SUCCESS":
      return {
        ...state,
        supportProfileInfo: action.payload.data,
        relationshipOtions: action.payload.meta_data.relationship_options,
      };

    case "GET_CLIENT_DOCUMENT_INFO_SUCCESS":
      return {
        ...state,
        documentInfo: action.payload.data,
      };
    case "UPDATE_BUSINESS_INFO":
      return {
        ...state,
        isUpdateClient: true,
      };
    case "GET_CITIES_BANK_SUCCESS":
      return {
        ...state,
        citiesBank: action.payload.data,
      };
    case "GET_OPEN_BRANCH_BANK_SUCCESS":
      return {
        ...state,
        openBranchBank: action.payload.data,
      };
    case "UPDATE_BANK_ACCOUNT_SUCCESS":
      return {
        ...state,
        financeInfo: action.payload.data,
        isUpdateAccountBank: false,
      };
    case "UPDATE_BANK_ACCOUNT":
      return {
        ...state,
        isUpdateAccountBank: true,
      };
    case "UPDATE_STORE_LOCATION_SUCCESS":
      return {
        ...state,
        clientDetail: {
          ...state.clientDetail,
          location: {
            longitude: action.payload.longitude ? action.payload.longitude : "",
            latitude: action.payload.latitude ? action.payload.latitude : "",
          },
        },
      };

    case "APP_LOGOUT":
      return initialState;

    default:
      return state;
  }
}

module.exports = clientReducer;
