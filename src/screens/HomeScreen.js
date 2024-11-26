import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Home/Header.jsx';

export default function HomeScreen({ navigation }) {
  const [scanning, setScanning] = useState(false);

  const handleQRCodeScan = () => {
    setScanning(true);
  };

  const onQRCodeRead = (e) => {
    const scannedData = e.data;
    console.log('Scanned QR Code data:', scannedData);
    setScanning(false);
  };

  const handleCloseScanner = () => {
    setScanning(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1">
        <Header navigation={navigation} />
        <View className="px-4">
          {/* Conditionally render QR code scanner */}
          {scanning ? (
            <View className="relative">
              <QRCodeScanner
                onRead={onQRCodeRead}
                flashMode="auto"
                topContent={
                  <Text className="text-white text-xl">Scan the QR Code</Text>
                }
                bottomContent={
                  <Text className="text-white text-lg">
                    Please scan the QR Code to continue.
                  </Text>
                }
                containerStyle={{
                  height: '80%',
                  padding: 20,
                }}
              />
              {/* Close button (cross icon) */}
              <TouchableOpacity
                onPress={handleCloseScanner}
                className="absolute top-2 left-4 z-10"
              >
                <Icon name="close" size={40} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <Pressable
              className="bg-secondary h-28 flex-row space-x-4 items-center justify-center rounded-2xl"
              onPress={handleQRCodeScan}
            >
              <Icon name="qr-code-sharp" size={48} color="white" />
              <Text className="text-white text-2xl font-medium">
                Scan QR Code
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
