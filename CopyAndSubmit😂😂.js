import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RelaxAndCodeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sit down, relax, and write your own code!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default RelaxAndCodeScreen;


/* Shey you dey wine😎😎😎😎*/
