import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../App';
import Modal from 'react-native-modal';
import {width, height, totalSize} from 'react-native-dimension';
import Colors from '../../constants/Colors';
import AlertCard from '../../components/Cards/AlertCard';
import Stripe from 'react-native-stripe-api';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../constants/images';
import PaymentIcon from '../../components/PaymentIcon';
import Modals from '../../components/Modals';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppText from '../../components/Text';
import {COLORS, FONTS, SIZES} from '../../constants';
import TextButton from '../../components/Button/TextButton';
import TextInputs from '../../components/TextInput';

const PaymentScreen = ({route, navigation}) => {
  // MasterCard. 5105105105105100 ,
  // paypal. 4111111111111111,
  // visa 4242424242424242

  const {item, values, counter, totalPrice} = route.params;
  console.log(
    'ggggggggggggggggggggggggg//////////////',
    JSON.stringify(item, null, 2),
  );
  const updatedData = () => {
    const a = dummmydata?.userData.findIndex(x => x.id === item.id);
    console.log('ggggggggggggggsssssss', a);
    // const numberOfStock = dummmydata?.userData.find(x => x.id === item.id);

    // console.log('findindexofDummydata', numberOfStock.numberOfStock);
    // console.log('Numberofstock', item.numberOfStock, 'indexxxxxxxx', item.id);
    item.numberOfStock = item.numberOfStock - counter;
    const updatedArray = [...dummmydata.userData];
    updatedArray[a] = item;
    console.log('gggggggggggddddddddddddddd', updatedArray);
    firestore().collection('dummyData').doc('userId').set({
      userData: updatedArray,
    });
  };
  JSON.stringify(item, null, 2);
  const {userId} = useContext(AuthContext);
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [adminData, setAdminData] = useState();
  const [dummmydata, setdummyData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleModal1 = () => setModalVisible1(!isModalVisible1);
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('dummyData')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        setdummyData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('placeOrder')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('AuthData')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setAdminData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);
  // console.log('dddddddddddddddd', adminData);
  useEffect(() => {
    const subscriber = firestore()
      .collection('orderList')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);
  // console.log('loggggggggggggggggg', userData);

  const onSubmit = async values => {
    console.log('ggggggggggg', values);
    setIsLoading(true);
    // this.setState({loading: true});

    // const apiKey = 'pk_test_vArD0VAS7hAFdpSxOFG3Rxcc00Shqwwmbd';
    const apiKey =
      'pk_test_51LQVgjBMO4v4Is7LIFI9s2L9gNj96pAnmuqydYxodRxAsQYLOz1iGIDtl8GqMQqx2yeQgVR87xAeGP28B3cixi9400CVArVqeK';
    const client = new Stripe(apiKey);

    const token = await client
      .createToken({
        number: values.cardNumber,
        // card_number.replace(/ /g, ''),
        exp_month: values.month,
        //  expiry.split('/')[0],
        exp_year: values.year,
        // expiry.split('/')[1],
        cvc: values.cvc,
        // cvc,
        address_zip: '12345',
      })
      .then(async i => {
        console.log('create card response:', i);

        if (i.error) {
          alert(i.error.message);
          console.log(i.error.message);
          setIsLoading(false);
          // this.setState({loading: false});
        } else {
          charge(i.id);
          console.log('fffffffff', values);
        }
      })
      .catch(err => {
        console.log('create card error:', err);
        setIsLoading(false);
        // alert(err.error.message);
        // this.setState({loading: false});
      });
  };

  const charge = async (i, account) => {
    console.log('DOes it even come here');
    var original_pay_amount = 0;

    let amount = totalPrice;
    amount = amount * 100;

    console.log('id:', i);
    const body = {};
    (body['amount'] = amount),
      (body['currency'] = 'usd'),
      (body['source'] = i),
      (body[
        'description'
      ] = `The user ${values.name} paid ${item.title} charges.`);

    // if (event.entry) {
    let data = await fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data in request body
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer sk_test_51LQVgjBMO4v4Is7LRHMmUEPOTsvWdQSUpJrb7LkDH4cyB2Wb5yI3NJg99CVhsYkBjlocuMBpc46C48CtUycNPGxq00uMB7H9Dz`,

        // "Stripe-Account": account
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(body)
        .map(key => key + '=' + body[key])
        .join('&'),
    });

    let commits = await data.json().then(async response => {
      console.log(response);
      if (response.status == 'succeeded') {
        console.log('Paid succesfully');
        // alert('Paid succesfully');
        placeYourOrder();
      } else {
        console.log('Error:', response.error.message);
        alert('something went wrong');
      }
    });
  };
  const toggleModals = () => {
    toggleModal1();
    toggleModal();
  };
  const placeYourOrder = () => {
    try {
      data
        ? firestore()
            .collection('placeOrder')
            .doc(userId)
            .update({
              placeOrder: firestore.FieldValue.arrayUnion({
                item: item || 'item',
                values: values || 'values',
                counter: counter || 'coutner',
                totalPrice: totalPrice || 'totalPrice',
                orderplacedDate: currentDate || 'currentDate',
                paymentStatus: 'paid',
              }),
            })
            .then(() => {
              console.log('User Updated');
              toggleModal();
            })
            .catch(e => {
              setIsLoading(false);
              console.log('errorrrrrrr', e);
            })
        : firestore()
            .collection('placeOrder')
            .doc(userId)
            .set({
              placeOrder: firestore.FieldValue.arrayUnion({
                item: item || 'item',
                values: values || 'values',
                counter: counter || 'counter',
                totalPrice: totalPrice || 'totalPrice',
                orderplacedDate: currentDate || 'totalPrice',
                paymentStatus: 'paid',
              }),
            })
            .then(() => {
              console.log('User Created');
              toggleModal();
            })
            .catch(e => {
              setIsLoading(false);
              console.log('errorrrrrrr', e);
            });
    } catch (error) {
      setIsLoading(false);
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', error);
    }
  };

  const navigate = values => {
    toggleModal();
    navigation.navigate('HomeScreen');
  };
  // console.log('bbbbbbbbbbbbbbbbbb', totalPrice);
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required().min(16).max(16).label('cardNumber'),
    month: Yup.string().required().min(2).max(2).label('month'),
    year: Yup.string().required().min(2).max(2).label('year'),
    cvc: Yup.string().required().min(3).max(3).label('cvc'),
  });
  return (
    <ScrollView style={styles.main}>
      <Modal isVisible={isModalVisible}>
        <AlertCard
          title={item.title}
          image={item.image}
          price={totalPrice}
          status={'OK'}
          orderDeliver={navigate}
        />
      </Modal>
      <Modal isVisible={isModalVisible1}>
        <Modals price={totalPrice} onPress={toggleModals} />
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headertitle}>Pay to Proceed ${totalPrice}</Text>
      </View>
      <Formik
        initialValues={{cardNumber: '', year: '', month: '', cvc: ''}}
        onSubmit={values => onSubmit(values)}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldError,
          errors,
          touched,
        }) => (
          <View style={styles.cardContainer}>
            <TextInputs
              placeholder="Enter your card number of 16 digit"
              onChangeText={handleChange('cardNumber')}
              onBulr={() => setFieldTouched('cardNumber')}
              placeholderTextColor={COLORS.gray30}
              containerStyle={styles.textInputStyles}
              keyboardType="number-pad"
            />
            <AppText error={errors.cardNumber} visible={touched.cardNumber} />
            <TextInputs
              placeholder="Enter your expiry month "
              keyboardType="number-pad"
              placeholderTextColor={COLORS.gray30}
              onChangeText={handleChange('month')}
              onBulr={() => setFieldTouched('month')}
              containerStyle={styles.textInputStyles}
            />
            <AppText error={errors.month} visible={touched.month} />
            <TextInputs
              placeholder="Enter your expiry Year"
              keyboardType="number-pad"
              placeholderTextColor={COLORS.gray30}
              onChangeText={handleChange('year')}
              onBulr={() => setFieldTouched('year')}
              containerStyle={styles.textInputStyles}
            />
            <AppText error={errors.year} visible={touched.year} />
            <TextInputs
              placeholder="Enter your CVC "
              keyboardType="number-pad"
              placeholderTextColor={COLORS.gray30}
              onChangeText={handleChange('cvc')}
              onBulr={() => setFieldTouched('cvc')}
              containerStyle={styles.textInputStyles}
            />
            <AppText error={errors.cvc} visible={touched.cvc} />
            <TextButton
              label={'CheckOut'}
              containerStyle={styles.buttonStyles}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  buttonStyles: {
    marginVertical: SIZES.padding,
    height: SIZES.padding * 2,
    borderRadius: SIZES.padding,
    marginHorizontal: SIZES.radius,
  },
  header: {
    height: height(30),
    backgroundColor: COLORS.primary3,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: SIZES.padding * 2,
    borderBottomLeftRadius: SIZES.padding * 2,
  },
  cardContainer: {marginHorizontal: SIZES.radius, marginTop: SIZES.padding * 2},
  headertitle: {
    ...FONTS.h1,
    color: 'white',
  },
  main: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  title: {
    marginLeft: SIZES.radius,
    marginBottom: SIZES.radius * 0.5,
    marginTop: SIZES.radius,
    color: COLORS.primary3,
    ...FONTS.body3,
  },
  textInputStyles: {
    borderBottomWidth: 2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.radius,
  },
});
