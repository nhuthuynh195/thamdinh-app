const initialState = {
  data: [
    { latitude: 10.7873273, longitude: 106.6923783 },
    { latitude: 10.7816993, longitude: 106.6972493 },
    { latitude: 10.7952743, longitude: 106.7062733 },
    { latitude: 10.7738233, longitude: 106.7216273 },
    { latitude: 10.7587143, longitude: 106.6987073 }
  ]
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

module.exports = clientReducer;
