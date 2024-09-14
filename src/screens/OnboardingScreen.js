import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../assets/images/logo.png'

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black px-4">
      <View className="flex-1 justify-center items-center">
      <Image 
          source={Logo} 
          className='w-80 h-80 bg-inherit'
        />
        <Text className="text-3xl text-white font-bold text-center tracking-wide">
          Discover Endless{'\n'}
          Possibilities with DiCui
        </Text>
        <Text className="text-sm font-pregular text-white mt-2 text-center tracking-wide">
        Your Perfect Dining Experience, Just a Tap Away!
          </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className="bg-primary py-3 px-4 my-4 w-full rounded-lg flex-row justify-between items-center text-center"
      >
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-white text-lg font-semibold text-center">
            Let's Begin
          </Text>
          <Icon name="arrow-right" size={22} color="#fff" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
