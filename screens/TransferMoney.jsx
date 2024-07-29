import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import SettingScreen from './SettingScreen';
import ActivityScreen from './ActivityScreen';
import ProfileScreen from './ProfileScreen';
import SpotHome from './SpotHome';

// Custom SpotLogo Icon Component
const SpotLogoIcon = () => (
  <Image source={require('../assets/images/spothome.png')} style={styles.spothome} />
);

// Header Component
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/spotnew.jpeg')} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Screen Components
const Profile = () => (
  <ProfileScreen />
);

const Activity = () => (
  <ActivityScreen />
);

const Settings = () => (
  <SettingScreen />
);

const QRCode = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>QR Code Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TransferMoneyScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tab.Navigator
        initialRouteName="Home" // Set default tab to "Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            switch (route.name) {
              case 'Profile':
                iconSource = require('../assets/images/profile1.png');
                break;
              case 'Activity':
                iconSource = require('../assets/images/notes.png');
                break;
              case 'Settings':
                iconSource = require('../assets/images/settings.png');
                break;
              case 'QRCode':
                iconSource = require('../assets/images/qr-scan1.png');
                break;
              case 'Home':
                return <SpotLogoIcon />; // Use custom SpotLogo icon component
              default:
                iconSource = null; // Default icon
                break;
            }

            return <Image source={iconSource} style={[styles.tabIcon, { tintColor: color }]} />;
          },
          tabBarLabel: ({ color }) => {
            return (
              <Text style={[styles.tabBarLabel, { color }]}>
                {route.name === 'Home' ? 'Home' : route.name}
              </Text>
            );
          },
          tabBarStyle: {
            backgroundColor: '#F2F2F2',
          },
          tabBarItemStyle: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: -10,
          },
          tabBarActiveTintColor: '#1E3B2F',
          tabBarInactiveTintColor: '#000000',
          headerShown: false, // Hide header for all tab screens
        })}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Home" component={SpotHome} options={{ title: 'Home' }} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="QRCode" component={QRCode} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D3B2F',
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
    marginLeft: 80
  },
  spothome: {
    width: 33, // Adjust size as needed
    height: 40, // Adjust size as needed
    resizeMode: 'contain',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    paddingBottom: 15,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 18,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Regular',
  },
  tabIcon: {
    width: 28, // Adjust size as needed
    height: 28, // Adjust size as needed
    resizeMode: 'contain',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransferMoneyScreen;
