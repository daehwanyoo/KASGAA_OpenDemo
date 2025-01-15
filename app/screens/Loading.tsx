import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const Loading = ({ navigation }: { navigation: any }) => {
  const [opacity] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    // Fade-in animation
    Animated.timing(opacity, {
      toValue: 1, // Fade to full opacity
      duration: 2000, // Animation duration (2 seconds)
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      // Navigate to the SignIn screen after animation
      setTimeout(() => {
        navigation.replace('SignIn'); // Replace the Loading screen with SignIn
      }, 1000); // 1-second delay after fade-in
    });
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logolong.png')}
        style={[styles.logo, { opacity }]} // Apply opacity animation
        resizeMode="contain"
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
});

export default Loading;
