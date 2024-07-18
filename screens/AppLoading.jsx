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

          // Add more font variants if needed
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
        <Image source={require('../assets/images/spot.png')} style={{ width: 300, height: 110, marginBottom: 142 }} />
        <ActivityIndicator size="large" color='#FFFFFF' style={{ marginBottom: -120 }} />
      </View>
    );
  }

  return children;
};

export default AppLoading;
