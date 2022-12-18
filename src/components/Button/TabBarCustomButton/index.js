import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
// import Colors from '../../../constants/Colors';
import {Svg, Path} from 'react-native-svg';
import {COLORS, SIZES} from '../../../constants';
const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: width(28.8),
            height: height(12.5),
            borderRadius: SIZES.radius * 1.3,
            backgroundColor: COLORS.primary,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          width: width(28.8),
          height: height(12.5),
          borderRadius: SIZES.radius * 1.3,
          backgroundColor: COLORS.primary3,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};
export default TabBarCustomButton;
