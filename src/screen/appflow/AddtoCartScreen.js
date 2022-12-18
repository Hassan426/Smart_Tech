import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ListCard from '../../components/Cards/ListCard';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../App';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Skeleton from '../../components/Skeleton';
import {COLORS, icons, SIZES} from '../../constants';
import IconButton from '../../components/Button/IconButton';
const AddtoCartScreen = ({navigation}) => {
  const [addToCart, setAddToCart] = useState('');
  const {userId} = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    const subscriber = firestore()
      .collection('AddToCart')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setAddToCart(documentSnapshot.data());
        setIsloading(false);
      });
    // console.log('///////////////', data);
    return () => subscriber();
  }, []);
  // console.log('addtocar/*-+t', addToCart.AddToCart);
  const deletSpecificItem = object => {
    // console.log('obecjt', object);
    firestore()
      .collection('AddToCart')
      .doc(userId)
      .update({AddToCart: firestore.FieldValue.arrayRemove(object)});
  };
  const renderContent = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <FlatList
          data={addToCart?.AddToCart}
          renderItem={({item, index}) => (
            <View>
              <ListCard
                style={{
                  marginHorizontal: SIZES.radius,
                  marginTop: index == 0 ? SIZES.radius : 0,
                  marginBottom: SIZES.radius,
                }}
                title={'Cancle Order'}
                item={item}
                cart={'My Cart'}
                renderRightActions={() => (
                  <TouchableOpacity
                    style={styles.swipeAble}
                    onPress={() =>
                      Alert.alert('waring', 'Are you sure to remove cart  ', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deletSpecificItem(item)},
                      ])
                    }>
                    <Icon
                      type="material-community"
                      name="trash-can-outline"
                      size={35}
                      color={'white'}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {isLoading ? (
        <View>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <View>
          <IconButton
            icon={icons.back}
            containerStyle={styles.backArrow}
            onPress={() => navigation.goBack()}
          />
          {renderContent()}
        </View>
      )}
    </View>
  );
};

export default AddtoCartScreen;

const styles = StyleSheet.create({
  swipeAble: {
    height: 100,
    backgroundColor: 'red',
    width: width(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  Skeleton: {
    flex: 1,
    marginHorizontal: totalSize(2),
  },
  backArrow: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: SIZES.radius,
    marginTop: SIZES.radius,
  },
});
