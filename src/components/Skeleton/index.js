import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {width, height} from 'react-native-dimension';
import {Spacer2} from '../Spacer';

const Skeleton = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#e6e6e6"
      highlightColor="white"
      speed={600}
      direction="right">
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <View style={{width: width(80), height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
          />
        </View>
      </View>
      <View style={{width: '100%', height: height(20), marginTop: 15}} />
    </SkeletonPlaceholder>
  );
};

export default Skeleton;

const styles = StyleSheet.create({});
