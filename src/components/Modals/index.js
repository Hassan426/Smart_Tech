import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {height, totalSize, width} from 'react-native-dimension';
import {Spacer2, Spacer5} from '../Spacer';
import images from '../../constants/images';
import AppButton from '../Button/AppButton';

const Modals = ({price, onPress}) => {
  return (
    <View style={styles.main}>
      <View style={{}}>
        <Icon
          reverse
          type="material-commuity"
          name="check"
          color={Colors.blue}
          size={30}
        />
      </View>
      <Text style={styles.text}>You sent money succesfully </Text>
      <Text style={styles.text}>To</Text>
      <Spacer5 />
      <View
        style={{
          height: totalSize(8),
          width: width(50),
          backgroundColor: '#f2f0f0',
          borderRadius: totalSize(8 / 2),
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{height: totalSize(8), width: totalSize(8)}}
          source={images.logo}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: width(5),
          }}>
          <Text style={styles.text}>SmartTech</Text>
          <Text style={styles.text}>${price}</Text>
        </View>
      </View>
      <Spacer5 />
      <View style={{width: '90%'}}>
        <AppButton
          style={{backgroundColor: Colors.blue}}
          title={'Done'}
          onPress={onPress}
          color={'white'}
        />
      </View>
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({
  text: {
    color: Colors.black,
    fontSize: totalSize(2),
    fontFamily: 'OpenSans-SemiBold',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  main: {
    height: height(57),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height(5),
    borderRadius: totalSize(4),
  },
});
