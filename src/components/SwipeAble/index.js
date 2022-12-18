import {
  StyleSheet,
  Text,
  TouchableHighlightBase,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {height, width} from 'react-native-dimension';

const SwipeAble = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.main}>
        <Icon
          type="material-community"
          name="trash-can-outline"
          size={60}
          color={'white'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SwipeAble;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'red',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    height: height(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(3),
  },
});
