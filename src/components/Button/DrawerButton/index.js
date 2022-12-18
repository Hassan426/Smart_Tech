import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import {height, totalSize, width} from 'react-native-dimension';

const DrawerComponents = ({firstIcon, secondIcon, children, onpress}) => {
  return (
    <TouchableOpacity onPress={onpress} style={styles.main}>
      <View style={styles.rightIconContainer}>
        <Icon
          type="material-community"
          name={firstIcon}
          size={20}
          color={Colors.black}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          //alignItems: 'center',
          left: 50,
        }}>
        <Text style={styles.title}>{children.toUpperCase()}</Text>
      </View>
      <View style={styles.leftIconContainer}>
        <Icon
          type="material-community"
          name={secondIcon}
          size={20}
          color={Colors.black}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DrawerComponents;

const styles = StyleSheet.create({
  title: {
    fontSize: totalSize(2),
    right: 20,
    fontFamily: 'OpenSans_Medium',
    color: 'black',
  },
  leftIconContainer: {
    flex: 0.15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightIconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  main: {
    flex: 0.15,
    flexDirection: 'row',
  },
});
