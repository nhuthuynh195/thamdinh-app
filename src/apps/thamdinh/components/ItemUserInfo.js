import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import _ from 'ramda';
import FastImage from 'react-native-fast-image'

import { scaleSzie, formatDay, formatTime } from '@core/utils/func';
import styleConfigs from '@core/configs/style';
import Configs from '@core/configs';
import IMAGE from '@core/resources/icon';
import { Button, Text } from '@core/components';
import commonStyles from '@core/commonStyles';
import connectRedux from '../redux/connectRedux';

class ItemUserInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gotoUserInfoDetail = this.gotoUserInfoDetail.bind(this);
        this.gotoMap = this.gotoMap.bind(this);
        this.showPopupPhone = this.showPopupPhone.bind(this);
    }

    gotoUserInfoDetail() {
        const { typeUser, user } = this.props;
        const temptTypeClient = typeUser === 'Business' ? 'business_evaluate' : 'property_evaluate';
        if (typeUser === 'Business') {
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
    }

    gotoMap() {
        const { fromSearToMap, navigation, user, typeUser, listBusinessEvaluate, listPropertyEvaluate } = this.props;
        if (fromSearToMap) {
            navigation.navigate('Map', {
                singleUser: user,
                typeUser: typeUser === 'Business' ? 'Thẩm KD' : 'Thẩm nhà'
            });
        } else {
            navigation.navigate('Map', {
                typeUser: typeUser === 'Business' ? 'Thẩm KD' : 'Thẩm nhà',
                indexClientLocation: typeUser === 'Business' ? _.findIndex(_.propEq('id', user.id))(this.filterLocationNotNull(listBusinessEvaluate)) : _.findIndex(_.propEq('id', user.id))(this.filterLocationNotNull(listPropertyEvaluate))
            });
        }
    }

    filterLocationNotNull(data) {
        return data.filter(item => item.distance !== 0)
    }

    showPopupPhone() {
        const { user } = this.props;
        this.props.showPopupPhone(user.person_phone);
    }

    renderUserInfo() {
        const { evaluateStatus, user, typeUser } = this.props;
        const iconStatus = evaluateStatus === 'done' ? IMAGE.resolvedAssesment : IMAGE.deniedAssesment;
        return (
            <View style={styles.userInfo} >
                <View style={styles.userInfoContent} >
                    <View style={{ flexDirection: 'row' }} >
                        {
                            evaluateStatus ? <Image
                                source={iconStatus}
                                style={{ width: scaleSzie(20), height: scaleSzie(20), marginRight: scaleSzie(10) }}
                            /> : null
                        }

                        <Text style={{
                            color: '#4F4F4F', fontSize: scaleSzie(16), fontWeight: 'bold',
                            fontFamily: 'Nunito Sans'
                        }} >
                            {user.person_full_name}
                        </Text>
                        {
                            evaluateStatus || user.customer_status !== 'Đáo hạn' ? <View /> : <View style={[{
                                width: scaleSzie(60), height: scaleSzie(24),
                                backgroundColor: styleConfigs.PURPLE_COLOR,
                                marginLeft: scaleSzie(16),
                                borderRadius: scaleSzie(2)
                            },
                            commonStyles.centerHorVer]} >
                                <Text bold style={{ color: '#ffffff', fontSize: scaleSzie(12), }}  >
                                    {user.customer_status}
                                </Text>
                            </View>
                        }

                    </View>
                    {/* ========= render Address ======= */}
                    <View style={{ height: scaleSzie(50) }} >
                        <Text style={{
                            color: '#424242', marginRight: scaleSzie(40),
                            marginTop: scaleSzie(4), fontSize: scaleSzie(14)

                        }} numberOfLines={2} >
                            {typeUser === 'Business' ? user.person_address : user.person_home_address}
                        </Text>
                    </View>
                    {/* ========= render store ======= */}
                    <View style={{ flexDirection: 'row', marginTop: scaleSzie(5) }} >
                        <Text style={{ color: '#424242', fontSize: scaleSzie(14) }} numberOfLines={1} >
                            {this.formatStringOverLong(user.person_business)}
                        </Text>
                        <View style={{ height: scaleSzie(19), justifyContent: 'flex-end', marginLeft: scaleSzie(16) }} >
                            <Text style={{ color: '#424242', fontSize: scaleSzie(12), fontWeight: 'bold' }}   >
                                {user.business_shift ? user.business_shift : ''}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* ========= render Avatar ======= */}
                <View style={styles.avatarContainer} >
                    {
                        user.avatar_url !== null ? this.renderAvartarUser() : <Image
                            source={IMAGE.famaleAvatar}
                            style={{ width: scaleSzie(70), height: scaleSzie(70) }}
                        />
                    }
                </View>
            </View>
        );
    }

    renderAvartarUser() {
        const { user } = this.props;
        return (
            <View style={{
                width: scaleSzie(70), height: scaleSzie(70), borderRadius: scaleSzie(35),
                overflow: 'hidden'
            }} >
                <FastImage
                    source={{ uri: user.avatar_url, priority: FastImage.priority.low, }}
                    style={{ width: scaleSzie(70), height: scaleSzie(70) }}
                />
            </View>

        );
    }

    formatStringOverLong(string) {
        if (string != null) {
            if (string.length > 25) {
                return `${string.slice(0, 25)}...`
            }
            return string;
        }
        return '';

    }

    checkIsAssignedUser() {
        const { user, typeUser } = this.props;
        if (user.is_same_assigned) {
            if (typeUser === 'Business') {
                return ` + Thẩm Nhà`;
            } else {
                return `+ Thẩm KD`;
            }
        }
        return '';
    }

    renderUserTime() {
        const { user, typeUser, callableBusiness, callabProperty } = this.props;
        const callable = typeUser === 'Business' ? callableBusiness : callabProperty;
        // alert(typeUser);
        return (
            <View style={styles.userTime} >
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ color: '#424242', fontSize: scaleSzie(12) }} >
                            {formatDay(user.evaluate_time)}
                        </Text>
                        <Text style={{ color: '#424242', fontSize: scaleSzie(12), marginHorizontal: scaleSzie(4) }} >
                            -
                        </Text>
                        <Text style={{ color: '#424242', fontSize: scaleSzie(12), fontWeight: 'bold' }} >
                            {formatTime(user.evaluate_time)}
                        </Text>
                    </View>
                    <View style={[{ flex: 1, justifyContent: 'center', paddingLeft: scaleSzie(12) },
                    this.checkIsAssignedUser() !== '' ? { borderLeftColor: '#424242', borderLeftWidth: 0.5 } : {}
                    ]} >
                        <Text style={{ color: '#424242', fontSize: scaleSzie(12) }} >
                            {this.checkIsAssignedUser()}
                        </Text>
                    </View>
                </View>
                <View style={{ width: scaleSzie(100), flexDirection: 'row', justifyContent: 'space-between' }} >
                    {
                        this.checkDisplayIconMap(user) ? <Button onPress={this.gotoMap} style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                            <Image source={IMAGE.location} style={{ width: scaleSzie(17), height: scaleSzie(24), marginBottom: scaleSzie(4) }} />
                            <Text bold style={{
                                color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(13),
                                marginLeft: 2,
                            }} >
                                {`${user.distance}km`}
                            </Text>
                        </Button> : <View />
                    }
                    {
                        user.person_phone === "" || !callable ? <View /> :
                            <Button onPress={this.showPopupPhone}   >
                                <Image source={IMAGE.phone} style={{ width: scaleSzie(24), height: scaleSzie(24) }} />
                            </Button>
                    }


                </View>
            </View>
        );
    }

    checkDisplayIconMap(user) {
        const { typeUser } = this.props;
        if (typeUser === 'Business') {
            return user.longitude && user.latitude;
        }
        return user.home_longitude && user.home_latitude;
    }

    render() {
        const { user } = this.props;
        return (
            <View style={[styles.parentContainer]} >
                <Button onPress={this.gotoUserInfoDetail} style={[styles.containerChild, , commonStyles.shadowApp]} >
                    <View style={styles.container} >
                        <View style={{
                            height: scaleSzie(30), flexDirection: 'row',

                        }} >
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Text style={{ color: '#4F4F4F', fontSize: scaleSzie(14), fontWeight: '700' }} >
                                    {`Khách hàng : ${user.p_id}`}
                                </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                                <Text style={{ color: '#4F4F4F', fontSize: scaleSzie(14), fontWeight: '700' }} >
                                    {`Hợp đồng : ${user.id}`}
                                </Text>
                            </View>
                        </View>
                        {this.renderUserInfo()}
                        {this.renderUserTime()}
                    </View>
                </Button>
            </View>
        );
    }


}

const mapStateTpProps = state => {
    return {
        listBusinessEvaluate: state.app.listBusinessEvaluate,
        listPropertyEvaluate: state.app.listPropertyEvaluate,
        callableBusiness: state.app.callableBusiness,
        callabProperty: state.app.callabProperty
    }
}

export default connectRedux(mapStateTpProps, ItemUserInfo);


const styles = StyleSheet.create({
    parentContainer: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(185),
        paddingHorizontal: scaleSzie(12),
        marginBottom: scaleSzie(12)
    },
    containerChild: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: scaleSzie(4),
        padding: scaleSzie(12),
    },
    container: {
        flex: 1,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    userTime: {
        height: scaleSzie(30),
        flexDirection: 'row'
    },
    userInfoContent: {
        flex: 1,
    },
    avatarContainer: {
        width: scaleSzie(70),
        paddingTop: scaleSzie(6)
    }
})