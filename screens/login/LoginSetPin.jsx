import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { Foundation } from '@expo/vector-icons'; // Import Foundation icons
import Header from "@/components/Header";

const SetPinScreen = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (pin.trim() === "" || confirmPin.trim() === "") {
      setError("Please enter and confirm your PIN.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Add your logic to save the PIN or proceed to the next step
      navigation.navigate("TransferMoney"); // Replace with your next screen
    } catch (error) {
      console.error("Error setting PIN:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <Header title='Enter Your 6-Digit Pin' />
        <View style={styles.content}>
        <Text style={{fontSize: 18, color: '#1D533C', fontFamily: 'Poppins-Medium'}}>PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={33} color="#1D3B2F" style={styles.prefixImg} />
            </View>
            <TextInput
              value={pin}
              onChangeText={setPin}
              style={[styles.textInput, { fontSize: 19, fontFamily: "Poppins-Medium" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="PIN"
              secureTextEntry={!showPin}
              placeholderTextColor="#8D8D8D"
            />
            <TouchableOpacity
              onPress={() => setShowPin(!showPin)}
              style={styles.iconContainer}
            >
              <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 18, color: '#1D533C', fontFamily: 'Poppins-Medium', marginTop: 15}} >Confirm PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={33} color="#1D3B2F" style={styles.prefixImg} />
            </View>
            <TextInput
              value={confirmPin}
              onChangeText={setConfirmPin}
              style={[styles.textInput, { fontSize: 19, fontFamily: "Poppins-Medium" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Confirm PIN"
              secureTextEntry={!showConfirmPin}
              placeholderTextColor="#8D8D8D"
              editable={pin.length === 6}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPin(!showConfirmPin)}
              style={styles.iconContainer}
            >
              <Icon name={showConfirmPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            onPress={handleContinue}
            style={[
              styles.continueButton,
              pin && confirmPin && pin === confirmPin
                ? { backgroundColor: "#1D3B2F" }
                : { backgroundColor: "#66B18A" },
            ]}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          {loading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 40, // Add padding to make space for the key icon
    justifyContent: 'center'
  },
  prefixDiv: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    left: 10,
    bottom:11,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 20,
    borderColor: 'transparent',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#444444'
  },
  iconContainer: {
    padding: 15,
  },
  continueButton: {
    padding: 17,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 17,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SetPinScreen;
