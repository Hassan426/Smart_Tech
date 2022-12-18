import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const BarCode = () => {
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
    console.log('eeeeeeee', e.rawData);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={<Text style={styles.centerText}>QRCodeScanner</Text>}
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>
            Place onto the object and Hold it
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    marginTop: 5,
  },
});

export default BarCode;
// import {StyleSheet, Text, View, FlatList} from 'react-native';
// import React, {useState, useEffect, useContext} from 'react';
// import dummyData from '../../dummyData/Data';
// import {Data} from '../../dummyData/Data';
// import {Button} from 'react-native-elements';
// import firestore from '@react-native-firebase/firestore';
// import NewProductCard from '../../components/Cards/NewProductCard';
// import {height} from 'react-native-dimension';
// import {AuthContext} from '../../../App';

// const BarCode = () => {
//   const {userId} = useContext(AuthContext);
//   const [data, setData] = useState([]);
//   const [dummmydata, setdummyData] = useState();

//   const abc = () => {
//     setData(Data);
//     uploadData();
//   };

//   console.log('fffffffffffffffffffff**********///////////////////////**', data);
//   const uploadData = () => {
//     firestore()
//       .collection('dummyData')
//       .doc('userId')
//       .set({
//         userData: data,
//       })
//       .then(() => {
//         console.log('Succesfully Deleted data');
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
//   // const updateData = object => {
//   //   // console.log('rrrrrrrrrrrrrrrrrrrrrrrrr', object.Swiper);
//   //   firestore()
//   //     .collection('Admin')
//   //     .doc(userId)
//   //     .update({
//   //       AddToCart: firestore.FieldValue.arrayUnion({}),
//   //     })
//   //     .then(() => {
//   //       // alert('Item added to favourite');
//   //       console.log('data add to fav list');
//   //       alert('Added to Wishlist');
//   //     });
//   // };
//   // useEffect(() => {
//   //   const subscriber = firestore()
//   //     .collection('AddToCart')
//   //     .doc(userId)
//   //     .onSnapshot(documentSnapshot => {
//   //       // console.log('User data:kkkk ///////////', documentSnapshot.data());
//   //       setdummyData(documentSnapshot.data());
//   //     });
//   //   // console.log('///////////////', data);
//   //   return () => subscriber();
//   // }, []);

//   return (
//     <View>
//       <Text>BarCode</Text>
//       <Button title={'click'} onPress={abc} />
//       {/* <Button title={'xyz'} onPress={updateData} /> */}
//       {/* <FlatList
//         showsHorizontalScrollIndicator={true}
//         data={dummmydata?.AddToCart}
//         renderItem={({item}) => (
//           <View style={{marginHorizontal: height(2.8)}}>
//             <NewProductCard
//               title={item.title}
//               price={item.price}
//               image={item.imag}
//               showButton={true}
//               onPress={() => updateData(item)}
//             />
//           </View>
//         )}
//       /> */}
//     </View>
//   );
// };

// export default BarCode;

// const styles = StyleSheet.create({});
