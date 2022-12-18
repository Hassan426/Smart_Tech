import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import AppContainer from '../../components/TextInput/AppContainer';
import AppButton from '../../components/Button/AppButton';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Colors from '../.././constants/Colors';
import {AuthContext} from '../../../App';
import {Spacer10, Spacer3, Spacer5, Spacer7} from '../../components/Spacer';
import AppText from '../../components/Text';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useTogglePasswordVisibility from '../../costumHook/useTogglePasswordVisibility';

// import reauthenticate from

const UpdatePasswordScreen = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  // const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState();
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  // console.log('oldPassword', currentPassword);
  // console.log('oldPassword', newPassword);

  // useEffect(() => {
  //   reauthenticate();
  // }, []);

  const reauthenticate = CurrentPassword => {
    console.log('data', CurrentPassword);
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      CurrentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onchangePassword = values => {
    setIsloading(true);
    // console.log('aaaaaaaaa', values);
    setData(values);
    reauthenticate(values.CurrentPassword).then(() => {
      var user = firebase.auth().currentUser;
      console.log('===aaaaaaaaa', values);

      user
        .updatePassword(values.NewPassword)
        .then(() => {
          Alert.alert('Password updated');
          onStoreData(values);
        })
        .catch(() => {
          Alert.alert(error.message);
          setIsloading(false);
        });
    });
  };
  const onStoreData = values => {
    console.log('5555555555');
    firestore()
      .collection('AuthData')
      .doc(userId)
      .update({
        Password: values.NewPassword,
      })
      .then(() => {
        setIsloading(false);
        console.log('User added!');
      });
  };
  const validationSchema = Yup.object().shape({
    CurrentPassword: Yup.string()
      .required()
      .min(3)
      .max(6)
      .label('CurrentPassword'),
    NewPassword: Yup.string().required().min(3).max(6).label('NewPassword'),
    ConfirmNewPassword: Yup.string()
      .oneOf([Yup.ref('NewPassword'), null])
      .required()
      .label('Confirm password'),
  });
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ScrollView>
        <ImageBackground
          // fadeDuration={20}
          blurRadius={3}
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://media.istockphoto.com/photos/digital-security-concept-picture-id1300897309?b=1&k=20&m=1300897309&s=170667a&w=0&h=1fOBpTjlTwciP8Z_yigJO-SFgEr8e_aq5lG2ilUiqXk=',
          }}>
          <View style={styles.logo}>
            <Spacer10 />
            <Icon
              raised
              type="material-community"
              name="lock"
              size={70}
              color={Colors.darkGreen}
            />
            <Spacer3 />
            <View style={styles.IconContainer}>
              <Icon
                raised
                type="material-community"
                name="arrow-left-thick"
                size={15}
                color={Colors.darkGreen}
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          </View>

          <View
            style={{
              flex: 0.7,
            }}>
            <Spacer5 />
            <Text style={styles.title}>Update your Password</Text>
            <Spacer5 />
            <Formik
              initialValues={{
                CurrentPassword: '',
                NewPassword: '',
                ConfirmNewPassword: '',
              }}
              onSubmit={values => onchangePassword(values)}
              validationSchema={validationSchema}>
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <View style={{marginHorizontal: width(5)}}>
                  <AppContainer
                    placeholder={'Current Password'}
                    name={'lock'}
                    name1={rightIcon}
                    color={Colors.darkGreen}
                    placeholderTextColor={Colors.darkGreen}
                    autoCapitalize={'none'}
                    onChangeText={handleChange('CurrentPassword')}
                    onBulr={() => setFieldTouched('CurrentPassword')}
                    keyboardType={'numeric'}
                    secureTextEntry={passwordVisibility}
                    pressOnEyeIcon={handlePasswordVisibility}
                  />
                  <AppText
                    style={{color: Colors.white}}
                    error={errors.CurrentPassword}
                    visible={touched.CurrentPassword}
                  />
                  <Spacer3 />
                  {/* <AppContainer
                    placeholder={'New Password'}
                    name={'lock'}
                    name1={rightIcon}
                    color={Colors.darkGreen}
                    placeholderTextColor={Colors.darkGreen}
                    autoCapitalize={'none'}
                    onChangeText={handleChange('NewPassword')}
                    onBulr={() => setFieldTouched('NewPassword')}
                    keyboardType={'numeric'}
                    secureTextEntry={passwordVisibility}
                    pressOnEyeIcon={handlePasswordVisibility}
                  /> */}
                  <AppText
                    style={{color: Colors.white}}
                    error={errors.NewPassword}
                    visible={touched.NewPassword}
                  />
                  <Spacer3 />
                  <AppContainer
                    placeholder={'Confrim New Password'}
                    name={'lock'}
                    name1={rightIcon}
                    color={Colors.darkGreen}
                    placeholderTextColor={Colors.darkGreen}
                    autoCapitalize={'none'}
                    onChangeText={handleChange('ConfirmNewPassword')}
                    onBulr={() => setFieldTouched('ConfirmNewPassword')}
                    keyboardType={'numeric'}
                    secureTextEntry={passwordVisibility}
                    pressOnEyeIcon={handlePasswordVisibility}
                  />
                  <AppText
                    style={{color: Colors.white}}
                    error={errors.ConfirmNewPassword}
                    visible={touched.ConfirmNewPassword}
                  />
                  <Spacer7 />

                  <View style={styles.buttonContainer}>
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size={30} color={'white'} />
                      </View>
                    ) : (
                      <View style={{width: '100%'}}>
                        <AppButton
                          title={'Change Password'}
                          onPress={handleSubmit}
                        />
                      </View>
                    )}
                  </View>
                  <Spacer10 />
                  <Spacer5 />
                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    flex: 0.3,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: Colors.white,
    alignSelf: 'center',
  },
  IconContainer: {
    position: 'absolute',
    left: width(5),
    marginTop: width(3),
    top: width(4),
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    // marginTop: height(3.5),
    // backgroundColor: 'red',
    width: '100%',
    height: height(7),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    width: '100%',
    height: height(7),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    opacity: 0.8,
    flexDirection: 'row',
  },
});
