const initialState = {
    profile: {},
    headers: {}
}

function dataLocal(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_PROFILE_LOCAL':
            return {
                ...state,
                profile: action.payload.profile,
                headers: action.payload.headers
            }
        case 'UPDATE_PROFILE_LOCAL':
            return {
                ...state,
                profile: action.payload
            }
        case 'APP_LOGOUT':
            return initialState;
        default:
            return state
    }
}

module.exports = dataLocal;