import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { verifyOtp } from '../redux/slices/authSlice';

const OTPScreen = ({ route }) => {

  const navigation = useNavigation();
  const { email } = route.params || {};
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleOTPSubmit = async () => {
    if (!otp) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter the OTP.',
      });
      return;
    }

    try {
      const response = await dispatch(verifyOtp({ otp, email })).unwrap();
      console.log('responseee==>',response)
      if (response.token) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'OTP verified successfully!',
        });
        navigation.navigate('Main');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.message || 'OTP verification failed!',
        });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'OTP verification failed!',
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="font-semibold mb-4 text-black text-center text-2xl tracking-wide">Verification Code</Text>
      <Text className="font-normal mb-4 text-gray-500 text-center text-base">We have sent the verification code on your email address</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        className="border-b border-gray-300 w-full text-center text-lg mb-4 placeholder:text-gray-700"
        placeholderTextColor="gray"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handleOTPSubmit} className="bg-primary rounded-lg p-4 w-full items-center">
          <Text className="text-white font-bold">Verify OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OTPScreen;
