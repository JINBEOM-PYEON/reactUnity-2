import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FashionShowScreen from './screens/FashionShowScreen';
import SearchScreen from './screens/SearchScreen';
import MyPageScreen from './screens/MyPageScreen'; 
import BrandDetailScreen from './screens/BrandDetailScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'; // ProductDetailScreen 추가
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FashionShowScreen"
          component={FashionShowScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BrandDetailScreen"
          component={BrandDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPageScreen"
          component={MyPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetailScreen" // ProductDetailScreen 추가
          component={ProductDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}  // <-- 추가된 부분
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
