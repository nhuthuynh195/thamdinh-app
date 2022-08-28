import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class Layout extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Setting Screen</Text>
                <Button
                    title='Go to Profile'
                    onPress={this.gotoDetail}
                />

            </View>
        );
    }
}