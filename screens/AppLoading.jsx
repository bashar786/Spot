import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text, View, ActivityIndicator, Image } from 'react-native';

const AppLoading = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
          'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Urbanist-Regular': require('../assets/fonts/Urbanist-Regular.ttf'),
          'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
          'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
          'Urbanist-Light': require('../assets/fonts/Urbanist-Light.ttf'),
          'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading fonts", error);
      }
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3B2F' }}>
        <Image source={require('../assets/images/spotnew.jpeg')} style={{ width: 300, height: 110, marginBottom: 142 }} />
        <ActivityIndicator size="large" color='#FFFFFF' style={{ marginBottom: -120 }} />
      </View>
    );
  }

  return children;
};

export default AppLoading;
