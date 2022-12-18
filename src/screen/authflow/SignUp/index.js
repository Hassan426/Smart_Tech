// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import React, {useState, useContext} from 'react';
// import images from '../../../constants/images';
// import auth from '@react-native-firebase/auth';
// import {AuthContext} from '../../../../App';
// import firestore from '@react-native-firebase/firestore';
// import AppText from '../../../components/Text';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {height, width, totalSize} from 'react-native-dimension';
// import useTogglePasswordVisibility from '../../../costumHook/useTogglePasswordVisibility';
// import {SIZES, icons, COLORS, FONTS} from '../../../constants';
// import IconButton from '../../../components/Button/IconButton';
// import TextInputs from '../../../components/TextInput';
// import TextButton from '../../../components/Button/TextButton';
// import styles from './styles';

// const SignUp = ({navigation}) => {
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState(false);
//   const {handlePasswordVisibility, passwordVisibility, rightIcon} =
//     useTogglePasswordVisibility();
//   const {setUserId, userId} = useContext(AuthContext);
//   // console.log('sssss', userId);
//   const onSingUp = values => {
//     setIsloading(true);
//     auth()
//       .createUserWithEmailAndPassword(values.email, values.password)
//       .then(response => {
//         setUserId(response.user.uid);
//         onStoreData(values, response.user.uid);
//         console.log('User account created & signed in!');
//         setIsloading(false);
//       })
//       .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//           setError(error);
//           setIsloading(false);
//           console.log('That email address is already in use!');
//         }

//         if (error.code === 'auth/invalid-email') {
//           setIsloading(false);
//           console.log('That email address is invalid!');
//         }
//         setIsloading(false);
//         console.error(error);
//       });
//   };

//   const onStoreData = (values, userId) => {
//     // console.log('5555555555', userId);
//     firestore()
//       .collection('AuthData')
//       .doc(userId)
//       .set({
//         Name: values.name,
//         Password: values.password,
//         Email: values.email,
//         Phone: values.phone,
//       })
//       .then(() => {
//         console.log('User added!');
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required().email().label('Email'),
//     password: Yup.string().required('Password is required'),
//     passwordConfirm: Yup.string()
//       .oneOf([Yup.ref('password'), null])
//       .required()
//       .label('Confirm password'),
//     name: Yup.string()
//       .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
//       .max(40)
//       .required(),
//     phone: Yup.string().min(11).max(11).required().label('Phone'),
//   });
//   const renderHeader = () => {
//     return (
//       <View style={{padding: SIZES.padding}}>
//         <IconButton
//           icon={icons.back}
//           iconStyle={{tintColor: COLORS.black}}
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
//           initialValues={{
//             name: '',
//             email: '',
//             phone: '',
//             password: '',
//             passwordConfirm: '',
//           }}
//           onSubmit={values => onSingUp(values)}
//           validationSchema={validationSchema}>
//           {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
//             <KeyboardAvoidingView>
//               <View style={{}}>
//                 <TextInputs
//                   placeholder={'Name'}
//                   icon={icons.profile}
//                   containerStyle={styles.textInput1}
//                   autoCapitalize="none"
//                   onChangeText={handleChange('name')}
//                   onBlur={() => setFieldTouched('name')}
//                 />
//                 <AppText error={errors.name} visible={touched.name} />
//                 <TextInputs
//                   icon={icons.email}
//                   placeholder="Enter your email"
//                   autoCapitalize={'none'}
//                   containerStyle={styles.textInput1}
//                   onChangeText={handleChange('email')}
//                   onBulr={() => setFieldTouched('email')}
//                 />
//                 <AppText error={errors.email} visible={touched.email} />

//                 <TextInputs
//                   placeholder={'Phone'}
//                   icon={icons.mobile}
//                   containerStyle={styles.textInput1}
//                   autoCapitalize={'none'}
//                   onChangeText={handleChange('phone')}
//                   onBlur={() => setFieldTouched('phone')}
//                   keyboardType={'phone-pad'}
//                 />
//                 <AppText error={errors.phone} visible={touched.phone} />

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

//                 <TextInputs
//                   icon={icons.password}
//                   placeholder={'Re-enter-Password'}
//                   eye={rightIcon}
//                   containerStyle={styles.textInput1}
//                   autoCapitalize="none"
//                   onChangeText={handleChange('passwordConfirm')}
//                   onBulr={() => setFieldTouched('passwordConfirm')}
//                   secureTextEntry={passwordVisibility}
//                   pressOnEyeIcon={handlePasswordVisibility}
//                 />
//                 <AppText
//                   error={errors.passwordConfirm}
//                   visible={touched.passwordConfirm}
//                 />

//                 <TextButton
//                   isLoading={isLoading}
//                   label={'SignIn'}
//                   labelStyle={{...FONTS.h2}}
//                   containerStyle={styles.buttonText}
//                   onPress={handleSubmit}
//                 />
//                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                   <Text style={styles.text}>Already have an account</Text>
//                 </TouchableOpacity>
//               </View>
//             </KeyboardAvoidingView>
//           )}
//         </Formik>
//       </View>
//     );
//   };

//   return (
//     <ScrollView>
//       <ImageBackground
//         style={{width: '100%', height: '100%'}}
//         imageStyle={{width: SIZES.width, height: SIZES.height}}
//         blurRadius={3}
//         source={images.background1}>
//         {renderHeader()}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {renderTextInputSection()}
//         </ScrollView>
//       </ImageBackground>
//     </ScrollView>
//   );
// };

// export default SignUp;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
