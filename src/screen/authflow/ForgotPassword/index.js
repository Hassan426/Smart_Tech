// import {
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   ImageBackground,
//   KeyboardAvoidingView,
//   Image,
// } from 'react-native';
// import React, {useState} from 'react';
// import {firebase} from '@react-native-firebase/auth';
// import AppText from '../../../components/Text';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {images, SIZES, icons, COLORS, FONTS} from '../../../constants';
// import IconButton from '../../../components/Button/IconButton';
// import TextButton from '../../../components/Button/TextButton';
// import TextInputs from '../../../components/TextInput';
// import styles from './styles';

// const ForgotPasswordScreen = ({navigation}) => {
//   const [isLoading, setIsloading] = useState(false);
//   const forgotPassword = values => {
//     setIsloading(true);
//     console.log('valuesssssssssss', values.email);
//     firebase
//       .auth()
//       .sendPasswordResetEmail(values.email)
//       .then(() => {
//         alert('Please check your email...');
//         setIsloading(false);
//       })
//       .catch(e => {
//         console.log('sssssssssss', e);
//         setIsloading(false);
//       });
//   };
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required().email().label('Email'),
//   });
//   const renderHeader = () => {
//     return (
//       <View style={{padding: SIZES.padding}}>
//         <IconButton
//           icon={icons.back}
//           iconStyle={{tintColor: COLORS.primary3}}
//           onPress={() => navigation.navigate('SignIn')}
//         />
//         <View style={styles.logoStyles}>
//           <Image
//             resizeMode="contain"
//             style={styles.logo}
//             source={icons.password}
//           />
//         </View>
//         <Text style={styles.title}>Enter Email to reset password</Text>
//       </View>
//     );
//   };
//   const renderTextInputSection = () => {
//     return (
//       <View style={styles.renderCotainer}>
//         <Formik
//           enableReinitialize={true}
//           initialValues={{name: '', email: '', password: ''}}
//           onSubmit={values => forgotPassword(values)}
//           validationSchema={validationSchema}>
//           {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
//             <KeyboardAvoidingView>
//               <View style={{paddingHorizontal: SIZES.padding}}>
//                 <TextInputs
//                   icon={icons.email}
//                   placeholder="Enter your email"
//                   autoCapitalize={'none'}
//                   containerStyle={styles.textInput1}
//                   onChangeText={handleChange('email')}
//                   onBulr={() => setFieldTouched('email')}
//                 />
//                 <AppText error={errors.email} visible={touched.email} />
//                 <TextButton
//                   isLoading={isLoading}
//                   label={'SignIn'}
//                   labelStyle={{...FONTS.h1}}
//                   containerStyle={styles.buttonText}
//                   onPress={handleSubmit}
//                 />
//               </View>
//             </KeyboardAvoidingView>
//           )}
//         </Formik>
//       </View>
//     );
//   };
//   return (
//     <SafeAreaView style={styles.mains}>
//       <ScrollView>
//         <ImageBackground
//           blurRadius={3}
//           style={{width: SIZES.width, height: SIZES.height}}
//           imageStyle={styles.image}
//           source={images.background2}>
//           {renderHeader()}
//           {renderTextInputSection()}
//         </ImageBackground>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ForgotPasswordScreen;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ForgotPassword = () => {
  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
