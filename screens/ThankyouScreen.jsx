import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Image } from "react-native";
const ThankyouScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
      <Image source={require('../assets/images/tick.png')} style={styles.logo}  />
        <Text style={[styles.messageText, { fontFamily: 'Poppins-Medium', fontSize: 21, marginBottom: 10 }]}>
          Sign up Successful
        </Text>
        <Text style={styles.messageText}>
          Your Account has been created
        </Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.login}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3B2F",
    justifyContent: 'space-between', // Ensure space between content and button
    alignItems: "center",
    paddingHorizontal: 20, // Add padding to ensure button doesn't touch the edge
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1, // Make this take available space
    justifyContent: 'center', // Center content vertically
  },
  logo: {
    width: 175, // Adjust size as needed
    height: 200, // Adjust size as needed
    resizeMode: 'contain',
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5, // Space between lines of text
  },
  loginButton: {
    width: "100%", // Full width with padding
    padding: 17,
    backgroundColor: "#1D533C",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 70, // Margin at the bottom
  },
  login: {
    color: "#FFF",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
});

export default ThankyouScreen;
