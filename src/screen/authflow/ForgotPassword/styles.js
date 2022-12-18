import {StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../constants';
const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 130,
  },
  logoStyles: {
    width: 160,
    height: 160,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 150 / 2,
    alignSelf: 'center',
  },
  title: {
    ...FONTS.h2,
    color: COLORS.primary3,
    alignSelf: 'center',
    marginVertical: SIZES.padding * 2,
  },
  textInput1: {
    borderRadius: SIZES.padding * 1.5,
    height: SIZES.padding * 2,
  },
  buttonText: {
    height: SIZES.padding * 2,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding,
  },
});

export default styles;
