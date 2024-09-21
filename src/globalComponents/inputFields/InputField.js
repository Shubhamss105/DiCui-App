import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText, // Ensure onChangeText is passed down
}) {
  return (
    <View className="flex-row border-b border-gray-300 pb-2 mb-6">
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#000"
          keyboardType={keyboardType}
          className="flex-1 ml-2 p-0 text-black"
          secureTextEntry={true}
          onChangeText={onChangeText} // Pass the handler here
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#000"
          keyboardType={keyboardType}
          className="flex-1 ml-2 p-0 text-black"
          onChangeText={onChangeText} // Pass the handler here
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
