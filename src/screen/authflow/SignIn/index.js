// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Alert,
// } from 'react-native';
// import React, {useState, useContext} from 'react';

// import auth from '@react-native-firebase/auth';
// import {AuthContext} from '../../../../App';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import AppText from '../../../components/Text';
// import {height, totalSize, width} from 'react-native-dimension';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
// import IconButton from '../../../components/Button/IconButton';
// import {COLORS, FONTS, icons, images} from '../../../constants';
// import TextInputs from '../../../components/TextInput';
// import useTogglePasswordVisibility from '../../../costumHook/useTogglePasswordVisibility';
// import {SIZES} from '../../../constants';
// import TextButton from '../../../components/Button/TextButton';
// import styles from './styles';
// const SignIn = ({navigation}) => {
//   const onSingIn = values => {
//     console.log('ddddddddddddddd', values);
//     setIsloading(true);
//     auth()
//       .signInWithEmailAndPassword(values.email, values.password)
//       .then(response => {
//         setUserId(response.user.uid);
//         console.log('User account signed in!', response);
//         setIsloading(false);
//       })
//       .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//           setIsloading(false);
//           console.log('That email address is already in use!');
//         }

//         if (error.code === 'auth/invalid-email') {
//           setIsloading(false);
//           console.log('That email address is invalid!');
//         }
//         setIsloading(false);
//         setError(error);
//         console.error(error);
//       });
//   };
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required().email().label('Email'),
//     password: Yup.string().required().min(3).max(6).label('Password'),
//   });
//   const {passwordVisibility, rightIcon, handlePasswordVisibility} =
//     useTogglePasswordVisibility();
//   const {setUserId} = useContext(AuthContext);
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState(false);
//   const renderHeader = () => {
//     return (
//       <View style={{padding: SIZES.padding}}>
//         <IconButton
//           icon={icons.back}
//           iconStyle={{tintColor: COLORS.black}}
//           containerStyle={{}}
//           onPress={() => navigation.navigate('Splash')}
//         />
//         <View style={{alignItems: 'center'}}>
//           <Image style={styles.logo} source={images.logo} />
//         </View>
//       </View>
//     );
//   };
//   const renderTextInputSection = () => {
//     return (
//       <View style={styles.renderCotainer}>
//         <Text style={styles.welcome}>Welcome Back</Text>

//         <Formik
//           enableReinitialize={true}
//           initialValues={{name: '', email: '', password: ''}}
//           onSubmit={values => onSingIn(values)}
//           validationSchema={validationSchema}>
//           {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
//             <KeyboardAvoidingView
//               behavior="position"
//               keyboardVerticalOffset={5}>
//               <View style={{}}>
//                 <TextInputs
//                   icon={icons.email}
//                   placeholder="Enter your email"
//                   autoCapitalize={'none'}
//                   containerStyle={styles.textInput}
//                   onChangeText={handleChange('email')}
//                   onBulr={() => setFieldTouched('email')}
//                 />
//                 <AppText error={errors.email} visible={touched.email} />
//                 <TextInputs
//                   icon={icons.password}
//                   placeholder={'Enter your password'}
//                   eye={rightIcon}
//                   containerStyle={styles.textInput1}
//                   autoCapitalize="none"
//                   onChangeText={handleChange('password')}
//                   onBulr={() => setFieldTouched('password')}
//                   secureTextEntry={passwordVisibility}
//                   pressOnEyeIcon={handlePasswordVisibility}
//                 />
//                 <AppText error={errors.password} visible={touched.password} />
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('ForgotPassowrd')}>
//                   <Text style={styles.forgotPassword}>Forgot Password</Text>
//                 </TouchableOpacity>
//                 <TextButton
//                   isLoading={isLoading}
//                   label={'SignIn'}
//                   labelStyle={{...FONTS.h2}}
//                   containerStyle={styles.buttonText}
//                   onPress={handleSubmit}
//                 />
//                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                   <Text style={styles.text}>Don't have an account</Text>
//                 </TouchableOpacity>
//               </View>
//             </KeyboardAvoidingView>
//           )}
//         </Formik>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAwareScrollView>
//       <ImageBackground
//         style={{flex: 1}}
//         blurRadius={3}
//         source={images.background1}
//         imageStyle={{width: SIZES.width, height: SIZES.height}}>
//         {renderHeader()}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {renderTextInputSection()}
//         </ScrollView>
//       </ImageBackground>
//     </KeyboardAwareScrollView>
//   );
// };

// export default SignIn;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
