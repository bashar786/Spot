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
import LoginScreen from '@/screens/login/LoginScreen';
import LoginOTPScreen from '@/screens/OTPLoginScreen';
import TransferMoney from '@/screens/TransferMoney';
import SettingScreen from '@/screens/SettingScreen';
import TabNavigator from '@/navigation/TabNavigater';
import QrcodeScreen from '@/screens/QrcodeScreen';
import ActivityScreen from '@/screens/ActivityScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SpotHome from '@/screens/SpotHome';
import ResetPinScreen from '@/screens/resetPassword/ResetPin';
import ResetOTPEmail from '@/screens/resetPassword/ResetOTPScreenEmail'
import ResetOTPNumber from '@/screens/resetPassword/ResetOTPScreenNumber'
import ResetNumberScreen from '@/screens/resetPassword/ResetNumberInputScreen'
import ResetEmailScreen from '@/screens/resetPassword/ResetEmailScreen'
import PinCreated from '@/screens/resetPassword/PinCreated'
import LoginOTPNumber from '@/screens/login/LoginOTPNumber'
import LoginNumber from '@/screens/login/LoginNumberScreen'
import LoginSetPin from '@/screens/login/LoginSetPin'
const Routes = () => {
  return (

    <AppLoading>
     <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  />
      <Stack.Screen name="NumberInputScreen" component={NumberInputScreen}  options={{ title: 'NumberInputScreen' }} />
      <Stack.Screen name='AdressScreen' component={AdressScreen} />
      <Stack.Screen name="TabNavigater" component={TabNavigator} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
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
      <Stack.Screen name='QrcodeScreen' component={QrcodeScreen} />
      <Stack.Screen name='ActivityScreen' component={ActivityScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='SpotHome' component={SpotHome} />
      <Stack.Screen name='ResetOTPEmail' component={ResetOTPEmail} />
      <Stack.Screen name='ResetOTPNumber' component={ResetOTPNumber} />
      <Stack.Screen name='ResetEmailScreen' component={ResetEmailScreen} />
      <Stack.Screen name='ResetNumberScreen' component={ResetNumberScreen} />
      <Stack.Screen name='ResetPinScreen' component={ResetPinScreen} />
      <Stack.Screen name='PinCreated' component={PinCreated} />
      <Stack.Screen name='LoginOTPNumber' component={LoginOTPNumber} />
      <Stack.Screen name='LoginNumber' component={LoginNumber} />
      <Stack.Screen name='LoginSetPin' component={LoginSetPin} />

    </Stack.Navigator>
    </AppLoading>
)};

export default Routes;
