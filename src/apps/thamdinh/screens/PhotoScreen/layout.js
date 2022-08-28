import React from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { Text, Button, ModalCustom ,Loading} from '@core/components';
import styles from './styles';
import { scaleSzie, getRowData, SECTIONS } from '@utils/func';
import IMAGE from '@core/resources/icon';
import ItemPhoto from './widget/ItemPhoto';
import Configs from '@core/configs';
import commonStyles from '@core/commonStyles';

export default class Layout extends React.Component {

    renderEditImage() {
        const { isSelectAll, photos } = this.state;
        const temptPhotoSelected = (this.getArrayPhotoSelected(photos)).length;
        const temptSelectAll = isSelectAll ? IMAGE.selectAllPhoto : temptPhotoSelected === photos.length ? IMAGE.selectAllPhoto : IMAGE.notSelectAllPhoto;
        return (
            <View style={{
                flex: 1, paddingBottom: scaleSzie(10),
                paddingLeft: scaleSzie(12), alignItems: 'flex-end', flexDirection: 'row'
            }} >
                <Button onPress={this.selectAllPhotos} >
                    <Image
                        source={temptSelectAll}
                    />
                    <Text style={{ fontSize: scaleSzie(14), color: "#424242" }} >
                        All
                    </Text>
                </Button>
                <Text bold style={{ marginLeft: scaleSzie(8), marginRight: scaleSzie(20), fontSize: scaleSzie(14), color: "#424242" }} >
                    {temptPhotoSelected}
                </Text>
                <Button onPress={this.deletePhoto} >
                    <Image source={IMAGE.trash} />
                </Button>

            </View>
        );
    }

    renderButtonBack() {
        const { photos } = this.state;
        return (
            <View style={{
                flex: 1,
                 alignItems: 'flex-end', 
                paddingBottom: scaleSzie(10),
                paddingLeft: scaleSzie(12),flexDirection:'row'
            }} >
                
                <Button onPress={this.goback} style={{width:scaleSzie(30)}}  >
                    <Image source={IMAGE.back} />
                </Button>
                <View style={{flex:1,}} >
                    <Text style={{ color: '#5F5EA3', fontSize: scaleSzie(18)}} >
                        {`${(this.getArrayPhotoSelected(photos)).length}/3`}
                    </Text>
                </View>
            </View>
        );
    }

    renderHeader() {
        const { photos } = this.state;
        return (
            <View style={styles.headerContainer} >
                {/* {(this.getArrayPhotoSelected(photos)).length === 0 ? this.renderButtonBack() : this.renderEditImage()} */}
                { this.renderButtonBack()}
                <View style={{
                    flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
                    paddingRight: scaleSzie(10), paddingBottom: scaleSzie(5)
                }} >
                    <Button onPress={this.showDropDownUpload} >
                        <Text bold style={{ color: '#5F5EA3', fontSize: scaleSzie(16) }} >
                            Tải ảnh lên
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }

    renderMainPhoto() {
        const { displayImage, photos } = this.state;
        if (photos.length === 0) {
            return (
                <View style={styles.containerMainPhoto} >
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
                        <Text bold style={{ color: 'rgb(113,113,113)', fontSize: scaleSzie(18), fontWeight: 'bold' }} >
                            Bạn không có ảnh nào để upload !
                    </Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.containerMainPhoto} >
                <View style={{ flex: 1 }} >
                    <Image
                        source={{ uri: photos[displayImage].uri }}
                        style={{ flex: 1 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        );
    }

    renderListPhotos() {
        return (
            <View style={{ flex: 1 }} >
                <FlatList
                    data={getRowData(this.state.photos)}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={{
                                width: Configs.FULL_WIDTH, flexDirection: 'row', paddingHorizontal: scaleSzie(12), paddingBottom: scaleSzie(20),
                                justifyContent: 'space-between'
                            }} >
                                {
                                    item.map((photo, i) => {
                                        const temptURI = photo && photo.uri ? photo.uri : '';
                                        const temptIsSelected = photo && photo.isSelected ? photo.isSelected : false;
                                        return <ItemPhoto
                                            key={i}
                                            url={temptURI}
                                            isSelected={temptIsSelected}
                                            addPhoto={this.addPhoto}
                                            displayPhoto={this.displayPhoto}
                                            selectPhoto={this.selectPhoto}
                                        />
                                    })
                                }

                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ height: scaleSzie(100) }} />}
                />
            </View>
        );
    }

    renderHeaderItemUpload = (section, i, isActive) => {
        return (
            <View key={i} style={{
                height: scaleSzie(46), backgroundColor: '#fff', flexDirection: 'row',
                borderBottomColor: '#DEDEDE', borderBottomWidth: 1
            }}  >
                <View style={{ flex: 1, paddingLeft: scaleSzie(22), justifyContent: 'center' }} >
                    <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(16), fontWeight: '800' }} >
                        {section.title}
                    </Text>
                </View>
                <View style={{ paddingRight: scaleSzie(14.5), justifyContent: 'center' }} >
                    {
                        isActive ? <View /> : <Image source={IMAGE.arrow_right} />
                    }
                </View>
            </View>
        );
    }

    renderItemChildren(child, index, keyParent) {
        if (child.children.length === 0) {
            return (
                <View key={index} style={{
                    height: scaleSzie(46), backgroundColor: '#fff', flexDirection: 'row',
                    borderBottomColor: '#DEDEDE', borderBottomWidth: 1
                }}  >
                    <Button
                        onPress={() => this.uploadPhoto(child.key)}
                        style={{ flex: 1, paddingLeft: scaleSzie(22), justifyContent: 'center' }} >
                        <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(14), }} >
                            {child.content}
                        </Text>
                    </Button>

                </View>
            );
        }
        return (
            <Accordion
                key={index}
                activeSections={this.checkTypeChildren(child)}
                sections={child.children}
                renderHeader={this.renderHeaderItemGrandChildren}
                renderContent={this.renderContentItemGrandChildren}
                onChange={activeSection => this.updateSectionsGrandChildrend(activeSection, child)}
                duration={400}
                touchableComponent={TouchableOpacity}
                touchableProps={{
                    activeOpacity: 0.8
                }}
            />
        );

    }

    renderHeaderItemGrandChildren = (section, i, isActive) => {
        return (
            <View key={i} style={{
                height: scaleSzie(46), backgroundColor: '#fff', flexDirection: 'row',
                borderBottomColor: '#DEDEDE', borderBottomWidth: 1
            }}  >
                <View style={{ flex: 1, paddingLeft: scaleSzie(22), justifyContent: 'center' }} >
                    <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(14), }} >
                        {section.title}
                    </Text>
                </View>
                <View style={{ paddingRight: scaleSzie(14.5), justifyContent: 'center' }} >
                    {
                        isActive ? <View /> : <Image source={IMAGE.arrow_right} />
                    }
                </View>
            </View>
        );
    }

    renderContentItemGrandChildren = (section, i, isActive) => {
        return (
            <View key={i} >
                {
                    section.children.map((content, index) => <View key={index} style={{
                        height: scaleSzie(46), backgroundColor: '#fff', flexDirection: 'row',
                        borderBottomColor: '#DEDEDE', borderBottomWidth: 1
                    }}  >
                        <Button onPress={() => this.uploadPhoto(content.key)} style={{ flex: 1, paddingLeft: scaleSzie(50), justifyContent: 'center' }} >
                            <Text style={{ color: '#6D6D6D', fontSize: scaleSzie(14), }} >
                                {content.title}
                            </Text>
                        </Button>
                    </View>)
                }
            </View>
        );

    }

    renderContentItemUpload = (section, i, isActive) => {
        return (
            <View key={i} >
                {
                    section.children.map((child, index) => this.renderItemChildren(child, index, section.key))
                }
            </View>
        );
    }

    renderDropdownUpload() {
        const { activeSection, visibleDropdownUpload } = this.state;
        return (
            <ModalCustom
                transparent={true}
                visible={visibleDropdownUpload}
                onRequestClose={() => this.setState({ visibleDropdownUpload: false })}
            >
                <View style={[styles.dropdownUpload, commonStyles.shadowApp]} >
                    <Accordion
                        activeSections={activeSection}
                        sections={SECTIONS}
                        renderHeader={this.renderHeaderItemUpload}
                        renderContent={this.renderContentItemUpload}
                        onChange={this.updateSections}
                        duration={400}
                        touchableComponent={TouchableOpacity}
                        touchableProps={{
                            activeOpacity: 0.8
                        }}
                    />
                </View>
            </ModalCustom>

        );
    }

    render() {
        const { visibleDropdownUpload } = this.state;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderMainPhoto()}
                {this.renderListPhotos()}
                {this.renderDropdownUpload()}

                <Loading visible={this.props.loading} />
            </View>
        );
    }
}