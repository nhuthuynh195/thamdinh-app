import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'ramda';
import { TextInputMask } from 'react-native-masked-text';


import { Text, Button, ButtonSubmit, AutoGrowingTextInput, ItemShowDropdown, Picker } from '@core/components';
import styleConfigs from '@configs/style';
import { scaleSzie, getValueOfObject, getKeyOfObject } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';
import { ModalAddress } from '../../../components';

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
                dia_chi: '',
                phuong_xa_readable: '',
                phuong_xa: '',
                quan_huyen_readable: '',
                quan_huyen: '',
                tinh_tp_readable: '',
                tinh_tp: ''
            },
            ho_khau: {
                dia_chi: '',
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
            ownedStatus: {
                code: '',
                title: ''
            },
            // ------- property evaluate ------
            dia_chi: {},
            // ------- Client Info -------
            isEditClientInfo: false,
            noicapCMND: {
                code: '',
                title: ''
            }
        };
        this.modalAddressRef = React.createRef();
        this.modalBuisinessCodeRef = React.createRef();
        this.modalOwnedStatusRef = React.createRef();
        this.scrollRef = React.createRef();

        this.tinh_trang_nha_oRef = React.createRef();
        this.ten_chu_nhaRef = React.createRef();
        this.sdt_chu_nhaRef = React.createRef();
        this.so_nam_o_tp_hien_taiRef = React.createRef();
        this.so_nam_o_nha_hien_taiRef = React.createRef();
        this.o_voi_aiRef = React.createRef();
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
            const { living_info, property_evaluate_field_options } = clientDetail;
            const { tinh_trang_nha_o } = property_evaluate_field_options
            const temptOwnedStatus = {
                title: living_info.tinh_trang_nha_o,
                code: tinh_trang_nha_o[living_info.tinh_trang_nha_o]
            }
            const temptNoiCapCMND = {
                title: clientDetail.noi_cap_cmnd,
                code: property_evaluate_field_options.noi_cap_cmnd[clientDetail.noi_cap_cmnd]
            }
            return {
                // dia_chi_kd: business_info.dia_chi_kd,
                // dia_chi_kd_1,
                // dia_chi_kd_2,
                initState: false,
                ownedStatus: temptOwnedStatus,
                dia_chi: living_info.dia_chi,
                ho_khau: living_info.ho_khau,
                // business_info,
                // disableEditBusinessInfo: true,
                // createAddress: {},
                // businessCode: temptBusinessCode
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

    showModalHousehold = async (type, nameAddressUpdate) => {
        const { ho_khau } = this.state;
        const { districtFields } = this.props;
        if (type === 'province') {
            await this.setState({
                titleModal: "CHỌN TỈNH / THÀNH PHỐ",
                titleSearch: "tỉnh / thành phố",
                addressSelected: {
                    code: ho_khau.tinh_tp,
                    title: ho_khau.tinh_tp_readable,
                },
                keyAddressUpdate: 'tinh_tp',
                nameAddressUpdate,
                showType: 'province'
            });
            this.modalAddressRef.current.displayModalAddress(true);
        } else if (type === 'district') {
            if (ho_khau.tinh_tp !== '' && ho_khau.tinh_tp !== null) {
                await this.setState({
                    titleModal: "CHỌN QUẬN HUYỆN",
                    titleSearch: "quận / huyện",
                    addressSelected: {
                        code: ho_khau.quan_huyen,
                        title: ho_khau.quan_huyen_readable,
                    },
                    keyAddressUpdate: 'quan_huyen',
                    nameAddressUpdate,
                    showType: 'district'
                });
                this.props.actions.client.resetStateDistrict();
                const provinceId = ho_khau.tinh_tp;
                this.props.actions.client.getDistrict(provinceId);
                this.modalAddressRef.current.displayModalAddress(true);
            }
        } else {
            if (ho_khau.quan_huyen !== '' && ho_khau.quan_huyen !== null) {
                const districtId = ho_khau.quan_huyen;
                await this.setState({
                    titleModal: "CHỌN PHƯỜNG / XÃ",
                    titleSearch: "phường / xã",
                    addressSelected: {
                        code: ho_khau.phuong_xa,
                        title: ho_khau.phuong_xa_readable,
                    },
                    keyAddressUpdate: 'phuong_xa',
                    nameAddressUpdate,
                    showType: 'ward'
                });
                if (!_.isEmpty(districtFields)) {
                    this.props.actions.client.resetStateWard();
                    this.props.actions.client.getWard(districtId);
                } else {
                    const temptProviceId = ho_khau.tinh_tp;
                    this.props.actions.client.getDistrictAndWard(temptProviceId, districtId);
                }
                this.modalAddressRef.current.displayModalAddress(true);
            }
        }


    }

    showModalAddress = async (type, nameAddressUpdate) => {
        const { dia_chi } = this.state;
        const { districtFields } = this.props;
        if (type === 'province') {
            await this.setState({
                titleModal: "CHỌN TỈNH / THÀNH PHỐ",
                titleSearch: "tỉnh / thành phố",
                addressSelected: {
                    code: dia_chi[nameAddressUpdate].tinh_tp,
                    title: dia_chi[nameAddressUpdate].tinh_tp_readable,
                },
                keyAddressUpdate: 'tinh_tp',
                nameAddressUpdate,
                showType: 'province'
            });
            this.modalAddressRef.current.displayModalAddress(true);
        } else if (type === 'district') {
            if (!_.isEmpty(dia_chi[nameAddressUpdate])) {
                await this.setState({
                    titleModal: "CHỌN QUẬN HUYỆN",
                    titleSearch: "quận / huyện",
                    addressSelected: {
                        code: dia_chi[nameAddressUpdate].quan_huyen,
                        title: dia_chi[nameAddressUpdate].quan_huyen_readable,
                    },
                    keyAddressUpdate: 'quan_huyen',
                    nameAddressUpdate,
                    showType: 'district'
                });
                this.props.actions.client.resetStateDistrict();
                const provinceId = dia_chi[nameAddressUpdate].tinh_tp;
                this.props.actions.client.getDistrict(provinceId);
                this.modalAddressRef.current.displayModalAddress(true);
            }

        } else if (type === 'ward') {
            if (!_.isEmpty(dia_chi[nameAddressUpdate])) {
                const temptDistrict = dia_chi[nameAddressUpdate].quan_huyen_readable;
                const districtId = dia_chi[nameAddressUpdate].quan_huyen;
                if (temptDistrict !== '') {
                    await this.setState({
                        titleModal: "CHỌN PHƯỜNG / XÃ",
                        titleSearch: "phường / xã",
                        addressSelected: {
                            code: dia_chi[nameAddressUpdate].phuong_xa,
                            title: dia_chi[nameAddressUpdate].phuong_xa_readable,
                        },
                        keyAddressUpdate: 'phuong_xa',

                        nameAddressUpdate,
                        showType: 'ward'
                    });
                    if (!_.isEmpty(districtFields)) {
                        this.props.actions.client.resetStateWard();
                        this.props.actions.client.getWard(districtId);
                    } else {
                        const temptProviceId = dia_chi[nameAddressUpdate].tinh_tp;
                        this.props.actions.client.getDistrictAndWard(temptProviceId, districtId);
                    }
                    this.modalAddressRef.current.displayModalAddress(true);
                }

            }
        }
    }

    editBusinessInfo = () => {
        this.setState({
            disableEditBusinessInfo: false,
            addAddress: false
        });
        this.props.changeSwipeDirection("notDown")
    }

    saveBusinessInfo = () => {
        const { clientDetail } = this.props;
        const { dia_chi, ho_khau } = this.state;
        this.props.actions.client.updateBusinessInfo(clientDetail.id, {
            ho_khau: ho_khau,
            dia_chi_hien_tai: dia_chi.dia_chi_hien_tai,
            dia_chi_hien_tai_2: dia_chi.dia_chi_hien_tai_2,
            tinh_trang_nha_o: this.state.ownedStatus.code,
            ten_chu_nha: this.ten_chu_nhaRef.current.state.text,
            sdt_chu_nha: this.sdt_chu_nhaRef.current.state.text,
            so_nam_o_tp_hien_tai: this.so_nam_o_tp_hien_taiRef.current.state.text,

            so_nam_o_nha_hien_tai: this.so_nam_o_nha_hien_taiRef.current.state.text,
            o_voi_ai: this.o_voi_aiRef.current.state.text,
        }, 'property_info');
        this.setState({
            disableEditBusinessInfo: true
        })
    }

    cancelEditBusinessInfo = () => {
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

    updateHouseHolding(addressUpdate) {
        const { ho_khau, keyAddressUpdate } = this.state;
        if (keyAddressUpdate === 'tinh_tp') {
            if (ho_khau.tinh_tp !== addressUpdate.code) {
                const temptAddressChange = _.clone(ho_khau);
                const temptAddressChange_1 = {
                    ...temptAddressChange, tinh_tp: addressUpdate.code, tinh_tp_readable: addressUpdate.title,
                    phuong_xa_readable: '', phuong_xa: '', quan_huyen_readable: '', quan_huyen: ''
                };
                this.setState({
                    ho_khau: temptAddressChange_1
                })
            }
        } else if (keyAddressUpdate === 'quan_huyen') {
            if (ho_khau.quan_huyen !== addressUpdate.code) {
                const temptAddressChange = _.clone(ho_khau);
                const temptAddressChange_1 = {
                    ...temptAddressChange, quan_huyen_readable: addressUpdate.title, quan_huyen: addressUpdate.code,
                    phuong_xa_readable: '', phuong_xa: ''
                };
                this.setState({
                    ho_khau: temptAddressChange_1
                })
            }
        } else {
            const temptAddressChange = _.clone(ho_khau);
            const temptAddressChange_1 = {
                ...temptAddressChange, phuong_xa_readable: addressUpdate.title, phuong_xa: addressUpdate.code,
            };
            this.setState({
                ho_khau: temptAddressChange_1
            })
        }
    }

    updateAddress = addressUpdate => {
        const { dia_chi, nameAddressUpdate, keyAddressUpdate, addAddress } = this.state;
        if (nameAddressUpdate === 'ho_khau') {
            this.updateHouseHolding(addressUpdate)
        } else {
            if (addAddress) {
                this.createAddress(addressUpdate);
            } else {
                if (keyAddressUpdate === 'tinh_tp') {
                    if (dia_chi[nameAddressUpdate][keyAddressUpdate] !== addressUpdate.code) {
                        const temptAddressChange = _.clone(dia_chi[nameAddressUpdate]);
                        const temptAddressChange_1 = {
                            ...temptAddressChange, tinh_tp: addressUpdate.code, tinh_tp_readable: addressUpdate.title,
                            phuong_xa_readable: '', phuong_xa: '', quan_huyen_readable: '', quan_huyen: ''
                        };
                        const tempt_dia_chi = { ...dia_chi, [nameAddressUpdate]: temptAddressChange_1 };
                        const pickData = _.pick(['dia_chi_hien_tai', 'dia_chi_hien_tai_2'], tempt_dia_chi);

                        this.setState({
                            dia_chi: pickData
                        })
                    }
                } else if (keyAddressUpdate === 'quan_huyen') {
                    if (dia_chi[nameAddressUpdate][keyAddressUpdate] !== addressUpdate.code) {
                        const temptAddressChange = _.clone(dia_chi[nameAddressUpdate]);
                        const temptAddressChange_1 = {
                            ...temptAddressChange, quan_huyen_readable: addressUpdate.title, quan_huyen: addressUpdate.code,
                            phuong_xa_readable: '', phuong_xa: ''
                        };

                        const tempt_dia_chi = { ...dia_chi, [nameAddressUpdate]: temptAddressChange_1 };
                        const pickData = _.pick(['dia_chi_hien_tai', 'dia_chi_hien_tai_2'], tempt_dia_chi);

                        this.setState({
                            dia_chi: pickData
                        })
                    }
                }
                else {
                    const temptAddressChange = _.clone(dia_chi[nameAddressUpdate]);
                    const temptAddressChange_1 = {
                        ...temptAddressChange, phuong_xa_readable: addressUpdate.title, phuong_xa: addressUpdate.code,
                    };
                    const tempt_dia_chi = { ...dia_chi, [nameAddressUpdate]: temptAddressChange_1 };
                    const pickData = _.pick(['dia_chi_hien_tai', 'dia_chi_hien_tai_2'], tempt_dia_chi);

                    this.setState({
                        dia_chi: pickData
                    })
                }
            }
        }

    }

    showModalBusinessCode = () => {
        this.modalBuisinessCodeRef.current.displayModalAddress(true);
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
        await this.setState({
            addAddress: true,
            disableEditBusinessInfo: false
        });

    }

    cancelAddAddress = async () => {
        await this.setState({
            addAddress: false,
            disableEditBusinessInfo: true,
            createAddress: {
                dia_chi: '',
                phuong_xa_readable: '',
                phuong_xa: '',
                quan_huyen_readable: '',
                quan_huyen: '',
                tinh_tp_readable: '',
                tinh_tp: ''
            },
        });
        this.props.changeSwipeDirection("down")
    }

    saveAddAddress = async () => {
        const { clientDetail } = this.props;
        const { dia_chi_hien_tai } = clientDetail;
        const { createAddress } = this.state;

        const arrayKeyAddress = getKeyOfObject(dia_chi_hien_tai);
        let keyUpdate = '';
        for (let i = 0; i < arrayKeyAddress.length; i++) {
            if (_.isEmpty(dia_chi_hien_tai[arrayKeyAddress[i]])) {
                keyUpdate = arrayKeyAddress[i];
                break;
            }
        }
        this.props.actions.client.updateBusinessInfo(clientDetail.id, {
            [keyUpdate]: createAddress
        }, 'property_info');
        await this.setState({
            addAddress: false,
            disableEditBusinessInfo: true
        });
        this.props.changeSwipeDirection("down")

    }

    changeNumberHouseHolding = (data, keyData) => {
        const { ho_khau } = this.state;
        const temptAddressChange = _.clone(ho_khau);
        const temptAddressChange_1 = { ...temptAddressChange, dia_chi: data };
        this.setState({
            ho_khau: temptAddressChange_1
        })
    }

    changeNumberAddress = (data, keyData) => {
        const { dia_chi } = this.state;
        const temptAddressChange = _.clone(dia_chi[keyData]);
        const temptAddressChange_1 = { ...temptAddressChange, dia_chi: data };
        const tempt_dia_chi_kd = { ...dia_chi, [keyData]: temptAddressChange_1 };
        this.setState({
            dia_chi: tempt_dia_chi_kd
        })
    }

    cancelEditClientInfo = async () => {
        const { clientDetail } = this.props;
        this.nameClientRef.current.setStateFromParent(clientDetail.person_name);
        this.birthdayClientRef.current.setStateFromParent(clientDetail.birthday);
        this.cmndRef.current.setStateFromParent(clientDetail.nic_number);
        this.ngaycapCMNDRef.current.setStateFromParent(clientDetail.ngay_cap_cmnd);
        const temptNoiCapCMND = {
            title: clientDetail.noi_cap_cmnd,
            code: clientDetail.property_evaluate_field_options.noi_cap_cmnd[clientDetail.noi_cap_cmnd]
        }
        await this.setState({
            isEditClientInfo: false,
            noicapCMND: temptNoiCapCMND
        });
        this.props.changeSwipeDirection("down")
    }

    // ------------ Render -------

    renderEditBusinessAddress(title, address, nameAddressUpdate) {
        const { disableEditBusinessInfo } = this.state;
        return (
            <View style={[{
                paddingBottom: scaleSzie(16),
            }, styles.boderBottomStyle]} >
                <AutoGrowingTextInput
                    placeholder={title}
                    value={address.dia_chi ? address.dia_chi : ''}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEditBusinessInfo}
                    onChangeTextValue={value => this.changeNumberAddress(value, nameAddressUpdate)}
                />
                <ItemShowDropdown
                    palceHolder="Thành phố/tỉnh"
                    value={address.tinh_tp_readable ? address.tinh_tp_readable : ''}
                    showDropdown={this.showdropdownIsBoss}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddress('province', nameAddressUpdate)}
                />
                <ItemShowDropdown
                    palceHolder="Quận/huyện"
                    value={address.quan_huyen_readable ? address.quan_huyen_readable : ''}
                    showDropdown={this.showdropdownIsBoss}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddress('district', nameAddressUpdate)}
                />
                <ItemShowDropdown
                    palceHolder="Phường/xã"
                    value={address.phuong_xa_readable ? address.phuong_xa_readable : ''}
                    showDropdown={this.showdropdownIsBoss}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEditBusinessInfo}
                    showDropdown={() => this.showModalAddress('ward', nameAddressUpdate)}
                />
            </View>
        );
    }

    getTitleAddrress(keyTilte) {
        let title = '';
        switch (keyTilte) {
            case 'dia_chi_hien_tai':
                title = 'Địa chỉ hiện tai';
                break;
            case 'dia_chi_hien_tai_2':
                title = 'Địa chỉ hiện tai 2';
                break;
            case 'dia_chi_hien_tai_3':
                title = 'Địa chỉ hiện tai 3';
                break;
            case 'dia_chi_hien_tai_4':
                title = 'Địa chỉ hiện tai 4';
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

    renderCreateBusinessAddress(title, address, nameAddressUpdate) {
        const { disableEditBusinessInfo } = this.state;
        return (
            <View style={[{
                paddingBottom: scaleSzie(16),
            }, styles.boderBottomStyle]} >
                <AutoGrowingTextInput
                    placeholder={title}
                    value={address.dia_chi ? address.dia_chi : ''}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEditBusinessInfo}
                    onChangeTextValue={value => this.changeNumberAddress(value, nameAddressUpdate)}
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

    showModalOwnedStatus = () => {
        this.modalOwnedStatusRef.current.displayModalAddress(true);
    }

    showModalNoiCapCMND = () =>{
        this.modalNoiCapCMND.current.displayModalAddress(true);
    }

    updateNoiCapCMND = async data =>{
        await this.setState({
            noicapCMND: data
        })
    }

    renderNoiCapCMND(){
        const {noicapCMND} = this.state;
        const {clientDetail} = this.props;
        return (
            <ModalAddress
                ref={this.modalNoiCapCMND}
                titleModal={'Nơi cấp CMND'}
                titleSearch={'Nơi cấp'}
                data={clientDetail.property_evaluate_field_options.noi_cap_cmnd}
                dataSelected={noicapCMND}
                // updateAddress={this.updateOwnedBusiness}
                updateAddress={this.updateNoiCapCMND}

            />
        );
    }

    saveClientInfo = () => {
        const { clientDetail } = this.props;
        const { dia_chi, ho_khau } = this.state;
        this.props.actions.client.updateBusinessInfo(clientDetail.id, {
            ho_khau: ho_khau,
            dia_chi_hien_tai: dia_chi.dia_chi_hien_tai,
            dia_chi_hien_tai_2: dia_chi.dia_chi_hien_tai_2,
            tinh_trang_nha_o: this.state.ownedStatus.code,
            ten_chu_nha: this.ten_chu_nhaRef.current.state.text,
            sdt_chu_nha: this.sdt_chu_nhaRef.current.state.text,
            so_nam_o_tp_hien_tai: this.so_nam_o_tp_hien_taiRef.current.state.text,

            so_nam_o_nha_hien_tai: this.so_nam_o_nha_hien_taiRef.current.state.text,
            o_voi_ai: this.o_voi_aiRef.current.state.text,
              // -------- Client Info -----
              person_name : this.nameClientRef.current.state.text,
              birthday: this.birthdayClientRef.current.state.text,
              nic_number: this.cmndRef.current.state.text,
              ngay_cap_cmnd: this.ngaycapCMNDRef.current.state.text,
              noi_cap_cmnd:this.state.noicapCMND.code
        }, 'property_info');
        this.setState({
            disableEditBusinessInfo: true
        });
        this.props.changeSwipeDirection("down")
    }

    render() {
        const { disableEditBusinessInfo, addAddress, dia_chi, ho_khau,
            isEditClientInfo
        } = this.state;
        const { clientDetail } = this.props;
        const { living_info } = clientDetail;
        if (addAddress) {
            return (
                <View style={{ flex: 1 }} >
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Thêm địa chỉ nơi ở
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
                        {this.renderCreateBusinessAddress(' Thêm địa chỉ nơi ở', this.state.createAddress, 'create')}
                    </View>
                    {this.renderModalAddres()}
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
                                            <Button onPress={this.cancelEditClientInfo} style={{ marginTop: scaleSzie(6) }} >
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
                        <View style={{height:scaleSzie(1),backgroundColor:'rgb(238,238,238)' ,marginTop:scaleSzie(30)}} />
                    </View>
                    {/* ------------- Btn edit business info ---------- */}
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Thông tin nơi ở
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

                    <View style={[{ paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(16) }, styles.boderBottomStyle]} >
                        {
                            disableEditBusinessInfo ? <ItemAddress
                                title={'Hộ khẩu'}
                                address={ho_khau}
                            /> : <ItemEditBusinessAddress
                                    title='Hộ khẩu'
                                    address={ho_khau}
                                    nameAddressUpdate={'ho_khau'}
                                    disableEditBusinessInfo={disableEditBusinessInfo}
                                    changeNumberAddress={this.changeNumberHouseHolding}
                                    showModalAddress={this.showModalHousehold}
                                />
                        }

                    </View>
                    {
                        disableEditBusinessInfo ? <View style={[{ paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(16) }, styles.boderBottomStyle]} >
                            {
                                getKeyOfObject(dia_chi).map((key_dia_chi, index) => {
                                    if (!_.isEmpty(dia_chi[key_dia_chi])) {
                                        return <ItemAddress
                                            key={key_dia_chi}
                                            title={'Nơi ở hiện tại'}
                                            address={dia_chi[key_dia_chi]}
                                        />
                                    }
                                    return <View key={index} />
                                })
                            }
                        </View> : <View style={[{ paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(16) }, styles.boderBottomStyle]} >
                                {
                                    getKeyOfObject(dia_chi).map((key_dia_chi, index) => {
                                        if (!_.isEmpty(dia_chi[key_dia_chi])) {
                                            return <ItemEditBusinessAddress
                                                key={key_dia_chi}
                                                title={this.getTitleAddrress(key_dia_chi)}
                                                address={dia_chi[key_dia_chi]}
                                                nameAddressUpdate={key_dia_chi}
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

                    {/* --------------- Info 2 ----------------- */}
                    <View style={[{
                        paddingHorizontal: scaleSzie(24),
                        paddingBottom: scaleSzie(16)
                    }]} >

                        <ItemShowDropdown
                            palceHolder="Tình trạng nhà ở"
                            value={this.state.ownedStatus.title}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={!disableEditBusinessInfo}
                            showDropdown={this.showModalOwnedStatus}
                            disabled={disableEditBusinessInfo}
                        />

                        <AutoGrowingTextInput
                            ref={this.ten_chu_nhaRef}
                            placeholder={'Tên chủ nhà'}
                            value={living_info.ten_chu_nha ? living_info.ten_chu_nha : ''}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                        />
                        <AutoGrowingTextInput
                            ref={this.sdt_chu_nhaRef}
                            placeholder={'Điện thoại chủ nhà'}
                            value={living_info.sdt_chu_nha ? living_info.sdt_chu_nha : ''}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'
                        />
                        <AutoGrowingTextInput
                            ref={this.so_nam_o_tp_hien_taiRef}
                            placeholder={'Số năm ở TP/tỉnh hiện tại'}
                            value={living_info.so_nam_o_tp_hien_tai ? living_info.so_nam_o_tp_hien_tai : ''}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'
                        />
                        <AutoGrowingTextInput
                            ref={this.so_nam_o_nha_hien_taiRef}
                            placeholder={' Số năm ở nhà hiện tại'}
                            value={living_info.so_nam_o_nha_hien_tai ? living_info.so_nam_o_nha_hien_tai : ''}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                            keyboardType='numeric'
                        />
                        <AutoGrowingTextInput
                            ref={this.o_voi_aiRef}
                            placeholder={' Ở với ai?'}
                            value={living_info.o_voi_ai ? living_info.o_voi_ai : ''}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={disableEditBusinessInfo}
                        />
                        {
                            !disableEditBusinessInfo ? <View /> : <Button onPress={this.addAddress} style={{ marginTop: scaleSzie(32) }} >
                                <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16), marginTop: scaleSzie(10) }} >
                                    {`+ Thêm địa chỉ nơi ở`}
                                </Text>
                            </Button>
                        }
                    </View>

                    <View style={{ height: scaleSzie(250) }} />
                </ScrollView>
            </View>
            {this.renderModalAddres()}
            {this.renderModalOwnedStatus()}
            {this.renderNoiCapCMND()}
        </View >
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

    updateOwnedStatus = data => {
        this.setState({
            ownedStatus: data
        })
    }

    renderModalOwnedStatus() {
        const { ownedStatus } = this.state;
        const { clientDetail } = this.props;
        return (
            <ModalAddress
                ref={this.modalOwnedStatusRef}
                titleModal={'Tình trạng nhà ở'}
                titleSearch={'Tìm kiếm tình trạng nhà ở'}
                data={clientDetail.property_evaluate_field_options.tinh_trang_nha_o}
                dataSelected={ownedStatus}
                updateAddress={this.updateOwnedStatus}
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
                {`${address.dia_chi},${address.phuong_xa_readable},${address.quan_huyen_readable},${address.tinh_tp_readable}`}
            </Text>
        </View>
    );
}

const ItemEditBusinessAddress = (props) => {
    const { title, address, nameAddressUpdate, disableEditBusinessInfo } = props;

    return (
        <View style={[{
            paddingBottom: scaleSzie(16),
        }]} >
            <AutoGrowingTextInput
                placeholder={title}
                value={address.dia_chi ? address.dia_chi : ''}
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