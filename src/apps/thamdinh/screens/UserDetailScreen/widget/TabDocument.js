import React from 'react';
import { View, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import _ from 'ramda';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';


import { Text, Button, PlaceHolderList } from '@core/components';
import { scaleSzie, getPosotion, showAlertTurnOnLocation } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';

class TabDocument extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { clientDetail } = this.props;
        this.props.actions.client.getClientDocumentInfo(clientDetail.id);
    }

    showImagePicker = async (key) => {

        try {
            const { clientDetail } = this.props;
            const { id, person_id } = clientDetail;
            const position = await getPosotion();
            ImagePicker.launchImageLibrary({
            }, (response) => {
                let fileName = response.fileName;
                if (fileName) {
                    if (Platform.OS === 'ios' && (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))) {
                        fileName = `${fileName.split(".")[0]}.JPG`;
                    }
                }

                const data = {
                    uri: response.uri,
                    fileName: fileName,
                    type: response.type
                }
                this.props.actions.upload.uploadPhoto([data], key, person_id, id, position.coords.longitude, position.coords.latitude, true);
            });
        } catch (error) {
            showAlertTurnOnLocation();
        }
    }

    gotoUploadImage = () => {
        this.props.changeSwipeDirection("notDown");
        this.props.gotoCamera();
    }

    // -------------- render ---------


    render() {
        const { documentInfo, selectShowImage } = this.props;
        if (_.isEmpty(documentInfo)) {
            return <PlaceHolderList />
        }
        const { xac_minh_khach_hang, xac_minh_dia_chi_kd,
            xac_minh_noi_cu_tru, tai_lieu_hop_dong, khac
        } = documentInfo;
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24), }} >
                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                    T??i li???u
            </Text>
                <Button onPress={this.gotoUploadImage} style={{ position: 'absolute', top: scaleSzie(0), right: scaleSzie(24) }} >
                    <Text bold style={{ fontSize: scaleSzie(16), color: '#5F5EA3' }} >
                        ????ng ???nh
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
                        selectShowImage={(id, key1, key2) => selectShowImage(id, key1, key2, 'xac_minh_khach_hang')}
                    />
                    <ItemVerificationAddress
                        data={xac_minh_dia_chi_kd}
                        selectShowImage={(id, key1, key2) => selectShowImage(id, key1, key2, 'xac_minh_dia_chi_kd')}
                        showImagePicker={(key) => this.showImagePicker(key)}
                    />
                    <ItemVerificationResident
                        data={xac_minh_noi_cu_tru}
                        selectShowImage={(id, key1, key2) => selectShowImage(id, key1, key2, 'xac_minh_noi_cu_tru')}
                        showImagePicker={(key) => this.showImagePicker(key)}

                    />
                    <ItemContractDocument
                        data={tai_lieu_hop_dong}
                        data2={xac_minh_dia_chi_kd}
                        data3={xac_minh_noi_cu_tru}
                        selectShowImage={(id, key1, key2) => selectShowImage(id, key1, key2, 'tai_lieu_hop_dong')}
                        selectShowImage2={(id, key1, key2) => selectShowImage(id, key1, key2, 'xac_minh_dia_chi_kd')}
                        selectShowImage3={(id, key1, key2) => selectShowImage(id, key1, key2, 'xac_minh_noi_cu_tru')}
                        showImagePicker={(key) => this.showImagePicker(key)}
                    />
                    <ItemOthers
                        data={khac}
                        selectShowImage={(id, key1, key2) => selectShowImage(id, key1, key2, 'khac')}
                        showImagePicker={(key) => this.showImagePicker(key)}

                    />
                    <View style={{ height: scaleSzie(100) }} />
                </ScrollView>
            </View>
        </View>
    }

}


const ItemImage = props => {
    const { onPress } = props;
    return (
        <Button onPress={() => onPress()} style={{ width: scaleSzie(63), height: scaleSzie(69), marginRight: scaleSzie(32) }} >
            <FastImage
                style={{ width: scaleSzie(63), height: scaleSzie(69) }}
                source={{
                    uri: props.url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </Button>
    );
}

const ItemOthers = props => {
    const { data, selectShowImage ,showImagePicker} = props;
    const { bang_ke_thu_nhap_chi_phi, hd_uy_quyen, giay_to_kinh_doanh,
        giay_to_lai_suat, giay_to_khac, khac,
    } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                Kh??c
            </Text>
           
             {/* ----------- New ----- */}
             <View style={{}} >
             <ItemInfoImage
                title="B???ng k?? thu nh???p chi ph??"
                images={bang_ke_thu_nhap_chi_phi}
                selectShowImage={(id) => selectShowImage(id, 'bang_ke_thu_nhap_chi_phi', '')}
            />
                <Button onPress={() => showImagePicker('bang_ke_thu_nhap_chi_phi')} style={{
                    height: scaleSzie(25),
                    position: 'absolute', top: scaleSzie(14), right: scaleSzie(20)
                }} >
                    <Text style={{ fontWeight: 'bold', color: '#5F5EA3', textDecorationLine: 'underline' }} >
                        T???i ???nh t??? ??i???n tho???i
                    </Text>
                </Button>
            </View>
            {/* --------------------- */}
            <ItemInfoImage
                title="H???p ?????ng u??? quy???n"
                images={hd_uy_quyen}
                selectShowImage={(id) => selectShowImage(id, 'hd_uy_quyen', '')}
            />
            <ItemInfoImage
                title="Gi???y t??? KD"
                images={giay_to_kinh_doanh}
                selectShowImage={(id) => selectShowImage(id, 'giay_to_kinh_doanh', '')}
            />
            <ItemInfoImage
                title="Gi???y t??? l??i su???t"
                images={giay_to_lai_suat}
                selectShowImage={(id) => selectShowImage(id, 'giay_to_lai_suat', '')}
            />
            <ItemInfoImage
                title="Gi???y t??? kh??c"
                images={giay_to_khac}
                selectShowImage={(id) => selectShowImage(id, 'giay_to_khac', '')}
            />
            <ItemInfoImage
                title="Kh??c"
                images={khac}
                selectShowImage={(id) => selectShowImage(id, 'khac', '')}
            />
        </View>

    );
}

const ItemContractDocument = props => {
    const { data, selectShowImage, data2, selectShowImage2,
        data3, selectShowImage3, showImagePicker
    } = props;
    const { don_de_nghi_vay_von, chung_tu_the_chap, danh_gia_kha_nang_thanh_toan,
    } = data;
    const { hinh_anh_ve_tinh_kd } = data2;
    const { hinh_anh_ve_tinh_nha } = data3;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                T??i li???u h???p ?????ng
</Text>

            {/* ----------- New ----- */}
            <View style={{}} >
                <ItemInfoImage
                    title="????n ????? ngh??? vay v???n"
                    images={don_de_nghi_vay_von}
                    selectShowImage={(id) => selectShowImage(id, 'don_de_nghi_vay_von', '')}
                />
                <Button onPress={() => showImagePicker('don_de_nghi_vay_von')} style={{
                    height: scaleSzie(25),
                    position: 'absolute', top: scaleSzie(14), right: scaleSzie(20)
                }} >
                    <Text style={{ fontWeight: 'bold', color: '#5F5EA3', textDecorationLine: 'underline' }} >
                        T???i ???nh t??? ??i???n tho???i
                    </Text>
                </Button>
            </View>
            {/* --------------------- */}
            <ItemInfoImage
                title="Ch???ng t??? th??? ch???p"
                images={chung_tu_the_chap}
                selectShowImage={(id) => selectShowImage(id, 'chung_tu_the_chap', '')}

            />

            {/* ----------- New ----- */}
            <View style={{}} >
                <ItemInfoImage
                    title="????nh gi?? kh??? n??ng thanh to??n"
                    images={danh_gia_kha_nang_thanh_toan}
                    selectShowImage={(id) => selectShowImage(id, 'danh_gia_kha_nang_thanh_toan', '')}
                />
                <Button onPress={() => showImagePicker('danh_gia_kha_nang_thanh_toan')} style={{
                    height: scaleSzie(25),
                    position: 'absolute', top: scaleSzie(14), right: scaleSzie(20)
                }} >
                    <Text style={{ fontWeight: 'bold', color: '#5F5EA3', textDecorationLine: 'underline' }} >
                        T???i ???nh t??? ??i???n tho???i
                    </Text>
                </Button>
            </View>
            {/* --------------------- */}
            <ItemInfoImage
                title="H??nh ???nh v??? tinh kinh doanh"
                images={hinh_anh_ve_tinh_kd}
                selectShowImage={(id) => selectShowImage2(id, 'hinh_anh_ve_tinh_kd', '')}
            />
            <ItemInfoImage
                title="H??nh ???nh v??? tinh nh??"
                images={hinh_anh_ve_tinh_nha}
                selectShowImage={(id) => selectShowImage3(id, 'hinh_anh_ve_tinh_nha', '')}
            />
        </View>

    );
}
const ItemVerificationResident = props => {
    const { data, selectShowImage, showImagePicker } = props;
    const { hinh_anh_nha_o, dinh_vi_nha_o, hinh_anh_ve_tinh_nha } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                X??c minh n??i c?? tr??
        </Text>
            <ItemInfoImage
                title="H??nh ???nh ?????a ch??? hi???n t???i"
                images={hinh_anh_nha_o}
                selectShowImage={(id) => selectShowImage(id, 'hinh_anh_nha_o', '')}
            />

            <View style={{}} >
                <ItemInfoImage
                    title="?????nh v??? nh?? theo kinh ?????/v?? ?????"
                    images={dinh_vi_nha_o}
                    selectShowImage={(id) => selectShowImage(id, 'dinh_vi_nha_o', '')}
                />
                <Button onPress={() => showImagePicker('dinh_vi_nha_o')} style={{
                    height: scaleSzie(25),
                    position: 'absolute', top: scaleSzie(14), right: scaleSzie(20)
                }} >
                    <Text style={{ fontWeight: 'bold', color: '#5F5EA3', textDecorationLine: 'underline' }} >
                        T???i ???nh t??? ??i???n tho???i
                    </Text>
                </Button>
            </View>
            {/* <ItemInfoImage
                title="H??nh ???nh v??? tinh nh??"
                images={hinh_anh_ve_tinh_nha}
                selectShowImage={(id) => selectShowImage(id, 'hinh_anh_ve_tinh_nha', '')}
            /> */}
        </View>
    );
}

const ItemVerificationAddress = props => {
    const { data, selectShowImage, showImagePicker } = props;
    const { hinh_anh_kinh_doanh, dinh_vi_kd } = data;
    return (
        <View style={[{ paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20), paddingBottom: scaleSzie(16), }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                X??c minh ?????a ch??? KD
            </Text>
            <ItemInfoImage
                title="H??nh ???nh KD"
                images={hinh_anh_kinh_doanh}
                selectShowImage={(id) => selectShowImage(id, 'hinh_anh_kinh_doanh', '')}
            />
            <View style={{}} >
                <ItemInfoImage
                    title="?????nh v??? KD theo kinh ?????/v?? ?????"
                    images={dinh_vi_kd}
                    selectShowImage={(id) => selectShowImage(id, 'dinh_vi_kd', '')}
                />
                <Button onPress={() => showImagePicker('dinh_vi_kd')} style={{
                    height: scaleSzie(25),
                    position: 'absolute', top: scaleSzie(14), right: scaleSzie(20)
                }} >
                    <Text style={{ fontWeight: 'bold', color: '#5F5EA3', textDecorationLine: 'underline' }} >
                        T???i ???nh t??? ??i???n tho???i
                    </Text>
                </Button>
            </View>
        </View>
    );
}

const ItemVerificationCustomer = props => {
    const { data, selectShowImage } = props;
    const { cmnd, cccd, ho_khau, chan_dung_kh, thong_tin_viec_lam } = data;
    return (
        <View style={[{
            paddingHorizontal: scaleSzie(24), marginTop: scaleSzie(20),
            paddingBottom: scaleSzie(16),
        }, styles.boderBottomStyle]} >
            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', marginBottom: scaleSzie(6) }} >
                X??c minh kh??ch h??ng
        </Text>
            <View>
            </View>
            <ItemInfoImage
                title="Ch???ng minh nh??n d??n m???t tr?????c"
                images={cmnd.cmnd_truoc}
                selectShowImage={(id) => selectShowImage(id, 'cmnd_truoc', 'cmnd')}
            />
            <ItemInfoImage
                title="Ch???ng minh nh??n d??n m???t sau"
                images={cmnd.cmnd_sau}
                selectShowImage={(id) => selectShowImage(id, 'cmnd_sau', 'cmnd')}
            />
            <ItemInfoImage
                title="C??n c?????c c??ng d??n m???t tr?????c"
                images={cccd.cccd_sau}
                selectShowImage={(id) => selectShowImage(id, 'cccd_sau', 'cccd')}
            />
            <ItemInfoImage
                title="C??n c?????c c??ng d??n m???t sau"
                images={cccd.cccd_truoc}
                selectShowImage={(id) => selectShowImage(id, 'cccd_truoc', 'cccd')}
            />
            <ItemInfoImage
                title="H??? kh???u"
                images={ho_khau}
                selectShowImage={(id) => selectShowImage(id, 'ho_khau', '')}
            />
            <ItemInfoImage
                title="Ch??n dung KH"
                images={chan_dung_kh}
                selectShowImage={(id) => selectShowImage(id, 'chan_dung_kh', '')}
            />
            <ItemInfoImage
                title="Th??ng tin vi???c l??m"
                images={thong_tin_viec_lam}
                selectShowImage={(id) => selectShowImage(id, 'thong_tin_viec_lam', '')}
            />
        </View>
    );
}

const ItemBox = props => <Button onPress={() => props.onPress()} style={styles.itemBox} >
    <Text>
        {`+${props.number}`}
    </Text>
</Button>

const ItemInfoImage = props => {
    const { images, title, selectShowImage } = props;
    return <View style={{ marginTop: scaleSzie(16) }} >
        <Text bold style={[styles.textMain, { marginBottom: scaleSzie(4) }]} >
            {title}
        </Text>
        {
            images.length > 0 ? <View style={{ flexDirection: 'row' }} >
                {
                    images.map((image, index) => {
                        if (index < 3) {
                            return <ItemImage key={image.id} url={image.url}
                                onPress={() => selectShowImage(image.id)}
                            />
                        } else if (index === 3) {
                            return <ItemBox key={index} number={images.length - 3}
                                onPress={() => selectShowImage(-1)}
                            />
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
