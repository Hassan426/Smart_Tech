import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DrawerButoon from '../../components/Button/DrawerButton';
import {AuthContext} from '../../../App';
import {height, totalSize, width} from 'react-native-dimension';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';

const CustomDrawerContent = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  const [isLoading, setIsloading] = useState();
  const [url, setUrl] = useState();
  const {setUserId} = useContext(AuthContext);
  const [authData, setAuthData] = useState();

  const signOut = () => {
    setUserId(null);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  // console.log('urlllllllll', url);
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
  const retrieveData = async () => {
    setIsloading(true);
    const url = await storage().ref(userId).getDownloadURL();
    setUrl(url);
    setIsloading(false);
    // console.log('Download URL path====', url);
  };
  // console.log('password', password);
  // console.log('adminPassword', adminPassword);

  return (
    <View style={{flex: 1}}>
      <View style={styles.imagecontainer}>
        {isLoading ? (
          <View style={styles.ActivityIndicator}>
            <ActivityIndicator color={Colors.white} size={30} />
          </View>
        ) : (
          <Image
            style={styles.imageStyles}
            source={{
              uri:
                url ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC',
            }}
          />
        )}

        <View
          style={{
            alignItems: 'center',
            marginTop: height(1),
          }}>
          <Text style={styles.text}>{authData?.Name}</Text>
          <Text style={styles.text}>{authData?.Phone}</Text>
          <Text style={styles.text}>{authData?.Email}</Text>
        </View>
      </View>
      <View style={{height: '45%', marginTop: 30}}>
        <DrawerButoon
          firstIcon={'home-variant-outline'}
          children={'HOME'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('HomeScreen')}
        />
        {/* <DrawerButoon
          firstIcon={'account-supervisor-circle-outline'}
          children={'ADMIN PANEL'}
          secondIcon={'chevron-right'}
        /> */}

        <DrawerButoon
          firstIcon={'account-circle-outline'}
          children={'PROFILE'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('Profile')}
        />
        <DrawerButoon
          firstIcon={'note'}
          children={'My Order List'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('Order')}
        />
        <DrawerButoon
          firstIcon={'cart-outline'}
          children={'My cart List'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('Order')}
        />
        <DrawerButoon
          firstIcon={'cards-heart-outline'}
          children={'wishList'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('Favourites')}
        />
        <DrawerButoon
          firstIcon={'dots-grid'}
          children={'CATEGORIES'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('Categories')}
        />
        <DrawerButoon
          firstIcon={'information-outline'}
          children={'ABOUT Us'}
          secondIcon={'chevron-right'}
          onpress={() => navigation.navigate('About')}
        />
      </View>
      <View
        style={{
          height: '20%',
          marginTop: height(3),
        }}>
        <DrawerButoon
          onpress={signOut}
          firstIcon={'logout-variant'}
          children={'SIGNOUT'}
          secondIcon={'chevron-right'}
        />
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  imagecontainer: {
    margin: height(2.5),
    // flexDirection: 'row',
    height: height(35),
    backgroundColor: 'white',
    borderRadius: width(5),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  text: {
    fontWeight: '600',
    fontSize: totalSize(1.8),
    fontFamily: 'OpenSans_Medium',
    color: 'black',
  },
  imageStyles: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  ActivityIndicator: {
    width: 120,
    height: 120,
    borderRadius: 101,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
