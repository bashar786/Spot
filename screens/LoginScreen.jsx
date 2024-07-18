import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import {
  TextInput as PaperTextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons"; // Import Feather icons

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State for password visibility

  const handleNumberChange = (text) => {
    const formatted = text.replace(/\D/g, ""); // Remove non-digit characters

    // Format the phone number based on its length
    let formattedPhoneNumber = "";
    if (formatted.length > 0) {
      formattedPhoneNumber += `(${formatted.slice(0, 2)}`;
    }
    if (formatted.length >= 3) {
      formattedPhoneNumber += `) ${formatted.slice(2, 5)}`;
    }
    if (formatted.length >= 6) {
      formattedPhoneNumber += `-${formatted.slice(5, 10)}`;
    }

    setPhoneNumber(formattedPhoneNumber); // Update state with formatted phone number
    dispatch(updatedUserInfo({ number: formatted })); // Dispatch the number to Redux or your state management
  };

  const isPhoneNumberValid = phoneNumber.length === 13; // Adjust the length for the formatted number

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (!isPhoneNumberValid || password.trim() === "") {
      setError("Please enter a valid phone number and password.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("LoginOTPScreen", {
        phoneNumber: `+971 ${phoneNumber}`,
      });
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const customTheme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: { fontFamily: "Poppins-Regular" },
      medium: { fontFamily: "Poppins-Medium" },
    },
    colors: {
      ...DefaultTheme.colors,
      primary: "grey",
      background: "#FFFFFF",
      placeholder: "grey",
    },
  };

  return (
    <PaperProvider theme={customTheme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../assets/images/spot.png")}
            />
          </View>
          <View style={styles.inputArea}>
            <View style={styles.inputWrapper}>
              {isFocused && <Text style={styles.prefixText}>+971</Text>}
              <PaperTextInput
                label={<Text style={styles.label}>UAE Mobile Number</Text>}
                placeholder={
                  isFocused || phoneNumber.length > 0
                    ? "(00) 000-0000"
                    : "+971 (00) 000-0000"
                }
                placeholderTextColor="grey"
                style={[styles.textInput, isFocused && styles.textInputFocused]}
                value={phoneNumber}
                onChangeText={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (phoneNumber.length === 0) {
                    setIsFocused(false);
                  }
                }}
                keyboardType="numeric"
                mode="flat"
                maxLength={13} // Adjust the max length for the formatted number
                error={!!error}
                contentStyle={styles.inputContent}
                underlineColor="transparent"
                theme={customTheme}
                inputStyle={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <PaperTextInput
                label={<Text style={styles.label}>Enter your 6 digit pin</Text>}
                placeholder="Enter your password"
                placeholderTextColor="grey"
                style={[styles.textInput, styles.textInputPassword]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                keyboardType="numeric"
                mode="flat"
                maxLength={6} // Adjust as needed
                error={!!error}
                contentStyle={styles.PasswordInputContent}
                underlineColor="transparent"
                theme={customTheme}
                inputStyle={{ fontFamily: "Poppins-Regular" }}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={togglePasswordVisibility}
              >
                <Feather
                  name={secureTextEntry ? "eye-off" : "eye"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              style={[
                styles.continueButton,
                {
                  backgroundColor: isPhoneNumberValid ? "#1E3B2F" : "#63927E",
                },
              ]}
              disabled={!isPhoneNumberValid || loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.signup}>Don't have an Account <Text style={styles.signUp}>SIGN UP</Text></Text>
            <View style={styles.footer}>
              <Text
                style={styles.footerText}
                onPress={() => navigation.navigate("PrivacyScreen")}
              >
                Terms of Use
              </Text>
              <Text style={styles.footerText}> • </Text>
              <Text
                style={styles.footerText}
                onPress={() => navigation.navigate("PrivacyScreen")}
              >
                Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>

        {loading && (
          <Modal transparent={true} visible={true} animationType="fade">
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 300,
    height: 170,
    resizeMode: "contain",
    marginBottom: -20
  },
  header: {
    backgroundColor: "#1E3B2F",
    justifyContent: "flex-end",
    paddingBottom: 0,
    alignItems: 'center'
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  signup:{
    fontFamily: 'Poppins-Regular',
    marginTop: 20
  },
  signUp:{
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
  },
  inputArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  prefixText: {
    fontSize: 22,
    color: "black",
    fontFamily: "Poppins-Regular",
    position: "absolute",
    left: 0,
    bottom: 6,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#7C7A7F",
    paddingHorizontal: 0,
  },
  textInputFocused: {},
  textInputPassword: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#7C7A7F",
    paddingHorizontal: 0,
  },
  inputContent: {
    fontFamily: "Poppins-Regular",
    marginLeft: 60,
  },
  PasswordInputContent: {
    fontFamily: "Poppins-Regular",
    marginLeft: 0,
  },
  label: {
    fontFamily: "Poppins-Regular",
    color: "grey",
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
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 28,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  footerText: {
    color: "#1E3B2F",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    bottom: 6,
    zIndex: 1,
    padding: 10,
  },
});
