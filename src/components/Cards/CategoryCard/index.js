import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {height, totalSize, width} from 'react-native-dimension';
import Colors from '../../../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';

const CategoryCard = ({title, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyles}
          source={image}
          placeholderStyle={{backgroundColor: Colors.carrot_Orange}}
          PlaceholderContent={
            <ActivityIndicator color={Colors.white} size={20} />
          }
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: height(21.7),
  },
  imageContainer: {
    // width: '30%',
    width: 100,
    height: 100,
    borderRadius: 100,
    zIndex: 1,
    left: width(5),
    top: height(5),
    elevation: 5,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 10,
    //   height: 20,
    // },
    // shadowRadius: 5,
  },
  imageStyles: {
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  titleContainer: {
    width: '70%',
    backgroundColor: Colors.carrot_Orange,
    height: 100,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: height(2),
    right: width(5),
    elevation: 4,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 10,
    //   height: 20,
    // },
    // shadowRadius: 5,
  },
  title: {
    fontSize: totalSize(4),
    fontFamily: 'OpenSans_Bold',
    color: Colors.white,
  },
});
