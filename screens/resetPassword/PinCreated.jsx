import React from "react";
import { View, Text, TouchableOpacity, StyleSheet , Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const ThankyouScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
    
        <Image source={require('../../assets/images/tick.png')} style={styles.logo}  />
        <Text style={[styles.messageText, { fontFamily: 'Poppins-Medium', fontSize: 21, marginBottom: 10 }]}>
          Pin Changed
        </Text>
        <Text style={styles.messageText}>
         Your Pin successfully changed
        </Text>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.login}>Login</Text>
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
  logo: {
    width: 175, // Adjust size as needed
    height: 200, // Adjust size as needed
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1, // Make this take available space
    justifyContent: 'center', // Center content vertically
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
    padding: 13,
    backgroundColor: "#1D533C",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40, // Margin at the bottom
  },
  login: {
    color: "#FFF",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
});

export default ThankyouScreen;
