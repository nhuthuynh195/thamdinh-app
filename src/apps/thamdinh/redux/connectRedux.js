import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { connectAlert } from "../../../core/components/Alert";
import { connectNoti } from "../../../core/components/NotificationError";
import { connectLoading } from "../../../core/components/Loading";
import actions from "./actions";

const mapDispatchToProps = dispatch => {
    let acts = {};
    for (let key in actions) {
        acts[key] = bindActionCreators(actions[key], dispatch);
    }
    return {
        actions: acts,
        dispatch
    };
};

function connectRedux(mapStateToProps, Screen) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true }
    )(connectAlert(connectNoti(Screen)));
}
export default connectRedux;
