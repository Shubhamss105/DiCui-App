import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Header = ({navigation}) => {
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to work properly.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
  
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
          getLocation();
        } else if (permission === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Permission denied');
          Alert.alert(
            'Permission Denied',
            'Location access is required. Please allow it to continue.',
          );
        } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Permission denied permanently');
          Alert.alert(
            'Permission Permanently Denied',
            'Location access is required. Please enable it from app settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      } else {
        const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  
        if (permission === RESULTS.GRANTED) {
          console.log('Permission granted');
          getLocation();
        } else if (permission === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (requestResult === RESULTS.GRANTED) {
            getLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location access is required. Please allow it to continue.',
            );
          }
        } else if (permission === RESULTS.BLOCKED) {
          Alert.alert(
            'Permission Permanently Denied',
            'Location access is required. Please enable it from app settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'An error occurred while requesting location permission.');
    }
  };
  
  
  
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  

  return (
    <View className="flex px-4 mb-2">
      <View className="flex flex-row items-center justify-between mt-4">
        <View className="flex-row items-center">
          <Ionicons name="location" size={24} color="white" />
          <Text className="text-white text-sm font-semibold ml-2">
            {location}
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Ionicons
            name="notifications"
            size={24}
            color="#FFF"
            style={{marginLeft: 'auto'}}
          />
        </Pressable>
      </View>

      <View className="flex flex-row justify-center items-center my-4 space-x-2">
        <View className="flex flex-row w-full items-center justify-center  bg-white h-12 border-gray-200 rounded-xl p-1">
          <Ionicons name="search" size={24} color="gray" className="mx-4" />
          <TextInput
            className="flex-1 -mt-[2px]"
            placeholder="Find for food or restaurant..."
            placeholderTextColor="gray"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
