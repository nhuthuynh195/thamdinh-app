import React from 'react';
import {
    View,
    Image,
    FlatList,
    ScrollView,
    RefreshControl
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { Text, Button, PlaceHolderList ,ButtonSubmit} from '@core/components';
import { ItemUserInfo } from '../../../components'
import { scaleSzie,showAlertTurnOnLocation } from '@core/utils/func';
import Configs from '@core/configs';
import IMAGE from '@core/resources/icon';
import connectRedux from '../../../redux/connectRedux';
import { EmptyListEvaluate } from './EmptyListEvaluate';

class Evaluted extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            dropDownBusiness: true,
            dropdownHouse: true,
            refreshing: false
        };

        this.scrollEvalutedRef = React.createRef();
    }

    componentDidMount() {
        const { latitude, longitude } = this.props.yourLocation;
        this.props.actions.app.getListBusinessHasEvaluated(latitude, longitude);
        this.props.actions.app.getListPropertyHasEvaluated(latitude, longitude);

    }

    reloadListBusinessHasEvaluated = () =>{
        const { latitude, longitude } = this.props.yourLocation;
        this.props.actions.app.reloadListBusinessHasEvaluated();
        this.props.actions.app.getListBusinessHasEvaluated(latitude, longitude);
    }

    reloadListPropertyHasEvaluated = () =>{
        const { latitude, longitude } = this.props.yourLocation;
        this.props.actions.app.reloadListPropertyHasEvaluated();
        this.props.actions.app.getListPropertyHasEvaluated(latitude, longitude);
    }

    async  onPressHeader(title) {
        const { isLoadingGetListBusinessHasEvaluated } = this.props;
        if (!isLoadingGetListBusinessHasEvaluated) {
            title === 'Thẩm Kinh Doanh' ? this.setState(prevState => ({ dropDownBusiness: !prevState.dropDownBusiness })) : this.setState(prevState => ({ dropdownHouse: !prevState.dropdownHouse }))
        }
    }

    renderHeader(title, isDown) {
        const iconDrop = isDown ? IMAGE.dropDown : IMAGE.dropUp;
        return (
            <View style={{ height: scaleSzie(35), width: Configs.FULL_WIDTH, paddingHorizontal: scaleSzie(12) }} >
                <Button onPress={() => this.onPressHeader(title)} style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
                    borderBottomWidth: scaleSzie(1), borderBottomColor: '#F0F0F0'
                }} >
                    <Text bold style={{ color: '#424242', fontSize: scaleSzie(16) }}  >
                        {title}
                    </Text>
                    <View style={{ flex: 1 }} />
                    <Image
                        source={iconDrop}
                        style={{
                            marginRight: scaleSzie(7)
                        }}
                    />
                </Button>

            </View>
        );
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { latitude, longitude } = this.props.yourLocation;
        this.props.actions.app.getListBusinessHasEvaluated(latitude, longitude);
        this.props.actions.app.getListPropertyHasEvaluated(latitude, longitude);
        setTimeout(() => {
            this.setState({
                refreshing: false
            })
        }, 3000)
    }

    render() {
        const { dropDownBusiness, dropdownHouse } = this.state;
        const { navigation, isLoadingGetListBusinessHasEvaluated, listtBusinessHasEvaluated, isLoadingGetListPropertyHasEvaluated,
            listPropertyHasEvaluated, isReloadBusinessHasEvaluated,isReloadListPropertyHasEvaluated
        } = this.props;
        return (
            <View style={{ flex: 1, }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />

                    }
                >
                    {this.renderHeader('Thẩm Kinh Doanh', dropDownBusiness)}
                    {/* ----------- Thẩm Kinh Doanh -------------- */}
                    {
                        dropDownBusiness ? (isLoadingGetListBusinessHasEvaluated ? <PlaceHolderList /> : isReloadBusinessHasEvaluated ? <View style={{ flex: 1, alignItems: "center", paddingTop: scaleSzie(70),marginBottom:scaleSzie(20) }} >
                            <View style={{ width: "80%" }} >

                                <Text style={{ fontSize: scaleSzie(16), textAlign: "center", marginBottom: scaleSzie(10) }} >
                                    Mạng của bạn không ổn định !
                                 </Text>
                                <ButtonSubmit
                                    title="Bấm vào đây để tải lại danh sách"
                                    onPress={this.reloadListBusinessHasEvaluated}
                                />
                            </View>

                        </View> : <FlatList
                                data={listtBusinessHasEvaluated}
                                renderItem={({ item, index }) =>
                                    <ItemUserInfo key={index}
                                        user={item}
                                        evaluateStatus={item.evaluate_status}
                                        navigation={navigation}
                                        showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                                        typeUser='Business'
                                    />}
                                keyExtractor={(item, index) => `${index}`}
                                ListHeaderComponent={() => <View style={{ height: 20 }} />}
                                ListFooterComponent={() => <View style={{ height: 20 }} />}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={<EmptyListEvaluate title="Danh sách đã thẩm KD trống" />}

                            />) : <View />
                    }
                    {/* ----------- Thẩm Kinh Doanh -------------- */}
                    {this.renderHeader('Thẩm nhà', dropdownHouse)}
                    {
                        dropdownHouse ? (isLoadingGetListPropertyHasEvaluated ? <PlaceHolderList /> :  isReloadListPropertyHasEvaluated ? <View style={{ flex: 1, alignItems: "center", paddingTop: scaleSzie(70) }} >
                        <View style={{ width: "80%" }} >

                            <Text style={{ fontSize: scaleSzie(16), textAlign: "center", marginBottom: scaleSzie(10) }} >
                                Mạng của bạn không ổn định !
                             </Text>
                            <ButtonSubmit
                                title="Bấm vào đây để tải lại danh sách"
                                onPress={this.reloadListPropertyHasEvaluated}
                            />
                        </View>

                    </View> :  <FlatList
                            data={listPropertyHasEvaluated}
                            renderItem={({ item, index }) =>
                                <ItemUserInfo key={index}
                                    user={item}
                                    evaluateStatus={item.evaluate_status}
                                    navigation={navigation}
                                    showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                                />}
                            keyExtractor={(item, index) => `${index}`}
                            ListHeaderComponent={() => <View style={{ height: 20 }} />}
                            ListFooterComponent={() => <View style={{ height: 20 }} />}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<EmptyListEvaluate title="Danh sách đã thẩm nhà trống" />}

                        /> ): <View />
                    }
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        listtBusinessHasEvaluated: state.app.listtBusinessHasEvaluated,
        isLoadingGetListBusinessHasEvaluated: state.app.isLoadingGetListBusinessHasEvaluated,
        yourLocation: state.map.yourLocation,
        isLoadingGetListPropertyHasEvaluated: state.app.isLoadingGetListPropertyHasEvaluated,
        listPropertyHasEvaluated: state.app.listPropertyHasEvaluated,
        isReloadBusinessHasEvaluated: state.app.isReloadBusinessHasEvaluated,
        isReloadListPropertyHasEvaluated : state.app.isReloadListPropertyHasEvaluated
    };
};

export default connectRedux(mapStateToProps, Evaluted);