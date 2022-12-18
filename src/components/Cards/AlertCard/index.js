import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, totalSize, width} from 'react-native-dimension';
import {Spacer1, Spacer2, Spacer3, Spacer4, Spacer5} from '../../Spacer';
import Colors from '../../../constants/Colors';
import {Button} from 'react-native-elements';
import {Image} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import {Swipeable} from 'react-native-gesture-handler';

const AlertCard = ({
  title,
  price,
  image,
  onPress,
  renderRightActions,
  status,
  orderDeliver,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={{
          height: height(30),
          backgroundColor: Colors.carrot_Orange,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: totalSize(3),
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: totalSize(1.7),
            marginTop: 5,
            fontFamily: 'OpenSans-SemiBold',
          }}>
          Your Order has been Placed succesfully
        </Text>
        <TouchableOpacity style={styles.main} onPress={onPress}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={image}
              placeholderStyle={{backgroundColor: Colors.white}}
              PlaceholderContent={
                <ActivityIndicator color={Colors.black} size={15} />
              }
            />
          </View>
          <Spacer1 />
          <View style={styles.innerContainer}>
            <Text numberOfLines={3} style={styles.title}>
              {title}
            </Text>
            <Spacer1 />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.price}>${price}</Text>
              <TouchableOpacity style={styles.cart} onPress={orderDeliver}>
                <Text style={styles.price1}>{status}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default AlertCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.carrot_Orange,
    height: height(20),
    marginHorizontal: totalSize(2),
    marginTop: totalSize(2),
    borderRadius: totalSize(2) / 1,
    flexDirection: 'row',
    paddingHorizontal: totalSize(2),
    width: width(86),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: totalSize(2.5),
  },
  imageContainer: {
    height: height(15),
    width: width(30),
    marginTop: height(2.5),
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: totalSize(1.7),
    color: Colors.white,
    fontFamily: 'OpenSans-SemiBoldItalic',
  },
  price: {
    fontSize: totalSize(2.7),
    color: Colors.white,
    fontFamily: 'OpenSans_ExtraBold',
  },
  innerContainer: {
    marginVertical: totalSize(2),
    width: width(50),
    marginLeft: totalSize(2),
    justifyContent: 'space-between',
  },
  rightButtonContainer: {
    backgroundColor: 'red',
    marginVertical: totalSize(2),
    height: height(20),
    justifyContent: 'center',
  },
  price1: {
    fontSize: totalSize(1.7),
    color: Colors.white,
    fontFamily: 'OpenSans_Bold',
  },
  cart: {
    width: width(25),
    backgroundColor: Colors.darkGreen,
    height: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(6),
  },
});
