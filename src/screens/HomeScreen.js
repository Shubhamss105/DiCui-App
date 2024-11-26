import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Home/Header.jsx';

export default function HomeScreen({navigation}) {
  const handleQRCodeScan = () => {
    // Navigate to QR Scanner screen or add QR Scanner functionality
    navigation.navigate('QRScanner');
  };

  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView className="flex-1 ">
        <Header navigation={navigation} />
        <View className="px-4">
          <Pressable
            className="bg-secondary flex-row space-x-4 items-center justify-center rounded-2xl py-4"
            onPress={handleQRCodeScan}>
            <Icon name="qr-code-sharp" size={48} color="white" />
            <Text className="text-white text-2xl font-medium">
              Scan QR Code
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
