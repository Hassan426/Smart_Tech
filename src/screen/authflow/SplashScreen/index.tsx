import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {SIZES, COLORS, images, FONTS} from '../../../constants';
import {TextButton} from '../../../components';

const SplashScreen = ({navigation}: {navigation: any}) => {
  return (
    <ImageBackground
      style={styles.main}
      imageStyle={styles.imageStyle}
      source={images.background1}>
      <View style={styles.buttonContainer}>
        <TextButton
          label="SingIn"
          containerStyle={styles.singInContainer}
          onPress={() => navigation.navigate('SignIn')}
          labelStyle={{...FONTS.h2, color: COLORS.white}}
        />
        <TextButton
          label="SignUp"
          containerStyle={styles.signUpContainer}
          onPress={() => navigation.navigate('SignUp')}
          labelStyle={{...FONTS.h2, color: COLORS.primary3}}
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: SIZES.width,
    height: SIZES.height,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
  },
  singInContainer: {
    height: SIZES.padding * 2,
    borderRadius: SIZES.radius * 3,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary3,
  },
  signUpContainer: {
    height: SIZES.padding * 2,
    borderRadius: SIZES.radius * 3,
    backgroundColor: COLORS.white,
  },
});
