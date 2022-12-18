import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {images} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, totalSize, width} from 'react-native-dimension';
import ActionButton from '../../components/Button/ActionButton';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../App';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Colors from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import ContentLoader from 'react-native-easy-content-loader';
import {Spacer2} from '../../components/Spacer';

const ProfileScreen = ({navigation}) => {
  const {userId, setUserId} = useContext(AuthContext);
  const [url, setUrl] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [authData, setAuthData] = useState();
  // console.log('=================', url);
  //Fuctions
  const logOut = () => {
    setUserId(null);
  };
  //useEffect
  useEffect(() => {
    retrieveData();
  }, []);
  useEffect(() => {
    setIsloading(true);
    const subscriber = firestore()
      .collection('AuthData')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data: ', documentSnapshot.data());
        setAuthData(documentSnapshot.data());
        setIsloading(false);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  // console.log('**********', userId);

  const retrieveData = async () => {
    setIsloading(true);
    const url = await storage().ref(userId).getDownloadURL();
    setUrl(url);
    setIsloading(false);
    // console.log('Download URL path====', url);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <ImageBackground
          style={styles.ImageBackground}
          source={images.background}>
          <View style={styles.imageContainer}>
            {isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator color={Colors.white} size={35} />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      url ||
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC',
                  }}
                />
              </View>
            )}
            {isLoading ? (
              <View style={styles.infoContainer}>
                <ContentLoader
                  pRows={3}
                  pHeight={[7, 5, 15]}
                  pWidth={['100%', '75%', '90%']}
                />
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <Text style={styles.text}>{authData?.Name.toUpperCase()}</Text>
                <Text style={styles.text}>{authData?.Phone}</Text>
                <Text style={styles.text}>{authData?.Email}</Text>
              </View>
            )}
          </View>
          <View style={styles.ActionBar}>
            <ActionButton
              leftIcon="account-circle"
              title={'Edit Profile'}
              onPress={() => navigation.navigate('update')}
            />
            <Spacer2 />
            <ActionButton
              leftIcon="lock"
              title={'Update Password'}
              onPress={() => navigation.navigate('PScreen')}
            />
            {/* <ActionButton
              leftIcon="gmail"
              title={'Update  Email'}
              onPress={() => navigation.navigate('email')}
            /> */}
            <Spacer2 />
            <ActionButton
              leftIcon="note"
              color="red"
              title={'My order List'}
              onPress={() => navigation.navigate('Order')}
            />
            <Spacer2 />
            <ActionButton
              leftIcon="cart-outline"
              color="red"
              title={'My Cart'}
              onPress={() => navigation.navigate('Cart')}
            />
            <Spacer2 />
            <ActionButton
              leftIcon="logout"
              title={'Sign-out'}
              onPress={logOut}
            />
            <Spacer2 />
            <ActionButton
              size={20}
              leftIcon="location-exit"
              title={'Exit'}
              onPress={BackHandler.exitApp}
            />
            <Spacer2 />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    marginTop: height(8),
    marginHorizontal: width(4),
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // height: height(35),
    borderRadius: 20,
    paddingVertical: height(5),
  },
  loading: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  ActionBar: {
    // height: height(60),
    // marginHorizontal: width(4),
    marginTop: height(3),
    borderRadius: 20,
    width: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: height(2),
  },
  text: {
    color: Colors.black,
    fontSize: totalSize(1.7),
    fontFamily: 'OpenSans_Medium',
  },
});
