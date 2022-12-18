import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../App';
import {width} from 'react-native-dimension';
import Modal from 'react-native-modal';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import IconButton from '../../components/Button/IconButton';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import ImagesSwiper from 'react-native-image-swiper';
import TextButton from '../../components/Button/TextButton';
const OnVIewDetailScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [favourite, setFavourite] = useState('');
  const [dummmydata, setdummyData] = useState();
  const {userId} = useContext(AuthContext);
  const {item} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleModal1 = () => setModalVisible1(!isModalVisible1);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('Favourite')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setFavourite(documentSnapshot.data());
        setIsLoading(favourite);
      });
    return () => subscriber();
  }, []);
  console.log('userid', userId);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('AddToCart')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setData(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('dummyData')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setdummyData(documentSnapshot.data());
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);
  const onStoreAddToCart = () => {
    setIsLoading(true);
    data
      ? firestore()
          .collection('AddToCart')
          .doc(userId)
          .update({
            AddToCart: firestore.FieldValue.arrayUnion({
              item: item,
            }),
          })
          .then(() => {
            toggleModal();
            setIsLoading(false);
            console.log('created List of addtoCart');
          })
      : firestore()
          .collection('AddToCart')
          .doc(userId)
          .set({
            AddToCart: firestore.FieldValue.arrayUnion({
              item: item,
            }),
          })
          .then(() => {
            toggleModal();
            setIsLoading(false);
            console.log('Updated List of addtoCart');
          });
  };

  const onStoreWishList = () => {
    setIsLoading(true);
    favourite
      ? firestore()
          .collection('Favourite')
          .doc(userId)
          .update({
            Favourite: firestore.FieldValue.arrayUnion({
              item: item,
            }),
          })
          .then(() => {
            setIsLoading(false);
            toggleModal1();
            console.log('created wish list');
          })
      : firestore()
          .collection('Favourite')
          .doc(userId)
          .set({
            Favourite: firestore.FieldValue.arrayUnion({
              item: item,
            }),
          })
          .then(() => {
            toggleModal1();
            setIsLoading(false);
            console.log('updated wish list');
          });
  };
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <IconButton
          icon={icons.back}
          containerStyle={styles.backArrow}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon={icons.heart}
          iconStyle={{tintColor: COLORS.secondary}}
          containerStyle={styles.heart}
          onPress={() => onStoreWishList()}
        />
      </View>
    );
  };
  const renderSwiper = () => {
    return (
      <View style={styles.swiperContainer}>
        <ImagesSwiper
          images={item.Swiper}
          autoplay={true}
          autoplayTimeout={3}
          showsPagination={true}
          width={width(90)}
          height={width(90)}
        />
      </View>
    );
  };
  const renderModalSection = () => {
    return (
      <View>
        <Modal isVisible={isModalVisible}>
          <TouchableOpacity style={styles.modal}>
            <Text style={{...FONTS.body3, color: COLORS.primary3}}>
              Add TO Cart
            </Text>
            <IconButton
              icon={icons.checked}
              iconStyle={styles.modalIcon}
              containerStyle={{backgpadding: SIZES.base}}
              onPress={() => toggleModal()}
            />
          </TouchableOpacity>
        </Modal>
        <Modal isVisible={isModalVisible1}>
          <TouchableOpacity style={styles.modal}>
            <Text style={{...FONTS.body3, color: COLORS.primary3}}>
              Add To Wish List
            </Text>
            <IconButton
              icon={icons.checked}
              iconStyle={styles.modalIcon}
              containerStyle={{backgpadding: SIZES.base}}
              onPress={() => toggleModal1()}
            />
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };
  const renderDetailsInfo = () => {
    return (
      <View style={{margin: SIZES.radius}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price ${item.price}</Text>
        <Text style={styles.keyfeatures}>Key_Features</Text>
        <Text style={styles.info}>{item.keyfeatures}</Text>
        <View style={styles.buttonContainer}>
          <TextButton
            label={'By Now'}
            labelStyle={{...FONTS.h3}}
            containerStyle={styles.button}
            onPress={() => navigation.navigate('orderDetails', {item: item})}
          />
          <TextButton
            label={'Add To Cart'}
            labelStyle={{...FONTS.h3}}
            containerStyle={styles.button}
            onPress={() => onStoreAddToCart()}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={COLORS.black} />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderHeader()}
            {renderSwiper()}
            {renderDetailsInfo()}
          </ScrollView>
        </>
      )}
      {renderModalSection()}
    </View>
  );
};

export default OnVIewDetailScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  backArrow: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  swiperContainer: {
    height: width(100),
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.primary3,
    ...FONTS.h3,
  },
  price: {
    ...FONTS.h2,
    color: COLORS.primary3,
  },
  keyfeatures: {
    ...FONTS.h2,
    color: COLORS.primary3,
    marginTop: SIZES.padding,
  },
  info: {
    ...FONTS.body3,
    color: COLORS.primary3,
    marginBottom: SIZES.radius,
  },
  button: {
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
  },
  modal: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
    elevation: 5,
  },
  modalIcon: {
    tintColor: COLORS.primary3,
    marginHorizontal: SIZES.radius,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.padding,
  },
});
