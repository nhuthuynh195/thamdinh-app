const initialState = {
    coords: [],
    yourLocation: {
        latitude: 0,
        longitude: 0,
    },
    userLocation: {
        latitude: 0,
        longitude: 0,
    }
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_MAP_DIRECTIONS_SUCCESS':
            return {
                ...state,
                coords: action.payload
            }
        case 'CLEAR_MAP_DIRECTIONS':
            return {
                ...state,
                coords: []
            }
        case 'SET_YOUR_LOCATION_SUCCESS':
            return {
                ...state,
                yourLocation: action.payload.yourLocation
            }

        default:
            return state
    }
}

module.exports = appReducer;