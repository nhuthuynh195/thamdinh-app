import React from 'react';
import {
    View,
    FlatList,
    Dimensions, Image
} from 'react-native';

import { PlaceHolderList, ButtonSubmit, Text } from '@core/components';
import connectRedux from '../../../redux/connectRedux';
import { ItemUserInfo } from '../../../components'
import { scaleSzie, getPosotion, showAlertTurnOnLocation } from '@core/utils/func';
import IMAGE from "@resources/icon";
import { EmptyListEvaluate } from './EmptyListEvaluate';

const { width, height } = Dimensions.get("window");

class BusinessEvaluate extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    reloadList = async () => {
        // alert("cddd")
        try {
            this.props.actions.app.reloadListBusinessEvaluate();
            const position = await getPosotion();
            this.props.actions.app.getListBusinessEvaluate(
                position.coords.latitude,
                position.coords.longitude,
                this.props.sortBusinessEvaluate
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

    refreshListBusinessEvaluate = async () => {
        try {
            this.props.actions.app.refreshListBusinessEvaluate();
            const position = await getPosotion();
            this.props.actions.app.getListBusinessEvaluate(
                position.coords.latitude,
                position.coords.longitude,
                this.props.sortBusinessEvaluate
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

    loadMoreListBusinessEvaluate = () => {
        const { isLoadMoreListBusinessEvaluate, metalListBusinessEvaluate, yourLocation, sortBusinessEvaluate } = this.props;
        const { currentPage, totalPage } = metalListBusinessEvaluate;
        // console.log('loadMoreListBusinessEvaluate : ', currentPage);
        const { latitude, longitude } = yourLocation;
        if (!isLoadMoreListBusinessEvaluate && currentPage < totalPage) {
            this.props.actions.app.loadmoreListBusinessEvaluate();
            this.props.actions.app.getListBusinessEvaluate(
                latitude,
                longitude,
                sortBusinessEvaluate,
                parseInt(currentPage + 1)
            )
        }
    }

    render() {
        const { navigation, isLoadingGetListBusinessEvaluate, listBusinessEvaluate, isReloadListBusinessEvaluate } = this.props;
        if (isLoadingGetListBusinessEvaluate) {
            return <PlaceHolderList />
        }
        else if (isReloadListBusinessEvaluate) {
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
                data={listBusinessEvaluate}
                renderItem={({ item, index }) => <ItemUserInfo
                    key={index} user={item}
                    navigation={navigation}
                    showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                    typeUser="Business"
                />}
                keyExtractor={(item, index) => `${index}`}
                // getItemLayout={(data, index) => ({ length: scaleSzie(155), offset: scaleSzie(155) * index, index })}
                // initialNumToRender={5}
                ListFooterComponent={() => <View style={{ height: scaleSzie(40) }} />}
                ListHeaderComponent={() => <View style={{ height: scaleSzie(2) }} />}
                showsVerticalScrollIndicator={false}
                onRefresh={this.refreshListBusinessEvaluate}
                refreshing={this.props.isRefreshingListBusinessEvaluate}
                onEndReached={this.loadMoreListBusinessEvaluate}
                ListEmptyComponent={<EmptyListEvaluate title="Danh sách thẩm kinh doanh trống" />}

                // ----- add props -----
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                maxToRenderPerBatch={5}
            />
        );
    }

}


const mapStateToProps = state => {
    return {
        yourLocation: state.map.yourLocation,
        isLoadingGetListBusinessEvaluate: state.app.isLoadingGetListBusinessEvaluate,
        listBusinessEvaluate: state.app.listBusinessEvaluate,
        isRefreshingListBusinessEvaluate: state.app.isRefreshingListBusinessEvaluate,
        sortBusinessEvaluate: state.app.sortBusinessEvaluate,
        isLoadMoreListBusinessEvaluate: state.app.isLoadMoreListBusinessEvaluate,
        metalListBusinessEvaluate: state.app.metalListBusinessEvaluate,
        isReloadListBusinessEvaluate: state.app.isReloadListBusinessEvaluate
    };
};

export default connectRedux(mapStateToProps, BusinessEvaluate);