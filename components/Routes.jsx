import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; 
import NumberInputScreen from '../screens/NumberInputScreen'
import DebitcardScreen from '../screens/DebitcardScreen';
import AdressScreen from '../screens/AdressScreen';
import EmailScreen from '../screens/EmailScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import OTPScreenEmail from '../screens/OTPScreenEmail';
import OTPScreenNumber from '../screens/OTPScreenNumber';
const Stack = createStackNavigator();
import AppLoading from '../screens/AppLoading';
import ThankyouScreen from '../screens/ThankyouScreen';
import SetPinScreen from '@/screens/SetPinScreen';
import LoginScreen from '@/screens/LoginScreen';
import LoginOTPScreen from '@/screens/OTPLoginScreen';
import TransferMoney from '@/screens/TransferMoney';
const Routes = () => {
  return (
    <AppLoading>
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false, }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  />
      <Stack.Screen name="NumberInputScreen" component={NumberInputScreen}  options={{ title: 'NumberInputScreen' }} />
      <Stack.Screen name='DebitcardScreen' component={DebitcardScreen} />
      <Stack.Screen name='OTPScreenEmail' component={OTPScreenEmail} />
      <Stack.Screen name='OTPScreenNumber' component={OTPScreenNumber} />
      <Stack.Screen name='AddressScreen' component={AdressScreen} />
      <Stack.Screen name='EmailScreen' component={EmailScreen} />
      <Stack.Screen name='PrivacyScreen' component={PrivacyScreen} />
      <Stack.Screen name='AppLoading' component={AppLoading} />
      <Stack.Screen name='ThankyouScreen' component={ThankyouScreen} />
      <Stack.Screen name='SetPinScreen' component={SetPinScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='LoginOTPScreen' component={LoginOTPScreen} />
      <Stack.Screen name='TransferMoney' component={TransferMoney} />
    </Stack.Navigator>
    </AppLoading>
)};

export default Routes;
