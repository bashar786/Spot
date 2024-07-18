import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';


export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown :false}} >
      <Stack.Screen  name="index" />
    </Stack>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily :'MyCustomFont'
  },
})