import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Pressable, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1">
        <Header navigation={navigation} />
        <View className="px-4">
          <Banner/>
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
          {/* {scannedLink ? <Text>{scannedLink}</Text> : null} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
