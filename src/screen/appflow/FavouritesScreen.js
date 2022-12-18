import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ProductCard from '../../components/Cards/ProductCard';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../App';
import {width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Skeleton from '../../components/Skeleton';
import {COLORS, SIZES} from '../../constants';

const FavouritesScreen = ({route, navigation}) => {
  // const {title, price, image, keyfeatures, rating} = route.params;
  const [data, setData] = useState([]);
  const {userId} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('Favourite')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);

  const updateData = (object, index) => {
    console.log('ggggggggggggg', object.numberOfStock, index);
    object.numberOfStock = object.numberOfStock - 1;
    const updatedArray = [...data.userData];
    updatedArray[index] = object;
    console.log('gggggggggggddddddddddddddd', updatedArray);
    firestore().collection('dummyData').doc('userId').set({
      userData: updatedArray,
    });
  };
  const deleteItem = object => {
    firestore()
      .collection('Favourite')
      .doc(userId)
      .update({Favourite: firestore.FieldValue.arrayRemove(object)});
  };
  const renderContent = () => {
    return (
      <View>
        <FlatList
          data={data?.Favourite}
          renderItem={({item, index}) => (
            <View>
              <ProductCard
                containerStyle={{
                  marginHorizontal: SIZES.radius,
                  marginTop: index == 0 ? SIZES.radius : 0,
                  marginBottom: SIZES.radius,
                  borderRadius: SIZES.padding * 0.8,
                }}
                item={item.item}
                onViewDetail={() =>
                  navigation.navigate('Detail of your product', {
                    item: item.item,
                  })
                }
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
                        {text: 'OK', onPress: () => deleteItem(item)},
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
      </View>
    );
  };
  return (
    <View>
      {isLoading ? (
        <View>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        renderContent()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swipeAble: {
    height: 150,
    marginTop: 150,
    backgroundColor: 'red',
    width: width(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: SIZES.height,
  },
});
export default FavouritesScreen;
