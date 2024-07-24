import React, { useState, useRef } from "react";
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
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber: routePhoneNumber } = route.params;

  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    // Move to the next input if the text length is 1
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // Move to the previous input if the text length is 0
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleEnter = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      navigation.navigate("TransferMoney");
    } catch (error) {
      console.error("Error verifying OTP:", error);
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
          <Text style={styles.title}>ENTER YOUR VERIFICATION CODE</Text>
          <Text style={styles.subtitle}>
            We sent a verification code to
          </Text>
          <Text style={styles.email}>{routePhoneNumber}</Text>
          <View style={styles.inputContainer}>
            {verificationCode.map((digit, index) => (
              <View key={index} style={styles.inputWrapper}>
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              </View>
            ))}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            onPress={() => {
              /* Handle resend code */
            }}
            style={styles.resendButton}
          >
            <Text>Didn't receive the code? </Text>
            <Text style={styles.resendButtonText}>Resend the code</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleEnter}
              style={[
                styles.verifyButton,
                verificationCode.length === 6
                  ? { backgroundColor: "#1E3B2F" }
                  : { backgroundColor: "#63927E" },
              ]}
              activeOpacity={1}
              disabled={verificationCode.length !== 6}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          {loading && (
            <Modal transparent={true} visible={true} animationType="fade">
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            </Modal>
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
    fontSize: 19,
    color: "#1E3B2F",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#1E3B2F',
    fontSize: 40,
    fontFamily: "Poppins-Medium",
    marginHorizontal: 5,
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  resendButtonText: {
    color: "#1E3B2F",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  verifyButton: {
    padding: 12,
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  email: {
    color: "#1E3B2F",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OTPScreen;
