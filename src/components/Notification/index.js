import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height} from 'react-native-dimension';
import {useNetInfo} from '@react-native-community/netinfo';

const OfflineNotice = () => {
  const netinfo = useNetInfo();
  // console.log('net', netinfo);
  if (netinfo.type !== 'unknown' && netinfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No internet connection</Text>
      </View>
    );
  return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    height: height(3),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
