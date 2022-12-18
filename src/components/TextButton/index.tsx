import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FONTS} from '../../constants';
interface Props {
  onPress: () => void;
  label: string;
  labelStyle: TextStyle;
  containerStyle: ViewStyle;
}
const TextButton: React.FC<Props> = ({
  onPress,
  label,
  labelStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{...FONTS.h3, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
