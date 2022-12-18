import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {CustomDrawerContent} from '../screen/appflow';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '../../App';
import OfflineNotice from '../components/Notification';
import AuthStackNavigator from './AuthStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
const MainStack = createDrawerNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <MainStack.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};
const Navigation = () => {
  const {userId} = useContext(AuthContext);
  // console.log('============== User ID:', userId);
  return (
    <>
      <OfflineNotice />
      <NavigationContainer>
        {userId ? AuthStackNavigator() : AuthStackNavigator()}
      </NavigationContainer>
    </>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
