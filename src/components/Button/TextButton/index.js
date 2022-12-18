import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../constants';
import {ActivityIndicator} from 'react-native';

const TextButton = ({
  containerStyle,
  labelStyle,
  label,
  onPress,
  isLoading,
}) => {
  // console.log('ssssssssssss', isLoading);
  return (
    <View>
      {isLoading ? (
        <>
          <View
            // style={{...styles.button, ...containerStyle}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary3,
              opacity: 0.8,
              ...containerStyle,
            }}>
            <ActivityIndicator color={COLORS.white} size={25} />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            // style={{...styles.button, ...containerStyle}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary3,
              ...containerStyle,
            }}
            onPress={onPress}>
            <Text style={{...styles.labelStyle, ...labelStyle}}>{label}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary3,
  },
  labelStyle: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});
