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
import GradientWrapper from '../components/GradientWrapper.js';

export default function HomeScreen({navigation}) {

  const handleQRCodeScan = () => {
    // Navigate to QR Scanner screen or add QR Scanner functionality
    navigation.navigate('QRScanner');
  };


  return (
    <GradientWrapper>
      <SafeAreaView className=" flex-1">
    <ScrollView className='flex-1 '>
    <Header navigation={navigation}/>
    <View className="px-4 py-2">
            <Pressable
              className="bg-[#2c2c2e] flex-row items-center justify-center rounded-lg py-4"
              onPress={handleQRCodeScan}
            >
              <Icon name="qr-code-sharp" size={48} color="white" />
              <Text className="text-white text-2xl font-medium ml-2">
                Scan QR Code
              </Text>
            </Pressable>
          </View>
     
    </ScrollView>
  </SafeAreaView>
    </GradientWrapper>
  );
}