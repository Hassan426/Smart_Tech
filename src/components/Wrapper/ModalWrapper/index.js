import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import HeaderButton from '../../Header/HeaderButton';
import Colors from '../../../constants/Colors';

const ModalWrapper = ({children, onPress}) => {
  return (
    <View style={styles.main}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginHorizontal: width(3),
        }}>
        {children}
      </View>
      <View
        style={{
          position: 'absolute',
          right: width(0),
          padding: totalSize(1),
        }}>
        <Icon
          type="material-community"
          name="close-circle"
          color={'white'}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'red',
    paddingVertical: height(20),
    borderRadius: totalSize(3),
    borderWidth: width(3),
    borderColor: Colors.carrot_Orange,
    backgroundColor: Colors.gray,
    height: height(50),
  },
});
