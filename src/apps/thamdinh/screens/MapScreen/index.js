import React from 'react';
import {
    PermissionsAndroid,
    Platform
} from 'react-native';
import _ from 'ramda';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeLast } from 'rxjs/operators';

import LayoutMap from '@core/screens/LayoutMap';
import { getPosotion,showAlertTurnOnLocation } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';
import CallPhone from '@core/utils/callPhone';


class MapScreen extends LayoutMap {

    constructor(props) {
        super(props);
        const indexClientLocation = this.props.navigation.getParam('indexClientLocation', -1);
        const { latitude, longitude } = this.props.yourLocation;
        this.state = {
            isLoadingMap: false,
            error: null,
            loadingReady: true,
            visiblePopUpPhone: false,
            currentClientLocation: indexClientLocation === -1 ? 0 : indexClientLocation,
            phone: '',
            zoomMapView: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922 * 5,
                longitudeDelta: 0.0421 * 5,
            }
        };
        this.carouselRef = React.createRef();
        this.mapRef = React.createRef();
        this.zoomStream = new Subject();

        this.loadingMapView = this.loadingMapView.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.getDirections = this.getDirections.bind(this);
        this.onSnapToItem = this.onSnapToItem.bind(this);
        this.backHome = this.backHome.bind(this);
        this.showPopupPhone = this.showPopupPhone.bind(this);
        this.hidePopupCall = this.hidePopupCall.bind(this);
        this.callPhone = this.callPhone.bind(this);

    }

    async componentDidMount() {
        this.navListener = this.props.navigation.addListener('didFocus', this.loadingMapView);
        this.getDirections();

    }

    backHome() {
        this.props.navigation.goBack();
    }

    async getDirections(index = 0) {
        try {
            const position = await getPosotion();
            const temptPosision = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            const { yourLocation, navigation, listBusinessEvaluate, listPropertyEvaluate } = this.props;
            const typeUser = this.props.navigation.getParam('typeUser', '');
            const singleUser = navigation.getParam('singleUser', {});
            if (!_.isEmpty(singleUser)) {
                this.props.actions.map.getMapDirections(`${temptPosision.latitude},${temptPosision.longitude}`, `${singleUser.latitude},${singleUser.longitude}`
                )
            } else {
                const temptData = typeUser === 'Thẩm KD' ? this.filterLocationNotNull(listBusinessEvaluate) : this.filterLocationNotNull(listPropertyEvaluate);
                if (temptData.length > 0) {
                    const temptCurrentUserLocation = temptData[this.state.currentClientLocation];
                    if (typeUser === 'Thẩm KD') {
                        this.props.actions.map.getMapDirections(`${temptPosision.latitude},${temptPosision.longitude}`, `${temptCurrentUserLocation.latitude},${temptCurrentUserLocation.longitude}`);
                    } else {
                        this.props.actions.map.getMapDirections(`${temptPosision.latitude},${temptPosision.longitude}`, `${temptCurrentUserLocation.home_latitude},${temptCurrentUserLocation.home_longitude}`);
                    }

                }

            }
        } catch (error) {
            showAlertTurnOnLocation();
        }
    }

    filterLocationNotNull(data) {
        const typeUser = this.props.navigation.getParam("typeUser", "");
        if (typeUser === "Thẩm KD") {
            return data.filter(item => item.longitude && item.latitude)
        }
        return data.filter(item => item.home_longitude && item.home_latitude)
    }



    async onSnapToItem(index) {
        await this.setState({
            currentClientLocation: index
        });
        this.getDirections();
    }

    onPressMarker(index) {
        this.carouselRef.current.snapToItem(index);
    }

    loadingMapView() {
        this.setState({
            isLoadingMap: true
        })
    }

    async onMapReady() {
        if (Platform.OS !== 'ios') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }
        this.setState({
            isLoadingMap: true
        })
    }

    gotoClientDetail(user, typeUser) {
        const temptTypeClient = typeUser === 'Thẩm KD' ? 'business_evaluate' : 'property_evaluate';
        if (typeUser === 'Thẩm KD') {
            this.props.navigation.navigate('UserDetail', {
                typeUser: this.props.typeUser,
                clientTitleHeader: user.person_full_name,
                clientId: user.id,
                clientype: temptTypeClient
            });
        } else {
            this.props.navigation.navigate('UserDetail1', {
                typeUser: this.props.typeUser,
                clientTitleHeader: user.person_full_name,
                clientId: user.id,
                clientype: temptTypeClient
            });
        }
        // this.props.navigation.navigate('UserDetail', {
        //     typeUser: this.props.typeUser,
        //     clientTitleHeader: client.person_full_name,
        //     clientId: client.id,
        //     clientype: 'business_evaluate'
        // });
    }

    showPopupPhone(phone) {

        this.setState({
            visiblePopUpPhone: true,
            phone: phone
        })
    }

    hidePopupCall() {
        this.setState({
            visiblePopUpPhone: false
        })
    }

    callPhone() {
        const args = {
            number: this.state.phone,
            prompt: false
        }
        CallPhone(args)
            .then(this.hidePopupCall)
            .catch(console.error)
    }

    onRegionChangeComplete = (region) => {
        if (Platform.OS === 'android') {
            this.setState({
                zoomMapView: region
            })
        }
    }

    componentWillUnmount() {
        this.navListener.remove();
        this.props.actions.map.clearMapDirections();
        navigator.geolocation.clearWatch()
    }

}

const mapStateTpProps = state => {
    return {
        coords: state.map.coords,
        yourLocation: state.map.yourLocation,
        userLocation: state.map.userLocation,
        data: state.client.data,
        listBusinessEvaluate: state.app.listBusinessEvaluate,
        listPropertyEvaluate: state.app.listPropertyEvaluate,
        callableBusiness: state.app.callableBusiness,
        callabProperty: state.app.callabProperty
    }
}

export default connectRedux(mapStateTpProps, MapScreen);
