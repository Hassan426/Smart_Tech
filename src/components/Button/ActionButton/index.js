import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {width} from 'react-native-dimension';
import Colors from '../../../constants/Colors';

const ActionButton = ({leftIcon, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.leftIcon}>
        <Icon
          raised
          type="material-community"
          name={leftIcon}
          color={Colors.black}
          size={18}
        />
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightIcon}>
        <Icon
          raised
          type="font-awesome"
          name={'chevron-right'}
          color={Colors.black}
          size={totalSize(1)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  main: {
    height: height(8),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    elevation: 1,
    borderRadius: height(8) / 2,
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: totalSize(1.7),
    color: Colors.black,
    alignSelf: 'center',
    marginLeft: width(18),
    fontFamily: 'OpenSans_Bold',
    textTransform: 'uppercase',
  },
  chevron: {
    position: 'absolute',
    right: width(5),
  },
  leftIcon: {
    position: 'absolute',
    left: width(1),
  },
  rightIcon: {
    position: 'absolute',
    right: width(5),
  },
});
