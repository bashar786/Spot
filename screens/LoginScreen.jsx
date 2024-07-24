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
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPin, setShowPin] = useState(false);

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
      navigation.navigate("LoginOTPScreen", {
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
          <Image style={styles.logo} source={require("../assets/images/spot.png")} />
          
          <View style={styles.textContainer}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.subText}>Log Into Your Account To Continue</Text>
          </View>

          <View style={styles.inputArea}>
            <View style={styles.inputWrapper}>
              <View style={styles.prefixDiv}>
              <AntDesign name="mobile1" size={30} color="black" style={styles.prefixImg}  />
                <Text style={styles.prefixText}>+971</Text>
              </View>
              <PaperTextInput 
                placeholder="(00) 000-0000"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="numeric"
                mode="flat"
                maxLength={13}
                error={!!error}
                underlineColor="transparent"
                theme={customTheme}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.prefixDiv}>
                <Foundation name="key" size={30} color="#1E3B2F" style={styles.prefixImg} />
              </View>
              <PaperTextInput 
                value={password}
                onChangeText={setPassword}
                style={styles.textInputEmail}
                keyboardType="numeric"
                maxLength={6}
                placeholder="PIN"
                secureTextEntry={!showPin}
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Icon name={showPin ? "visibility" : "visibility-off"} size={24} color="#999" />
              </TouchableOpacity>
            </View>
          <Text style={[styles.signup,{textAlign: 'right', textDecorationLine: 'underline'}]}>Forget Pin? </Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: isPhoneNumberValid ? "#1D533C" : "#63927E" },
              ]}
              disabled={!isPhoneNumberValid || loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.signup}>Don't have an Account <Text style={styles.signUp}>SIGN UP</Text></Text>
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
    backgroundColor: "#1E3B2F",
    flex: 1,
  },
  logo: {
    width: 420,
    height: 330,
    resizeMode: 'center',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
  },
  subText: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputArea: {
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 40,
  },
  prefixDiv: {
    position: 'absolute',
    left: 10,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixImg: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  prefixText: {
    color: '#1E3B2F',
    fontSize: 20,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    fontSize: 22,
    paddingHorizontal: 15,
    marginLeft: 50, // Adjust based on prefix size
  },
  textInputEmail: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    fontSize: 22,
    paddingHorizontal: 15,
    marginLeft: 0, // Adjust based on prefix size
  },
  iconContainer: {
    padding: 10,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#FFF",
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  signup: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  signUp: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 18
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default LoginScreen;
