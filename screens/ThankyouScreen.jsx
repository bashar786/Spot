import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Changed to use the correct hook from @react-navigation/native

const ThankyouScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/spot.png")} />
      <View style={styles.buttonContainer}>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#fff', marginTop: -380, marginBottom: 120 }}>
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
    marginTop: -100,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  login: {
    color: "#1D533C",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
});

export default ThankyouScreen;
