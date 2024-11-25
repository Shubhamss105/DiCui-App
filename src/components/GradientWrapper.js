import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={['#000', '#1A1A1A']}
      style={styles.container}
    >
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,

  },
});

export default GradientWrapper;
