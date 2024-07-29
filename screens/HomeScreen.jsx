import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/spotnew.jpeg")} />
      <Text style={styles.description}>Secure Payment Online Transfer</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton}  
          onPress={() => navigation.navigate('LoginScreen')}
          activeOpacity={0.5}>
          <Text style={styles.callNumber}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('NumberInputScreen')}
          activeOpacity={0.5}
        >
          <Text style={styles.cancelText}>Sign up</Text>
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
    width: 600,
    height: 185,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginTop: -30,
    textAlign: 'center', // Center the text horizontally
    marginBottom: 50,
    fontSize: 19,
    marginRight: 14.5
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    alignItems: 'center',
  },
  callButton: {
    width: "95%",
    padding: 17,
    backgroundColor: "#1D533C",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    color: "#fff",
  },
  callNumber: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-SemiBold",
  },
  cancelButton: {
    width: "95%",
    padding: 17,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    color: 'black'
  },
  cancelText: {
    color: "#1D3B2F",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
});

export default Home;
