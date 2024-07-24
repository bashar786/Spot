import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Changed to use the correct hook from @react-navigation/native
import { FontAwesome } from '@expo/vector-icons';
const ThankyouScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <FontAwesome name="check-circle" size={200} color="white" style={styles.logo} />
      <View style={styles.buttonContainer}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#fff', marginTop: -320, marginBottom: 120 }}>
          Your Account has been created
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('LoginScreen')} // Wrapped in an arrow function
        >
          <Text style={styles.login}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3B2F",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 420,
    height: 330,
    resizeMode: 'contain',
    marginTop: 50,
    justifyContent: 'center',
    marginLeft: 220
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    width: "95%",
    padding: 13,
    backgroundColor: "#1D533C",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  login: {
    color: "#FFF",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
});

export default ThankyouScreen;
