const mapMiddleware = store => next => action => {
    let type = action.type;
    switch (type) {
        case 'SET_YOUR_LOCATION':
            const appState = store.getState();
            const clientIndex = action.payload.clientIndex;
            const clientLoc = { ...appState.client.data[clientIndex] };
            next({ ...action, destination: clientLoc, type: 'SET_YOUR_LOCATION_MIDDLEWARE' });
            break;
        default:
            next(action);
    }

}

export default mapMiddleware;
