import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import {height, totalSize} from 'react-native-dimension';

const AboutScreen = ({navigation}) => {
  return (
    // <ImageBackground
    //   style={{width: '100%', height: '100%'}}
    //   source={{
    //     uri: 'https://media.istockphoto.com/vectors/online-shopping-hand-holding-smartphone-and-shopping-bag-ecommerce-vector-id1179101265?k=20&m=1179101265&s=612x612&w=0&h=3hr8uRIJ0lNUpRk9Z4282QdhhH5Z5UOETG3Pj9wLKAg=',
    //   }}>
    <View style={{flex: 1, backgroundColor: Colors.carrot_Orange}}>
      <View style={styles.main}>
        <View>
          <Text style={styles.Text}>
            "Smart Tech" will allow customers to order online for digital items
            like computer hardware (mouse, keyboard, speakers, cables, etc) and
            some other digital items’ variety. "Smart Tech" is a virtual store
            on the Internet where customers can browse the catalog and select
            products of interest. In the age of this modern era when technology
            is dominating everywhere, and people relay on technology too much
            and want ease, this application will be very delightful for them...
          </Text>
          <Text style={styles.contact}>contact us</Text>
          <Text style={styles.contact1}>
            +923200501651<Text> hassan0501651@gmail.com </Text>
          </Text>
          <Text style={styles.contact1}>
            +92188800708<Text> ranaalihassan123@gmail.com</Text>
          </Text>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 15,
  },
  Text: {
    color: Colors.white,
    fontSize: totalSize(2),
    marginTop: height(1),
    margin: 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  contact: {
    margin: 15,
    fontSize: totalSize(3),
    fontFamily: 'OpenSans_Bold',
    color: Colors.white,
  },
  contact1: {
    fontSize: totalSize(1.6),
    fontFamily: 'OpenSans-Regular',
    color: Colors.white,
    marginLeft: 15,
    marginTop: 2,
  },
});
