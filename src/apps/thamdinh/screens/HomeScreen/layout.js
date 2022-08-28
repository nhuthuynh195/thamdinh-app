import React from 'react';
import {
    View,
    Image,
} from 'react-native';

import { Button, HeaderTab, Text, PopupPhone } from '@core/components';
import IMAGE from '@core/resources/icon';
import styles from './style';
import { scaleSzie } from '@core/utils/func';
import SortModal from '../SortModal';
import Evaluted from './widget/Evaluted';
import PropertyEvaluate from './widget/PropertyEvaluate';
import BusinessEvaluate from './widget/BusinessEvaluate';

export default class Layout extends React.Component {

    renderHeader() {
        const { unread_notifications } = this.props;
        return (
            <View style={styles.containerHeader} >
                <View style={styles.header} >
                    <View style={styles.containerProfile} >
                        <Button onPress={this.gotoProfile}>
                            <Image source={IMAGE.profile} style={{ width: scaleSzie(37), height: scaleSzie(37) }} />
                        </Button>
                    </View>
                    <View style={styles.containerLogo} >
                        <Text style={{ color: '#201F42', fontWeight: '600', fontSize: scaleSzie(20) }} >
                            Kim An
                        </Text>
                    </View>
                    <View style={styles.containerNoti} >
                        <Button onPress={this.gotoNoti}>

                            <Image source={IMAGE.notification}
                                style={{ width: scaleSzie(22), height: scaleSzie(22) }}
                            />
                            {
                                unread_notifications == 0 ? <View /> : <View style={styles.numberNoti} >
                                    <Text style={{ color: '#ffffff', fontSize: scaleSzie(10), fontWeight: 'bold' }} >
                                        {unread_notifications}
                                    </Text>
                                </View>
                            }

                        </Button>
                        <Button onPress={this.gotoSearch} >
                            <Image source={IMAGE.search}
                                style={{ width: scaleSzie(22), height: scaleSzie(22), marginLeft: scaleSzie(26) }}
                            />
                        </Button>
                    </View>
                </View>
            </View>
        );
    }


    renderModalSort() {
        const { visible } = this.state;
        return (
            <SortModal
                ref={this.sortModalRef}
                visible={visible}
                onRequestClose={this.onRequestClose}
                selectCondiSort={this.selectCondiSort}
                sortUserByConditon={() => this.sortUserByConditon()}
            />
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <View style={{ height: scaleSzie(29) }} />
                <HeaderTab
                    gotoMap={this.gotoMap}
                    gotoSort={this.gotoSort}
                    onChangeTab={(currentTab) => this.setState({ currentTab: currentTab.i })}
                >
                    <View tabLabel={"Thẩm KD"} style={{ flex: 1 }} >
                        <BusinessEvaluate
                            showPopupPhone={this.showPopupPhone}
                            navigation={navigation} />
                    </View>
                    <View tabLabel={"Thẩm nhà"} style={{ flex: 1 }} >
                        <PropertyEvaluate
                            showPopupPhone={this.showPopupPhone}
                            navigation={navigation}
                        />
                    </View>
                    <View tabLabel={"Đã thẩm"} style={{ flex: 1 }} >
                        <Evaluted
                            showPopupPhone={this.showPopupPhone}
                            navigation={navigation}
                        />
                    </View>
                </HeaderTab>
                {this.renderModalSort()}
                <PopupPhone
                    visible={this.state.visiblePopUpPhone}
                    callPhone={this.callPhone}
                    hidePopupCall={this.hidePopupCall}
                    phone={this.state.phone}
                />
            </View>
        );
    }
}
