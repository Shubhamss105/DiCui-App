import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import InputField from '../globalComponents/inputFields/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';

const RegisterScreen = ({navigation}) => {
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
            <Ionicons
              name="person"
              size={20}
              color="#666"
              className="mr-2"
            />
          }
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
        />

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
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <FontAwesome
              name="lock"
              size={20}
              color="#666"
              className="mr-2"
            />
          }
          inputType="password"
        />

        <CustomButton label={'Register'} onPress={() => {}} />

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
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-primary font-bold"> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
