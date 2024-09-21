import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerUser} from '../redux/slices/authSlice'; // Adjust the path as needed
import InputField from '../globalComponents/inputFields/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user', // Default role set to "user"
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleRegister = () => {
    if (formData.password !== formData.password_confirmation) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true);
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Registration successful!',
        });
        navigation.goBack(); // Navigate back to login or another screen
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        <View className="items-center">
          <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text className="font-medium text-[28px] text-gray-800 mb-5">
          Register
        </Text>

        <InputField
          label={'Name'}
          icon={
            <Ionicons name="person" size={20} color="#666" className="mr-2" />
          }
          onChangeText={value => handleInputChange('name', value)}
        />

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

        <InputField
          label={'Password'}
          icon={
            <FontAwesome name="lock" size={20} color="#666" className="mr-2" />
          }
          inputType="password"
          keyboardType="default"
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <FontAwesome name="lock" size={20} color="#666" className="mr-2" />
          }
          inputType="password"
          onChangeText={value =>
            handleInputChange('password_confirmation', value)
          }
        />

        <CustomButton label={'Register'} onPress={handleRegister} />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        <Text className="text-center text-gray-500 my-3">
          Or, Register with Google
        </Text>

        <View className="flex-row justify-between mb-5">
          <TouchableOpacity
            onPress={() => {}}
            className="border border-gray-300 rounded-lg px-7 py-2 w-full justify-center items-center">
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-5">
          <Text className="text-black">Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-primary font-bold"> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
