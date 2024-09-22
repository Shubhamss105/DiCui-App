import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/slices/authSlice';
import { useFocusEffect } from '@react-navigation/native';

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // This hook triggers every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const showAlert = () => {
        Alert.alert(
          "Confirm Logout",
          "Do you really want to logout?",
          [
            {
              text: "No",
              onPress: () => navigation.goBack(),
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: handleLogout
            }
          ]
        );
      };

      showAlert();
    }, [navigation]) 
  );

  const handleLogout = async () => {
    setIsLoggingOut(true);
  
    try {

      dispatch(logout());

      await AsyncStorage.removeItem('userToken');
      
      navigation.navigate('Login');
  
    } catch (error) {
      console.error("Logout Error: ", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggingOut ? (
        <>
          <ActivityIndicator size="large" color="#AD40AF" />
          <Text className='text-black'>Logging out, please wait...</Text>
        </>
      ) : (
        <Text className='text-black'>Preparing to log out...</Text>
      )}
    </View>
  );
};

export default LogoutScreen;
