/* eslint-disable react/prefer-stateless-function */
import PropTypes from "prop-types";

import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

const connectAlert = WrappedComponent => {
  class ConnectedAlert extends Component {
    render() {
      const { openAlert } = this.context;
      return (
        <WrappedComponent
          {...this.props}
          openAlert={openAlert}
        />
      );
    }
  }

  ConnectedAlert.contextTypes = {
    openAlert: PropTypes.func,
  };

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent);
};

export default connectAlert;
