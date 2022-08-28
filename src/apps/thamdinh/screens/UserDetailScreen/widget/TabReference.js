import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'ramda';

import { Text, Button, ButtonSubmit, AutoGrowingTextInput, ItemShowDropdown, PlaceHolderList } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';
import { ModalAddress } from '../../../components';

class TabReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddReference: false,
            supportProfileCreate: {
                id: '',
                fullname: '',
                relationship: '',
                phone: '',
                address: '',
                job: '',
                relationship_value: -1
            },
            relationshipSelected: '',
            idRelationShiptSelected: ''
        }

        this.createSupportRef = React.createRef();
        this.modalRelationRef = React.createRef();
        this.modalRelationCreateRef = React.createRef();

        this.supportProfileUpdate = [];
    }

    componentDidMount() {
        const { clientDetail } = this.props;
        this.props.actions.client.getSupportProfileInfo(clientDetail.id);
    }

    setSupportProfileUpdate = ref => {
        if (ref) {
            this.supportProfileUpdate.push(ref);
        }
    }

    setSupportProfileCreate = ref => {
        if (ref) {
            this.supportProfilecreate.push(ref);
        }
    }

    saveEditSupportProfile = dataUpdate => {
        const { clientDetail, relationshipOtions } = this.props;
        const relationshipValue = relationshipOtions.filter(item => item.name == dataUpdate.relationship);
        let value;
        if (relationshipOtions.length > 0) {
            value = relationshipValue[0].value;
        } else {
            value = ''
        }
        this.props.actions.client.updateSupporProfile(clientDetail.id, dataUpdate.id, { ...dataUpdate, relationship_value: value });
    }

    removeSupportProfile = (support_profile_id) => {
        const { clientDetail } = this.props;
        this.props.actions.client.removeSupportProfile(clientDetail.id, support_profile_id);
    }

    addReference = () => {
        this.supportProfileUpdate = [];
        this.setState({
            isAddReference: true
        });
        this.props.changeSwipeDirection("notDown")
    }

    getRelationShipValue(array, name) {
        const tempt = array.filter(item => item.name == name);
        if (tempt.length > 0) {
            return tempt[0].value;
        } else {
            return null;
        }
    }

    createSupportProfile = () => {
        const { clientDetail, relationshipOtions } = this.props;
        const dataCreate = this.createSupportRef.current.getInfoCreateSupport();
        const relationshipValue = this.getRelationShipValue(relationshipOtions, dataCreate.relationship);
        this.props.actions.client.createSupporProfile(clientDetail.id, { ...dataCreate, relationship_value: relationshipValue });
        this.props.changeSwipeDirection("down")
    }

    cancelCreateSupportProfile = () => {
        this.setState({
            isAddReference: false
        });
        this.props.changeSwipeDirection("down")
    }

    showModalRelation = async (data) => {
        await this.setState({
            relationshipSelected: data.relationship,
            idRelationShiptSelected: data.id
        })
        this.modalRelationRef.current.displayModalAddress(true);
    }

    showModalRelationCreate = async (data) => {
        await this.setState({
            relationshipSelected: data.relationship,
            // idRelationShiptSelected: data.id
        })
        this.modalRelationCreateRef.current.displayModalAddress(true);
    }

    updateRelationShipCreate = async dataUpdate => {
        this.createSupportRef.current.setRelationShipFromParent(dataUpdate);
    }

    updateRelationShip = async dataUpdate => {
        const { idRelationShiptSelected } = this.state
        for (let i = 0; i < this.supportProfileUpdate.length; i++) {
            if (this.supportProfileUpdate[i].props.data.id == idRelationShiptSelected) {
                // alert(this.supportProfileUpdate[i].props.data.id)
                // console.log(this.supportProfileUpdate[i]);
                this.supportProfileUpdate[i].setRelationShipFromParent(dataUpdate);
                break;
            }
        }
    }

    // ------- Render  ---------

    renderModalRelationShipCreate() {
        const { relationshipOtions } = this.props;
        const data = relationshipOtions.map(item => `${item.name}`);
        return (
            <ModalAddress
                ref={this.modalRelationCreateRef}
                titleModal={'Mối quan hệ'}
                titleSearch={'mối quan hệ'}
                data={data}
                dataSelected={this.state.relationshipSelected}
                updateAddress={this.updateRelationShipCreate}
            />
        );
    }

    renderModalRelationShip() {
        const { relationshipOtions } = this.props;
        const data = relationshipOtions.map(item => `${item.name}`);
        return (
            <ModalAddress
                ref={this.modalRelationRef}
                titleModal={'Mối quan hệ'}
                titleSearch={'mối quan hệ'}
                data={data}
                dataSelected={this.state.relationshipSelected}
                updateAddress={this.updateRelationShip}
            />
        );
    }

    render() {
        const { isAddReference, supportProfileCreate } = this.state;
        const { supportProfileInfo } = this.props;
        if (_.isEmpty(supportProfileInfo) && !Array.isArray(supportProfileInfo)) {
            return <PlaceHolderList />
        }
        if (_.isEmpty(supportProfileInfo) && Array.isArray(supportProfileInfo) && !isAddReference) {
            return <View style={{ flex: 1, paddingHorizontal: scaleSzie(24) }} >
                <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={{ flex: 1, }} >
                            <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                Thêm tham chiếu
                            </Text>
                        </View>
                        <View style={{ width: scaleSzie(80 + 40) }} >
                        </View>
                    </View>
                </View>
                <Button onPress={this.addReference} style={{ marginLeft: scaleSzie(24) }} >
                    <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16) }} >
                        {`+ Thêm tham chiếu`}
                    </Text>
                </Button>
            </View>
        }
        if (isAddReference) {
            return <View style={{ flex: 1, }} >
                <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={{ flex: 1, }} >
                            <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                Thêm tham chiếu
                            </Text>
                        </View>
                        <View style={{ width: scaleSzie(80 + 40) }} >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Button onPress={this.cancelCreateSupportProfile} style={{ marginTop: scaleSzie(6) }} >
                                    <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                        Huỷ
                                    </Text>
                                </Button>
                                <ButtonSubmit
                                    width={80}
                                    height={30}
                                    title="Lưu"
                                    onPress={this.createSupportProfile} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        <ItemReference
                            ref={this.createSupportRef}
                            data={supportProfileCreate}
                            title={``}
                            isCreate={true}
                            saveEditSupportProfile={this.createSupportProfile}
                            cancelCreateSupportProfile={this.cancelCreateSupportProfile}
                            showModalRelation={this.showModalRelationCreate}
                            relationshipOtions={this.props.relationshipOtions}
                            changeSwipeDirection={(value) => this.props.changeSwipeDirection(value)}
                            // changeSwipeDirection={(value) => alert(value)}
                        />
                        <View style={{ height: scaleSzie(250) }} />
                    </ScrollView>
                </View>
                {this.renderModalRelationShipCreate()}
            </View>
        }
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24) }} >
                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                    Tham chiếu 
                </Text>
            </View>
            <View style={{ flex: 1 }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    {
                        supportProfileInfo.map((data, index) => {
                            return <ItemReference
                                ref={this.setSupportProfileUpdate}
                                key={index}
                                data={data}
                                title={`Tham chiếu ${index + 1}`}
                                saveEditSupportProfile={this.saveEditSupportProfile}
                                removeSupportProfile={this.removeSupportProfile}
                                showModalRelation={this.showModalRelation}
                                relationshipOtions={this.props.relationshipOtions}
                                changeSwipeDirection={(value) => this.props.changeSwipeDirection(value)}
                            />
                        })
                    }
                    <Button onPress={this.addReference} style={{ marginTop: scaleSzie(32), marginLeft: scaleSzie(24) }} >
                        <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16) }} >
                            {`+ Thêm tham chiếu`}
                        </Text>
                    </Button>
                    <View style={{ height: scaleSzie(350) }} />
                </ScrollView>
            </View>
            {this.renderModalRelationShip()}
        </View>
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.loading && prevProps.loading !== this.props.loading) {
            this.setState({
                isAddReference: false,
                supportProfileCreate: {
                    fullname: '',
                    relationship: '',
                    phone: '',
                    address: '',
                    job: ''
                }
            })
        }
    }

}

class ItemReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disableEdit: this.props.isCreate ? false : true,
            // relationship : this.props.data.relationship ? this.props.data.relationship : ''
            relationship: this.getRelationShipName(this.props.relationshipOtions, this.props.data.relationship_value)

        };
        this.fullnameRef = React.createRef();
        this.phoneRef = React.createRef();
        // this.relationshipRef = React.createRef();
        this.addressRef = React.createRef();
        this.jobRef = React.createRef();
    }

    getRelationShipName(array, id) {
        const tempt = array.filter(item => item.value == id);
        if (tempt.length > 0) {
            return tempt[0].name;
        } else {
            return ''
        }
    }

    setRelationShipFromParent = async (relationship) => {
        await this.setState({
            relationship
        })
    }

    editProfile = async () => {
        this.props.changeSwipeDirection("notDown");
        await  this.setState({
            disableEdit: false
        });

    }

    cancelEditProfile = async () => {
        const { data } = this.props;
        this.fullnameRef.current.setText(data.fullname);
        this.phoneRef.current.setText(data.phone);
        // this.relationshipRef.current.setText(data.relationship);
        this.addressRef.current.setText(data.address);
        this.jobRef.current.setText(data.job);

        await this.setState({
            disableEdit: true,
            relationship: this.getRelationShipName(this.props.relationshipOtions, this.props.data.relationship_value)
        });
        this.props.changeSwipeDirection("down")
    }



    getInfoCreateSupport() {
        const fullname = this.fullnameRef.current.state.text;
        const relationship = this.state.relationship;
        const phone = this.phoneRef.current.state.text;
        const address = this.addressRef.current.state.text;
        const job = this.jobRef.current.state.text;
        return { fullname, relationship, phone, address, job };
    }

    saveEditSupportProfile = () => {
        const { data } = this.props;

        const fullname = this.fullnameRef.current.state.text;
        const relationship = this.state.relationship;

        const phone = this.phoneRef.current.state.text;
        const address = this.addressRef.current.state.text;
        const job = this.jobRef.current.state.text;

        this.props.saveEditSupportProfile({ ...data, fullname, relationship, phone, address, job });
        this.setState({
            disableEdit: true,
        });
        this.props.changeSwipeDirection("down")
    }


    render() {
        const { title, isCreate, data, removeSupportProfile } = this.props;
        const { disableEdit } = this.state;
        return (
            <View style={[{
                width: Configs.FULL_WIDTH, paddingTop: scaleSzie(17), paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(12)
            }, isCreate ? {} : styles.boderBottomStyle]} >
                <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', }} >
                    {title}
                </Text>
                <AutoGrowingTextInput
                    ref={this.fullnameRef}
                    placeholder={'Họ và tên'}
                    value={data.fullname}
                    styleContainer={{}}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.phoneRef}
                    placeholder={'Số điện thoại'}
                    value={data.phone}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                    keyboardType='numeric'
                />

                <ItemShowDropdown
                    palceHolder="Quan hệ"
                    value={this.state.relationship}
                    style={{ marginTop: scaleSzie(16) }}
                    isPress={!disableEdit}
                    showDropdown={() => this.props.showModalRelation({
                        relationship: this.state.relationship,
                        id: data.id
                    })}
                />
                {/* <AutoGrowingTextInput
                    ref={this.relationshipRef}
                    placeholder={'Quan hệ'}
                    value={data.relationship}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                /> */}
                <AutoGrowingTextInput
                    ref={this.addressRef}
                    placeholder={'Hộ khẩu'}
                    value={data.address}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.jobRef}
                    placeholder={'Nghề nghiệp'}
                    value={data.job}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                {isCreate ? <View />
                    :
                    <View style={{ position: 'absolute', right: scaleSzie(24), top: scaleSzie(12) }} >
                        {
                            disableEdit ?
                                <View style={{ flexDirection: 'row' }} >
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Xoá"
                                        onPress={() => removeSupportProfile(data.id)}
                                        backgroundButton="transparent"
                                        titleColor="#55529E"
                                        styleButton={{
                                            borderColor: '#55529E',
                                        }}
                                    />

                                    <View style={{ width: scaleSzie(8) }} />
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Sửa"
                                        onPress={this.editProfile}
                                    />
                                </View>
                                : <View style={{ flexDirection: 'row' }} >
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Huỷ"
                                        onPress={this.cancelEditProfile}
                                        backgroundButton="transparent"
                                        titleColor="#A2A2A2"
                                    />
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Lưu"
                                        onPress={this.saveEditSupportProfile}
                                    />
                                </View>
                        }

                    </View>}

            </View>
        );
    }

}

const styles = StyleSheet.create({
    boderBottomStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    }

})

const mapStateToProps = state => ({
    clientDetail: state.client.clientDetail,
    supportProfileInfo: state.client.supportProfileInfo,
    loading: state.app.loading,
    relationshipOtions: state.client.relationshipOtions
});

export default connectRedux(mapStateToProps, TabReference);