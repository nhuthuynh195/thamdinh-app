import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import _ from 'ramda';
import FastImage from 'react-native-fast-image'

import { Text, Button, PlaceHolderList } from '@core/components';
import { scaleSzie } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';

class TabDocument extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { clientDetail } = this.props;
        this.props.actions.client.getClientDocumentInfo(clientDetail.id);
    }


    render() {
        const { documentInfo } = this.props;
        if (_.isEmpty(documentInfo)) {
            return <PlaceHolderList />
        }
        const { xac_minh_khach_hang, xac_minh_dia_chi_kd,
            xac_minh_noi_cu_tru, tai_lieu_hop_dong, khac
        } = documentInfo;
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24), }} >
                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                    Tài liệu
            </Text>
                <Button onPress={() => this.props.gotoCamera()} style={{ position: 'absolute', top: scaleSzie(0), right: scaleSzie(24) }} >
                    <Text bold style={{ fontSize: scaleSzie(16), color: '#5F5EA3' }} >
                        Đăng ảnh
                </Text>
                </Button>
            </View>
            <View style={{ flex: 1 }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    <ItemVerificationCustomer
                        data={xac_minh_khach_hang}
                    />
                    <ItemVerificationAddress
                        data={xac_minh_dia_chi_kd}
                    />
                    <ItemVerificationResident
                        data={xac_minh_noi_cu_tru}
                    />
                    <ItemContractDocument
                        data={tai_lieu_hop_dong}
                    />
                    <ItemOthers
                        data={khac}
                    />
                    <View style={{ height: scaleSzie(100) }} />
                </ScrollView>
            </View>
        </View>
    }

}


const ItemImage = props => {
    return (
        <View style={{ width: scaleSzie(63), height: scaleSzie(69), marginRight: scaleSzie(32) }} >
            <FastImage
                style={{width: scaleSzie(63), height: scaleSzie(69)}}
                source={{
                    uri: props.url,
                    // headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image
                source={{ uri: props.url }}
                style={{
                    width: scaleSzie(63), height: scaleSzie(69)
                }}
            /> */}
        </View>
    );
}

const ItemOthers = props => {
    const { data } = props;
    const { bang_ke_thu_nhap_chi_phi, hd_uy_quyen, giay_to_kinh_doanh,
        giay_to_lai_suat, giay_to_khac, khac
    } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Khác
            </Text>
            <ItemInfoImage
                title="Bảng kê thu nhập chi phí"
                images={bang_ke_thu_nhap_chi_phi}
            />
            <ItemInfoImage
                title="Hợp đồng uỷ quyền"
                images={hd_uy_quyen}
            />
            <ItemInfoImage
                title="Giấy tờ KD"
                images={giay_to_kinh_doanh}
            />
            <ItemInfoImage
                title="Giấy tờ lãi suất"
                images={giay_to_lai_suat}
            />
            <ItemInfoImage
                title="Giấy tờ khác"
                images={giay_to_khac}
            />
            <ItemInfoImage
                title="Khác"
                images={khac}
            />
        </View>

    );
}

const ItemContractDocument = props => {
    const { data } = props;
    const { don_de_nghi_vay_von, chung_tu_the_chap, danh_gia_kha_nang_thanh_toan } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Tài liệu hợp đồng
</Text>
            <ItemInfoImage
                title="Đơn đề nghị vay vốn"
                images={don_de_nghi_vay_von}
            />
            <ItemInfoImage
                title="Chứng từ thế chấp"
                images={chung_tu_the_chap}
            />
            <ItemInfoImage
                title="Đánh giá khả năng thanh toán"
                images={danh_gia_kha_nang_thanh_toan}
            />
        </View>

    );
}
const ItemVerificationResident = props => {
    const { data } = props;
    const { hinh_anh_nha_o, dinh_vi_nha_o, hinh_anh_ve_tinh_nha } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Xác minh nơi cư trú
        </Text>
            <ItemInfoImage
                title="Hình ảnh địa chỉ hiện tại"
                images={hinh_anh_nha_o}
            />
            <ItemInfoImage
                title="Định vị nhà theo kinh độ/vĩ độ"
                images={dinh_vi_nha_o}
            />
            <ItemInfoImage
                title="Hình ảnh vệ tinh nhà"
                images={hinh_anh_ve_tinh_nha}
            />
        </View>
    );
}

const ItemVerificationAddress = props => {
    const { data } = props;
    const { hinh_anh_kinh_doanh, dinh_vi_kd, hinh_anh_ve_tinh_kd } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Xác minh địa chỉ KD
            </Text>
            <ItemInfoImage
                title="Hình ảnh KD"
                images={hinh_anh_kinh_doanh}
            />
            <ItemInfoImage
                title="Định vị KD theo kinh độ/vĩ độ"
                images={dinh_vi_kd}
            />
            <ItemInfoImage
                title="Hình ảnh vệ tinh kinh doanh"
                images={hinh_anh_ve_tinh_kd}
            />
        </View>
    );
}

const ItemVerificationCustomer = props => {
    const { data } = props;
    const { cmnd, cccd, ho_khau, chan_dung_kh, thong_tin_viec_lam } = data;
    return (
        <View style={[{
            paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20),
            paddingBottom: scaleSzie(16),
        }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Xác minh khách hàng
        </Text>
            <View>
                {/* <Text bold style={styles.textMain} >
                    Chứng minh nhân dân
                </Text>
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ alignItems: 'center', paddingTop: scaleSzie(5) }} >
                        <View style={{ width: scaleSzie(63), height: scaleSzie(69), backgroundColor: '#5F5EA3' }} >

                        </View>
                        <Text style={[{ color: '#424242', fontSize: scaleSzie(12), marginTop: scaleSzie(4) }]} >
                            Mặt trước
                  </Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: scaleSzie(5), marginLeft: scaleSzie(32) }} >
                        <View style={{ width: scaleSzie(63), height: scaleSzie(69), backgroundColor: '#5F5EA3' }} >

                        </View>
                        <Text style={[{ color: '#424242', fontSize: scaleSzie(12), marginTop: scaleSzie(4) }]} >
                            Mặt sau
                  </Text>
                    </View>
                </View> */}
            </View>
            {/* <View style={{ marginTop: scaleSzie(16) }} >
                <Text bold style={styles.textMain} >
                    Căn cước công dân
                </Text>
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ alignItems: 'center', paddingTop: scaleSzie(5) }} >
                        <View style={{ width: scaleSzie(63), height: scaleSzie(69), backgroundColor: '#5F5EA3' }} >

                        </View>
                        <Text style={[{ color: '#424242', fontSize: scaleSzie(12), marginTop: scaleSzie(4) }]} >
                            Mặt trước
                  </Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: scaleSzie(5), marginLeft: scaleSzie(32) }} >
                        <View style={{ width: scaleSzie(63), height: scaleSzie(69), backgroundColor: '#5F5EA3' }} >

                        </View>
                        <Text style={[{ color: '#424242', fontSize: scaleSzie(12), marginTop: scaleSzie(4) }]} >
                            Mặt sau
                  </Text>
                    </View>
                </View>
            </View> */}
            <ItemInfoImage
                title="Chứng minh nhân dân mặt trước"
                images={cmnd.cmnd_truoc}
            />
            <ItemInfoImage
                title="Chứng minh nhân dân mặt sau"
                images={cmnd.cmnd_sau}
            />
            <ItemInfoImage
                title="Căn cước công dân mặt trước"
                images={ho_khau}
            />
            <ItemInfoImage
                title="Căn cước công dân mặt sau"
                images={cccd.cccd_truoc}
            />
            <ItemInfoImage
                title="Hộ khẩu"
                images={cccd.cccd_sau}
            />
            <ItemInfoImage
                title="Chân dung KH"
                images={chan_dung_kh}
            />
            <ItemInfoImage
                title="Thông tin việc làm"
                images={thong_tin_viec_lam}
            />
        </View>
    );
}

const ItemBox = props => <View style={styles.itemBox} >
    <Text>
        {`+${props.number}`}
    </Text>
</View>

const ItemInfoImage = props => {
    const { images, title } = props;
    return <View style={{ marginTop: scaleSzie(16) }} >
        <Text bold style={[styles.textMain, { marginBottom: scaleSzie(4) }]} >
            {title}
        </Text>
        {
            images.length > 0 ? <View style={{ flexDirection: 'row' }} >
                {
                    images.map((image, index) => {
                        if (index < 3) {
                            return <ItemImage key={image.id} url={image.url} />
                        } else if (index === 3) {
                            return <ItemBox key={index} number={images.length - 3} />
                        }
                        return <View key={index} />
                    })
                }
            </View> : <View />
        }

    </View>
}

const styles = StyleSheet.create({
    boderBottomStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    textMain: {
        color: '#A2A2A2',
        fontSize: scaleSzie(13)
    },
    itemBox: {
        width: scaleSzie(63),
        height: scaleSzie(69),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A2A2A2'
    }

})

const mapStateToProps = state => ({
    clientDetail: state.client.clientDetail,
    documentInfo: state.client.documentInfo
});

export default connectRedux(mapStateToProps, TabDocument);
