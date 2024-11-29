import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Pressable, View, Text, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import Header from '../components/Home/Header.jsx';
import QRScanner from '../components/Home/QRScanner.jsx';
import Banner from '../components/Home/Banner.jsx';

export default function HomeScreen({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [scannedLink, setScannedLink] = useState('');

  // Handle QR scanner opening
  const handleQRCodeScan = () => {
    setScanning(true); // Open the scanner
  };

  // Handle QR scanner closing
  const handleQRCodeClose = () => {
    setScanning(false); // Close the scanner
  };

  const handleQRCodeResult = (data) => {
    setScannedLink(data);
  };

  useEffect(() => {
    const getFCMToken = async () => {
      // Request permission for push notifications
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token); // Log the FCM token for debugging
      } else {
        console.warn('Push notification permissions not granted.');
      }
    };

    // Check FCM token
    getFCMToken();

    // Foreground message handler
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log('Notification received in foreground:', remoteMessage);
      // Show a toast message instead of an alert
      const { title, body } = remoteMessage.notification || {};
      if (title && body) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(`${title}: ${body}`, ToastAndroid.LONG);
        } else {
          console.log(`${title}: ${body}`); // For iOS, replace with a library like react-native-toast-message
        }
      }
    });

    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log('Notification received in background:', remoteMessage);
    // });

    // Notification opened from a quit state
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      if (remoteMessage?.data?.route) {
        navigation.navigate(remoteMessage.data.route); // Navigate to specific screen
      }
    });

    // Check if app was opened by a notification when it was terminated
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
          if (remoteMessage?.data?.route) {
            navigation.navigate(remoteMessage.data.route); // Navigate to specific screen
          }
        }
      });

    return () => {
      // Cleanup the foreground listener
      unsubscribeForeground();
    };
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1">
        <Header navigation={navigation} />
        <View className="px-4">
          <Banner />
          {scanning ? (
            <QRScanner onClose={handleQRCodeClose} onScan={handleQRCodeResult} />
          ) : (
            <Pressable
              className="bg-secondary h-28 my-2 flex-row space-x-4 items-center justify-center rounded-2xl"
              onPress={handleQRCodeScan}>
              <Icon name="qr-code-sharp" size={48} color="white" />
              <Text className="text-white text-2xl font-medium">
                Scan QR Code
              </Text>
            </Pressable>
          )}
          {scannedLink ? <Text>{scannedLink}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
