import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../screens/Navbar'; 

const DigitalID: React.FC<{ navigation: any }> = ({ navigation }) => {
  // const [userData, setUserData] = useState<{ firstName: string; lastName: string } | null>(null);

  // useEffect(() => {
  //   // Fetch saved user data from local storage or backend
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000/userdata');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData(data); // Assuming backend returns { firstName, lastName }
  //       } else {
  //         console.error('Failed to fetch user data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo2.png')} style={styles.logo} />

      {/* Page Title */}
      <Text style={styles.title}>DIGITAL ID</Text>

      {/* Digital ID Card */}
      {/* <View style={styles.idCard}>
        <Text style={styles.nameText}>
          {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
        </Text>
      </View> */}
      {/* <View style={styles.idCard}> */}
        <Image source={require('../assets/profilePic.png')} style={styles.profileImage} />
      {/* </View> */}
      <Text style={styles.nameText}>Admin A</Text>


      {/* Navbar */}
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  

});

export default DigitalID;
