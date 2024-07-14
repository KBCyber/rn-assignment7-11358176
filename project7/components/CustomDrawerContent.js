import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      {/* Add custom links or buttons here */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logout')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
