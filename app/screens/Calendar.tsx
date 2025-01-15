import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../screens/Navbar'; 

const Calendar: React.FC<{ navigation: any }> = ({ navigation }) => {
  // const [events, setEvents] = useState<any[]>([]);
  // const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  //   // Fetch events from the backend
  //   fetch('http://127.0.0.1:5000/events')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch events');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setEvents(data.slice(0, 3)); // Top 3 upcoming events
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching events:', error);
  //     });
  // }, []);

  // const handleSearch = () => {
  //   console.log(`Searching for: ${searchText}`);
  // };
  const events = [
    {
      title: '79th Anniversary of Sports Festival',
      date: 'Aug 18',
      time: '11 AM',
      image: require('../assets/3post.jpg'),
    },
    {
      title: '2024 ChuSeok Party',
      date: 'Sep 15',
      time: '2 PM',
      image: require('../assets/2post.jpg'),
    },
    {
      title: 'Lunar New Year Party',
      date: 'Jan 25',
      time: '4 PM',
      image: require('../assets/1post.jpeg'),
    },
  ];
  const [selectedEvent, setSelectedEvent] = useState<any>(events[0]); // Default to the first event
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const foundEvent = events.find((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSelectedEvent(foundEvent || null); // Show event if found, else null
  };



  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
{/* Top Bar */}
<View style={styles.topBar}>
        <Text style={styles.topBarText}>MY CALENDAR</Text>
        <TouchableOpacity onPress={() => console.log('Show all events')}>
          <Text style={styles.showAllText}>view all</Text>
        </TouchableOpacity>
      </View>
        {/* Upcoming Events */}
        {/* <View style={styles.upcomingEvents}>
          {events.map((event, index) => (
            <View key={index} style={styles.eventRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })}{' '}
                @ {event.time}
              </Text>
            </View>
          ))}
        </View> */}
                <View style={styles.upcomingEvents}>
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventRow}
              onPress={() => setSelectedEvent(event)}
            >
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>
                {event.date} @ {event.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
{/* Divider Line */}
<View style={styles.divider} />


        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for events"
            placeholderTextColor="#6F8BAC"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require('../assets/magnifying-glass.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
                {/* Display Selected Event */}
                {selectedEvent && (
          <View style={styles.selectedEventContainer}>
            <Text style={styles.selectedEventTitle}>{selectedEvent.title}</Text>
            <Image source={selectedEvent.image} style={styles.selectedEventImage} />
          </View>
        )}

      </ScrollView>

      {/* Navbar */}
      <Navbar navigation={navigation} />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default Calendar;
