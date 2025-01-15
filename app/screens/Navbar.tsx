import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Navbar: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
        <Image source={require('../assets/home.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.navItem}>
        <Image source={require('../assets/cal.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DigitalID')} style={styles.navItem}>
        <Image source={require('../assets/face.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navItem}>
        <Image source={require('../assets/prof.png')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Navbar;
