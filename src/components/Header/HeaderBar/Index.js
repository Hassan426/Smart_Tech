import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {width} from 'react-native-dimension';
import {color} from 'react-native-reanimated';
import Colors from '../../../constants/Colors';

const HeaderBar = ({
  leftIcon,
  rightIcon,
  headerTitle,
  rightIconColor,
  leftIconColor,
  rightIconSize,
  leftIconSize,
  onleftIconPress,
  onRightIconPress,
  headerBackgroundColor,
  titleColor,
}) => {
  return (
    <View style={{...styles.main, ...{backgroundColor: headerBackgroundColor}}}>
      <TouchableOpacity style={styles.leftIcon} onPress={onleftIconPress}>
        <Icon
          type="material-community"
          name={leftIcon}
          color={leftIconColor}
          size={leftIconSize}
        />
      </TouchableOpacity>
      <Text style={{...styles.headerTitle, ...{color: titleColor}}}>
        {headerTitle}
      </Text>
      <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
        <Icon
          type="material-community"
          name={rightIcon}
          color={rightIconColor}
          size={rightIconSize}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  main: {
    height: height(8),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    width: '100%',
  },
  headerTitle: {
    fontSize: totalSize(2.5),
    fontFamily: 'OpenSans_Bold',
    alignSelf: 'center',
    color: Colors.white,
  },
  chevron: {
    position: 'absolute',
    right: width(5),
  },
  leftIcon: {
    position: 'absolute',
    left: width(0),
    paddingHorizontal: width(5),
    paddingVertical: height(1.5),
  },
  rightIcon: {
    position: 'absolute',
    right: width(0),
    paddingHorizontal: width(5),
    paddingVertical: height(1.5),
  },
});
