import React, { useRef, useState } from "react";
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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { Foundation } from '@expo/vector-icons'; // Import Foundation icons
import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
const SetPinScreen = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const navigation = useNavigation();

  // Create refs for input fields
  const confirmPinInput = useRef(null);

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
      navigation.navigate("PinCreated"); // Replace with your next screen
    } catch (error) {
      console.error("Error setting PIN:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle pin input submission
  const handlePinSubmit = () => {3
    if (confirmPinInput.current) {
      confirmPinInput.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
      <Feather 
      name="arrow-left"
        onPress={() => navigation.navigate('ResetEmailScreen')}
        size={35}
        color="white"
        style={styles.icon}
        />
      <Text style={styles.headerText}>Set Your New 6-Digit PIN</Text>
    </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContent}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.label}>PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={33} color="#1D3B2F" style={styles.prefixImg} />
            </View>

            <TextInput
              value={pin}
              onChangeText={setPin}
              style={styles.textInput}
              keyboardType="numeric"
              maxLength={6}
              placeholder="PIN"
              secureTextEntry={!showPin}
              placeholderTextColor="#8D8D8D"
              selectionColor="#1D533C"
              returnKeyType="done"
              onSubmitEditing={handlePinSubmit} // Trigger focus on next input
            />
            <TouchableOpacity
              onPress={() => setShowPin(!showPin)}
              style={styles.iconContainer}
            >
              <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label}>Confirm PIN</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
              <Foundation name="key" size={33} color="#1D3B2F" style={styles.prefixImg} />
            </View>
            <TextInput
              ref={confirmPinInput}
              value={confirmPin}
              onChangeText={setConfirmPin}
              style={styles.textInput}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Confirm PIN"
              secureTextEntry={!showConfirmPin}
              placeholderTextColor="#8D8D8D"
              editable={pin.length === 6}
              returnKeyType="done"
              selectionColor="#1D533C"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPin(!showConfirmPin)}
              style={styles.iconContainer}
            >
              <Icon name={showConfirmPin ? "visibility" : "visibility-off"} size={24} color="#1D533C" />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </ScrollView>
      </KeyboardAvoidingView>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    color: '#1D533C',
    fontFamily: 'Poppins-Medium',
    marginTop: 15
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
    bottom: 11,
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
    fontFamily: 'Poppins-Medium',
    color: '#444444'
  },
  iconContainer: {
    padding: 15,
  },
  continueButton: {
    padding: 17,
    borderRadius: 10,
    width: "92%",
    alignItems: "center",
    marginBottom: 40,
    alignSelf: 'center',

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
  header: {
    backgroundColor: '#1D3B2F',
    height: 95,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    position: 'relative',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: 2,
    bottom: -8,
    color: '#FFFFFF',
    padding: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650'
  },
});

export default SetPinScreen;
