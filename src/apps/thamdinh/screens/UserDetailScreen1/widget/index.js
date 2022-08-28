import React from 'react';
import { View, Image } from 'react-native';

import { scaleSzie } from '@core/utils/func';
import { Text, Button } from '@core/components';
import IMAGE from '@core/resources/icon';
import commonStyles from '@core/commonStyles';
import Configs from '@core/configs';

export const DropownItemReview = (props) => {
    const temtptDrop = props.visible ? IMAGE.dropDown : IMAGE.dropUp;
    return <Button onPress={() => props.onPressDropdown()} style={{ width: Configs.FULL_WIDTH, height: scaleSzie(55), paddingHorizontal: scaleSzie(12), }} >
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }} >
            <View style={{ flex: 1, justifyContent: 'center' }} >
                <Text bold style={{ color: '#424242' }} >
                    {props.title}
                </Text>
            </View>
            <View style={{ justifyContent: 'center' }} >
                <Image source={temtptDrop} />
            </View>
        </View>
    </Button>
}

export const TitleTableReview = (props) => {
    return <View style={{ width: Configs.FULL_WIDTH, height: scaleSzie(48), paddingHorizontal: scaleSzie(12) }} >
        <View style={{ flex: 1, flexDirection: 'row' }} >
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: scaleSzie(5) }} >
                <Text bold style={{ color: '#6D6D6D' }} >
                    {props.title}
                </Text>
            </View>
            <Button onPress={() => props.editInfoReview()} style={{ justifyContent: 'flex-end' }} >
                <Image source={IMAGE.edit} style={{ marginBottom: scaleSzie(7) }} />
            </Button>
        </View>
    </View>
}

export const RowTableReview = props => {
    const temptBorder = props.isNotBorder ? null : { borderTopWidth: scaleSzie(1), borderTopColor: '#F7F7F9', };
    const { title, value } = props
    return <View style={[{ flex: 1, backgroundColor: '#fff' }, temptBorder]} >
        <View style={{ height: scaleSzie(44), flexDirection: 'row' }} >
            <View style={{ justifyContent: 'center', marginLeft: scaleSzie(12) }} >
                <Text bold style={{ color: '#A2A2A2', fontSize: scaleSzie(14), }} >
                    {title}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                <Text style={{ color: '#424242', fontSize: scaleSzie(16), marginRight: scaleSzie(12), }} >
                    {value}
                </Text>
            </View>
        </View>
    </View>
}

export const RowExplainReview = props => {
    const temptBorder = { borderTopWidth: scaleSzie(1), borderTopColor: '#F7F7F9', };
    const { explain } = props
    return <View style={[{ flex: 1, borderRadius: scaleSzie(4), backgroundColor: '#fff', paddingBottom: scaleSzie(33) }, commonStyles.shadowApp, temptBorder]} >
        <View style={{ height: scaleSzie(44), flexDirection: 'row' }} >
            <View style={{ justifyContent: 'center', marginLeft: scaleSzie(12) }} >
                <Text bold style={{ color: '#A2A2A2', fontSize: scaleSzie(14), }} >
                    {'Diễn giải'}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                <Text style={{ color: '#424242', fontSize: scaleSzie(16), marginRight: scaleSzie(12), }} >
                    {`${explain}`}
                </Text>
            </View>
        </View>
    </View>
}

export const TableReview = (props) => {
    return <View style={{ width: Configs.FULL_WIDTH, paddingHorizontal: scaleSzie(12) }} >
        {props.children}
    </View>
}