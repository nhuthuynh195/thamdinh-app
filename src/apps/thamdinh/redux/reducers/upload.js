const initialState = {
    uploadPhoto: ''
}

function upload(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_PROFILE_LOCAL':
            return {
                ...state,
                uploadPhoto: ''
            }
        case 'APP_LOGOUT':
            return initialState;
        default:
            return state
    }
}

module.exports = upload;