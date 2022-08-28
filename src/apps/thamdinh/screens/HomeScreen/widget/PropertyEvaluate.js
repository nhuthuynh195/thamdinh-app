import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import { PlaceHolderList, ButtonSubmit, Text } from '@core/components';
import connectRedux from '../../../redux/connectRedux';
import { ItemUserInfo } from '../../../components'
import { scaleSzie, getPosotion,showAlertTurnOnLocation } from '@core/utils/func';
import { EmptyListEvaluate } from './EmptyListEvaluate';

class PropertyEvaluate extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { yourLocation, sortPropertyEvaluate } = this.props;
        this.props.actions.app.getListPropertyEvaluate(
            yourLocation.latitude,
            yourLocation.longitude,
            sortPropertyEvaluate
        );
    }

    reloadList = async () => {
        try {
            this.props.actions.app.reloadListPropertyEvaluate();
            const position = await getPosotion();
            this.props.actions.app.getListPropertyEvaluate(
                position.coords.latitude,
                position.coords.longitude,
                this.props.sortPropertyEvaluate
            );
            this.props.actions.map.setYourLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        } catch (error) {
            this.props.actions.app.turnOffRefershAllApp();
            showAlertTurnOnLocation();
        }
    }

    refreshListPropertyEvaluate = async () => {
        try {
            this.props.actions.app.refreshListPropertyEvaluate();
            const position = await getPosotion();
            this.props.actions.app.getListPropertyEvaluate(
                position.coords.latitude,
                position.coords.longitude,
                this.props.sortPropertyEvaluate
            );
            this.props.actions.map.setYourLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        } catch (error) {
            // console.log("error : ", error);
            this.props.actions.app.turnOffRefershAllApp();
            showAlertTurnOnLocation();
        }
    }

    loadMoreListPropertyEvaluate = () => {
        const { isLoadMoreListPropertyEvaluate, metalListPropertyEvaluate, yourLocation, sortPropertyEvaluate } = this.props;
        const { currentPage, totalPage } = metalListPropertyEvaluate;
        const { latitude, longitude } = yourLocation;
        if (!isLoadMoreListPropertyEvaluate && currentPage < totalPage) {
            this.props.actions.app.loadmoreListPropertyEvaluate();
            this.props.actions.app.getListPropertyEvaluate(
                latitude,
                longitude,
                sortPropertyEvaluate,
                parseInt(currentPage + 1)
            )
        }
    }

    render() {
        const { navigation, isLoadingGetListPropertyEvaluate, listPropertyEvaluate, isReloadListPropertyEvaluate } = this.props;
        if (isLoadingGetListPropertyEvaluate) {
            return <PlaceHolderList />
        } else if (isReloadListPropertyEvaluate) {
            return <View style={{ flex: 1, alignItems: "center", paddingTop: scaleSzie(70) }} >
                <View style={{ width: "80%" }} >

                    <Text style={{ fontSize: scaleSzie(16), textAlign: "center", marginBottom: scaleSzie(10) }} >
                        Mạng của bạn không ổn định !
            </Text>
                    <ButtonSubmit
                        title="Bấm vào đây để tải lại danh sách"
                        onPress={this.reloadList}
                    />
                </View>

            </View>
        }
        return (
            <FlatList
                data={listPropertyEvaluate}
                renderItem={({ item, index }) => <ItemUserInfo
                    key={index} user={item} navigation={navigation}
                    showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                />}
                keyExtractor={(item, index) => `${index}`}
                // getItemLayout={(data, index) => ({ length: scaleSzie(155), offset: scaleSzie(155) * index, index })}
                // initialNumToRender={5}
                ListFooterComponent={() => <View style={{ height: scaleSzie(40) }} />}
                ListHeaderComponent={() => <View style={{ height: scaleSzie(2) }} />}
                showsVerticalScrollIndicator={false}
                onRefresh={this.refreshListPropertyEvaluate}
                refreshing={this.props.isRefreshingListPropertyEvaluate}
                onEndReached={this.loadMoreListPropertyEvaluate}
                ListEmptyComponent={<EmptyListEvaluate title="Danh sách thẩm nhà trống" />}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoadingGetListPropertyEvaluate: state.app.isLoadingGetListPropertyEvaluate,
        yourLocation: state.map.yourLocation,
        listPropertyEvaluate: state.app.listPropertyEvaluate,
        sortPropertyEvaluate: state.app.sortPropertyEvaluate,
        isRefreshingListPropertyEvaluate: state.app.isRefreshingListPropertyEvaluate,
        isLoadMoreListPropertyEvaluate: state.app.isLoadMoreListPropertyEvaluate,
        metalListPropertyEvaluate: state.app.metalListPropertyEvaluate,
        isReloadListPropertyEvaluate: state.app.isReloadListPropertyEvaluate
    };
};

export default connectRedux(mapStateToProps, PropertyEvaluate);