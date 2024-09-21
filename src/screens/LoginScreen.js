import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';
import InputField from '../globalComponents/inputFields/InputField.js';
import { loginUser } from '../redux/slices/authSlice';  // Assuming you're using Redux for state management

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      // Dispatching login action to Redux (if you are using Redux for authentication)
      await dispatch(loginUser(formData)).unwrap();
      
      // Show success message
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful!',
      });

      // Navigate to Home screen
      navigation.navigate('Home');

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Login failed!',
      });
    } finally {
      setLoading(false);
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
          icon={<FontAwesome name="envelope" size={20} color="#666" className="mr-2" />}
          keyboardType="email-address"
          onChangeText={value => handleInputChange('email', value)}
        />

        {/* Input Field for Password */}
        <InputField
          label={'Password'}
          icon={<FontAwesome name="lock" size={20} color="#666" className="mr-2" />}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { /* handle password reset */ }}
          onChangeText={value => handleInputChange('password', value)}
        />

        {/* Custom Button for Login */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton label={"Login"} onPress={handleLogin} />
        )}

        <Text className="text-center text-gray-500 mb-7">
          Or, login with Google
        </Text>

        <View className="flex-row  mb-7">
          <TouchableOpacity
            onPress={() => { /* Handle Google Login */ }}
            className="border border-gray-300 rounded-lg px-7 py-2 w-full justify-center items-center">
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-7">
          <Text className='text-black'>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary font-bold"> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
