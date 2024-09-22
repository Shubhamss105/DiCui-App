import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';
import InputField from '../globalComponents/inputFields/InputField.js';
import { loginUser, loadToken } from '../redux/slices/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userToken, loading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      navigation.navigate('Home');
    }
  }, [userToken, navigation]);

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both email and password.',
      });
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful!',
      });
      // The user will be automatically navigated to 'Home' because of the token
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Login failed!',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="px-6">
        <View className="items-center">
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text className="font-medium text-[28px] text-secondary mb-7">
          Login
        </Text>

        {/* Input Field for Email */}
        <InputField
          label={'Email ID'}
          icon={
            <FontAwesome
              name="envelope"
              size={20}
              color="#666"
              className="mr-2"
            />
          }
          keyboardType="email-address"
          onChangeText={value => handleInputChange('email', value)}
        />

        {/* Input Field for Password */}
        <InputField
          label={'Password'}
          icon={
            <FontAwesome name="lock" size={20} color="#666" className="mr-2" />
          }
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {
            /* handle password reset */
          }}
          onChangeText={value => handleInputChange('password', value)}
        />

        {/* Custom Button for Login */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton label={'Login'} onPress={handleLogin} />
        )}

        {/* Skip Login Button */}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Home');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            );
          }}
          className="mt-4">
          <Text className="text-primary text-center">Skip Login</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 mb-7">
          Or, login with Google
        </Text>

        <View className="flex-row mb-7">
          <TouchableOpacity
            onPress={() => {
              /* Handle Google Login */
            }}
            className="border border-gray-300 rounded-lg px-7 py-2 w-full justify-center items-center">
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-7">
          <Text className="text-black">New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary font-bold"> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
