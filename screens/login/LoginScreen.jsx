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
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import { CheckBox } from "react-native-elements";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleNumberChange = (text) => {
    const formatted = text.replace(/\D/g, ""); // Remove non-digit characters

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

    setPhoneNumber(formattedPhoneNumber);
    dispatch(updatedUserInfo({ number: formatted }));
  };

  const isPhoneNumberValid = phoneNumber.length === 13;

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
      navigation.navigate("LoginOTPNumber", {
        phoneNumber: `+971 ${phoneNumber}`,
      });
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPin(!showPin);
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
      background: "#FFFFFF",
      primary: '#F2F2F2'
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
          <Image
            style={styles.logo}
            source={require("../../assets/images/spotnew.jpeg")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.subText}>Log Into Your Account To Continue</Text>
          </View>

          <View style={styles.inputArea}>
            <View style={styles.inputWrapper}>
              <View style={styles.prefixDiv}>
                <AntDesign
                  name="mobile1"
                  size={30}
                  color="#1D3B2F"
                  style={styles.prefixImg}
                />
                {(isFocused || phoneNumber) && (
                  <Text style={styles.prefixText}>+971</Text>
                )}
              </View>
              <PaperTextInput
                placeholder="Phone Number"
                placeholderTextColor="#444444"
                style={[styles.textInput, { marginLeft: isFocused || phoneNumber ? 50 : 0 }]}
                value={phoneNumber}
                onChangeText={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="numeric"
                maxLength={13}
                contentStyle={{fontFamily: 'Poppins-Medium', fontSize: 19, color: '#444444'}}
                error={!!error}
                underlineColor="#F2F2F2"
                theme={customTheme}
                  selectionColor="#1D533C" 
                 returnKeyType="done"
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.prefixDiv}>
                <Foundation
                  name="key"
                  size={30}
                  color="#1C533C"
                  style={styles.prefixImg}
                />
              </View>
              <PaperTextInput
                value={password}
                onChangeText={setPassword}
                style={styles.textInputEmail}
                keyboardType="numeric"
                maxLength={6}
                placeholder="6-Digit PIN"
                secureTextEntry={!showPin}
                placeholderTextColor="#444444"
                  selectionColor="#1D533C" 
                 returnKeyType="done"
                 contentStyle={{fontFamily: 'Poppins-Medium', fontSize: 19, color: '#444444'}}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Icon
                  name={showPin ? "visibility" : "visibility-off"}
                  size={24}
                  color="#1C533C"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxRow}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#fff"
              containerStyle={styles.checkboxContainer}
            />
            <Text style={styles.checkboxLabel}>
            Remember Me
            </Text>
            </View>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate("ResetNumberScreen")}>
              <Text
                style={[
                  styles.signup,
                  {
                    textAlign: "right",
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Forget Pin?
              </Text>
            </TouchableOpacity>
            </View>
          </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: isPhoneNumberValid ? "#1D533C" : "#66B18A" },
              ]}
              disabled={!isPhoneNumberValid || loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>Log in</Text>
            </TouchableOpacity>
            <Text style={[styles.signup,{marginTop: 20}]}>
              Don't have an Account <Text style={styles.signUp}>SIGN UP</Text>
            </Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D3B2F",
    flex: 1,
  },
  logo: {
    width: 420,
    height: 330,
    resizeMode: "center",
    marginBottom: 0,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#FFF",
    fontFamily: "Urbanist-Bold",
    fontSize: 35,
    marginBottom: 10,
  },
  subText: {
    color: "#FFF",
    fontFamily: "Urbanist-Medium",
    fontSize: 18,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  inputArea: {
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingLeft: 40,
  },
  prefixDiv: {
    position: "absolute",
    left: 6,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 37,
    marginVertical: 10
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Adjust background color
    borderWidth: 0, // Ensure no additional border
    paddingHorizontal: 0, // Adjust padding if necessary
    margin: 0, // Adjust margin if necessary
    paddingLeft: 10,
  },
  checkboxLabel: {
    fontSize: 17,
    color: '#fff',
    flex: 1,
    fontFamily: 'Poppins-Medium',
  },
  prefixImg: {
    width: 38,
    resizeMode: "contain",
  },
  prefixText: {
    color: "#1D533C",
    fontSize: 19,
    fontFamily: "Poppins-SemiBold",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    fontSize: 19,
    paddingHorizontal: 15,
    fontFamily: "Poppins-Medium",
    borderBottomWidth: 0,
    color: '#444444'
  },
  textInputEmail: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    fontSize: 20,
    paddingHorizontal: 15,
    marginLeft: 0, // Adjust based on prefix size
    borderBottomWidth: 0,
    color: '#444444'
  },
  iconContainer: {
    padding: 10,
  },
  continueButton: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#FFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  signup: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    textAlign: "center",
    marginRight: 20
  },
  signUp: {
    color: "white",
    textDecorationLine: "underline",
    fontFamily: 'Poppins-SemiBold'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoginScreen;
