import React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import { PlaceHolderList } from '@core/components';
import connectRedux from '../../../redux/connectRedux';
import { ItemUserInfo } from '../../../components'
import { scaleSzie } from '@core/utils/func';

class BusinessEvaluateSearch extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigation, isLoadingGetListBusinessEvaluateSearch, listBusinessEvaluateSearch } = this.props;
        if (isLoadingGetListBusinessEvaluateSearch) {
            return <PlaceHolderList />
        }
        return (
            <FlatList
                data={listBusinessEvaluateSearch}
                renderItem={({ item, index }) => <ItemUserInfo
                    key={index} user={item}
                    navigation={navigation}
                    showPopupPhone={(phone) => this.props.showPopupPhone(phone)}
                    typeUser="Business"
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
        yourLocation: state.map.yourLocation,
        isLoadingGetListBusinessEvaluateSearch: state.app.isLoadingGetListBusinessEvaluateSearch,
        listBusinessEvaluateSearch: state.app.listBusinessEvaluateSearch
    };
};

export default connectRedux(mapStateToProps, BusinessEvaluateSearch);