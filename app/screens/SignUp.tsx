import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const SignUp = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subscription: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('SignIn'); // Navigate to SignIn
      } else {
        Alert.alert('Error', data.message || 'An error occurred while signing up.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while signing up.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="FIRST NAME"
        placeholderTextColor="#6F8BAC"
        value={formData.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="LAST NAME"
        placeholderTextColor="#6F8BAC"
        value={formData.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        placeholderTextColor="#6F8BAC"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="#6F8BAC"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Text
          style={styles.checkboxLabel}
          onPress={() => handleInputChange('subscription', !formData.subscription)}
        >
          subscribe to email updates
        </Text>
        <TouchableOpacity
          style={[styles.checkbox, formData.subscription && styles.checkboxSelected]}
          onPress={() => handleInputChange('subscription', !formData.subscription)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>*you already have account?</Text>
        <Text style={styles.link} onPress={() => navigation.replace('SignIn')}>
          sign in
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SignUp;
