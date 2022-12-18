import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {width} from 'react-native-dimension';

const HeaderButton = ({onPress, iconName, color}) => {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Icon type="material-community" name={iconName} size={30} color={color} />
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({});
