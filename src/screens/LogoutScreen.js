import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/slices/authSlice';
import { CommonActions } from '@react-navigation/native';

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
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
  }, [dispatch, navigation]);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Set loading state
    console.log("Logging out..."); // Debugging line
  
    try {
      // Dispatch the logout action to clear Redux store
      console.log("Dispatching logout action...");
      dispatch(logout());
  
      // Clear AsyncStorage token
      console.log("Removing token from AsyncStorage...");
      await AsyncStorage.removeItem('userToken');
  
      // Reset navigation to the AuthStack (which includes LoginScreen)
      console.log("Resetting navigation to Login screen...");
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Resetting to the first route
          routes: [{ name: 'Login' }], // Resetting to AuthStack
        })
      );
  
      console.log("Logout process completed."); // Final debug statement
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
