import apiConfigs from "@core/configs/api";

export function getDetailClient(id, type) {
  return {
    type: "GET_DETAIL_CLIENT",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/${id}/evaluation_detail_info?evaluate_type=${type}`,
    token: true,
    clientType: type,
  };
}

export function getDistrict(cityId) {
  return {
    type: "GET_DISTRICT",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=districts&city_id=${cityId}`,
    token: true,
  };
}

export function getDistrictAndWard(cityId, nameDistrict) {
  return {
    type: "GET_DISTRICT_AND_WARD",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=districts&city_id=${cityId}`,
    token: true,
    nameDistrict,
  };
}

export function getWard(districtId) {
  return {
    type: "GET_WARD",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=wards&district_id=${districtId}`,
    token: true,
  };
}

export function getSupportProfileInfo(clientId) {
  return {
    type: "GET_SUPPORT_PROFILE_INFO",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/${clientId}/evaluation_support_profile_info`,
    token: true,
  };
}

// ------ Remove support profile -----
export function removeSupportProfile(contract_id, support_profile_id) {
  return {
    type: "REMOVE_SUPPORT_PROFILE",
    method: "DELETE",
    body: {},
    api: `${apiConfigs.BASE_API}evaluations/${contract_id}/support_profiles/${support_profile_id}`,
    token: true,
    contactId: contract_id,
  };
}

export function getFinanceInfo(clientId) {
  return {
    type: "GET_FINANCE_INFO",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/${clientId}/evaluation_finance_info`,
    token: true,
  };
}

export function getClientDocumentInfo(id) {
  return {
    type: "GET_CLIENT_DOCUMENT_INFO",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/${id}/evaluation_document_info`,
    token: true,
  };
}

export function resetStateGetDetailClient() {
  return {
    type: "RESET_STATE_GET_DETAIL_CLIENT",
    payload: {},
  };
}

export function resetStateDistrict() {
  return {
    type: "RESET_STATE_DISTRICT",
    payload: {},
  };
}

export function resetStateWard() {
  return {
    type: "RESET_STATE_WARD",
    payload: {},
  };
}

export function getDistrictWardInit(proviceId, districtId) {
  return {
    type: "GET_DISTRICT_WARD_INIT",
    method: "GET",
    token: true,
    payload: {
      proviceId,
      districtId,
    },
  };
}

// ------ Update Info business -----

export function updateBusinessInfo(id, body, type = "business_info") {
  console.log(`${apiConfigs.BASE_API}evaluations/${id}/${type}`);
  return {
    type: "UPDATE_BUSINESS_INFO",
    method: "PUT",
    api: `${apiConfigs.BASE_API}evaluations/${id}/${type}`,
    token: true,
    body,
    clientType:
      type === "business_info" ? "business_evaluate" : "property_info",
  };
}

// ------ Update Support Profile -----

export function updateSupporProfile(contactId, supportId, body) {
  return {
    type: "UPDATE_SUPPORT_PROFILE",
    method: "PUT",
    api: `${apiConfigs.BASE_API}evaluations/${contactId}/support_profiles/${supportId}`,
    token: true,
    body,
    contactId,
  };
}

export function createSupporProfile(contactId, body) {
  return {
    type: "CREATE_SUPPORT_PROFILE",
    method: "POST",
    api: `${apiConfigs.BASE_API}evaluations/${contactId}/support_profiles`,
    token: true,
    body,
    contactId,
  };
}

// ------ Get cities bank -----
export function getCitiesBank(bankId) {
  return {
    type: "GET_CITIES_BANK",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/fetch_banks_info?bank_id=${bankId}&bank_type=cities`,
    token: true,
  };
}

export function getOpenBranchBank(bankId, cityId) {
  return {
    type: "GET_OPEN_BRANCH_BANK",
    method: "GET",
    api: `${apiConfigs.BASE_API}evaluations/fetch_banks_info?bank_id=${bankId}&bank_type=branches&city_id=${cityId}`,
    token: true,
  };
}

export function updateBankAccount(contactId, body) {
  return {
    type: "UPDATE_BANK_ACCOUNT",
    method: "PUT",
    api: `${apiConfigs.BASE_API}evaluations/${contactId}/evaluation_finance_info`,
    token: true,
    body,
  };
}

export function updateStoreLocation(id, longitude, latitude) {
  return {
    type: "UPDATE_STORE_LOCATION",
    method: "PUT",
    api: `${apiConfigs.BASE_API}evaluations/${id}/pin_location`,
    token: true,
    body: {
      longitude,
      latitude,
    },
    longitude,
    latitude,
  };
}
