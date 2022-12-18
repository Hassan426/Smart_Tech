import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors';
import {Image} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {Swipeable} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES} from '../../../constants';
import TextButton from '../../Button/TextButton';
import {Shadow} from 'react-native-shadow-2';

const ProductCard = ({
  renderRightActions,
  onViewDetail,
  containerStyle,
  item,
}) => {
  // console.log('aaaaaaaaaaaaaaaaa', item);
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={{...styles.containerStyle, ...containerStyle}}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={item.image}
            resizeMode="contain"
            placeholderStyle={{backgroundColor: COLORS.white}}
            PlaceholderContent={
              <ActivityIndicator color={Colors.black} size={30} />
            }
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price ${item.price}</Text>
        <View style={{alignItems: 'center'}}>
          <TextButton
            label={'View Details'}
            containerStyle={styles.buttonContainer}
            labelStyle={{...FONTS.h3}}
            onPress={onViewDetail}
          />
        </View>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.white,
    elevation: 5,
    paddingHorizontal: SIZES.padding,
  },
  imageContainer: {
    width: '100%',
    height: height(20),
    borderRadius: width(6),
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...FONTS.body3,
    color: COLORS.primary3,
    marginTop: SIZES.base,
  },
  price: {
    ...FONTS.h2,
    color: COLORS.primary3,
  },
  buttonContainer: {
    paddingVertical: SIZES.base,
    width: width(70),
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary3,
    marginVertical: SIZES.padding,
    elevation: 3,
  },
});

export default ProductCard;
