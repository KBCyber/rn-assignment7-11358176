import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { addToCart } from '../utils/cartUtils';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.sectionTitle}>MATERIALS</Text>
        <Text style={styles.productDesc}>{product.description}</Text>
        <View style={styles.materials}>
          <View style={styles.materialRow}>
            <Icon name="water-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.materialText}>Do not use bleach</Text>
          </View>
          <View style={styles.materialRow}>
            <Icon name="sunny-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.materialText}>Do not tumble dry</Text>
          </View>
          <View style={styles.materialRow}>
            <Icon name="shirt-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.materialText}>Dry clean with tetrachloroethylene</Text>
          </View>
          <View style={styles.materialRow}>
            <Icon name="thermometer-outline" size={20} color="#000" style={styles.icon} />
            <Text style={styles.materialText}>Iron at a maximum of 110°C/230°F</Text>
          </View>
        </View>
        <View style={styles.shippingContainer}>
          <Icon name="car-outline" size={20} color="#000" style={styles.icon} />
          <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
          <Text style={styles.shippingText}>Estimated to be delivered on 09/11/2021 - 12/11/2021</Text>
        </View>
        <TouchableOpacity style={styles.addToBasketButton} onPress={() => addToCart(product)}>
          <Text style={styles.addToBasketText}>ADD TO BASKET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dd8560',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDesc: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  materials: {
    marginBottom: 20,
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  materialText: {
    fontSize: 16,
  },
  shippingContainer: {
    marginBottom: 20,
  },
  shippingText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  addToBasketButton: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  addToBasketText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
