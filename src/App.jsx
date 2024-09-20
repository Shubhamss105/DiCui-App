import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import store from './redux/store';

// Screens
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import GameDetailsScreen from './screens/GameDetailsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import MomentsScreen from './screens/MomentsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawer from './components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Define your main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorite" component={FavoriteScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
  </Tab.Navigator>
);

// Define the Auth Stack (Onboarding/Login/Register)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main App
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Home TabNavigator available to both authenticated and non-authenticated users */}
          <Stack.Screen name="Main" component={TabNavigator} />

          {/* Auth Stack that user can access anytime */}
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
