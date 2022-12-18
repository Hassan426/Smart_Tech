import {StyleSheet} from 'react-native';
import {height} from 'react-native-dimension';
import {COLORS, SIZES, FONTS} from '../../../constants';

const styles = StyleSheet.create({
  forgotPassword: {
    ...FONTS.h3,
    alignSelf: 'center',
    color: COLORS.secondary,
    marginVertical: SIZES.radius,
  },
  text: {
    ...FONTS.h4,
    alignSelf: 'center',
    marginVertical: SIZES.radius,
    marginBottom: SIZES.padding * 2,
    color: COLORS.primary3,
  },

  logo: {
    width: 130,
    height: 130,
  },
  welcome: {
    ...FONTS.largeTitle,
    color: COLORS.primary3,
    alignSelf: 'center',
    marginVertical: SIZES.radius,
    marginBottom: height(15),
  },
  renderCotainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding,
  },
  buttonText: {
    height: SIZES.padding * 2,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding * 2,
  },
  textInput1: {
    borderRadius: SIZES.padding * 1.5,
    height: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
  textInput: {
    borderRadius: SIZES.padding * 1.5,
    height: SIZES.padding * 2,
  },
});
export default styles;
