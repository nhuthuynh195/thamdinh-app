import React, { Component, memo } from 'react';
import { View, Platform, Image, TouchableOpacity } from 'react-native';

import IMAGE from '@resources/icon';
import styleConfig from '@configs/style';
import Configs from '@core/configs';
import { HeaderSearch, Tabs, Text, HeaderTab, PopupPhone } from '@core/components';
import { scaleSzie } from '@core/utils/func';
import SortModal from '../SortModal';
import BusinessEvaluateSearch from './widget/BusinessEvaluateSearch';
import PropertyEvaluateSearch from './widget/PropertyEvaluateSearch';

class Layout extends Component {
    render() {
        const { textSearch,phone,visiblePopUpPhone } = this.state;
        const { navigation, listBusinessEvaluateSearch, isLoadingGetListBusinessEvaluateSearch,
            isLoadingGetListPropertyEvaluateSearch, listPropertyEvaluateSearch
        } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: styleConfig.BACKGROUND_COLOR_LIGHT }}>
                <HeaderSearch
                    goBack={this.backHome}
                    onChangeText={e => this.setState({ textSearch: e })}
                    showIconClearText={textSearch.length > 0}
                    clearText={() => this.setState({ textSearch: '' })}
                    search={this.sortUserByConditon}
                    onSubmitEditing={this.sortUserByConditon}
                />
                {
                    Platform.OS === 'ios' ? <View style={{ height: scaleSzie(25) }} /> : <View />
                }

                <HeaderTab
                    onChangeTab={this.onChangeTab}
                    isHideMap={true}
                    gotoSort={this.showModalSort}
                >
                    <View tabLabel={'Thẩm KD'} style={{ flex: 1 }}>
                        {
                            listBusinessEvaluateSearch.length === 0 && !isLoadingGetListBusinessEvaluateSearch ? this.renderViewEmpty() : <BusinessEvaluateSearch
                            showPopupPhone={(phone) => this.setState({
                                visiblePopUpPhone: true,
                                phone:phone
                            
                            })}
                                navigation={navigation}
                            />
                        }
                    </View>

                    <View tabLabel={'Thẩm nhà'} style={{ flex: 1 }} >
                        {
                            listPropertyEvaluateSearch.length === 0 && !isLoadingGetListPropertyEvaluateSearch ? this.renderViewEmpty() : <PropertyEvaluateSearch
                                showPopupPhone={(phone) => this.setState({
                                    visiblePopUpPhone: true,
                                    phone:phone
                                
                                })}
                                navigation={navigation}
                            />
                        }
                    </View>

                </HeaderTab>
                {this.renderModalSort()}
                <PopupPhone
                    visible={visiblePopUpPhone}
                    callPhone={() => this.callPhone(clientDetail.person_phone)}
                    hidePopupCall={this.hidePopupCall}
                    phone={phone}
                />
            </View>
        );
    }

    renderModalSort() {
        const { visibleSort } = this.state;
        return (
            <SortModal
                ref={this.sortModalRef}
                visible={visibleSort}
                onRequestClose={this.onRequestClose}
                selectCondiSort={this.selectCondiSort}
                sortUserByConditon={() => this.sortUserByConditon()}
            />
        );
    }

    renderViewEmpty() {
        return (
            <View style={{ marginTop: scaleSzie(60), width: Configs.FULL_WIDTH, alignItems: 'center' }} >
                <Image style={{ width: scaleSzie(60), height: scaleSzie(60) }} source={IMAGE.searchEmpty} />
                <Text style={{ fontSize: scaleSzie(18), color: '#BBBBBB' }}>Không có kết quả tìm kiếm</Text>
            </View>
        );
    };
}

export default Layout;
