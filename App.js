import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RelaxAndCodeScreen from './src/screens/RelaxAndCodeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RelaxAndCode">
        <Stack.Screen
          name="RelaxAndCode"
          component={RelaxAndCodeScreen}
          options={{ title: 'Relax and Code' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
