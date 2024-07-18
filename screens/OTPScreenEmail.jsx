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
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const OTPScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.user.userInfo.email);
  const navigation = useNavigation();
  const route = useRoute();
  const { email: routeEmail } = route.params;

  const handleEnter = async () => {
    if (verificationCode.trim() === "") {
      setError("Please enter the verification code.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.21:3000/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: routeEmail, otp: verificationCode }),
      });
      const data = await response.json();

      if (response.ok) {
        navigation.navigate("SetPinScreen");
      } else {
        setError(data.error || "Failed to verify OTP. Please try again.");
    }
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
            We sent a verification code to{" "}
            <Text style={styles.email}> {routeEmail}</Text>
          </Text>
          <TextInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={[styles.input, { fontSize: 55 , fontFamily: 'Poppins-Thin'}]} // Adjust the fontSize here
            keyboardType="numeric"
            maxLength={6}
            placeholderStyle={styles.placeholder}
            
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            onPress={() => {
              /* Handle resend code */
            }}
            style={styles.resendButton}
          >
            <Text style={styles.resendButtonText}>Resend the code</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleEnter}
              style={[
                styles.enterButton,
                verificationCode
                  ? { backgroundColor: "#1E3B2F" }
                  : { backgroundColor: "#63927E" },
              ]}
              activeOpacity={1}
            >
              <Text style={styles.enterButtonText}>ENTER</Text>
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
    fontSize: 19,
    color: "#000",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    textAlign: "center",
    marginVertical: 15,
    letterSpacing: 8,
    alignSelf: 'center',
  },
  resendButton: {
    marginBottom: 15,
  },
  resendButtonText: {
    color: "#1E3B2F",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
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
  enterButton: {
    padding: 12,
    alignItems: "center",
    width: "50%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  enterButtonText: {
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OTPScreen;
