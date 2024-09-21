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
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawer from './components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab Navigator (Bottom Navigation)
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: '#AD40AF' },
      tabBarInactiveTintColor: '#fff',
      tabBarActiveTintColor: 'yellow',
    }}>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Favorite" 
      component={FavoriteScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Cart" 
      component={CartScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="shopping-bag" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Drawer Navigator (Side Menu Navigation)
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}>
    <Drawer.Screen 
      name="HomeTabs" 
      component={TabNavigator}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Messages" 
      component={MessagesScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Moments" 
      component={GameDetailsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="timer-outline" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="settings-outline" size={22} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

// Auth Stack (Onboarding/Login/Register)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Home DrawerNavigator (with Tab and Drawer) accessible to all users */}
          <Stack.Screen name="Main" component={DrawerNavigator} />

          {/* Authentication Flow */}
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
