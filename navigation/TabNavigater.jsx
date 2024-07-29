// app/navigation/TabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import DebitcardScreen from '@/screens/DebitcardScreen'; // Corrected path
import ActivityScreen from '@/screens/ActivityScreen'; // Corrected path
import SettingsScreen from '@/screens/SettingScreen'; // Corrected path
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Debit':
              iconName = 'card';
              break;
            case 'Activity':
              iconName = 'list';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'circle';
          }

          console.log(`Icon for ${route.name}: ${iconName}`);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Debit" component={DebitcardScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
