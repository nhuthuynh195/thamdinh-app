import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'ramda';

import { Text, Button, ButtonSubmit, AutoGrowingTextInput, ItemShowDropdown, PlaceHolderList } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';

class TabReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddReference: false,
            supportProfileCreate: {
                fullname: '',
                relationship: '',
                phone: '',
                address: '',
                job: ''
            }
        }

        this.createSupportRef = React.createRef();
    }

    componentDidMount() {
        const { clientDetail } = this.props;
        this.props.actions.client.getSupportProfileInfo(clientDetail.id);
    }

    saveEditSupportProfile = dataUpdate => {
        const { clientDetail } = this.props;
        this.props.actions.client.updateSupporProfile(clientDetail.id, dataUpdate.id, dataUpdate);
    }

    addReference = () => {
        this.setState({
            isAddReference: true
        })
    }

    createSupportProfile = () => {
        const { clientDetail } = this.props;
        const dataCreate = this.createSupportRef.current.getInfoCreateSupport();
        this.props.actions.client.createSupporProfile(clientDetail.id, dataCreate);
        this.setState({
            isAddReference: false
        })
    }

    cancelCreateSupportProfile = () => {
        this.setState({
            isAddReference: false
        })
    }

    render() {
        const { isAddReference, supportProfileCreate } = this.state;
        const { supportProfileInfo } = this.props;
        if (_.isEmpty(supportProfileInfo)) {
            return <PlaceHolderList />
        }
        if (isAddReference) {
            return <View style={{ flex: 1, }} >
                <View style={{ height: scaleSzie(56), paddingHorizontal: scaleSzie(24) }} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={{ flex: 1, }} >
                            <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                                Th??m tham chi???u
                            </Text>
                        </View>
                        <View style={{ width: scaleSzie(80 + 40) }} >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Button onPress={this.cancelCreateSupportProfile} style={{ marginTop: scaleSzie(6) }} >
                                    <Text style={{ color: '#A2A2A2', fontWeight: '600', fontSize: scaleSzie(15) }} >
                                        Hu???
                                         </Text>
                                </Button>
                                <ButtonSubmit
                                    width={80}
                                    height={30}
                                    title="L??u"
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
                        />
                        <View style={{ height: scaleSzie(100) }} />
                    </ScrollView>
                </View>
            </View>
        }
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24) }} >
                <Text bold style={{ color: '#424242', fontSize: scaleSzie(18) }} >
                    Tham chi???u
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
                                key={index}
                                data={data}
                                title={`Tham chi???u ${index + 1}`}
                                saveEditSupportProfile={this.saveEditSupportProfile}
                            />
                        })
                    }
                    <Button onPress={this.addReference} style={{ marginTop: scaleSzie(32), marginLeft: scaleSzie(24) }} >
                        <Text bold style={{ color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(16) }} >
                            {`+ Th??m tham chi???u`}
                        </Text>
                    </Button>
                    <View style={{ height: scaleSzie(350) }} />
                </ScrollView>
            </View>

        </View>
    }

}

class ItemReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disableEdit: this.props.isCreate ? false : true,
            profile: this.props.data
        };
        this.fullnameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.relationshipRef = React.createRef();
        this.addressRef = React.createRef();
        this.jobRef = React.createRef();
    }

    editProfile = () => {
        this.setState({
            disableEdit: false
        })
    }

    cancelEditProfile = async () => {
        const { data } = this.props;
        this.fullnameRef.current.setText(data.fullname);
        this.phoneRef.current.setText(data.phone);
        this.relationshipRef.current.setText(data.relationship);
        this.addressRef.current.setText(data.address);
        this.jobRef.current.setText(data.job);

        await this.setState({
            disableEdit: true,
        })
    }



    getInfoCreateSupport() {
        const fullname = this.fullnameRef.current.state.text;
        const relationship = this.relationshipRef.current.state.text;
        const phone = this.phoneRef.current.state.text;
        const address = this.addressRef.current.state.text;
        const job = this.jobRef.current.state.text;
        return { fullname, relationship, phone, address, job };
    }

    saveEditSupportProfile = () => {
        const { data } = this.props;

        const fullname = this.fullnameRef.current.state.text;
        const relationship = this.relationshipRef.current.state.text;
        const phone = this.phoneRef.current.state.text;
        const address = this.addressRef.current.state.text;
        const job = this.jobRef.current.state.text;

        this.props.saveEditSupportProfile({ ...data, fullname, relationship, phone, address, job });
        this.setState({
            disableEdit: true,
        })
    }


    render() {
        const { title, isCreate } = this.props;
        const { profile, disableEdit } = this.state;
        return (
            <View style={[{
                width: Configs.FULL_WIDTH, paddingTop: scaleSzie(17), paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(12)
            }, isCreate ? {} : styles.boderBottomStyle]} >
                <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800', }} >
                    {title}
                </Text>
                <AutoGrowingTextInput
                    ref={this.fullnameRef}
                    placeholder={'H??? v?? t??n'}
                    value={profile.fullname}
                    styleContainer={{}}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.phoneRef}
                    placeholder={'S??? ??i???n tho???i'}
                    value={profile.phone}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.relationshipRef}
                    placeholder={'Quan h???'}
                    value={profile.relationship}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.addressRef}
                    placeholder={'H??? kh???u'}
                    value={profile.address}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                <AutoGrowingTextInput
                    ref={this.jobRef}
                    placeholder={'Ngh??? nghi???p'}
                    value={profile.job}
                    styleContainer={{ marginTop: scaleSzie(16) }}
                    styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                    disable={disableEdit}
                />
                {isCreate ? <View />
                    :
                    <View style={{ position: 'absolute', right: scaleSzie(24), top: scaleSzie(12) }} >
                        {
                            disableEdit ? <ButtonSubmit
                                width={80}
                                height={30}
                                title="S???a"
                                onPress={this.editProfile}
                            /> : <View style={{ flexDirection: 'row' }} >
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="Hu???"
                                        onPress={this.cancelEditProfile}
                                        backgroundButton="transparent"
                                        titleColor="#A2A2A2"
                                    />
                                    <ButtonSubmit
                                        width={80}
                                        height={30}
                                        title="L??u"
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
    supportProfileInfo: state.client.supportProfileInfo
});

export default connectRedux(mapStateToProps, TabReference);