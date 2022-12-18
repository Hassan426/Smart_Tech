import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {height, width} from 'react-native-dimension';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../../App';
// import AppContainer from '../../components/TextInput/AppContainer';
import {Spacer10, Spacer5, Spacer3, Spacer7} from '../../components/Spacer';
import AppButton from '../../components/Button/AppButton';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppText from '../../components/Text';

const UpdateProfileScreen = ({navigation}) => {
  const {userId, setUserId} = useContext(AuthContext);
  const [url, setUrl] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [data, setData] = useState([]);

  console.log('aaaaaaaaaaaaaaaaacccccccccccrrrrrrr', data);
  useEffect(() => {
    setIsloading(true);
    const subscriber = firestore()
      .collection('AuthData')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setData(documentSnapshot.data());
        setIsloading(false);
      });

    return () => subscriber();
  }, []);
  const imageBackground =
    'https://images.unsplash.com/photo-1655634535290-6bab0013accc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGUlMjAzZHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60';
  const user =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC';
  useEffect(() => {
    retrieveData();
  }, []);
  const Alerts = () => {
    Alert.alert('Image', 'Select from...  ', [
      {
        text: 'from Gallery',
        onPress: () => imagePickerGallery(),
        style: 'cancel',
      },

      {text: 'Open camera', onPress: () => imagePickeropenCamera()},
    ]);
  };
  const imagePickeropenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      submitProfile(image.path);
      //setImage(image.path);
    });
  };
  const imagePickerGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      submitProfile(image.path);
      //setImage(image.path);
    });
  };

  const submitProfile = async path => {
    setIsloading(true);
    // console.log('paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', path);
    let filename = path.substring(path.lastIndexOf('/') + 1);
    let reference = storage().ref(userId);
    let task = reference.putFile(path);

    task
      .then(() => {
        retrieveData();
        console.log('Image uploaded to the bucket!');
        // console.log('dddddddddddddd', data);
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const retrieveData = async () => {
    setIsloading(true);
    const url = await storage().ref(userId).getDownloadURL();
    setUrl(url);
    setIsloading(false);
    // console.log('Download URL path====', url);
  };

  // console.log('name', name);
  // console.log('phone', phone);

  const updateAuthDate = values => {
    setIsloading(true);
    console.log('hhhhhhhhhhhhhhhhhhhhh', values);
    firestore()
      .collection('AuthData')
      .doc(userId)
      .update({
        Phone: values.phone,
        Name: values.name,
      })
      .then(() => {
        setIsloading(false);
        console.log('User updated!');
        alert('Update User info');
      });
  };
  useEffect(() => {
    navigation.setOptions({
      title: 'Edit User Profile',
    });
  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(40)
      .required()
      .label('name'),
    phone: Yup.string().min(11).max(11).required().label('phone'),
  });
  return (
    <ScrollView>
      <ImageBackground
        fadeDuration={10}
        blurRadius={15}
        style={styles.imageBackground}
        source={{
          uri: imageBackground,
        }}>
        {/* <HeaderBar
          headerTitle={'Update User Profile'}
          headerBackgroundColor="white"
          titleColor={'black'}
          leftIcon="arrow-left"
          onleftIconPress={() => navigation.navigate('Profile')}
        /> */}
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <TouchableOpacity onPress={Alerts}>
              {isLoading ? (
                <View style={styles.activityIndicator}>
                  <ActivityIndicator size={40} color={'white'} />
                </View>
              ) : (
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: url || user,
                  }}
                />
              )}
            </TouchableOpacity>
            {/* <View style={{position: 'absolute', bottom: height(3.2)}}>
            <Icon
              type={'material-community'}
              name="plus-circle"
              size={30}
              color={'blue'}
            />
          </View> */}
          </View>
        </View>
        <View
          style={{
            height: height(65),
            marginHorizontal: 20,
          }}>
          {/* <Spacer10 /> */}
          <Formik
            initialValues={{
              name: '',
              phone: '',
            }}
            onSubmit={values => updateAuthDate(values)}
            validationSchema={validationSchema}>
            {({
              handleSubmit,
              handleChange,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <View style={{marginHorizontal: width(5)}}>
                <Spacer3 />
                {/* <AppContainer
                  placeholder={'Name'}
                  name={'account-circle'}
                  color={Colors.darkGreen}
                  placeholderTextColor={Colors.darkGreen}
                  autoCapitalize={'none'}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                <AppText
                  style={{color: 'white'}}
                  error={errors.name}
                  visible={touched.name}
                />
                <Spacer7 />
                <AppContainer
                  placeholder={'Phone'}
                  name={'phone'}
                  color={Colors.darkGreen}
                  placeholderTextColor={Colors.darkGreen}
                  autoCapitalize={'none'}
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                  keyboardType={'phone-pad'}
                /> */}

                <AppText
                  style={{color: 'white'}}
                  error={errors.phone}
                  visible={touched.phone}
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
                        title={'Update user Profile'}
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
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    height: height(35),
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,

    // backgroundColor: 'blue',
  },
  activityIndicator: {
    backgroundColor: 'green',
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  waring: {
    color: 'white',
    fontSize: 16,
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
