// // import {StyleSheet, Text, View} from 'react-native';
// // import React, {useState, useEffect} from 'react';
// // import Navigation from './src/routes';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export const AuthContext = React.createContext({
// //   userId: null,
// //   setUserId: () => null,
// // });

// // const App = () => {
// //   // console.log('iddddd', userId);
// //   const [userId, setUserId] = useState('ddddd');

// //   const retrieveData = async () => {
// //     const userId = await AsyncStorage.getItem('UserId');
// //     if (userId) setUserId(userId);
// //   };
// //   const setDataLocally = userId => {
// //     if (userId == null || userId == undefined) {
// //       AsyncStorage.removeItem('UserId');
// //     } else AsyncStorage.setItem('UserId', userId);
// //   };

// //   useEffect(() => {
// //     retrieveData();
// //   }, []);

// //   useEffect(() => {
// //     setDataLocally(userId);
// //   }, [userId]);
// //   return (
// //     <AuthContext.Provider value={{userId, setUserId}}>
// //       <Navigation />
// //     </AuthContext.Provider>
// //   );
// // };

// // export default App;

// // const styles = StyleSheet.create({});
// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Navigation from './src/routes';
// import {SplashScreen} from './src/screen/authflow';

// const App = () => {
//   return <SplashScreen />;
// };

// export default App;

// const styles = StyleSheet.create({});
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SplashScreen} from './src/screen/authflow';
import AuthStackNavigator from './src/routes/AuthStackNavigator';

const App = () => {
  return <AuthStackNavigator />;
};

export default App;

const styles = StyleSheet.create({});
