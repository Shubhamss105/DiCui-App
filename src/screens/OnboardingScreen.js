import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Gaming from '../assets/images/misc/gaming.svg';
import CustomButton from '../globalComponents/buttons/CustomButton.js';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-4">
      <View className="flex-1 justify-center items-center">
        <Gaming width={300} height={300} className="transform -rotate-15" />
        <Text className="text-3xl text-secondary font-bold text-center tracking-wide">
          Discover Endless{'\n'}
          Possibilities with DiCui
        </Text>
        <Text className="text-sm font-pregular text-secondary mt-2 text-center tracking-wide">
        Your Perfect Dining Experience, Just a Tap Away!
          </Text>
      </View>

      {/* Custom Button using Tailwind */}
      <CustomButton
        label="Let's Begin"
        onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-right" size={22} color="#fff" />
      </CustomButton>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
