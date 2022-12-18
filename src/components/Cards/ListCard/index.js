import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {totalSize} from 'react-native-dimension';
const ListCard = ({renderRightActions, item, style, title}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={{...styles.main, ...style}}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.item.image}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text style={styles.title}>$ {item.item.price}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  main: {
    height: totalSize(22),
    alignItems: 'center',
    backgroundColor: COLORS.primary3,
    paddingHorizontal: SIZES.radius,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
  },
  imageContainer: {
    width: totalSize(15),
    height: totalSize(15),
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: SIZES.radius,
  },
  innerContainer: {
    flex: 1,
    marginLeft: SIZES.radius,
    height: totalSize(15),
    justifyContent: 'space-between',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.white,
    // marginVertical: 2,
  },
  button: {
    width: 130,
    height: 35,
    backgroundColor: COLORS.primary2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
