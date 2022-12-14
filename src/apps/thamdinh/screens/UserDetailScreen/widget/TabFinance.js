import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'ramda';

import { Text, Button, ButtonSubmit, AutoGrowingTextInput, ItemShowDropdown, PlaceHolderList } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie, getKeyOfObject } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';
import { ModalAddress } from '../../../components';

class TabFinance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditBank: false,
            isAddInstitution: false,
            initState: true,
            bankSelected: {
                code: '',
                title: ''
            },
            createInstitution: {
                ten: "",
                thoi_han: "",
                so_tien_vay: "",
                so_du_no: "",
                so_tien_tra_hang_thang: "",
                so_thang_con_lai: "",
                ghi_chu: ""
            },
            titleModal: '',
            titleSearch: '',
            typeUpdateBank: 'bank',
            chu_tai_khoan: '',
            so_tk: '',
            so_the: '',
            bank_account: {
                ten_ngan_hang_readable: '',
                ten_ngan_hang: '',
                tinh_tp_tk_ngan_hang_readable: '',
                tinh_tp_tk_ngan_hang: '',
                chi_nhanh_mo_readable: '',
                chi_nhanh_mo: '',
                chu_tai_khoan: '',
                so_tk: '',
                so_the: ''
            }

        };
        this.modalBanksRef = React.createRef();
        this.accountHolderRef = React.createRef();
        this.accountNumberRef = React.createRef();
        this.cardNumberRef = React.createRef();
        this.createInstitutionRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { financeInfo } = nextProps;
        if (!_.isEmpty(financeInfo) && prevState.initState) {
            return {
                bank_account: financeInfo.bank_account,
                initState: false,
                isEditBank: false,
                isAddInstitution: false,
                chu_tai_khoan: financeInfo.bank_account.chu_tai_khoan,
                so_tk: financeInfo.bank_account.so_tk,
                so_the: financeInfo.bank_account.so_the,
            }
        }
        return null;
    }


    componentDidMount() {
        const { clientDetail } = this.props;
        this.props.actions.client.getFinanceInfo(clientDetail.id);
    }

    editBank = () => {
        this.props.changeSwipeDirection("notDown")
        this.setState({
            isEditBank: true
        })
    }

    cancelEditBank = () => {
        this.props.changeSwipeDirection("down")

        const { financeInfo } = this.props;
        const { bank_account } = financeInfo;
        this.setState({
            initState: true
        });
        this.accountHolderRef.current.setText(bank_account.chu_tai_khoan);
        this.accountNumberRef.current.setText(bank_account.so_tk);
        this.cardNumberRef.current.setText(bank_account.so_the);
    }

    saveEditBank = () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail } = this.props;
        const { bank_account, chu_tai_khoan, so_tk, so_the } = this.state;
        this.props.actions.client.updateBankAccount(clientDetail.id, {
            ...bank_account,
            chu_tai_khoan: chu_tai_khoan,
            so_tk: so_tk,
            so_the: so_the,
        })
    }

    addInstitution = () => {
        this.props.changeSwipeDirection("notDown")

        this.setState({
            isAddInstitution: true
        })
    }

    cancelAddInstitution = () => {
        this.props.changeSwipeDirection("down")
        this.setState({
            isAddInstitution: false,
            createInstitution: {
                ten: "",
                thoi_han: "",
                so_tien_vay: "",
                so_du_no: "",
                so_tien_tra_hang_thang: "",
                so_thang_con_lai: "",
                ghi_chu: ""
            }
        })
    }

    createInstitution = () => {
        this.props.changeSwipeDirection("down")
        const { clientDetail, financeInfo } = this.props;
        const { institutions } = financeInfo
        const dataCreate = this.createInstitutionRef.current.getInfoCreateInstitution();
        let keyUpdate = '';

        const arrayKey = getKeyOfObject(institutions);
        for (let i = 0; i < arrayKey.length; i++) {
            if (_.isEmpty(institutions[arrayKey[i]])) {
                keyUpdate = arrayKey[i];
                break;
            }
        }
        this.props.actions.client.updateBankAccount(clientDetail.id, {
            [keyUpdate]: dataCreate
        });
    }

    render() {
        const { financeInfo } = this.props;
        if (_.isEmpty(financeInfo)) {
            return <PlaceHolderList />
        }
        const { institutions } = financeInfo;
        const { isEditBank, isAddInstitution, bank_account, chu_tai_khoan, so_tk, so_the, createInstitution } = this.state;
        if (isAddInstitution) {
            return (
                <View style={{ flex: 1 }} >
                    <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <View style={{ flex: 1, }} >
                                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                    Th??m t??? ch???c t??n d???ng
                            </Text>
                            </View>
                            <View style={{ width: scaleSzie(80 + 40) }} >
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Button onPress={this.cancelAddInstitution} style={{ marginTop: scaleSzie(6) }} >
                                        <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                            Hu???
                                         </Text>
                                    </Button>
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="L??u"
                                        onPress={this.createInstitution} />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* -------- Body ------ */}
                    <View style={{ flex: 1 }} >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                        >
                            <ItemInstitutions
                                ref={this.createInstitutionRef}
                                data={createInstitution}
                                title=""
                                isAddInstitution={isAddInstitution}
                                isEdit={isAddInstitution}
                                changeSwipeDirection={(value) =>this.props.changeSwipeDirection(value)}
                                
                            />
                            <View style={{height:scaleSzie(250)}} />
                        </ScrollView>
                    </View>
                </View>
            );
        }
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24) }} >
                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                    T??i ch??nh
            </Text>
            </View>
            <View style={{ flex: 1 }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={[{
                        width: Configs.FULL_WIDTH, paddingTop: scaleSzie(17), paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(12),
                    }, styles.boderBottomStyle]} >
                        <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', }} >
                            {"T??i kho???n ng??n h??ng"}
                        </Text>
                        <ItemShowDropdown
                            palceHolder="T??n ng??n h??ng"
                            value={bank_account.ten_ngan_hang_readable}
                            showDropdown={() => this.showModalBank('bank')}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={isEditBank}
                        />
                        <ItemShowDropdown
                            palceHolder="TP/t???nh"
                            value={bank_account.tinh_tp_tk_ngan_hang_readable}
                            showDropdown={() => this.showModalBank('cities')}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={isEditBank}
                        />
                        <ItemShowDropdown
                            palceHolder="Chi nh??nh m???"
                            value={bank_account.chi_nhanh_mo_readable}
                            showDropdown={() => this.showModalBank('openBranch')}
                            style={{ marginTop: scaleSzie(16) }}
                            isPress={isEditBank}
                        />

                        <AutoGrowingTextInput
                            ref={this.accountHolderRef}
                            placeholder={'Ch??? t??i kho???n'}
                            value={chu_tai_khoan}
                            onChangeTextValue={(chu_tai_khoan) => this.setState({ chu_tai_khoan })}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditBank}
                        />
                        <AutoGrowingTextInput
                            ref={this.accountNumberRef}
                            placeholder={'S??? t??i kho???n'}
                            value={so_tk}
                            onChangeTextValue={(so_tk) => this.setState({ so_tk })}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditBank}
                            keyboardType='numeric'
                        />
                        <AutoGrowingTextInput
                            ref={this.cardNumberRef}
                            placeholder={'S??? th???'}
                            value={so_the}
                            onChangeTextValue={(so_the) => this.setState({ so_the })}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={!isEditBank}
                            keyboardType='numeric'
                        />

                        <View style={{ position: 'absolute', right: scaleSzie(24), top: scaleSzie(12) }} >
                            {
                                !this.state.isEditBank ?
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="S???a"
                                        onPress={this.editBank}
                                    />
                                    :
                                    <View style={{ flexDirection: 'row', }} >
                                        <Button onPress={this.cancelEditBank} style={{ marginTop: scaleSzie(6), marginRight: scaleSzie(10) }} >
                                            <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                                Hu???
                                            </Text>
                                        </Button>
                                        <ButtonSubmit
                                            width={80}
                                            height={30}
                                            title="L??u"
                                            onPress={this.saveEditBank} />
                                    </View>
                            }

                        </View>

                    </View>
                    {
                        Object.keys(institutions).map((key, index) => {
                            if (!_.isEmpty(institutions[key])) {
                                return <ItemInstitutions
                                    key={key}
                                    data={institutions[key]}
                                    title={this.getTitleInstitution(key)}
                                    isEdit={false}
                                    saveEditInstitution={(dataUpdate) => this.saveEditInstitution(dataUpdate, key)}
                                    changeSwipeDirection={(value) =>this.props.changeSwipeDirection(value)}
                                />
                            }
                            return null;
                        })
                    }
                    {this.renderButtonAddInstitution()}
                    <View style={{ height: scaleSzie(350) }} />
                </ScrollView>
                {this.renderModalBanks()}
            </View>

        </View>
    }

    renderButtonAddInstitution() {
        const {  financeInfo } = this.props;
        const { institutions } = financeInfo
        let isRender = false;

        const arrayKey = getKeyOfObject(institutions);
        for (let i = 0; i < arrayKey.length; i++) {
            if (_.isEmpty(institutions[arrayKey[i]])) {
                isRender = true;
                break;
            }
        }
        if(isRender){
            return (
                <Button onPress={this.addInstitution} style={{ marginTop: scaleSzie(32), marginLeft: scaleSzie(24) }} >
                    <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16) }} >
                        {`+ Th??m t??? ch???c t??n d???ng`}
                    </Text>
                </Button>
            );
        }
        return <View />
       
    }

    saveEditInstitution(dataUpdate, keyUpdate) {
        const { clientDetail } = this.props;
        this.props.actions.client.updateBankAccount(clientDetail.id, {
            [keyUpdate]: dataUpdate
        });
    }

    getTitleInstitution(key) {
        let title = '';
        switch (key) {
            case 'tctd_1':
                title = "T??? ch???c t??n d???ng 1 ";
                break;
            case 'tctd_2':
                title = "T??? ch???c t??n d???ng 2 ";
                break;
            case 'tctd_3':
                title = "T??? ch???c t??n d???ng 3 ";
                break;
            case 'tctd_4':
                title = "T??? ch???c t??n d???ng 4 ";
                break;
            case 'tctd_5':
                title = "T??? ch???c t??n d???ng 5 ";
                break;
            default:
                title = "T??? ch???c t??n d???ng ";
                break;
        }
        return title;
    }

    showModalBank = (type) => {
        const { bank_account } = this.state;
        if (type === 'bank') {
            this.setState({
                titleModal: 'Ng??n H??ng',
                titleSearch: 'T??m Ki???m ng??n h??ng',
                typeUpdateBank: 'bank',
                bankSelected: {
                    code: bank_account.ten_ngan_hang,
                    title: bank_account.ten_ngan_hang_readable
                }
            });
            this.modalBanksRef.current.displayModalAddress(true);
        } else if (type === 'cities') {
            if (bank_account.ten_ngan_hang !== null && bank_account.ten_ngan_hang !== '') {
                this.setState({
                    titleModal: 'Th??nh Ph???/T???nh',
                    titleSearch: 'T??m ki???m th??nh ph???/t???nh',
                    typeUpdateBank: 'cities',
                    bankSelected: {
                        code: bank_account.tinh_tp_tk_ngan_hang,
                        title: bank_account.tinh_tp_tk_ngan_hang_readable
                    }
                });
                this.props.actions.client.getCitiesBank(bank_account.ten_ngan_hang);
                this.modalBanksRef.current.displayModalAddress(true);
            }
        } else {
            if (bank_account.tinh_tp_tk_ngan_hang !== null && bank_account.tinh_tp_tk_ngan_hang !== '') {
                this.setState({
                    titleModal: 'Chi nh??nh m???',
                    titleSearch: 'T??m ki???m chi nh??nh m???',
                    typeUpdateBank: 'openBranch',
                    bankSelected: {
                        code: bank_account.chi_nhanh_mo,
                        title: bank_account.chi_nhanh_mo_readable
                    }
                });
                this.props.actions.client.getOpenBranchBank(bank_account.ten_ngan_hang, bank_account.tinh_tp_tk_ngan_hang);
                this.modalBanksRef.current.displayModalAddress(true);
            }
        }
    }

    updateBankeSelect = dataUpdate => {
        const { typeUpdateBank, bank_account } = this.state;
        if (typeUpdateBank === 'bank') {
            const temptBank = _.clone(bank_account);
            const temptBank_1 = {
                ...temptBank, ten_ngan_hang: dataUpdate.code, ten_ngan_hang_readable: dataUpdate.title,
                tinh_tp_tk_ngan_hang_readable: '',
                tinh_tp_tk_ngan_hang: '',
                chi_nhanh_mo_readable: '',
                chi_nhanh_mo: '',
            };
            this.setState({
                bank_account: temptBank_1
            })
        } else if (typeUpdateBank === 'cities') {
            const temptBank = _.clone(bank_account);
            const temptBank_1 = {
                ...temptBank,
                tinh_tp_tk_ngan_hang_readable: dataUpdate.title,
                tinh_tp_tk_ngan_hang: dataUpdate.code,
                chi_nhanh_mo_readable: '',
                chi_nhanh_mo: '',
            };
            this.setState({
                bank_account: temptBank_1
            })
        } else {
            const temptBank = _.clone(bank_account);
            const temptBank_1 = {
                ...temptBank,
                chi_nhanh_mo_readable: dataUpdate.title,
                chi_nhanh_mo: dataUpdate.code,
            };
            this.setState({
                bank_account: temptBank_1
            })
        }
    }

    getDataModalBanks(type) {
        const { clientDetail, citiesBank, openBranchBank } = this.props;
        if (type === 'bank') {
            return clientDetail.business_evaluate_field_options.bank_fields
        } else if (type === 'cities') {
            return citiesBank
        } else {
            return openBranchBank;
        }
    }

    renderModalBanks() {
        const { bankSelected, titleModal, titleSearch, typeUpdateBank } = this.state;
        return (
            <ModalAddress
                ref={this.modalBanksRef}
                titleModal={titleModal}
                titleSearch={titleSearch}
                data={this.getDataModalBanks(typeUpdateBank)}
                dataSelected={bankSelected}
                updateAddress={this.updateBankeSelect}
            />
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.isUpdateAccountBank && this.props.isUpdateAccountBank !== prevProps.isUpdateAccountBank) {
            this.setState({
                initState: true
            })
        }
    }


}

class ItemInstitutions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: this.props.isEdit
        }
        this.tenRef = React.createRef();
        this.thoi_hanRef = React.createRef();
        this.so_tien_vayRef = React.createRef();
        this.so_du_noRef = React.createRef();
        this.so_tien_tra_hang_thangRef = React.createRef();
        this.so_thang_con_laiRef = React.createRef();
        this.ghi_chuRef = React.createRef();
    }

    editInfo = () => {
        this.props.changeSwipeDirection("notDown")

        this.setState({
            isEdit: true
        })
    }

    cancelEdit = () => {
        this.props.changeSwipeDirection("down")
        const { data } = this.props;
        this.tenRef.current.setText(data.ten);
        this.thoi_hanRef.current.setText(data.thoi_han);
        this.so_tien_vayRef.current.setText(data.so_tien_vay);
        this.so_du_noRef.current.setText(data.so_du_no);
        this.so_tien_tra_hang_thangRef.current.setText(data.so_tien_tra_hang_thang);
        this.so_thang_con_laiRef.current.setText(data.so_thang_con_lai);
        this.ghi_chuRef.current.setText(data.ghi_chu);
        this.setState({
            isEdit: false
        })
    }

    saveEditInstitution = () => {
        this.props.changeSwipeDirection("down")
        const ten = this.tenRef.current.state.text;
        const thoi_han = this.thoi_hanRef.current.state.text;
        const so_tien_vay = this.so_tien_vayRef.current.state.text;
        const so_du_no = this.so_du_noRef.current.state.text;
        const so_tien_tra_hang_thang = this.so_tien_tra_hang_thangRef.current.state.text;
        const so_thang_con_lai = this.so_thang_con_laiRef.current.state.text;
        const ghi_chu = this.ghi_chuRef.current.state.text;
        this.props.saveEditInstitution({ ten, thoi_han, so_tien_vay, so_du_no, so_tien_tra_hang_thang, so_thang_con_lai, ghi_chu });
        this.setState({
            isEdit: false
        })
    }

    getInfoCreateInstitution() {
        const ten = this.tenRef.current.state.text;
        const thoi_han = this.thoi_hanRef.current.state.text;
        const so_tien_vay = this.so_tien_vayRef.current.state.text;
        const so_du_no = this.so_du_noRef.current.state.text;
        const so_tien_tra_hang_thang = this.so_tien_tra_hang_thangRef.current.state.text;
        const so_thang_con_lai = this.so_thang_con_laiRef.current.state.text;
        const ghi_chu = this.ghi_chuRef.current.state.text;

        return { ten, thoi_han, so_tien_vay, so_du_no, so_tien_tra_hang_thang, so_thang_con_lai, ghi_chu }
    }


    render() {
        const { data, isAddInstitution, title } = this.props;
        const { isEdit } = this.state;
        return (
            <View style={[{
                width: Configs.FULL_WIDTH, paddingTop: scaleSzie(17), paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(12),
            }, styles.boderBottomStyle]} >
                <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', }} >
                    {title}
                </Text>
                <AutoGrowingTextInput
                    ref={this.tenRef}
                    placeholder={'T??n TCTD'}
                    value={data.ten}
                    styleContainer={{}}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                />
                <AutoGrowingTextInput
                    ref={this.thoi_hanRef}
                    placeholder={'Th???i h???n'}
                    value={data.thoi_han}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                />
                <AutoGrowingTextInput
                    ref={this.so_tien_vayRef}
                    placeholder={'S??? ti???n vay'}
                    value={data.so_tien_vay}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                    keyboardType='numeric'
                />
                <AutoGrowingTextInput
                    ref={this.so_du_noRef}
                    placeholder={'S??? d?? n???'}
                    value={data.so_du_no}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                    keyboardType='numeric'
                />
                <AutoGrowingTextInput
                    ref={this.so_tien_tra_hang_thangRef}
                    placeholder={'S??? ti???n tr??? h??ng th??ng'}
                    value={data.so_tien_tra_hang_thang}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                    keyboardType='numeric'
                />
                <AutoGrowingTextInput
                    ref={this.so_thang_con_laiRef}
                    placeholder={'S??? th??ng c??n l???i'}
                    value={data.so_thang_con_lai}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                    keyboardType='numeric'
                />
                <AutoGrowingTextInput
                    ref={this.ghi_chuRef}
                    placeholder={'Ghi ch??'}
                    value={data.ghi_chu}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={!isEdit}
                />
                {
                    isAddInstitution ? <View /> :
                        <View style={{ position: 'absolute', right: scaleSzie(24), top: scaleSzie(12) }} >
                            {
                                !this.state.isEdit ? <ButtonSubmit
                                    width={80}
                                    height={30}
                                    title="S???a"
                                    onPress={this.editInfo}
                                /> :
                                    <View style={{ flexDirection: 'row' }} >
                                        <ButtonSubmit
                                            width={80}
                                            height={30}
                                            title="Hu???"
                                            onPress={this.cancelEdit}
                                            backgroundButton="transparent"
                                            titleColor="#A2A2A2"
                                        />
                                        <ButtonSubmit
                                            width={80}
                                            height={30}
                                            title="L??u"
                                            onPress={this.saveEditInstitution}
                                        />
                                    </View>
                            }

                        </View>
                }
            </View>
        );
    }

}




const ItemAddress = props => <View style={{ marginTop: scaleSzie(18) }} >
    <Text bold style={{ color: '#A2A2A2', fontSize: scaleSzie(13) }} >
        H??? kh???u
</Text>
    <Text style={{ color: '#424242', fontSize: scaleSzie(16) }} >
        100 Pasteur, Ph?????ng 6, Qu???n 3, TP. H??? Ch?? Minh
</Text>
</View>

const styles = StyleSheet.create({
    boderBottomStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    }

})

const mapStateToProps = state => ({
    clientDetail: state.client.clientDetail,
    financeInfo: state.client.financeInfo,
    citiesBank: state.client.citiesBank,
    openBranchBank: state.client.openBranchBank,
    isUpdateAccountBank: state.client.isUpdateAccountBank
});

export default connectRedux(mapStateToProps, TabFinance);
