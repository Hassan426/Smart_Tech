import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../constants/Colors';
import {height, totalSize} from 'react-native-dimension';
import {color} from 'react-native-reanimated';

const AppButton = ({title, style, onPress, color}) => {
  // const [isLoading, setIsloading] = useState(false);
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* <ActivityIndicator style={{position: 'absolute'}} size/> */}
      <Text style={{...styles.title, ...{color: color}}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.green,
    height: height(7),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    // marginVertical: 10,
    // padding: 10,
  },
  title: {
    fontSize: totalSize(2.7),
    color: Colors.black,
    fontFamily: 'OpenSans_Bold',
  },
});
