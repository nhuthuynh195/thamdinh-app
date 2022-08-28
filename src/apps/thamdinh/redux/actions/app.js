import apiConfigs from '@core/configs/api';
import configs from '@core/configs';


export function getListBusinessEvaluate(latitude, longitude, sortBy = { sort: '', direction: '' }, page = 1) {
    return {
        type: 'GET_LIST_BUSINESS_EVALUATE',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=business_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${sortBy.sort}&direction=${sortBy.direction}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function getListBusinessHasEvaluated(latitude, longitude, sortBy = { sort: '', direction: '' }, page = 1) {
    return {
        type: 'GET_LIST_BUSINESS_HAS_EVALUATED',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=business_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&has_evaluated=true&page=${page}&sort=${sortBy.sort}&direction=${sortBy.direction}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function getListPropertyEvaluate(latitude, longitude, sortBy = { sort: '', direction: '' }, page = 1) {
    return {
        type: 'GET_LIST_PROPERTY_EVALUATE',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=property_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${sortBy.sort}&direction=${sortBy.direction}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function getListPropertyHasEvaluated(latitude, longitude, page = 1) {
    return {
        type: 'GET_LIST_PROPERTY_HAS_EVALUATED',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=property_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&has_evaluated=true&page=${page}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function updateConditionSortBusinessEvalute(payload) {
    return {
        type: 'UPDATE_CONDITION_SORT_BUSINESS_EVALUTE',
        payload
    }
}

export function updateConditionSortPropertyEvalute(payload,) {
    return {
        type: 'UPDATE_CONDITION_SORT_PROPERTY_EVALUTE',
        payload,
    }
}

// ====== Search =======

export function getListBusinessEvaluateSearch(latitude, longitude, sortBy = { sort: '', direction: '' }, name = '', page = 1) {
    return {
        type: 'GET_LIST_BUSINESS_EVALUATE_SEARCH',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=business_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${sortBy.sort}&direction=${sortBy.direction}&search[name]=${name}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function getListPropertyEvaluateSearch(latitude, longitude, sortBy = { sort: '', direction: '' }, name = '', page = 1) {
    return {
        type: 'GET_LIST_PROPERTY_EVALUATE_SEARCH',
        method: 'GET',
        api: `${apiConfigs.BASE_API}evaluations/evaluate_list?evaluate_type=property_evaluate&current_latitude=${latitude}&current_longitude=${longitude}&page=${page}&sort=${sortBy.sort}&direction=${sortBy.direction}&search[name]=${name}&version=${configs.VERSION_APP}`,
        token: true,
    }
}

export function updateConditionSortBusinessEvaluteSearch(payload) {
    return {
        type: 'UPDATE_CONDITION_SORT_BUSINESS_EVALUTE_SEARCH',
        payload
    }
}

export function updateConditionSortPropertyEvaluteSearch(payload) {
    return {
        type: 'UPDATE_CONDITION_SORT_PROPERTY_EVALUTE_SEARCH',
        payload
    }
}

export function resetStateSearch() {
    return {
        type: 'RESET_STATE_SEARCH',
        payload: {}
    }
}

export function refreshListBusinessEvaluate() {
    return {
        type: 'REFRESH_LIST_BUSINESS_EVALUATE',
        payload: {}
    }
}

export function refreshListPropertyEvaluate() {
    return {
        type: 'REFRESH_LIST_PROPERTY_EVALUATE',
        payload: {}
    }
}


export function loadmoreListBusinessEvaluate() {
    return {
        type: 'LOAD_MORE_LIST_BUSINESS_EVALUATE',
        payload: {}
    }
}

export function loadmoreListPropertyEvaluate() {
    return {
        type: 'LOAD_MORE_LIST_PROPERTY_EVALUATE',
        payload: {}
    }
}

export function reloadListBusinessEvaluate() {
    return {
        type: 'RELOAD_LIST_BUSINESSEVALUTE',
    }
}

export function reloadListPropertyEvaluate() {
    return {
        type: 'RELOAD_LIST_PROPETY_EVALUTE',
    }
}


export function reloadListBusinessHasEvaluated() {
    return {
        type: 'RELOAD_LIST_BUSINESS_HAS_EVALUTED',
    }
}

export function reloadListPropertyHasEvaluated() {
    return {
        type: 'RELOAD_LIST_PROPERTY_HAS_EVALUTED',
    }
}

export function turnOffRefershAllApp() {
    return {
        type: 'TURN_OFF_REFRESH_APP',
    }
}








