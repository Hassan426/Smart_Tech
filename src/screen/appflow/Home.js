import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../.././components/Cards/ProductCard';
import {AuthContext} from '../../../App';
import Skeleton from '../../components/Skeleton';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {dummyData} from '../../constants';
import TextButton from '../../components/Button/TextButton';
import IconButton from '../../components/Button/IconButton';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  // console.log('ggggggggggggggggggggggggggg', dummyData);
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [dummmydata, setdummyData] = useState();

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [addToCart, setAddToCart] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {userId} = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection('dummyData')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setdummyData(documentSnapshot.data());
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('Admin')
      .doc('userId')
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ///////////', documentSnapshot.data());
        setData(documentSnapshot.data());
        setIsLoading(false);
      });
    // console.log('///////////////', data);
    return () => subscriber();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('AddToCart')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data:kkkk ', documentSnapshot.data());
        setAddToCart(documentSnapshot.data());
        setIsLoading(false);
      });
    // console.log('///////////////', data);
    return () => subscriber();
  }, []);
  // useEffect(() => {
  //   setFilteredDataSource(Data);
  //   setMasterDataSource(Data);
  // }, []);
  // const searchFilterFunction = text => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = masterDataSource.filter(function (item) {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFilteredDataSource(masterDataSource);
  //     setSearch(text);
  //   }
  // };

  // console.log('lenght', data);
  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <IconButton icon={icons.magnify} iconStyle={styles.magnify} />
        <TextInput
          placeholder="Type here..."
          placeholderTextColor={COLORS.primary3}
          autoCapitalize="none"
          style={{width: '100%'}}
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <View style={{position: 'absolute', right: 0}}>
          <IconButton icon={icons.cross} iconStyle={styles.cross} />
        </View>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <FlatList
              horizontal
              data={dummyData?.Categories}
              renderItem={({item, index}) => (
                <TextButton
                  label={item.title}
                  labelStyle={{...FONTS.body3, color: COLORS.primary3}}
                  onPress={() =>
                    navigation.navigate('List of Items', {
                      item: item.Lists,
                    })
                  }
                  containerStyle={{
                    paddingVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius * 2,
                    borderRadius: SIZES.radius * 2,
                    backgroundColor: COLORS.gray20,
                    marginLeft: index == 0 ? SIZES.radius : SIZES.padding,
                    marginRight:
                      index == dummyData.Categories.length - 1
                        ? SIZES.radius
                        : 0,
                  }}
                />
              )}
            />
          }
          data={dummmydata?.userData}
          renderItem={({item, index}) => (
            <View>
              <ProductCard
                containerStyle={{
                  marginHorizontal: SIZES.radius,
                  marginTop: index == 0 ? SIZES.padding : 0,
                  marginBottom: SIZES.padding,
                  marginHorizontal: SIZES.radius,
                  borderRadius: SIZES.padding * 0.8,
                }}
                item={item}
                onViewDetail={() =>
                  navigation.navigate('Detail of your product', {
                    item: item,
                  })
                }
              />
            </View>
          )}
        />
      </View>
    );
  };
  return (
    <View style={{}}>
      <ScrollView></ScrollView>
      {renderSearchBar()}
      {isLoading ? (
        <View>
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <>{renderContent()}</>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base * 0.5,
    elevation: 4,
    borderRadius: SIZES.radius,
    margin: SIZES.radius,
  },
  magnify: {
    marginHorizontal: SIZES.radius,
    tintColor: COLORS.primary3,
    width: 25,
    height: 25,
  },
  cross: {
    marginHorizontal: SIZES.radius,
    tintColor: COLORS.primary3,
    width: 18,
    height: 18,
  },
});
