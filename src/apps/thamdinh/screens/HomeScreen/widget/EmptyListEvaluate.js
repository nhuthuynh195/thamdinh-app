import React from 'react';
import {
    View,
    Dimensions, Image, Text
} from 'react-native';

import IMAGE from "@resources/icon";
import { scaleSzie } from '@core/utils/func';

const { width, height } = Dimensions.get("window");

const EmptyListEvaluate = ({title}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: scaleSzie(20)
            }}
        >
            <Image source={IMAGE.emptyListLoans} />
            <Text bold style={{ fontSize: scaleSzie(20), color: "#9d9d9d", marginTop: scaleSzie(10) }}>
                
                {title}
        </Text>
        </View>
    );
};

module.exports = {
    EmptyListEvaluate
}