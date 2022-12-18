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
import React, {useContext, useState} from 'react';
// import AppContainer from '../../components/TextInput/AppContainer';
import AppButton from '../../components/Button/AppButton';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {AuthContext} from '../../../App';
import AppText from '../../components/Text';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Spacer10,
  Spacer3,
  Spacer4,
  Spacer5,
  Spacer7,
} from '../../components/Spacer';

// import reauthenticate from

const UpdateEmailScreen = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState();

  // console.log('oldPassword', currentPassword);
  // console.log('oldPassword', newPassword);

  const reauthenticate = values => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      data.currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };
  const onchangePasswordpress = values => {
    setIsloading(true);
    console.log('aaaaaaaaa', values);
    setData(values);
    reauthenticate(values.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(data.gmail)
        .then(() => {
          Alert.alert('gmail was updated');
          onStoreData();
        })
        .catch(() => {
          Alert.alert(error.message);
        });
    });
  };
  const onStoreData = () => {
    // console.log('5555555555');
    firestore()
      .collection('AuthData')
      .doc(userId)
      .update({
        Email: data.email,
      })
      .then(() => {
        setIsloading(false);
        console.log('User added!');
      });
  };
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required().min(3).max(6).label('Password'),
    email: Yup.string().required().email().label('email'),
  });
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data);
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <ImageBackground
          // fadeDuration={20}
          blurRadius={10}
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://mcdn.wallpapersafari.com/medium/96/59/MRiNXc.jpg',
          }}>
          <View style={styles.logo}>
            <Spacer3 />
            <Icon
              raised
              type="material-community"
              name="gmail"
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

          <View style={styles.Container}>
            <Spacer5 />
            <Text style={styles.title}>Update your email Address</Text>
            <Spacer5 />
            <Formik
              initialValues={{
                currentPassword: '',
                email: '',
              }}
              onSubmit={values => onchangePasswordpress(values)}
              validationSchema={validationSchema}>
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <View style={{marginHorizontal: width(5)}}>
                  {/* <AppContainer
                    placeholder={'Current Password'}
                    name={'lock'}
                    color={Colors.darkGreen}
                    placeholderTextColor={Colors.darkGreen}
                    autoCapitalize={'none'}
                    onChangeText={handleChange('currentPassword')}
                    onBulr={() => setFieldTouched('currentPassword')}
                    keyboardType={'numeric'}
                    secureTextEntry={true}
                  /> */}
                  <AppText
                    style={{color: Colors.white}}
                    error={errors.currentPassword}
                    visible={touched.currentPassword}
                  />
                  <Spacer3 />
                  <AppContainer
                    placeholder={'Enter New email'}
                    name={'email'}
                    color={Colors.darkGreen}
                    placeholderTextColor={Colors.darkGreen}
                    autoCapitalize={'none'}
                    onChangeText={handleChange('email')}
                    onBulr={() => setFieldTouched('email')}
                    // keyboardType={'numeric'}
                    secureTextEntry={true}
                  />
                  <AppText
                    style={{color: Colors.white}}
                    error={errors.email}
                    visible={touched.email}
                  />
                  <Spacer3 />
                  <Spacer7 />
                  <View style={styles.buttonContainer}>
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size={30} color={'white'} />
                      </View>
                    ) : (
                      <View style={{width: '100%'}}>
                        <AppButton
                          title={'Change Email'}
                          onPress={handleSubmit}
                        />
                      </View>
                    )}
                  </View>
                  <Spacer10 />
                  <Spacer10 />
                  <Spacer4 />
                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateEmailScreen;

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
    left: width(3),
    marginTop: width(3),
    top: 0,
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
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  Container: {
    flex: 0.7,
  },
});
