import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/spot.png")} />
      <Text style={styles.description}>Secure Payment Online Transfer</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callNumber}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('NumberInputScreen')}
          activeOpacity={0.5}
        >
          <Text style={styles.cancelText}>SIGN UP</Text>
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
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginTop: -100,
    textAlign: 'center', // Center the text horizontally
    marginBottom: 170,
    fontSize: 12,
    marginRight: 14
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  callButton: {
    width: "95%",
    padding: 13,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  callNumber: {
    color: "#1D533C",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
  },
  cancelButton: {
    width: "95%",
    padding: 13,
    backgroundColor: "#1D533C",
    borderRadius: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
});

export default Home;
