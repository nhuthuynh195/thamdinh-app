import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

class AddIcon extends PureComponent {
  render() {
    const { width, height, renderIconDone } = this.props;

    return (
      <View style={styles.container}>
        {renderIconDone === false ? (
          <View>
            <View style={[styles.horizontal, { width }]} />
            <View style={{ height: 4 }} />
            <View style={[styles.horizontal, { width }]} />
            <View style={{ height: 4 }} />
            <View style={[styles.horizontal, { width }]} />
          </View>
        ) : (
          [<View key={1} style={[styles.verticalActive,{width}]} />, <View key={2} style={[styles.horizontalActive,{height:width}]} />]
        )}
      </View>
    );
  }
}

AddIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  vertical: {
    height: 2,
    backgroundColor: 'red'
  },
  horizontal: {
    height: 2,
    backgroundColor: '#fff'
  },
  verticalActive: {
    height: 2,
    position: 'absolute',
    backgroundColor: '#FFF',
    transform: [{ rotate: '-45deg' }]
  },
  horizontalActive: {
    width: 2,
    position: 'absolute',
    backgroundColor: '#fff',
    transform: [{ rotate: '-45deg' }]
  }
});

export default AddIcon;
