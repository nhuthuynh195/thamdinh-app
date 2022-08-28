import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import { PlaceHolderList } from '@core/components';
import connectRedux from '../../../redux/connectRedux';
import { ItemUserInfo } from '../../../components'
import { scaleSzie } from '@core/utils/func';

class PropertyEvaluateSearch extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { yourLocation } = this.props;
        this.props.actions.app.getListPropertyEvaluate(yourLocation.latitude, yourLocation.longitude);
    }

    render() {
        const { navigation, isLoadingGetListPropertyEvaluateSearch, listPropertyEvaluateSearch } = this.props;
        if (isLoadingGetListPropertyEvaluateSearch) {
            return <PlaceHolderList />
        }
        return (
            <FlatList
                data={listPropertyEvaluateSearch}
                renderItem={({ item, index }) => <ItemUserInfo
                    key={index} user={item}
                    navigation={navigation}
                    showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                    typeUser="Property"
                    fromSearToMap={true}
                />}
                keyExtractor={(item, index) => `${index}`}
                getItemLayout={(data, index) => ({ length: scaleSzie(155), offset: scaleSzie(155) * index, index })}
                initialNumToRender={5}
                ListFooterComponent={() => <View style={{ height: scaleSzie(40) }} />}
                ListHeaderComponent={() => <View style={{ height: scaleSzie(2) }} />}
                showsVerticalScrollIndicator={false}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoadingGetListPropertyEvaluateSearch: state.app.isLoadingGetListPropertyEvaluateSearch,
        yourLocation: state.map.yourLocation,
        listPropertyEvaluateSearch: state.app.listPropertyEvaluateSearch
    };
};

export default connectRedux(mapStateToProps, PropertyEvaluateSearch);