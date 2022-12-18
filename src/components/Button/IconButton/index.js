import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants';
const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity style={{...containerStyle}} onPress={onPress}>
      <Image
        resizeMode="contain"
        source={icon}
        style={{...styles.image, ...iconStyle}}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    tintColor: COLORS.black,
  },
});
