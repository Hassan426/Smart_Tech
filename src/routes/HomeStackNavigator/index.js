import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {totalSize} from 'react-native-dimension';
import BottomTabNavigator from '../BottomTabNavigator';
import {
  OnVIewDetailScreen,
  FavouritesScreen,
  ProfileScreen,
  OnViewCategoriesList,
  UpdatePasswordScreen,
  UpdateEmailScreen,
  AboutScreen,
  AddtoCartScreen,
  UpdateProfileScreen,
  OrderDetailsScreen,
  OrderList,
  ShippingAddressScreen,
  PaymentScreen,
} from '../../screen/appflow';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/Header/HeaderButton';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Detail of your product"
        component={OnVIewDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.blue},
          headerTintColor: 'white',
          headerLeft: () => (
            <HeaderButton
              iconName={'arrow-left'}
              onPress={() => navigation.goBack()}
              color={'white'}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="List of Items"
        component={OnViewCategoriesList}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.carrot_Orange},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: totalSize(2.5),
            fontFamily: 'OpenSans_Bold',
          },
          headerLeft: () => (
            <HeaderButton
              iconName={'arrow-left'}
              onPress={() => navigation.goBack()}
              color={'white'}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'About us',
          headerTitleStyle: {
            fontSize: totalSize(2.5),
            fontFamily: 'OpenSans_Bold',
          },
          headerStyle: {backgroundColor: Colors.carrot_Orange},
          headerTintColor: 'white',
          headerLeft: () => (
            <HeaderButton
              iconName={'arrow-left'}
              onPress={() => navigation.goBack()}
              color="white"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Cart"
        component={AddtoCartScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="PScreen"
        component={UpdatePasswordScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="email"
        component={UpdateEmailScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="update"
        component={UpdateProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: totalSize(2.5),
            fontFamily: 'OpenSans_Bold',
          },
          headerLeft: () => (
            <HeaderButton
              iconName={'arrow-left'}
              onPress={() => navigation.goBack()}
              color={'black'}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="orderDetails"
        component={OrderDetailsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Order"
        component={OrderList}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          title: 'Order List',
          headerTitleStyle: {
            fontSize: totalSize(2.5),
            fontFamily: 'OpenSans_Bold',
          },
          headerLeft: () => (
            <HeaderButton
              iconName={'arrow-left'}
              onPress={() => navigation.goBack()}
              color={'black'}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="shiping"
        component={ShippingAddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="payment"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackNavigator;

const styles = StyleSheet.create({});
