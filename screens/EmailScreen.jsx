import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import axios from "axios";

const EmailScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    if (email.trim() === "") {
      setError("required");
      return;
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setLoading(true); // Show loader

    // Dispatch email to backend for sending OTP
    try {
      const response = await fetch("http://192.168.1.21:3000/sendEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.status === 200) {
        dispatch(updatedUserInfo({ email }));
        navigation.navigate("OTPScreenEmail", { email }); // Pass email to OTPScreen
      } else {
        setError("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const customTheme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: { fontFamily: 'Poppins-Regular' },
      medium: { fontFamily: 'Poppins-Medium' },
    },
    colors: {
      ...DefaultTheme.colors,
      primary: 'grey',
      background: '#FFFFFF',
      placeholder: 'grey',
    },
  };

  return (
    <PaperProvider theme={customTheme}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Header title="Enter Email" />
            <View style={styles.inputArea}>
              <PaperTextInput
                keyboardType="email-address"
                label={<Text style={styles.label}>Email</Text>}
                placeholder="Enter your email"
                placeholderTextColor="grey"
                contentStyle={styles.inputContent}
                style={styles.inputEmail}
                value={email}
                autoCapitalize="none"
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                error={!!error}
                theme={customTheme}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
              <Text style={styles.description}>
                By continuing you agree to receive an authorization code to the email provided
              </Text>
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    {
                      backgroundColor: email.trim() === "" || error ? "#63927E" : "#1E3B2F",
                    },
                  ]}
                  onPress={handleContinue}
                  disabled={loading}
                  activeOpacity={0.5}
                  delayPressIn={50}
                >
                  <Text style={styles.continueText}>CONTINUE</Text>
                </TouchableOpacity>
                {loading && (
                  <Modal transparent={true} visible={true} animationType="fade">
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                  </Modal>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  inputEmail: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 0,
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#7C7A7F",
    lineHeight: 35,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  inputContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 10,
    paddingHorizontal: 0,
    color: "#5F5E61",
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular',
    textAlign: "left",
    marginLeft: 0,
  },
  errorText: {
    color: "red",
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
    textAlign: 'left',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'left',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
