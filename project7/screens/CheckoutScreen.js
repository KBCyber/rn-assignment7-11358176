import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        setCartItems(cart);
        calculateTotal(cart);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(total);
  };

  const removeFromCart = async (id) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      setTotal(0);
      Alert.alert('All items have been checked out');
    } catch (error) {
      console.error(error);
    }
    
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon />
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.headerRight}>
          <Icon name="search-outline" size={30} color="#000" style={styles.headerIcon} />
        </View>
      </View>
      <View style={styles.checkoutTitleContainer}>
        <Text style={styles.checkoutTitle}>CHECKOUT</Text>
        <View style={styles.titleUnderline}>
          <View style={styles.line} />
          <View style={styles.diamond} />
          <View style={styles.line} />
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.productDesc} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Icon name="close-circle-outline" size={30} color="red" style={styles.removeIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>EST. TOTAL</Text>
          <Text style={styles.totalAmount}>${total}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Icon name="bag-outline" size={24} color="#fff" />
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 2,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutTitleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  checkoutTitle: {
    fontSize: 24,
    fontWeight: '350',
    lineHeight: 24,
    letterSpacing: 10,
  },
  titleUnderline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: '#ccc',
  },
  diamond: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: "#ccc",
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDesc: {
    fontSize: 16,
    color: '#555555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560',
  },
  removeIcon: {
    marginLeft: 150,
  },
  footer: {
    backgroundColor: '#000',
    alignItems: 'center',
  },
  total: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
    paddingLeft: 20,
    marginBottom: 1,
  },
  totalText: {
    padding: 10,
    paddingRight: 10,
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '700',
    color: '#000',
  },
  totalAmount: {
    padding: 10,
    paddingRight: 10,
    fontSize: 18,
    letterSpacing: 5,
    fontWeight: '400',
    color: '#dd8560',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderWidth: 1,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CheckoutScreen;
