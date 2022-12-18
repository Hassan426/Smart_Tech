import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../App';
import AddToCartCard from '../../components/Cards/ListCard';
import {FlatList} from 'react-native-gesture-handler';
import {height, width, totalSize} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Skeleton from '../../components/Skeleton';
import Modal from 'react-native-modal';
import HeaderButton from '../../components/Header/HeaderButton';
import Colors from '../../constants/Colors';

const OrderList = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cancleOrder, setCancleOrder] = useState();
  const [cancleOrderDate, setCancleOrderDate] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const [dummmydata, setdummyData] = useState();

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('placeOrder')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('CompletedOrder')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setCancleOrder(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCancleOrderDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);
  // console.log('gggggggggg', cancleOrder);
  // console.log('aaaaaaaaaaaaaaaaaa///', data?.placeOrder[0]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('dummyData')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        setdummyData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);
  const updatedData = item => {
    console.log(
      'gggggggggggaaaaaaaaaarrrrr',
      JSON.stringify(item.counter, null, 2),
    );
    // const a = dummmydata?.userData.findIndex(x => x.id === item.id);
    // console.log('ggggggggggggggsssssss', a);
    // const numberOfStock = dummmydata?.userData.find(x => x.id === item.id);

    // console.log('findindexofDummydata', numberOfStock.numberOfStock);
    // console.log('Numberofstock', item.numberOfStock, 'indexxxxxxxx', item.id);
    item.item.numberOfStock = item.item.numberOfStock + item.counter;
    const updatedArray = [...dummmydata.userData];
    updatedArray[item.item.index] = item;
    console.log('gggggggggggddddddddddddddd', updatedArray);
    firestore().collection('dummyData').doc('userId').set({
      userData: updatedArray,
    });
  };
  const deletSpecificItem = object => {
    // console.log('aaaaaaaa7777', object);
    firestore()
      .collection('placeOrder')
      .doc(userId)
      .update({placeOrder: firestore.FieldValue.arrayRemove(object)});
  };
  const deletSpecificItems = object => {
    // console.log('aaaaaaaa7777', object);
    firestore()
      .collection('orderList')
      .doc('userId')
      .update({orderList: firestore.FieldValue.arrayRemove(object)});
  };
  const placeYourOrder = item => {
    // console.log('ggggggg', item);
    setIsLoading(true);
    cancleOrder?.cancleOrder
      ? firestore()
          .collection('cancleOrder')
          .doc('userId')
          .update({
            cancleOrder: firestore.FieldValue.arrayUnion({
              item: item,
              cancleOrderDate: cancleOrderDate,
            }),
          })
          .then(() => {
            console.log('User cancle order update');
            deletSpecificItem(item);
            deletSpecificItems(item);
            // updatedData(item);
            toggleModal();
            setIsLoading(false);
          })
      : firestore()
          .collection('cancleOrder')
          .doc('userId')
          .set({
            cancleOrder: firestore.FieldValue.arrayUnion({
              item: item,
              cancleOrderDate: cancleOrderDate,
            }),
          })
          .then(() => {
            deletSpecificItem(item);
            deletSpecificItems(item);
            // updatedData(item);
            toggleModal();
            console.log('cancle Created');
            setIsLoading(false);
          });
  };

  // console.log('yyyyyyyyyyyyyyyyyyyyyyy', data?.placeOrder[1].currentDate);
  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <TouchableOpacity
          onPress={() => console.log('ddd')}
          style={styles.modal}>
          <Text style={styles.cart}>Your order has been canceled </Text>
          <HeaderButton
            iconName={'checkbox-marked-circle'}
            onPress={toggleModal}
            color={Colors.carrot_Orange}
          />
        </TouchableOpacity>
      </Modal>
      {/* <Modal isVisible={isModalVisible1}>
        <TouchableOpacity
          onPress={() => console.log('ddd')}
          style={styles.modal}>
          <Text style={styles.cart}>Your order has been canceled </Text>
          <HeaderButton
            iconName={'checkbox-marked-circle'}
            onPress={toggleModal1}
            color={Colors.carrot_Orange}
          />
        </TouchableOpacity>
      </Modal> */}
      {isLoading ? (
        <View>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <FlatList
          data={data?.placeOrder}
          renderItem={({item}) => (
            <View>
              <AddToCartCard
                title={item.item.title}
                image={item.item.image}
                price={item.item.price}
                date={item.orderplacedDate}
                cart={'cancel order'}
                onButtonPress={() =>
                  Alert.alert('waring', 'Are you sure to cancle order  ', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => updatedData(item)},
                  ])
                }
                renderRightActions={() => (
                  <TouchableOpacity
                    style={styles.swipeAble}
                    onPress={() =>
                      Alert.alert('waring', 'Are you sure to delete  ', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => placeYourOrder(item)},
                      ])
                    }>
                    <Icon
                      type="material-community"
                      name="trash-can-outline"
                      size={50}
                      color={'white'}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  swipeAble: {
    height: height(25),
    marginTop: totalSize(2),
    backgroundColor: 'red',
    width: width(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
    fontSize: totalSize(2),
    fontFamily: 'OpenSans-Regular',
    color: Colors.carrot_Orange,
    marginLeft: width(7),
  },
  modal: {
    height: height(7),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height(8) / 5,
    flexDirection: 'row',
  },
});
