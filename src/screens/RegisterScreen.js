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
import {registerUser} from '../redux/slices/authSlice';
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
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear errors on input change
    setErrors(prevErrors => ({...prevErrors, [name]: null}));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Registration successful!',
      });
      navigation.navigate('Login');
    } catch (error) {
      // Display the error from the backend
      setErrors(prevErrors => ({...prevErrors, backend: error}));
    } finally {
      setLoading(false);
    }
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
          errorMessage={errors.name}
          required
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
          errorMessage={errors.email}
          required
        />

        <InputField
          label={'Password'}
          icon={
            <FontAwesome name="lock" size={20} color="#666" className="mr-2" />
          }
          inputType="password"
          onChangeText={value => handleInputChange('password', value)}
          errorMessage={errors.password}
          required
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
          errorMessage={errors.password_confirmation}
          required
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {errors.backend && (
              <Text className="text-red-500 mb-3">{errors.backend}</Text>
            )}
            <CustomButton label={'Register'} onPress={handleRegister} />
          </>
        )}

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
    </SafeAreaView>
  );
};

export default RegisterScreen;
