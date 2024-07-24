import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
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
      navigation.navigate("DebitcardScreen"); // Replace with your next screen
    } catch (error) {
      console.error("Error setting PIN:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.content}>
          <Text style={styles.title}>SET YOUR 6-DIGIT PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={35} color="#1E3B2F" style={styles.prefixImg} />
            </View>
            <TextInput
              value={pin}
              onChangeText={setPin}
              style={[styles.textInput, { fontSize: 22, fontFamily: "Poppins-Medium" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="PIN"
              secureTextEntry={!showPin}
              placeholderTextColor="grey"
            />
            <TouchableOpacity
              onPress={() => setShowPin(!showPin)}
              style={styles.iconContainer}
            >
              <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={35} color="#1E3B2F" style={styles.prefixImg} />
            </View>
            <TextInput
              value={confirmPin}
              onChangeText={setConfirmPin}
              style={[styles.textInput, { fontSize: 22, fontFamily: "Poppins-Medium" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Confirm PIN"
              secureTextEntry={!showConfirmPin}
              placeholderTextColor="grey"
              editable={pin.length === 6}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPin(!showConfirmPin)}
              style={styles.iconContainer}
            >
              <Icon name={showConfirmPin ? "visibility" : "visibility-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            onPress={handleContinue}
            style={[
              styles.continueButton,
              pin && confirmPin && pin === confirmPin
                ? { backgroundColor: "#1E3B2F" }
                : { backgroundColor: "#63927E" },
            ]}
          
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>
          {loading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 22,
    color: "#000",
    marginBottom: 50,
    fontFamily: "Poppins-Regular",
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
    bottom: 6,
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
    alignItems: 'center'
  },
  iconContainer: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  continueButton: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
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
