import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, PanResponder, Animated, TouchableOpacity, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../screens/Navbar'; 

const Landing: React.FC<{ navigation: any }> = ({ navigation }) => {
  // const [event, setEvent] = useState<any>(null);
  // const pan = useState(new Animated.ValueXY())[0]; // Initial position for drag-and-drop

  // useEffect(() => {
  //   // Fetch the event from the backend
  //   fetch('http://127.0.0.1:5000/events')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch events');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.length > 0) {
  //         setEvent(data[0]); // Take the first event for simplicity
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching events:', error);
  //     });
  // }, []);

  // // Create a PanResponder for drag-and-drop functionality
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
  //     useNativeDriver: false,
  //   }),
  //   onPanResponderRelease: () => {
  //     Animated.spring(pan, {
  //       toValue: { x: 0, y: 0 },
  //       useNativeDriver: false,
  //     }).start();
  //   },
  // });
  const eventImages = [
    require('../assets/1post.jpeg'),
    require('../assets/2post.jpg'),
    require('../assets/3post.jpg'), // Add as many images as you have
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Landing Image */}
        <Image source={require('../assets/landing.png')} style={styles.landingImage} />

        {/* Upcoming Event Title */}
        <Text style={styles.sectionTitle}>Upcoming Event</Text>

        {/* Upcoming Event Poster */}
        {/* {event && event.image && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.eventPosterContainer]}
          >
            <Image
              source={{ uri: `http://127.0.0.1:5000/uploads/${event.image}` }}
              style={styles.eventPoster}
            />
          </Animated.View>
        )} */}
        <FlatList
          data={eventImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()} // Key based on index
          renderItem={({ item }) => (
            <View style={styles.eventPosterContainer}>
              <Image source={item} style={styles.eventPoster} />
            </View>
          )}
        />
      </ScrollView>

      {/* Navbar */}
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default Landing;