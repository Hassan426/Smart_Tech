import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();
import {
  SplashScreen,
  SignIn,
  SignUp,
  ForgotPassword,
} from '../../screen/authflow';
import {NavigationContainer} from '@react-navigation/native';

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="ForgotPassowrd"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
export default AuthStackNavigator;
