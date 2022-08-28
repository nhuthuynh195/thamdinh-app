import Layout from './layout';

class SettingScreen extends Layout {
    constructor(props) {
        super(props);
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    static getDrivedStateFromProps(props, state) {
        return null;
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    gotoDetail() {
        this.props.navigation.push('Profile')
    }

}


export default SettingScreen;