import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import AppText from '../../components/Text';
import * as Yup from 'yup';
import TextButton from '../../components/Button/TextButton';
import {COLORS, icons, SIZES} from '../../constants';
import TextInput from '../../components/TextInput';
import IconButton from '../../components/Button/IconButton';
const ShippingAddressScreen = ({navigation, route}) => {
  const {item, counter, totalPrice} = route.params;
  console.log('aaaaaaaaaaaaaa', counter);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(40)
      .required(),
    mobileNumber: Yup.string().min(11).max(11).required().label('mobileNumber'),
    city: Yup.string().min(5).max(20).required().label('city'),
    address: Yup.string().min(10).max(100).required().label('address'),
    province: Yup.string().min(5).max(20).required().label('provice'),
  });
  const navigate = values => {
    navigation.navigate('payment', {
      values: values,
      item: item,
      counter: counter,
      totalPrice: totalPrice,
    });
  };
  const renderBackArrowButton = () => {
    return (
      <View>
        <IconButton
          icon={icons.back}
          containerStyle={styles.backArrow}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: '',
          mobileNumber: '',
          city: '',
          address: '',
          province: '',
        }}
        onSubmit={values => navigate(values)}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleBlur,
          values,
          handleSubmit,
          errors,
          touched,
        }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              paddingBottom: SIZES.padding * 8,
            }}>
            <View
              style={{
                marginHorizontal: SIZES.radius,
              }}>
              {renderBackArrowButton()}
              <TextInput
                placeholder="Full Name"
                autoCapitalize={'none'}
                placeholderTextColor={COLORS.gray30}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                icon={icons.cross}
                containerStyle={styles.textInput}
              />
              <AppText error={errors.name} visible={touched.name} />
              <TextInput
                placeholder={'Mobile Number'}
                icon={icons.mobile}
                placeholderTextColor={COLORS.gray30}
                keyboardType="number-pad"
                autoCapitalize={'none'}
                onChangeText={handleChange('mobileNumber')}
                onBlur={() => setFieldTouched('mobileNumber')}
                containerStyle={styles.textInput}
              />
              <AppText
                error={errors.mobileNumber}
                visible={touched.mobileNumber}
              />
              <TextInput
                placeholder="City"
                icon={icons.city}
                placeholderTextColor={COLORS.gray30}
                autoCapitalize="none"
                onChangeText={handleChange('city')}
                onBlur={() => setFieldTouched('city')}
                containerStyle={styles.textInput}
              />
              <AppText error={errors.city} visible={touched.city} />
              <TextInput
                placeholder={'Address'}
                icon={icons.loc}
                placeholderTextColor={COLORS.gray30}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
                containerStyle={styles.textInput}
              />
              <AppText error={errors.address} visible={touched.address} />
              <TextInput
                placeholder={'Provice'}
                icon={icons.loc}
                placeholderTextColor={COLORS.gray30}
                autoCapitalize={'none'}
                onChangeText={handleChange('province')}
                onBlur={() => setFieldTouched('province')}
                containerStyle={styles.textInput}
              />
              <AppText error={errors.province} visible={touched.province} />
              <TextButton
                label={'Continue'}
                containerStyle={styles.buttonStyles}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    marginTop: SIZES.padding,
    elevation: 2,
  },
  backArrow: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: SIZES.radius,
    marginLeft: SIZES.radius,
  },
  buttonStyles: {
    marginTop: SIZES.padding * 3,
    height: SIZES.padding * 2,
    borderRadius: SIZES.padding,
  },
});
