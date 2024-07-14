import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const productExists = cart.some(item => item.id === product.id);
      if (productExists) {
        Alert.alert('Product is already in the cart');
      } else {
        cart.push(product);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        Alert.alert('Product successfully added to cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/Menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.headerRight}>
          <Icon name="search-outline" size={30} color="#000" style={styles.headerIcon} />
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <Icon name="bag-outline" size={30} color="#000" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.title}>OUR STORY</Text>
        <View style={styles.iconContainer}>
          <View style={styles.icong}><Image source={require('../assets/Listview.png')} style={styles.icon} /></View>
          <View style={styles.icong}><Icon name="filter" size={25} color="#dd8560" style={styles.headerIcon} /></View>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.product} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
            <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={styles.imageStyle}>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <Image source={require('../assets/add.png')} style={styles.addicon} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
            <Text style={styles.productDesc} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'relative',
  },
  headerIcon: {
    marginLeft: 15,
  },
  menuIcon: {
    marginLeft: 1,
    height: 23,
    width: 23,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    top: 20,
    transform: [{ translateX: -100 }],
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '350',
    lineHeight: 24,
    letterSpacing: 5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  productList: {
    paddingHorizontal: 10,
  },
  addicon: {
    margin: 10,
    height: 25,
    width: 25,
  },
  product: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'contain',
  },
  addIcon: {
    margin: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productDesc: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560',
  },
});

export default HomeScreen;