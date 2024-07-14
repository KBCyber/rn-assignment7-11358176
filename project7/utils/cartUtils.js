// utils/cartUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const addToCart = async (product) => {
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
