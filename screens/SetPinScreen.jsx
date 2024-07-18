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
          <View style={styles.inputContainer}>
            <TextInput
              value={pin}
              onChangeText={setPin}
              style={[styles.input, { fontSize: 30, fontFamily: "Poppins-Thin" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="PIN"
              secureTextEntry={!showPin}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setShowPin(!showPin)}
              style={styles.iconContainer}
            >
              <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={confirmPin}
              onChangeText={setConfirmPin}
              style={[styles.input, { fontSize: 30, fontFamily: "Poppins-Thin" }]}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Confirm PIN"
              secureTextEntry={!showConfirmPin}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPin(!showConfirmPin)}
              style={styles.iconContainer}
            >
              <Icon name={showConfirmPin ? "visibility" : "visibility-off"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleContinue}
              style={[
                styles.continueButton,
                pin && confirmPin && pin === confirmPin
                  ? { backgroundColor: "#1E3B2F" }
                  : { backgroundColor: "#63927E" },
              ]}
              activeOpacity={1}
            >
              <Text style={styles.continueButtonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
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
  },
  title: {
    fontSize: 22,
    color: "#000",
    marginBottom: 50,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    textAlign: "center",
    letterSpacing: 8,
  },
  iconContainer: {
    padding: 5,
  },
  showHideText: {
    color: "#1E3B2F",
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    alignItems: "center",
    width: "50%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  continueButton: {
    padding: 12,
    alignItems: "center",
    width: "50%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
