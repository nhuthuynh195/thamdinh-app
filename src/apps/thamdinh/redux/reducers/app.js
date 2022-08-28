const initialState = {
    isLoadingGetListBusinessEvaluate: true,
    isLoadingGetListPropertyEvaluate: true,
    isLoadingGetListBusinessHasEvaluated: true,
    isLoadingGetListPropertyHasEvaluated: true,
    listBusinessEvaluate: [],
    metalListBusinessEvaluate: {
        currentPage: 0,
        totalPage: 0
    },
    isRefreshingListBusinessEvaluate: false,
    isLoadMoreListBusinessEvaluate: false,

    // ---------
    listPropertyEvaluate: [],
    isRefreshingListPropertyEvaluate: false,
    metalListPropertyEvaluate: {
        currentPage: 0,
        totalPage: 0
    },
    isLoadMoreListPropertyEvaluate: false,

    // --------
    listtBusinessHasEvaluated: [],
    listPropertyHasEvaluated: [],

    // ------ sort ------
    sortBusinessEvaluate: {
        title: "Sớm nhất",
        sort: "created_at",
        direction: "asc"
    },
    sortPropertyEvaluate: {
        title: "Sớm nhất",
        sort: "created_at",
        direction: "asc"
    },
    // ------ search ------
    sortBusinessEvaluateSearch: {
        title: "Sớm nhất",
        sort: "created_at",
        direction: "asc"
    },
    sortPropertyEvaluateSearch: {
        title: "Sớm nhất",
        sort: "created_at",
        direction: "asc"
    },
    listBusinessEvaluateSearch: [],
    listPropertyEvaluateSearch: [],
    isLoadingGetListBusinessEvaluateSearch: false,
    isLoadingGetListPropertyEvaluateSearch: false,
    loading: false,
    unread_notifications: 0,
    callableBusiness: false,
    callabProperty: false,

    // ---------- Reload -----
    isReloadListBusinessEvaluate: false,
    isReloadListPropertyEvaluate: false,
    isReloadBusinessHasEvaluated: false,
    isReloadListPropertyHasEvaluated: false
}

function appReducer(state = initialState, action) {

    switch (action.type) {
        case "TIME_OUT":
            return {
                ...state,
                isLoadingGetListBusinessEvaluate: false,
                isLoadingGetListPropertyEvaluate: false,
                isLoadingGetListBusinessHasEvaluated: false,
                isLoadingGetListPropertyHasEvaluated: false,
                isRefreshingListBusinessEvaluate: false,
                isLoadMoreListBusinessEvaluate: false,
                isRefreshingListPropertyEvaluate: false,
                isLoadMoreListPropertyEvaluate: false,
                isLoadingGetListBusinessEvaluateSearch: false,
                isLoadingGetListPropertyEvaluateSearch: false,
                isReloadListBusinessEvaluate: false,
                isReloadListPropertyEvaluate: false,
                isReloadBusinessHasEvaluated: false,
                isReloadListPropertyHasEvaluated: false,
                loading: false,
            }
            case "NET_WORK_REQUEST_FAIL":
                return {
                    ...state,
                    isLoadingGetListBusinessEvaluate: false,
                    isLoadingGetListPropertyEvaluate: false,
                    isLoadingGetListBusinessHasEvaluated: false,
                    isLoadingGetListPropertyHasEvaluated: false,
                    isRefreshingListBusinessEvaluate: false,
                    isLoadMoreListBusinessEvaluate: false,
                    isRefreshingListPropertyEvaluate: false,
                    isLoadMoreListPropertyEvaluate: false,
                    isLoadingGetListBusinessEvaluateSearch: false,
                    isLoadingGetListPropertyEvaluateSearch: false,
                    isReloadListBusinessEvaluate: false,
                    isReloadListPropertyEvaluate: false,
                    isReloadBusinessHasEvaluated: false,
                    isReloadListPropertyHasEvaluated: false,
                    loading: false,
                }
        case "TURN_OFF_REFRESH_APP":
            return {
                ...state,
                isLoadingGetListBusinessEvaluate: false,
                isLoadingGetListPropertyEvaluate: false,
                isLoadingGetListBusinessHasEvaluated: false,
                isLoadingGetListPropertyHasEvaluated: false,
                isRefreshingListBusinessEvaluate: false,
                isLoadMoreListBusinessEvaluate: false,
                isRefreshingListPropertyEvaluate: false,
                isLoadMoreListPropertyEvaluate: false,
                isLoadingGetListBusinessEvaluateSearch: false,
                isLoadingGetListPropertyEvaluateSearch: false,
                isReloadListBusinessEvaluate: false,
                isReloadListPropertyEvaluate: false,
                isReloadBusinessHasEvaluated: false,
                isReloadListPropertyHasEvaluated: false,
                loading: false,
            }
        case "TIMEOUT_GET_LIST_BUSINESS_EVALUATE":
            return {
                ...state,
                isReloadListBusinessEvaluate: true,
                isLoadingGetListBusinessEvaluate: false
            }
        case "RELOAD_LIST_BUSINESSEVALUTE":
            return {
                ...state,
                isReloadListBusinessEvaluate: false,
                isLoadingGetListBusinessEvaluate: true
            }
        case "TIMEOUT_GET_LIST_PROPERTY_EVALUATE":
            return {
                ...state,
                isReloadListPropertyEvaluate: true,
                isLoadingGetListPropertyEvaluate: false
            }
        case "RELOAD_LIST_PROPETY_EVALUTE":
            return {
                ...state,
                isReloadListPropertyEvaluate: false,
                isLoadingGetListPropertyEvaluate: true
            }
        case "TIMEOUT_GET_LIST_BUSINESS_HAS_EVALUATED":
            return {
                ...state,
                isReloadBusinessHasEvaluated: true,
                isLoadingGetListBusinessHasEvaluated: false
            }
        case "RELOAD_LIST_BUSINESS_HAS_EVALUTED":
            return {
                ...state,
                isReloadBusinessHasEvaluated: false,
                isLoadingGetListBusinessHasEvaluated: true
            }
        case "TIMEOUT_GET_LIST_PROPERTY_HAS_EVALUATED":
            return {
                ...state,
                isReloadListPropertyHasEvaluated: true,
                isLoadingGetListPropertyHasEvaluated: false
            }
        case "RELOAD_LIST_PROPERTY_HAS_EVALUTED":
            return {
                ...state,
                isReloadListPropertyHasEvaluated: false,
                isLoadingGetListPropertyHasEvaluated: true
            }
        case 'GET_LIST_BUSINESS_EVALUATE_SUCCESS':
            const meta = action.payload.meta ? action.payload.meta : { current_page: 0, per_page: 0, total_count: 0, callable: false };
            return {
                ...state,
                isLoadingGetListBusinessEvaluate: false,
                listBusinessEvaluate: concatListData(meta.current_page, state.listBusinessEvaluate, action.payload.data),
                metalListBusinessEvaluate: calculatePage(meta),
                isRefreshingListBusinessEvaluate: false,
                isLoadMoreListBusinessEvaluate: false,
                callableBusiness: meta.callable
            }
        case 'GET_LIST_PROPERTY_EVALUATE_SUCCESS':
            const meta1 = action.payload.meta ? action.payload.meta : { current_page: 0, per_page: 0, total_count: 0, callable: false };
            return {
                ...state,
                isLoadingGetListPropertyEvaluate: false,
                listPropertyEvaluate: concatListData(meta1.current_page, state.listPropertyEvaluate, action.payload.data),
                isRefreshingListPropertyEvaluate: false,
                isLoadMoreListPropertyEvaluate: false,
                metalListPropertyEvaluate: calculatePage(meta1),
                callabProperty: meta1.callable
            }

        case 'GET_LIST_BUSINESS_HAS_EVALUATED_SUCCESS':
            return {
                ...state,
                isLoadingGetListBusinessHasEvaluated: false,
                listtBusinessHasEvaluated: action.payload.data
            }
        case 'GET_LIST_PROPERTY_HAS_EVALUATED_SUCCESS':
            return {
                ...state,
                isLoadingGetListPropertyHasEvaluated: false,
                listPropertyHasEvaluated: action.payload.data
            }
        case 'UPDATE_CONDITION_SORT_BUSINESS_EVALUTE':
            return {
                ...state,
                sortBusinessEvaluate: action.payload
            }
        case 'UPDATE_CONDITION_SORT_PROPERTY_EVALUTE':
            return {
                ...state,
                sortPropertyEvaluate: action.payload
            }
        // ------------ SEARCH BUSINESS -----------
        case 'GET_LIST_BUSINESS_EVALUATE_SEARCH':
            return {
                ...state,
                isLoadingGetListBusinessEvaluateSearch: true,
            }
        case 'GET_LIST_BUSINESS_EVALUATE_SEARCH_SUCCESS':
            return {
                ...state,
                isLoadingGetListBusinessEvaluateSearch: false,
                listBusinessEvaluateSearch: action.payload.data
            }
        case 'UPDATE_CONDITION_SORT_BUSINESS_EVALUTE_SEARCH':
            return {
                ...state,
                sortBusinessEvaluateSearch: action.payload
            }
        // ------------ SEARCH PROPERTY -----------
        case 'GET_LIST_PROPERTY_EVALUATE_SEARCH':
            return {
                ...state,
                isLoadingGetListPropertyEvaluateSearch: true,
            }
        case 'GET_LIST_PROPERTY_EVALUATE_SEARCH_SUCCESS':
            return {
                ...state,
                isLoadingGetListPropertyEvaluateSearch: false,
                listPropertyEvaluateSearch: action.payload.data
            }
        case 'UPDATE_CONDITION_SORT_PROPERTY_EVALUTE_SEARCH':
            return {
                ...state,
                sortPropertyEvaluateSearch: action.payload
            }

        case 'REFRESH_LIST_BUSINESS_EVALUATE':
            return {
                ...state,
                isRefreshingListBusinessEvaluate: true
            }
        case 'LOAD_MORE_LIST_BUSINESS_EVALUATE':
            return {
                ...state,
                isLoadMoreListBusinessEvaluate: true
            }
        case 'LOAD_MORE_LIST_PROPERTY_EVALUATE':
            return {
                ...state,
                isLoadMoreListPropertyEvaluate: true
            }
        case 'REFRESH_LIST_PROPERTY_EVALUATE':
            return {
                ...state,
                isRefreshingListPropertyEvaluate: true
            }
        case 'RESET_STATE_SEARCH':
            return {
                ...state,
                listBusinessEvaluateSearch: [],
                listPropertyEvaluateSearch: [],
                sortBusinessEvaluateSearch: {
                    title: "Sớm nhất",
                    sort: "created_at",
                    direction: "asc"
                },
                sortPropertyEvaluateSearch: {
                    title: "Sớm nhất",
                    sort: "created_at",
                    direction: "asc"
                },
            }
        case 'LOADING_ROOT':
            return {
                ...state,
                loading: true
            }
        case 'STOP_LOADING_ROOT':
            return {
                ...state,
                loading: false
            }
        case 'APP_LOGOUT':
            return initialState;
        case 'GET_NUMBER_NOTI_UNREAD_SUCCESS':
            return {
                ...state,
                unread_notifications: action.payload.unread_notifications ? parseInt(action.payload.unread_notifications) : 0
            }

        default:
            return state
    }
}

function calculatePage({ current_page, per_page, total_count }) {
    const temptTotalPage = total_count % per_page === 0 ? parseInt(total_count / per_page) : parseInt(total_count / per_page) + 1;
    return {
        currentPage: current_page,
        totalPage: temptTotalPage
    }
}

function concatListData(page, oldData, newData) {
    if (page === 1) {
        return newData;
    } else {
        return oldData.concat(newData);
    }
}

module.exports = appReducer;