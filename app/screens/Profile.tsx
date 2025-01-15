import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../screens/Navbar';


const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
  });
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(false);
  const [activeBullet, setActiveBullet] = useState<string>(''); // Keeps track of the active bullet point
  const [showSignOutModal, setShowSignOutModal] = useState(false); // State for the modal
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false); // Modal for delete account

  const userEmail = 'a@gmail.com'; // Replace with logged-in user's email for fetching data

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/profile?email=${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            name: `${data.firstName} ${data.lastName}`,
            birthDate: '05 05 2000', // Assuming no `birthDate` is returned
            email: data.email,
            phone: '000-000-0000', // Assuming no `phone` is returned
          });
        } else {
          console.error('Error fetching profile:', data.message);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'Korean' : 'English'));
  };

  const handleSignOut = () => {
    navigation.navigate('Home');
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>MY PROFILE</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image and Edit Button */}
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/profilePic.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />

            <TextInput
              style={styles.input}
              value={formData.birthDate}
              onChangeText={(text) => handleInputChange('birthDate', text)}
            />

            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />

            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
          </View>
        </View>

        {/* Bullet Points */}
        <View style={styles.bulletSection}>
  {/* Language */}
  <TouchableOpacity
    style={[
      styles.bulletItem,
      activeBullet === 'Language' ? styles.activeBullet : null,
    ]}
    onPress={() => setActiveBullet('Language')}
  >
    <View style={styles.bulletContent}>
      <Image source={require('../assets/dot.png')} style={styles.bulletIcon} />
      <Text style={styles.bulletText}>LANGUAGE</Text>
    </View>
  </TouchableOpacity>
  {activeBullet === 'Language' && (
    <View style={styles.languageOptions}>
      <TouchableOpacity onPress={() => toggleLanguage('English')}>
        <Text style={[styles.languageOption, language === 'English' ? styles.activeLanguage : null]}>
          English
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleLanguage('Korean')}>
        <Text style={[styles.languageOption, language === 'Korean' ? styles.activeLanguage : null]}>
          Korean
        </Text>
      </TouchableOpacity>
    </View>
  )}

  {/* Notification */}
  <TouchableOpacity
  style={[
    styles.bulletItem,
    activeBullet === 'Notification' ? styles.activeBullet : null,
  ]}
  onPress={() => setActiveBullet('Notification')}
>
  <View style={styles.bulletContent}>
    <Image source={require('../assets/dot.png')} style={styles.bulletIcon} />
    <Text style={styles.bulletText}>NOTIFICATION</Text>
  </View>
  <View style={styles.switchContainer}>
    <Text style={[styles.switchLabel, !notifications && styles.switchLabelActive]}>OFF</Text>
    <Switch
      value={notifications}
      onValueChange={(value) => {
        setNotifications(value);
        setActiveBullet('Notification');
      }}
      thumbColor={notifications ? '#6F8BAC' : '#EBE9E4'}
      trackColor={{ true: '#6F8BAC', false: '#EBE9E4' }}
      style={styles.switch}
    />
    <Text style={[styles.switchLabel, notifications && styles.switchLabelActive]}>ON</Text>
  </View>
</TouchableOpacity>

  {/* Sign Out */}
  <TouchableOpacity
    style={[
      styles.bulletItem,
      activeBullet === 'Sign Out' ? styles.activeBullet : null,
    ]}
    onPress={() => {
      setActiveBullet('Sign Out');
      setShowSignOutModal(true);
    }}
  >
    <View style={styles.bulletContent}>
      <Image source={require('../assets/dot.png')} style={styles.bulletIcon} />
      <Text style={styles.bulletText}>SIGN OUT</Text>
    </View>
  </TouchableOpacity>

  {/* Delete Account */}
  <TouchableOpacity
    style={[
      styles.bulletItem,
      activeBullet === 'Delete Account' ? styles.activeBullet : null,
    ]}
    onPress={() => {
      setActiveBullet('Delete Account');
      setShowDeleteAccountModal(true);
    }}
  >
    <View style={styles.bulletContent}>
      <Image source={require('../assets/dot.png')} style={styles.bulletIcon} />
      <Text style={styles.bulletText}>DELETE ACCOUNT</Text>
    </View>
  </TouchableOpacity>
</View>

      </ScrollView>
      {/*Sign out */}
      <Modal
        transparent={true}
        visible={showSignOutModal}
        animationType="fade"
        onRequestClose={() => setShowSignOutModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Out?</Text>
            <Text style={styles.modalMessage}>
              You’ll sign out of Daniel Gu.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowSignOutModal(false)}>
                <Text style={styles.cancelButtonText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

        {/*delete account*/}
        <Modal
        transparent={true}
        visible={showDeleteAccountModal}
        animationType="fade"
        onRequestClose={() => setShowDeleteAccountModal(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalMessage}>
                Delete account for Daniel Gu.
            </Text>
            <View style={styles.modalActions}>
                <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteAccountModal(false)}>
                <Text style={styles.cancelButtonText}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.signOutButton}
                onPress={() => {
                    setShowDeleteAccountModal(false);
                    console.log('Delete account logic here');
                }}>
                <Text style={styles.signOutButtonText}>delete</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>

      {/* Navbar */}
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  

});

export default Profile;
