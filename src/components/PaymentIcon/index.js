import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const index = ({image}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
        height: 40,
      }}>
      {/* <Text style={{color: Colors.black}}>PayPal</Text> */}
      <Image style={{width: '100%', height: '100%'}} source={image} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
