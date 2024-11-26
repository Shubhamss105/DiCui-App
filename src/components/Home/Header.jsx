import {View, Text, TextInput, Image, Pressable} from 'react-native';
import React from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  return (

      <View className="flex px-4 mb-2">
        <View className="flex flex-row items-center justify-between mt-4">
          <View className='flex-row items-center'>
          <Ionicons name="location" size={24} color="white" />
          <Text className="text-white text-sm font-semibold ml-2">
            4102, Pretty View Lane, EWS Essel...
          </Text>
          </View>

          <Pressable onPress={() => navigation.navigate('Profile')}>
      <Ionicons 
        name="notifications" 
        size={24}
        color="#FFF"
        style={{ marginLeft: 'auto' }} 
      />
    </Pressable>
        </View>

        <View className="flex flex-row justify-center items-center my-4 space-x-2">
          <View className="flex flex-row w-full items-center justify-center  bg-white h-12 border-gray-200 rounded-xl p-1">
            <Ionicons name="search" size={24} color="gray" className="mx-4" />
            <TextInput
              className="flex-1 -mt-[2px]"
              placeholder="Find for food or restaurant..."
              placeholderTextColor="gray"
            />
          </View>

         
        </View>
      </View>

  );
};

export default Header;
