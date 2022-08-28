export function getMapDirections(start, destination) {
    return {
        type: 'GET_MAP_DIRECTIONS',
        payload: {
            start,
            destination
        }
    }
}

export function clearMapDirections() {
    return {
        type: 'CLEAR_MAP_DIRECTIONS',
        payload: {}
    }
}

export function setYourLocation(yourLocation, clientIndex = 0) {
    return {
        type: 'SET_YOUR_LOCATION',
        payload: {
            yourLocation,
            clientIndex
        }
    }
}