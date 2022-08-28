import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'ramda';
import { TextInputMask } from 'react-native-masked-text';

import { Text, Button, ButtonSubmit, AutoGrowingTextInput, ItemShowDropdown, Picker } from '@core/components';
import styleConfigs from '@configs/style';
import { scaleSzie, getValueOfObject, getKeyOfObject } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';
import { ModalAddress } from '../../../components';

const SO_NAM_KINH_DOANH = {
    "< 6 tháng": "1",
    "6 tháng - 1 năm": "2",
    "1 năm - 3 năm": "3",
    "3 năm - 5 năm": "4",
    "5 năm - 10 năm": "5",
    "Trên 10 năm": "6"
}

const SO_NAM_KINH_DOANH_TAI_MB = {
    "5 năm - 10 năm": "5",
    "Trên 10 năm": "6",
    "< 6 tháng": "1",
    "6 tháng - 1 năm": "2",
    "1 năm - 3 năm": "3",
    "3 năm - 5 năm": "4"
}

class TabBusinessInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initState: true,
            dia_chi_kd: {},
            dia_chi_kd_1: {},
            dia_chi_kd_2: {},
            business_info: {},
            disableEditBusinessInfo: true,
            addressSelected: {},
            nameAddressUpdate: '',
            keyAddressUpdate: '',
            showType: 'province',
            addAddress: false,
            scrollEnabled: true,
            createAddress: {
                so_nha: '',
                phuong_xa_readable: '',
                phuong_xa: '',
                quan_huyen_readable: '',
                quan_huyen: '',
                tinh_tp_readable: '',
                tinh_tp: ''
            },
            businessCode: {
                code: '',
                title: ''
            },
            businessTime: {
                code: '',
                title: ''
            },
            businessForm: {
                code: '',
                title: ''
            },
            typeOfPremises: {
                code: '',
                title: ''
            },
            ownedBusiness: {
                code: '',
                title: ''
            },
            sonamkinhdoanh: {
                code: '',
                title: ''
            },
            sonamkinhdoanhtaiMB: {
                code: '',
                title: ''
            },
            thoi_gian_thue: {
                code: '',
                title: ''
            },
            thoi_gian_thue_tu: '',
            thoi_gian_thue_den: '',
            thoi_gian_thue_den1: '22/01/1993',
            // ------- Client Info -------
            isEditClientInfo: false,
            noicapCMND: {
                code: '',
                title: ''
            }
        };
        this.modalAddressRef = React.createRef();
        this.modalBuisinessCodeRef = React.createRef();
        this.scrollRef = React.createRef();
        this.modalBuisinessTimeRef = React.createRef();
        this.modalBuisinessFormRef = React.createRef();
        this.modalBuisinessTypeOfPremisesRef = React.createRef();
        this.modalBuisinessOwnedBusinessRef = React.createRef();
        this.modal_thoi_gian_thue_Ref = React.createRef();

        // ---- Reference info ----
        this.ma_so_doanh_nghiepRef = React.createRef();
        this.ma_so_thueRef = React.createRef();
        this.dien_tich_mat_bangRef = React.createRef();
        // this.so_nam_kinh_doanhRef = React.createRef();
        this.so_nam_kd_tai_mat_bangRef = React.createRef();
        this.so_nhan_vienRef = React.createRef();
        this.mat_hang_chi_tietRef = React.createRef();
        this.modalSonamkinhdoanhRef = React.createRef();
        this.modalSonamkinhdoanhMBRef = React.createRef();

        this.thoi_gian_con_lai_Ref = React.createRef();

        // ------- Client Info -------
        this.nameClientRef = React.createRef();
        this.birthdayClientRef = React.createRef();
        this.cmndRef = React.createRef();
        this.ngaycapCMNDRef = React.createRef();
        this.modalNoiCapCMND = React.createRef();
        // this.modalNoiCapCMND = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { clientDetail } = nextProps;
        if (!_.isEmpty(clientDetail) && prevState.initState) {
            const { business_info, business_evaluate_field_options } = clientDetail;
            const { dia_chi_kd_1, dia_chi_kd_2 } = business_info.dia_chi_kd;
            const temptBusinessCode = {
                title: business_info.ma_kd,
                code: business_evaluate_field_options.ma_kd[business_info.ma_kd]
            };
            const temptBusinessTime = {
                title: business_info.gio_kinh_doanh,
                code: business_evaluate_field_options.gio_kinh_doanh[business_info.gio_kinh_doanh]
            }
            const temptBusinessForm = {
                title: business_info.hinh_thuc_kinh_doanh,
                code: business_evaluate_field_options.hinh_thuc_kinh_doanh[business_info.hinh_thuc_kinh_doanh]
            }
            const temptTypeOfPremises = {
                title: business_info.loai_mat_bang,
                code: business_evaluate_field_options.loai_mat_bang[business_info.loai_mat_bang]
            }

            const temptOwnedBusinesss = {
                title: business_info.so_huu,
                code: business_evaluate_field_options.so_huu[business_info.so_huu]
            }

            const temptSonamkinhdoanh = {
                title: business_info.so_nam_kinh_doanh,
                code: SO_NAM_KINH_DOANH[business_info.so_nam_kinh_doanh]
            }

            const temptSonamkinhdoanhMB = {
                title: business_info.so_nam_kd_tai_mat_bang,
                code: SO_NAM_KINH_DOANH_TAI_MB[business_info.so_nam_kd_tai_mat_bang]
            }

            const temptNoiCapCMND = {
                title: clientDetail.noi_cap_cmnd,
                code: business_evaluate_field_options.noi_cap_cmnd[clientDetail.noi_cap_cmnd]
            }

            // ======== thoi gian thue =======

            const tempt_thoi_gian_thue = {
                title: business_info.thoi_gian_thue,
                code: business_evaluate_field_options.thoi_gian_thue[business_info.thoi_gian_thue]
            }

            return {
                dia_chi_kd: business_info.dia_chi_kd,
                dia_chi_kd_1,
                dia_chi_kd_2,
                initState: false,
                business_info,
                disableEditBusinessInfo: true,
                createAddress: {
                    so_nha: '',
                    phuong_xa_readable: '',
                    phuong_xa: '',
                    quan_huyen_readable: '',
                    quan_huyen: '',
                    tinh_tp_readable: '',
                    tinh_tp: ''
                },
                businessCode: temptBusinessCode,
                businessTime: temptBusinessTime,
                businessForm: temptBusinessForm,
                typeOfPremises: temptTypeOfPremises,
                ownedBusiness: temptOwnedBusinesss,
                thoi_gian_thue_tu: business_info.thoi_gian_thue_tu,
                thoi_gian_thue_den: business_info.thoi_gian_thue_den,
                thoi_gian_thue: tempt_thoi_gian_thue,
                addAddress: false,
                sonamkinhdoanh: temptSonamkinhdoanh,
                sonamkinhdoanhtaiMB: temptSonamkinhdoanhMB,
                noicapCMND: temptNoiCapCMND,
                isEditClientInfo: false
            }
        }
        return null;
    }

    async showModalAddressCreate(type, nameAddressUpdate) {
        const { createAddress } = this.state;
        const { districtFields } = this.props;
        if (type === 'province') {
            await this.setState({
                titleModal: "CHỌN TỈNH / THÀNH PHỐ",
                titleSearch: "tỉnh / thành phố",
                addressSelected: {
                    code: createAddress.tinh_tp,
                    title: createAddress.tinh_tp_readable,
                },
                keyAddressUpdate: 'tinh_tp',
                nameAddressUpdate,
                showType: 'province'
            });
            this.modalAddressRef.current.displayModalAddress(true);
        } else if (type === 'district') {
            if (createAddress.tinh_tp !== '') {
                await this.setState({
                    titleModal: "CHỌN QUẬN HUYỆN",
                    titleSearch: "quận / huyện",
                    addressSelected: {
                        code: createAddress.quan_huyen,
                        title: createAddress.quan_huyen_readable,
                    },
                    keyAddressUpdate: 'quan_huyen',
                    nameAddressUpdate,
                    showType: 'district'
                });
                this.props.actions.client.resetStateDistrict();
                const provinceId = createAddress.tinh_tp;
                this.props.actions.client.getDistrict(provinceId);
                this.modalAddressRef.current.displayModalAddress(true);
            }
        } else {
            if (!_.isEmpty(createAddress)) {
                const temptDistrict = createAddress.quan_huyen_readable;
                const districtId = createAddress.quan_huyen;
                if (temptDistrict !== '') {
                    await this.setState({
                        titleModal: "CHỌN PHƯỜNG / XÃ",
                        titleSearch: "phường / xã",
                        addressSelected: {
                            code: createAddress.phuong_xa,
                            title: createAddress.phuong_xa_readable,
                        },
                        keyAddressUpdate: 'phuong_xa',

                        nameAddressUpdate,
                        showType: 'ward'
                    });
                    if (!_.isEmpty(districtFields)) {
                        this.props.actions.client.resetStateWard();
                        this.props.actions.client.getWard(districtId);
                    } else {
                        const temptProviceId = createAddress.tinh_tp;
                        this.props.actions.client.getDistrictAndWard(temptProviceId, districtId);
                    }
                    this.modalAddressRef.current.displayModalAddress(true);
                }
            }
        }
    }

    showModalAddress = async (type, nameAddressUpdate) => {
        const { dia_chi_kd } = this.state;
        const { districtFields } = this.props;
        if (type === 'province') {
            await this.setState({
                titleModal: "CHỌN TỈNH / THÀNH PHỐ",
                titleSearch: "tỉnh / thành phố",
                addressSelected: {
                    code: dia_chi_kd[nameAddressUpdate].tinh_tp,
                    title: dia_chi_kd[nameAddressUpdate].tinh_tp_readable,
                },
                keyAddressUpdate: 'tinh_tp',
                nameAddressUpdate,
                showType: 'province'
            });
            this.modalAddressRef.current.displayModalAddress(true);
        } else if (type === 'district') {
            if (!_.isEmpty(dia_chi_kd[nameAddressUpdate])) {
                await this.setState({
                    titleModal: "CHỌN QUẬN HUYỆN",
                    titleSearch: "quận / huyện",
                    addressSelected: {
                        code: dia_chi_kd[nameAddressUpdate].quan_huyen,
                        title: dia_chi_kd[nameAddressUpdate].quan_huyen_readable,
                    },
                    keyAddressUpdate: 'quan_huyen',
                    nameAddressUpdate,
                    showType: 'district'
                });
                this.props.actions.client.resetStateDistrict();
                const provinceId = dia_chi_kd[nameAddressUpdate].tinh_tp;
                this.props.actions.client.getDistrict(provinceId);
                this.modalAddressRef.current.displayModalAddress(true);
            }

        } else if (type === 'ward') {
            if (!_.isEmpty(dia_chi_kd[nameAddressUpdate])) {
                const temptDistrict = dia_chi_kd[nameAddressUpdate].quan_huyen_readable;
                const districtId = dia_chi_kd[nameAddressUpdate].quan_huyen;
                if (temptDistrict !== '') {
                    await this.setState({
                        titleModal: "CHỌN PHƯỜNG / XÃ",
                        titleSearch: "phường / xã",
                        addressSelected: {
                            code: dia_chi_kd[nameAddressUpdate].phuong_xa,
                            title: dia_chi_kd[nameAddressUpdate].phuong_xa_readable,
                        },
                        keyAddressUpdate: 'phuong_xa',

                        nameAddressUpdate,
                        showType: 'ward'
                    });
                    if (!_.isEmpty(districtFields)) {
                        this.props.actions.client.resetStateWard();
                        this.props.actions.client.getWard(districtId);
                    } else {
                        const temptProviceId = dia_chi_kd[nameAddressUpdate].tinh_tp;
                        this.props.actions.client.getDistrictAndWard(temptProviceId, districtId);
                    }
                    this.modalAddressRef.current.displayModalAddress(true);
                }

            }
        }
    }

    editBusinessInfo = () => {
        this.props.changeSwipeDirection("notDown")

        this.setState({
            disableEditBusinessInfo: false,
            addAddress: false
        })
    }

    saveBusinessInfo = () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail } = this.props;
        const { dia_chi_kd, businessCode, businessTime, typeOfPremises, businessForm, ownedBusiness,
            thoi_gian_thue_tu, thoi_gian_thue_den, sonamkinhdoanh, sonamkinhdoanhtaiMB,
            thoi_gian_thue
        } = this.state;

        let dataUpdate = {
            dia_chi_kd: dia_chi_kd.dia_chi_kd,
            dia_chi_kd_2: dia_chi_kd.dia_chi_kd_2,
            ma_kd: businessCode.code,
            gio_kinh_doanh: businessTime.code,
            hinh_thuc_kinh_doanh: businessForm.code,
            loai_mat_bang: typeOfPremises.code,
            ma_so_doanh_nghiep: this.ma_so_doanh_nghiepRef.current.state.text,
            ma_so_thue: this.ma_so_thueRef.current.state.text,
            dien_tich_mat_bang: this.dien_tich_mat_bangRef.current.state.text,
            so_nam_kinh_doanh: sonamkinhdoanh.code,
            so_nam_kd_tai_mat_bang: sonamkinhdoanhtaiMB.code,
            so_nhan_vien: this.so_nhan_vienRef.current.state.text,
            so_huu: ownedBusiness.code,
            thoi_gian_thue: thoi_gian_thue.code,
            thoi_gian_thue_con_lai: this.thoi_gian_con_lai_Ref.current ? this.thoi_gian_con_lai_Ref.current.state.text : "",
            mat_hang_chi_tiet: this.mat_hang_chi_tietRef.current.state.text,
        }
        this.props.actions.client.updateBusinessInfo(clientDetail.id, dataUpdate);
    }

    cancelEditBusinessInfo = () => {
        this.props.changeSwipeDirection("down")
        this.setState({
            disableEditBusinessInfo: true,
            initState: true
        })
    }

    createAddress(addressUpdate) {
        const { keyAddressUpdate, createAddress } = this.state;
        if (keyAddressUpdate === 'tinh_tp') {
            const temptAddressChange = _.clone(createAddress);
            const temptAddressChange_1 = {
                ...temptAddressChange,
                tinh_tp: addressUpdate.code, tinh_tp_readable: addressUpdate.title,
                phuong_xa_readable: '', phuong_xa: '', quan_huyen_readable: '', quan_huyen: ''
            };
            this.setState({
                createAddress: temptAddressChange_1
            })
        } else if (keyAddressUpdate === 'quan_huyen') {
            const temptAddressChange = _.clone(createAddress);
            const temptAddressChange_1 = {
                ...temptAddressChange, quan_huyen: addressUpdate.code, quan_huyen_readable: addressUpdate.title,
            };
            this.setState({
                createAddress: temptAddressChange_1
            })
        } else {
            const temptAddressChange = _.clone(createAddress);
            const temptAddressChange_1 = {
                ...temptAddressChange, phuong_xa: addressUpdate.code, phuong_xa_readable: addressUpdate.title,
            };
            this.setState({
                createAddress: temptAddressChange_1
            })
        }
    }

    updateAddress = async addressUpdate => {
        const { dia_chi_kd, nameAddressUpdate, keyAddressUpdate, addAddress } = this.state;
        if (addAddress) {
            this.createAddress(addressUpdate);
        } else {
            if (keyAddressUpdate === 'tinh_tp') {
                if (dia_chi_kd[nameAddressUpdate][keyAddressUpdate] !== addressUpdate.code) {
                    const temptAddressChange = _.clone(dia_chi_kd[nameAddressUpdate]);
                    const temptAddressChange_1 = {
                        ...temptAddressChange, tinh_tp: addressUpdate.code, tinh_tp_readable: addressUpdate.title,
                        phuong_xa_readable: '', phuong_xa: '', quan_huyen_readable: '', quan_huyen: ''
                    };
                    const tempt_dia_chi_kd = { ...dia_chi_kd, [nameAddressUpdate]: _.clone(temptAddressChange_1) };
                    const pickData = _.pick(['dia_chi_kd', 'dia_chi_kd_2'], tempt_dia_chi_kd);
                    await this.setState({
                        dia_chi_kd: pickData
                    })
                }
            } else if (keyAddressUpdate === 'quan_huyen') {
                if (dia_chi_kd[nameAddressUpdate][keyAddressUpdate] !== addressUpdate.code) {
                    const temptAddressChange = _.clone(dia_chi_kd[nameAddressUpdate]);
                    const temptAddressChange_1 = {
                        ...temptAddressChange, quan_huyen_readable: addressUpdate.title, quan_huyen: addressUpdate.code,
                        phuong_xa_readable: '', phuong_xa: ''
                    };
                    const tempt_dia_chi_kd = { ...dia_chi_kd, [nameAddressUpdate]: _.clone(temptAddressChange_1) };
                    const pickData = _.pick(['dia_chi_kd', 'dia_chi_kd_2'], tempt_dia_chi_kd);
                    await this.setState({
                        dia_chi_kd: pickData
                    })
                }
            }
            else {
                const temptAddressChange = _.clone(dia_chi_kd[nameAddressUpdate]);
                const temptAddressChange_1 = {
                    ...temptAddressChange, phuong_xa_readable: addressUpdate.title, phuong_xa: addressUpdate.code,
                };
                const tempt_dia_chi_kd = { ...dia_chi_kd, [nameAddressUpdate]: _.clone(temptAddressChange_1) };
                const pickData = _.pick(['dia_chi_kd', 'dia_chi_kd_2'], tempt_dia_chi_kd);
                await this.setState({
                    dia_chi_kd: pickData
                })
            }
        }
    }

    showModalBusinessCode = () => {
        this.modalBuisinessCodeRef.current.displayModalAddress(true);
    }

    showModalBusinessTime = () => {
        this.modalBuisinessTimeRef.current.displayModalAddress(true);
    }

    showModalBusinessForm = () => {
        this.modalBuisinessFormRef.current.displayModalAddress(true);
    }

    showModalBusinessTypeOfPremises = () => {
        this.modalBuisinessTypeOfPremisesRef.current.displayModalAddress(true);

    }

    showModalOwnedBusiness = () => {
        this.modalBuisinessOwnedBusinessRef.current.displayModalAddress(true);
    }

    show_modal_thoi_gian_thue = () => {
        this.modal_thoi_gian_thue_Ref.current.displayModalAddress(true);
    }

    showModalSonamkinhdoanh = () => {
        this.modalSonamkinhdoanhRef.current.displayModalAddress(true);
    }

    showModalSonamkinhdoanhMB = () => {
        this.modalSonamkinhdoanhMBRef.current.displayModalAddress(true);
    }

    showModalNoiCapCMND = () => {
        this.modalNoiCapCMND.current.displayModalAddress(true);
    }

    getDataModalAddress(type) {
        const { cityFields, districtFields, wardFields } = this.props;
        let data = {};
        switch (type) {
            case 'province':
                data = cityFields;
                break;
            case 'district':
                data = districtFields;
                break;
            case 'ward':
                data = wardFields;
                break;
        }
        return data;
    }

    addAddress = async () => {
        this.props.changeSwipeDirection("notDown")
        await this.setState({
            addAddress: true,
            disableEditBusinessInfo: false
        });
    }

    cancelAddAddress = async () => {
        const { nameAddressUpdate } = this.state;
        this.props.changeSwipeDirection("down")

        await this.setState({
            addAddress: false,
            createAddress: {
                so_nha: '',
                phuong_xa_readable: '',
                phuong_xa: '',
                quan_huyen_readable: '',
                quan_huyen: '',
                tinh_tp_readable: '',
                tinh_tp: ''
            },
            disableEditBusinessInfo: true,
            [nameAddressUpdate]: {}
        });
    }

    saveAddAddress = async () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail } = this.props;
        const { dia_chi_kd } = clientDetail;
        const { createAddress, nameAddressUpdate } = this.state;

        const arrayKeyAddress = getKeyOfObject(dia_chi_kd);
        let keyUpdate = '';
        for (let i = 0; i < arrayKeyAddress.length; i++) {
            if (_.isEmpty(dia_chi_kd[arrayKeyAddress[i]])) {
                keyUpdate = arrayKeyAddress[i];
                break;
            }
        }
        this.props.actions.client.updateBusinessInfo(clientDetail.id, {
            [keyUpdate]: createAddress
        });
        await this.setState({
            addAddress: false,
            disableEditBusinessInfo: true
        });
    }

    changeNumberAddressCreate(data) {
        const { createAddress } = this.state;
        const temptAddressChange = _.clone(createAddress);
        const tempt_dia_chi_kd = { ...temptAddressChange, so_nha: data };

        this.setState({
            createAddress: tempt_dia_chi_kd
        })
    }

    changeNumberAddress = async (data, keyData) => {
        const { dia_chi_kd } = this.state;
        const temptAddressChange = _.clone(dia_chi_kd[keyData]);
        const temptAddressChange_1 = { ...temptAddressChange, so_nha: data };
        const tempt_dia_chi_kd = { ...dia_chi_kd, [keyData]: temptAddressChange_1 };
        const pickData = _.pick(['dia_chi_kd', 'dia_chi_kd_2'], tempt_dia_chi_kd);
        await this.setState({
            dia_chi_kd: pickData
        })
    }

    getTitleAddrress(keyTilte) {
        let title = '';
        switch (keyTilte) {
            case 'dia_chi_kd':
                title = 'Địa chỉ kinh doanh';
                break;
            case 'dia_chi_kd_2':
                title = 'Địa chỉ kinh doanh 2';
                break;
            case 'dia_chi_kd_3':
                title = 'Địa chỉ kinh doanh 3';
                break;
            case 'dia_chi_kd_4':
                title = 'Địa chỉ kinh doanh 4';
                break;
        }
        return title;
    }

    checkAddAddress(data) {
        const keyData = getKeyOfObject(data);
        let temptKeyAdd = '';
        for (let i = 0; i < keyData.length; i++) {
            if (_.isEmpty(data[keyData[i]])) {
                temptKeyAdd = keyData[i];
                break;
            }
        }
        return temptKeyAdd;
    }

    cancelEditClientInfo = async () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail } = this.props;
        this.nameClientRef.current.setStateFromParent(clientDetail.person_name);
        this.birthdayClientRef.current.setStateFromParent(clientDetail.birthday);
        this.cmndRef.current.setStateFromParent(clientDetail.nic_number);
        this.ngaycapCMNDRef.current.setStateFromParent(clientDetail.ngay_cap_cmnd);
        const temptNoiCapCMND = {
            title: clientDetail.noi_cap_cmnd,
            code: clientDetail.business_evaluate_field_options[clientDetail.noi_cap_cmnd]
        }
        await this.setState({
            isEditClientInfo: false,
            noicapCMND: temptNoiCapCMND
        });
    }

    saveClientInfo = () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail } = this.props;
        const { dia_chi_kd, businessCode, businessTime, typeOfPremises, businessForm, ownedBusiness,
            thoi_gian_thue_tu, thoi_gian_thue_den, sonamkinhdoanh, sonamkinhdoanhtaiMB
        } = this.state;
        let dataUpdate = {
            dia_chi_kd: dia_chi_kd.dia_chi_kd,
            dia_chi_kd_2: dia_chi_kd.dia_chi_kd_2,
            ma_kd: businessCode.code,
            gio_kinh_doanh: businessTime.code,
            hinh_thuc_kinh_doanh: businessForm.code,
            loai_mat_bang: typeOfPremises.code,
            ma_so_doanh_nghiep: this.ma_so_doanh_nghiepRef.current.state.text,
            ma_so_thue: this.ma_so_thueRef.current.state.text,
            dien_tich_mat_bang: this.dien_tich_mat_bangRef.current.state.text,
            so_nam_kinh_doanh: sonamkinhdoanh.code,
            so_nam_kd_tai_mat_bang: sonamkinhdoanhtaiMB.code,
            so_nhan_vien: this.so_nhan_vienRef.current.state.text,
            so_huu: ownedBusiness.code,
            thoi_gian_thue_tu: thoi_gian_thue_tu,
            thoi_gian_thue_den: thoi_gian_thue_den,
            mat_hang_chi_tiet: this.mat_hang_chi_tietRef.current.state.text,
            // -------- Client Info -----
            person_name: this.nameClientRef.current.state.text,
            birthday: this.birthdayClientRef.current.state.text,
            nic_number: this.cmndRef.current.state.text,
            ngay_cap_cmnd: this.ngaycapCMNDRef.current.state.text,
            noi_cap_cmnd: this.state.noicapCMND.code
        }
        this.props.actions.client.updateBusinessInfo(clientDetail.id, dataUpdate);
    }

    // ------------ Render -------

    renderCreateBusinessAddress(title, address, nameAddressUpdate) {
        const { disableEditBusinessInfo } = this.state;
        return (
            <View style={[{
                paddingBottom: scaleSzie(16),
            }, styles.boderBottomStyle]} >
                <AutoGrowingTextInput
                    placeholder={title}
                    value={address.so_nha ? address.so_nha : ''}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEditBusinessInfo}
                    onChangeTextValue={value => this.changeNumberAddressCreate(value)}
                />
                <ItemShowDropdown
                    palceHolder="Thành phố/tỉnh"
                    value={address.tinh_tp_readable ? address.tinh_tp_readable : ''}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddressCreate('province', nameAddressUpdate)}
                />
                <ItemShowDropdown
                    palceHolder="Quận/huyện"
                    value={address.quan_huyen_readable ? address.quan_huyen_readable : ''}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddressCreate('district', nameAddressUpdate)}
                />
                <ItemShowDropdown
                    palceHolder="Phường/xã"
                    value={address.phuong_xa_readable ? address.phuong_xa_readable : ''}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddressCreate('ward', nameAddressUpdate)}
                />
            </View>
        );
    }

    render() {
        const { dia_chi_kd, dia_chi_kd_1, dia_chi_kd_2, business_info, disableEditBusinessInfo, addAddress,
            isEditClientInfo
        } = this.state;
        const { clientDetail } = this.props;
        if (addAddress) {
            return (
                <View style={{ flex: 1 }} >
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Thêm thông tin kinh doanh
                         </Text>
                            </View>
                            <View style={{ width: scaleSzie(80 + 40) }} >
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Button onPress={this.cancelAddAddress} style={{ marginTop: scaleSzie(6) }} >
                                        <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                            Huỷ
                                </Text>
                                    </Button>
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Lưu"
                                        onPress={this.saveAddAddress} />
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: scaleSzie(24) }} >
                        {this.renderCreateBusinessAddress('Thêm địa chỉ KD ', this.state.createAddress, this.checkAddAddress(dia_chi_kd))}
                    </View>
                    {this.renderModalAddres()}
                    {this.renderModalBusinessCode()}
                </View>
            );
        }
        return <View style={{ flex: 1 }} >
            <View style={{ flex: 1 }} >
                <ScrollView
                    ref={this.scrollRef}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    scrollEnabled={this.state.scrollEnabled}
                >
                    {/* ------------- Btn edit client info  ---------- */}
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Thông tin cá nhân
                                </Text>
                            </View>
                            <View style={{ width: scaleSzie(80 + 40) }} >
                                {
                                    !isEditClientInfo ? <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <ButtonSubmit
                                            width={80}
                                            height={30}
                                            title="Sửa"
                                            onPress={() => {
                                                this.setState({
                                                    isEditClientInfo: true
                                                });
                                                this.props.changeSwipeDirection("notDown")

                                            }}
                                        />
                                    </View>
                                        :
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <Button 
                                            onPress={this.cancelEditClientInfo} style={{ marginTop: scaleSzie(6) }} >
                                                <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                                    Huỷ
                                </Text>
                                            </Button>
                                            <ButtonSubmit
                                                width={80}
                                                height={30}
                                                title="Lưu"
                                                onPress={this.saveClientInfo} />
                                        </View>
                                }

                            </View>
                        </View>
                    </View>

                    {/* ------------ Client Info ----------- */}
                    <View style={{ paddingHorizontal: scaleSzie(24), marginBottom: scaleSzie(20) }} >
                        <AutoGrowingTextInput
                            ref={this.nameClientRef}
                            placeholder={'Họ và tên'}
                            value={clientDetail.person_name}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditClientInfo}
                        />
                        {
                            isEditClientInfo ?
                                <View style={{ marginTop: scaleSzie(16) }} >
                                    <Text style={{ fontSize: scaleSzie(13), fontWeight: 'bold', color: '#55529E' }} >
                                        Ngày sinh
                                </Text>
                                    <View style={styles.dateContainer} >
                                        <TextInputMask
                                            type={'datetime'}
                                            options={{
                                                format: 'DD/MM/YYYY'
                                            }}
                                            value={this.birthdayClientRef.current.state.text}
                                            onChangeText={text => {
                                                this.birthdayClientRef.current.setStateFromParent(text)
                                            }}
                                            keyboardType='numeric'
                                            placeholder='DD/MM/YYYY'
                                            style={{
                                                borderBottomWidth: scaleSzie(1),
                                                borderBottomColor: '#BEBEBE',
                                                paddingHorizontal: 2,
                                                width: '100%',
                                                fontSize: scaleSzie(16)
                                            }}
                                        />
                                    </View>
                                </View> : <View />

                        }
                        <AutoGrowingTextInput
                            ref={this.birthdayClientRef}
                            placeholder={'Ngày sinh'}
                            value={clientDetail.birthday}
                            styleContainer={isEditClientInfo ? { width: 0, height: 0, } : { marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                            hideLabel={isEditClientInfo}
                        />
                        <AutoGrowingTextInput
                            ref={this.cmndRef}
                            placeholder={'Số CMND'}
                            value={clientDetail.nic_number}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditClientInfo}
                            keyboardType='numeric'
                        />
                        {
                            isEditClientInfo ?
                                <View style={{ marginTop: scaleSzie(16) }} >
                                    <Text style={{ fontSize: scaleSzie(13), fontWeight: 'bold', color: '#55529E' }} >
                                        Ngày cấp
                                </Text>
                                    <View style={styles.dateContainer} >
                                        <TextInputMask
                                            type={'datetime'}
                                            options={{
                                                format: 'DD/MM/YYYY'
                                            }}
                                            value={this.ngaycapCMNDRef.current.state.text}
                                            onChangeText={text => {
                                                this.ngaycapCMNDRef.current.setStateFromParent(text)
                                            }}
                                            keyboardType='numeric'
                                            placeholder='DD/MM/YYYY'
                                            style={{
                                                borderBottomWidth: scaleSzie(1),
                                                borderBottomColor: '#BEBEBE',
                                                paddingHorizontal: 2,
                                                width: '100%',
                                                fontSize: scaleSzie(16)
                                            }}
                                        />
                                    </View>
                                </View> : <View />

                        }
                        <AutoGrowingTextInput
                            ref={this.ngaycapCMNDRef}
                            placeholder={'Ngày cấp'}
                            value={clientDetail.ngay_cap_cmnd}
                            styleContainer={isEditClientInfo ? { width: 0, height: 0, } : { marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditClientInfo}
                            hideLabel={isEditClientInfo}
                        />
                        <ItemShowDropdown
                            palceHolder="Nơi cấp"
                            value={this.state.noicapCMND.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={isEditClientInfo}
                            showDropdown={this.showModalNoiCapCMND}
                            disabled={!isEditClientInfo}
                        />
                        <View style={{ height: scaleSzie(1), backgroundColor: 'rgb(238,238,238)', marginTop: scaleSzie(30) }} />
                    </View>


                    {/* ------------- Btn edit business info ---------- */}
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Thông tin kinh doanh
                                </Text>
                            </View>
                            <View style={{ width: scaleSzie(80 + 40) }} >
                                {
                                    this.state.addAddress ? <View /> : disableEditBusinessInfo ? <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <ButtonSubmit
                                            width={80}
                                            height={30}
                                            title="Sửa"
                                            onPress={this.editBusinessInfo}
                                        />
                                    </View>
                                        :
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <Button onPress={this.cancelEditBusinessInfo} style={{ marginTop: scaleSzie(6) }} >
                                                <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                                    Huỷ
                                </Text>
                                            </Button>
                                            <ButtonSubmit
                                                width={80}
                                                height={30}
                                                title="Lưu"
                                                onPress={this.saveBusinessInfo} />
                                        </View>
                                }

                            </View>
                        </View>
                    </View>
                    {disableEditBusinessInfo ? <View style={[{
                        paddingLeft: scaleSzie(24), paddingRight: scaleSzie(80), paddingBottom: scaleSzie(16),
                    }, styles.boderBottomStyle]} >
                        {
                            getKeyOfObject(dia_chi_kd).map((keyTitle, index) => {
                                if (!_.isEmpty(dia_chi_kd[keyTitle])) {
                                    return <ItemAddress
                                        key={index}
                                        title={this.getTitleAddrress(keyTitle)}
                                        address={dia_chi_kd[keyTitle]}
                                    />
                                }
                                return <View key={index} />
                            })
                        }
                    </View>
                        : <View style={{ paddingHorizontal: scaleSzie(24) }} >
                            {
                                getKeyOfObject(dia_chi_kd).map((keyTitle, index) => {
                                    if (!_.isEmpty(dia_chi_kd[keyTitle])) {
                                        return <ItemEditBusinessAddress
                                            title={this.getTitleAddrress(keyTitle)}
                                            address={dia_chi_kd[keyTitle]}
                                            nameAddressUpdate={keyTitle}
                                            disableEditBusinessInfo={disableEditBusinessInfo}
                                            changeNumberAddress={this.changeNumberAddress}
                                            showModalAddress={this.showModalAddress}
                                        />
                                    }
                                    return <View key={index} />
                                })
                            }
                        </View>
                    }
                    <View style={[{
                        paddingHorizontal: scaleSzie(24),
                        paddingBottom: scaleSzie(16)
                    }, styles.boderBottomStyle]} >
                        <ItemShowDropdown
                            palceHolder="Mã KD"
                            value={this.state.businessCode.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalBusinessCode}
                            disabled={disableEditBusinessInfo}
                        />
                        <AutoGrowingTextInput
                            ref={this.mat_hang_chi_tietRef}
                            placeholder={'Mặt hàng chi tiết'}
                            value={business_info.mat_hang_chi_tiet}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                        />
                        <ItemShowDropdown
                            palceHolder="Giờ KD"
                            value={this.state.businessTime.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalBusinessTime}
                            disabled={disableEditBusinessInfo}
                        />
                        <ItemShowDropdown
                            palceHolder="Số năm KD"
                            value={this.state.sonamkinhdoanh.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalSonamkinhdoanh}
                            disabled={disableEditBusinessInfo}
                        />

                        <ItemShowDropdown
                            palceHolder="Số năm KD tại mặt bằng"
                            value={this.state.sonamkinhdoanhtaiMB.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalSonamkinhdoanhMB}
                            disabled={disableEditBusinessInfo}
                        />

                        <AutoGrowingTextInput
                            ref={this.so_nhan_vienRef}
                            placeholder={'Số nhân viên'}
                            value={business_info.so_nhan_vien}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'
                        />
                        <ItemShowDropdown
                            palceHolder="Hình thức KD"
                            value={this.state.businessForm.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalBusinessForm}
                            disabled={disableEditBusinessInfo}
                        />
                        <ItemShowDropdown
                            palceHolder="Loại mặt bằng"
                            value={this.state.typeOfPremises.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalBusinessTypeOfPremises}
                            disabled={disableEditBusinessInfo}
                        />
                    </View>
                    {/* --------------- Info 2 ----------------- */}
                    <View style={[{
                        paddingHorizontal: scaleSzie(24),
                        paddingBottom: scaleSzie(16)
                    }]} >
                        <AutoGrowingTextInput
                            ref={this.dien_tich_mat_bangRef}
                            placeholder={'Diện tích mặt bằng'}
                            value={business_info.dien_tich_mat_bang}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                        />
                        <ItemShowDropdown
                            palceHolder="Sở hữu"
                            value={this.state.ownedBusiness.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalOwnedBusiness}
                            disabled={disableEditBusinessInfo}
                        />
                        {/* {
                            disableEditBusinessInfo ? <AutoGrowingTextInput
                                placeholder={'Thời gian thuê'}
                                value={`${business_info.thoi_gian_thue_tu}-${business_info.thoi_gian_thue_den}`}
                                styleContainer={{ marginTop: scaleSzie(16) }}
                                styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                                disable={disableEditBusinessInfo}
                            /> : this.renderEditDate()
                        } */}

                        {/* ---------- Thoi gian thue -------- */}
                        <ItemShowDropdown
                            palceHolder="Thời gian thuê"
                            value={this.state.thoi_gian_thue.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.show_modal_thoi_gian_thue}
                            disabled={disableEditBusinessInfo}
                        />

                        {/* ---------- Thoi gian con lai -------- */}
                        {
                            this.state.thoi_gian_thue.code == 3  || this.state.thoi_gian_thue.code == 4 || this.state.thoi_gian_thue.code == 5 ?

                                <AutoGrowingTextInput
                                    ref={this.thoi_gian_con_lai_Ref}
                                    placeholder={'Thời gian còn lại'}
                                    value={business_info.thoi_gian_thue_con_lai}
                                    styleContainer={{ marginTop: scaleSzie(16) }}
                                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                                    disable={disableEditBusinessInfo}
                                />
                                :
                                <View />
                        }


                        <AutoGrowingTextInput
                            ref={this.ma_so_thueRef}
                            placeholder={'Mã số thuế'}
                            value={business_info.ma_so_thue}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'
                        />
                        <AutoGrowingTextInput
                            ref={this.ma_so_doanh_nghiepRef}
                            placeholder={'Mã số doanh nghiệp'}
                            value={business_info.ma_so_doanh_nghiep}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'

                        />
                        {
                            !disableEditBusinessInfo ? <View /> : !_.isEmpty(dia_chi_kd_1) && !_.isEmpty(dia_chi_kd_2) || this.state.addAddress ? <View /> : <Button onPress={this.addAddress} style={{ marginTop: scaleSzie(32) }} >
                                <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16), marginTop: scaleSzie(10) }} >
                                    {`+ Thêm địa KD`}
                                </Text>
                            </Button>
                        }
                    </View>
                    <View style={{ height: scaleSzie(250) }} />
                </ScrollView>
            </View>
            {this.renderModalAddres()}
            {this.renderModalBusinessCode()}
            {this.renderModalBusinessTime()}
            {this.renderModalBusinessFrom()}
            {this.renderModalBusinessFrom()}
            {this.renderModalTypeOfPremises()}
            {this.renderModalOwnedBusiness()}
            {this.render_modal_thoi_gian_thue()}
            {this.renderModalSonamkinhdoanh()}
            {this.renderModalSonamkinhdoanhMB()}
            {this.renderNoiCapCMND()}
        </View>
    }

    renderEditDate() {
        return (
            <View style={{ marginTop: scaleSzie(16) }} >
                <Text style={{ fontSize: scaleSzie(13), fontWeight: 'bold', color: '#55529E' }} >
                    Thời gian thuê
            </Text>
                <View style={styles.dateContainer} >
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={this.state.thoi_gian_thue_tu}
                        onChangeText={text => {
                            this.setState({
                                thoi_gian_thue_tu: text
                            })
                        }}
                        keyboardType='numeric'
                        placeholder='DD/MM/YYYY'
                        style={{
                            borderBottomWidth: scaleSzie(1),
                            borderBottomColor: '#BEBEBE',
                            paddingHorizontal: 2,
                            width: scaleSzie(120)
                        }}
                    />
                    <View style={{ width: scaleSzie(68), justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: '#868686', fontSize: 16 }} >
                            -
                    </Text>
                    </View>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={this.state.thoi_gian_thue_den}
                        onChangeText={text => {
                            this.setState({
                                thoi_gian_thue_den: text
                            })
                        }}
                        keyboardType='numeric'
                        placeholder='DD/MM/YYYY'
                        style={{
                            borderBottomWidth: scaleSzie(1),
                            borderBottomColor: '#BEBEBE',
                            paddingHorizontal: 2,
                            width: scaleSzie(120)
                        }}
                    />
                </View>
            </View>
        );
    }

    renderModalOwnedBusiness() {
        const { ownedBusiness } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalBuisinessOwnedBusinessRef}
                titleModal={'Loại mặt bằng'}
                titleSearch={'loại mặt bằng'}
                data={clientDetail.business_evaluate_field_options.so_huu}
                dataSelected={ownedBusiness}
                updateAddress={this.updateOwnedBusiness}
            />
        );
    }

    render_modal_thoi_gian_thue() {
        const { thoi_gian_thue } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modal_thoi_gian_thue_Ref}
                titleModal={'Thời gian thuê'}
                titleSearch={'thời gian thuê'}
                data={clientDetail.business_evaluate_field_options.thoi_gian_thue}
                dataSelected={thoi_gian_thue}
                updateAddress={this.update_thoi_gian_thue}
            />
        );
    }


    renderModalSonamkinhdoanh() {
        const { sonamkinhdoanh } = this.state;
        return (
            <ModalAddress
                ref={this.modalSonamkinhdoanhRef}
                titleModal={'Số năm kinh doanh'}
                titleSearch={'Số năm kinh doanh'}
                data={SO_NAM_KINH_DOANH}
                dataSelected={sonamkinhdoanh}
                updateAddress={this.updateSonamkinhdoanh}

            />
        );
    }

    renderModalSonamkinhdoanhMB() {
        const { sonamkinhdoanhtaiMB } = this.state;
        return (
            <ModalAddress
                ref={this.modalSonamkinhdoanhMBRef}
                titleModal={'Số năm kinh doanh tại mặt bằng'}
                titleSearch={'số năm kinh doanh mặt bằng'}
                data={SO_NAM_KINH_DOANH_TAI_MB}
                dataSelected={sonamkinhdoanhtaiMB}
                updateAddress={this.updateSonamkinhdoanhMB}

            />
        );
    }

    renderNoiCapCMND() {
        const { noicapCMND } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalNoiCapCMND}
                titleModal={'Nơi cấp CMND'}
                titleSearch={'Nơi cấp'}
                data={clientDetail.business_evaluate_field_options.noi_cap_cmnd}
                dataSelected={noicapCMND}
                updateAddress={this.updateNoiCapCMND}

            />
        );
    }

    renderModalTypeOfPremises() {
        const { typeOfPremises } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalBuisinessTypeOfPremisesRef}
                titleModal={'Loại mặt bằng'}
                titleSearch={'loại mặt bằng'}
                data={clientDetail.business_evaluate_field_options.loai_mat_bang}
                dataSelected={typeOfPremises}
                updateAddress={this.updateTypeOfPremises}
            />
        );
    }

    renderModalBusinessFrom() {
        const { businessForm } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalBuisinessFormRef}
                titleModal={'Hình thức Kinh Doanh'}
                titleSearch={'hình thức kinh doanh'}
                data={clientDetail.business_evaluate_field_options.hinh_thuc_kinh_doanh}
                dataSelected={businessForm}
                updateAddress={this.updateBusinessForm}
            />
        );
    }

    renderModalBusinessTime() {
        const { businessTime } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalBuisinessTimeRef}
                titleModal={'Giờ Kinh Doanh'}
                titleSearch={'giờ kinh doanh'}
                data={clientDetail.business_evaluate_field_options.gio_kinh_doanh}
                dataSelected={businessTime}
                updateAddress={this.updateBusinessTime}
            />
        );
    }

    renderModalAddres() {
        const { titleModal, titleSearch, addressSelected, showType } = this.state;
        return (
            <ModalAddress
                ref={this.modalAddressRef}
                titleModal={titleModal}
                titleSearch={titleSearch}
                data={this.getDataModalAddress(showType)}
                dataSelected={addressSelected}
                updateAddress={this.updateAddress}
            />
        );
    }

    updateBusinessCode = data => {
        this.setState({
            businessCode: data
        })
    }

    updateBusinessTime = data => {
        this.setState({
            businessTime: data
        })
    }

    updateBusinessForm = async data => {
        await this.setState({
            businessForm: data
        })
    }

    updateTypeOfPremises = async data => {
        await this.setState({
            typeOfPremises: data
        })
    }

    updateOwnedBusiness = async data => {
        await this.setState({
            ownedBusiness: data
        })
    }

    update_thoi_gian_thue = async data => {
        // console.log("update_thoi_gian_thue : ", data);
        await this.setState({
            thoi_gian_thue: data
        })
    }

    updateSonamkinhdoanh = async data => {
        await this.setState({
            sonamkinhdoanh: data
        })
    }

    updateSonamkinhdoanhMB = async data => {
        await this.setState({
            sonamkinhdoanhtaiMB: data
        })
    }

    updateNoiCapCMND = async data => {
        await this.setState({
            noicapCMND: data
        })
    }

    renderModalBusinessCode() {
        const { businessCode } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalBuisinessCodeRef}
                titleModal={'Mã Kinh Doanh'}
                titleSearch={'Tìm kiếm mã kinh doanh'}
                data={clientDetail.business_evaluate_field_options.ma_kd}
                dataSelected={businessCode}
                updateAddress={this.updateBusinessCode}
            />
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.isUpdateClient && this.props.isUpdateClient !== prevProps.isUpdateClient) {
            this.setState({
                initState: true
            })
        }
    }
}

const ItemAddress = props => {
    const { title, address } = props;
    return (
        <View style={{ marginTop: scaleSzie(18) }} >
            <Text bold style={{ color: '#A2A2A2', fontSize: scaleSzie(13) }} >
                {title}
            </Text>
            <Text style={{ color: '#424242', fontSize: scaleSzie(16) }} >
                {`${address.so_nha},${address.phuong_xa_readable},${address.quan_huyen_readable},${address.tinh_tp_readable}`}
            </Text>
        </View>
    );
}

const ItemEditBusinessAddress = (props) => {
    const { title, address, nameAddressUpdate, disableEditBusinessInfo } = props;

    return (
        <View style={[{
            paddingBottom: scaleSzie(16),
        }, styles.boderBottomStyle]} >
            <AutoGrowingTextInput
                placeholder={title}
                value={address.so_nha ? address.so_nha : ''}
                styleContainer={{ marginTop: scaleSzie(16) }}
                styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                disable={disableEditBusinessInfo}
                onChangeTextValue={value => props.changeNumberAddress(value, nameAddressUpdate)}
            />
            <ItemShowDropdown
                palceHolder="Thành phố/tỉnh"
                value={address.tinh_tp_readable ? address.tinh_tp_readable : ''}
                style={{ marginTop: scaleSzie(16) }}
                isPress={!disableEditBusinessInfo}
                showDropdown={() => props.showModalAddress('province', nameAddressUpdate)}
            />
            <ItemShowDropdown
                palceHolder="Quận/huyện"
                value={address.quan_huyen_readable ? address.quan_huyen_readable : ''}
                style={{ marginTop: scaleSzie(16) }}
                isPress={!disableEditBusinessInfo}
                showDropdown={() => props.showModalAddress('district', nameAddressUpdate)}
            />
            <ItemShowDropdown
                palceHolder="Phường/xã"
                value={address.phuong_xa_readable ? address.phuong_xa_readable : ''}
                style={{ marginTop: scaleSzie(16) }}
                isPress={!disableEditBusinessInfo}
                showDropdown={() => props.showModalAddress('ward', nameAddressUpdate)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    boderBottomStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    dateContainer: {
        marginTop: scaleSzie(5),
        flexDirection: 'row',
    }

});

const mapStateToProps = state => ({
    clientDetail: state.client.clientDetail,
    cityFields: state.client.cityFields,
    districtFields: state.client.districtFields,
    wardFields: state.client.wardFields,
    isUpdateClient: state.client.isUpdateClient
});

export default connectRedux(mapStateToProps, TabBusinessInfo);
