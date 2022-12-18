import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/Colors';
import {Image} from 'react-native-elements';
import {height, width, totalSize} from 'react-native-dimension';
import {Swipeable} from 'react-native-gesture-handler';

const NewProductCard = ({renderRightActions, onPress, image, title, price}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.product} onPress={onPress}>
        <View style={styles.imageContainer}>
          <View style={{position: 'absolute', left: width(0)}}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/891/891448.png',
              }}
              placeholderStyle={{backgroundColor: Colors.white}}
              PlaceholderContent={
                <ActivityIndicator color={Colors.black} size={15} />
              }
            />
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.image}
              source={image}
              placeholderStyle={{backgroundColor: Colors.white}}
              PlaceholderContent={
                <ActivityIndicator color={Colors.black} size={30} />
              }
            />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>Price ${price}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: width(6),
    backgroundColor: 'white',
    height: height(25),
    marginBottom: height(2.8),
    //marginRight: height(2.8),
    width: width(75),
    // marginTop:height(3)
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderRadius: width(6),
    height: height(14),
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginHorizontal: width(2),
  },
  image: {
    width: 120,
    height: 120,
    // width: '100%',
    // height: '100%',
    // overflow: 'hidden',
    // resizeMode: 'contain',
    // alignSelf: 'center',
  },
  details: {
    marginTop: height(0.7),
    marginHorizontal: width(2),
  },
  title: {
    fontSize: totalSize(1.7),
    color: Colors.black,
    fontFamily: 'OpenSans_Medium',
  },
  price: {
    fontSize: totalSize(2.5),
    color: Colors.darkGreen,
    fontFamily: 'OpenSans_Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height(3),
  },
  button: {
    backgroundColor: Colors.carrot_Orange,
    height: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width(3),
    elevation: 3,
    borderRadius: width(2),
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: height(1),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default NewProductCard;
