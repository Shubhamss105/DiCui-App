// components/Text.js
import React from 'react';
import { Text as RNText } from 'react-native';

const Text = ({ children, className = '', ...props }) => {
  return (
    <RNText className={`text-gray-800 ${className}`} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
