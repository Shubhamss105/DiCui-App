import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View className="flex-row border-b border-gray-300 pb-2 mb-6">
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#000"
          keyboardType={keyboardType}
          className="flex-1 ml-2 p-0 text-black"
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#000"
          keyboardType={keyboardType}
          className="flex-1 ml-2 p-0 text-black"
        />
      )}
      {fieldButtonLabel && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text className="text-primary font-bold">{fieldButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
