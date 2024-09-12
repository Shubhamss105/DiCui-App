// components/Input.js
import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, className = '' }) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={`border border-gray-300 p-3 rounded-md text-base ${className}`}
      />
    </View>
  );
};

export default Input;
