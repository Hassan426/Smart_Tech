import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Home, BarCode, FavouritesScreen} from '../../screen/appflow';
import TabBarCustomButton from '../../components/Button/TabBarCustomButton';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import HeaderButton from '../../components/Header/HeaderButton';
import Colors from '../../constants/Colors';
import {totalSize, width, height} from 'react-native-dimension';
import {AuthContext} from '../../../App';
import firestore from '@react-native-firebase/firestore';
import {COLORS, icons, FONTS, SIZES} from '../../constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  const [addToCart, setAddToCart] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('AddToCart')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setAddToCart(documentSnapshot.data());
        setIsLoading(false);
      });
    // console.log('///////////////', data);
    return () => subscriber();
  }, []);

  // console.log('aaaaaaaaaaaaaaaa//////**', addToCart.AddToCart?.length);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: height(12.5),
          bottom: 25,
          // left: 20,
          borderRadius: 15,
          backgroundColor: COLORS.primary3,
          elevation: 5,
          // width: '100%',
          marginHorizontal: SIZES.padding,
        },
      }}>
      <Tab.Screen
        name="Barcode"
        component={BarCode}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={icons.qrcode}
              />
              <Text style={styles.label}>BarCode</Text>
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={icons.home}
              />
              <Text style={styles.label}>Home</Text>
            </View>
          ),

          tabBarButton: props => <TabBarCustomButton {...props} />,
          headerLeft: () => (
            <HeaderButton
              iconName={'format-list-bulleted-square'}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <>
              {isLoading ? (
                <View style={{marginRight: 20}}>
                  <ActivityIndicator size={20} />
                </View>
              ) : (
                <View>
                  <View style={styles.cart}>
                    <Text style={styles.text}>
                      {addToCart?.AddToCart?.length}
                    </Text>
                  </View>
                  <HeaderButton
                    iconName={'cart-outline'}
                    onPress={() => navigation.navigate('Cart')}
                  />
                </View>
              )}
            </>
          ),
          title: 'Home Screen',
          headerTitleStyle: {
            ...FONTS.h2,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Favourtes"
        component={FavouritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={icons.qrcode}
              />
              <Text style={styles.label}>Wish_List</Text>
            </View>
          ),

          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  cart: {
    position: 'absolute',
    right: width(2.5),
    top: 1,
    bottom: width(10),
  },
  text: {
    color: Colors.carrot_Orange,
    fontSize: totalSize(1.5),
    fontFamily: 'OpenSans_Bold',
  },
  image: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  iconContainer: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    ...FONTS.body4,
  },
});
