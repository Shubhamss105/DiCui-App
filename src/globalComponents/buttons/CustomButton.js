// globalComponents/buttons/Button.js
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

const CustomButton = ({label, onPress, className, children}) => {
  return (
    // <TouchableOpacity onPress={onPress} className={`bg-primary py-3 px-4 my-4 w-full rounded-lg flex-row justify-between items-center text-center ${className}`}>
    //   <View className="flex-row justify-between text-center items-center w-full">
    //     <Text className="text-white text-center text-lg font-semibold">{label}</Text>
    //     {children}
    //   </View>
    // </TouchableOpacity>

    <TouchableOpacity
      onPress={onPress}
      className={`bg-primary py-3 px-4 my-4 w-full rounded-lg ${className}`}>
      <Text className="text-center font-bold text-lg text-white">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
