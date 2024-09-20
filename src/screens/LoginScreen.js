import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';
// import InputField from '../components/InputField';
import InputField from '../globalComponents/inputFields/InputField.js';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="px-6">
        <View className="items-center">
          <LoginSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text className="font-medium text-[28px] text-secondary mb-7">
          Login
        </Text>

        {/* Input Field for Email */}
        <InputField
          label={'Email ID'}
          labelStyle="text-gray-600"
          inputStyle="text-gray-900"
          icon={
            <FontAwesome
              name="envelope"
              size={20}
              color="#666"
              className="mr-2"
            />
          }
          keyboardType="email-address"
        />

        {/* Input Field for Password */}
        <InputField
          label={'Password'}
          icon={
            <FontAwesome
              name="lock"
              size={20}
              color="#666"
              className="mr-2"
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />

        {/* Custom Button for Login */}
        <CustomButton label={"Login"} onPress={() => {navigation.navigate("Home")}} />

        <Text className="text-center text-gray-500 mb-7">
          Or, login with Google
        </Text>

        <View className="flex-row  mb-7">
          <TouchableOpacity
            onPress={() => {}}
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
