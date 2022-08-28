const authMiddleware = store => next => action => {
    if (action.token) {
        const appState = store.getState();
        return next({ ...action, headers: appState.dataLocal.headers })
    }
    return next(action)

}

export default authMiddleware;
