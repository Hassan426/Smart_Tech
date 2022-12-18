import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/Cards/ProductCard';
import {icons, SIZES} from '../../constants';
import IconButton from '../../components/Button/IconButton';
const OnViewCategoriesList = ({navigation, route, params}) => {
  const {item} = route.params;
  const renderCategories = () => {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item}
          renderItem={({item, index}) => (
            <View>
              <ProductCard
                item={item}
                containerStyle={{
                  marginTop: index == 0 ? SIZES.padding : 0,
                  marginBottom: SIZES.padding,
                  marginHorizontal: SIZES.radius,
                  borderRadius: SIZES.padding * 0.8,
                }}
              />
            </View>
          )}
        />
      </View>
    );
  };
  return (
    <View>
      <IconButton
        icon={icons.back}
        containerStyle={styles.backArrow}
        onPress={() => navigation.goBack()}
      />
      {renderCategories()}
    </View>
  );
};

export default OnViewCategoriesList;

const styles = StyleSheet.create({
  backArrow: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: SIZES.radius,
    marginTop: SIZES.radius,
  },
});
