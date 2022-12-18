import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';
import IconButton from '../Button/IconButton';
import {Icon} from 'react-native-elements';
const TextInputs = ({
  containerStyle,
  eye,
  placeholder,
  pressOnEyeIcon,
  onChangeText,
  secureTextEntry,
  keyboardType,
  onBulr,
  icon,
  placeholderTextColor,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gray10,
        ...containerStyle,
      }}>
      <IconButton
        icon={icon}
        iconStyle={{width: 20, height: 20, tintColor: COLORS.primary3}}
        containerStyle={{marginHorizontal: SIZES.radius}}
      />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{width: '70%'}}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onBulr={onBulr}
        placeholderTextColor={placeholderTextColor}
      />
      {eye && (
        <Icon
          type={'material-community'}
          name={eye}
          size={20}
          onPress={pressOnEyeIcon}
          color={COLORS.primary3}
        />
      )}
    </View>
  );
};

export default TextInputs;

const styles = StyleSheet.create({});
