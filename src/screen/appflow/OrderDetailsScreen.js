import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import NumericInput from 'react-native-numeric-input';
import IconButton from '../../components/Button/IconButton';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import TextButton from '../../components/Button/TextButton';
const OrderDetailsScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [counter, setCounter] = useState(1);
  const fiveDollar = 3;
  const GrandTotal = () => {
    const subTotals = counter * item.price;
    const shipingCost = subTotal + fiveDollar;
    setTotalPrice(shipingCost);
    setSubTotal(subTotals);
  };
  useEffect(() => {
    GrandTotal();
  }, [counter, subTotal]);
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <IconButton
            icon={icons.back}
            containerStyle={{
              padding: SIZES.padding,
            }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.cart}>Order Detail</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
              source={item.image}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <NumericInput
              value={counter}
              onChange={value => setCounter(value)}
              rightButtonBackgroundColor={COLORS.primary}
              leftButtonBackgroundColor={COLORS.primary}
              valueType="real"
              totalWidth={150}
              totalHeight={30}
              minValue={1}
              maxValue={5}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderInfoSection = () => {
    return (
      <View style={{marginHorizontal: SIZES.radius}}>
        <Text style={styles.keyfeatures}>Keyfeatures </Text>
        <Text style={styles.features}>{item.keyfeatures}</Text>
        <Text style={styles.orderInfo}>Order Charges</Text>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.info}>Sub Total</Text>
          <Text style={styles.info}>${subTotal}</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.info}>Shiping Cost</Text>
          <Text style={styles.info}>$3 </Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.info}>Total</Text>
          <Text style={styles.info}>${totalPrice?.toFixed(0)}</Text>
        </View>
        <TextButton
          label={'Continue'}
          containerStyle={styles.buttonStyles}
          onPress={() =>
            navigation.navigate('shiping', {
              item: item,
              totalPrice: totalPrice,
              counter: counter,
            })
          }
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.main}>
        {renderHeader()}
        {renderInfoSection()}
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cart: {
    ...FONTS.h1,
    color: COLORS.primary3,
    marginLeft: SIZES.padding * 1.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.primary3,
  },
  imageContainer: {
    width: '35%',
    height: 130,
    borderWidth: 3,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  titleContainer: {
    justifyContent: 'space-between',
    height: 130,
    width: '56%',
  },
  orderInfo: {
    ...FONTS.h2,
    marginTop: SIZES.base,
    color: COLORS.primary3,
  },
  info: {
    ...FONTS.h4,
    marginBottom: SIZES.base,
    color: COLORS.primary3,
  },
  orderInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyfeatures: {
    ...FONTS.h2,
    marginTop: SIZES.radius,
    color: COLORS.primary3,
  },
  features: {
    ...FONTS.body4,
    color: COLORS.primary3,
  },
  buttonStyles: {
    marginVertical: SIZES.padding,
    height: SIZES.padding * 2,
    borderRadius: SIZES.padding,
  },
});
