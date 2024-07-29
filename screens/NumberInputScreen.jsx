import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, Image, TextInput} from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import uaeflag from '../assets/images/uaeflag.png'
import Header from "@/components/Header";
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const NumberInputScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    if (!isPhoneNumberValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OTPScreenNumber", { phoneNumber: `+971 ${phoneNumber}` });
    }, 10);
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
         <Header title='Enter Mobile Number' />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.inputArea}>
          <Text style={{fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 20}}>UAE Mobile Number</Text>
            <View style={styles.inputWrapper}>
            <View style={styles.prefixDiv}>
            <Image source={uaeflag} style={styles.prefixImg} />
            <Text style={{color: '#1D533C', fontSize: 19, fontWeight: '600'}}>+971</Text>
            </View>
         
              <TextInput 
                placeholder="(00) 000-0000"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="numeric"
                maxLength={13} // Adjust the max length for the formatted number
                error={!!error}
                contentStyle={styles.inputContent}
                inputStyle={styles.inputContent}
                selectionColor="#1D533C" 
                 returnKeyType="done"
            />
             
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.description}>
              You consent to receive automated texts to the mobile phone number provided
              for authentication and payment notifications from SPOT®. Text STOP to
              opt out and HELP for help. Message and data rates may apply.
            </Text>
            <TouchableOpacity
              style={[
                styles.ContinueButton,
                { backgroundColor: isPhoneNumberValid ? "#1E3B2F" : "#66B18A" },
              ]}
              disabled={!isPhoneNumberValid || loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.ContinueText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text
                style={styles.footerText}
                onPress={() => navigation.navigate("PrivacyScreen")}
              >
                Terms of Use
              </Text>
              <Text style={styles.footerText}> & </Text>
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

export default NumberInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputArea: {
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  prefixDiv: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    left:10,
    bottom: 6,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  prefixImg:{
    width: 50,
    height:45,
    resizeMode: 'contain'
  },
  textInput: {
    flex: 1,
    fontSize: 19,
    paddingHorizontal: 0,
    backgroundColor: '#F2F2F2',
    padding: 17,
 paddingLeft: 110
  },
  textInputFocused: {},
  inputContent: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 110,
    color: '#444444',
  },
  ContinueButton: {
    marginTop: 20,
    padding: 17,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: -3
  },
  ContinueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  description: {
    fontSize: 12,
    color: "#53575F",
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular',
    textAlign: "justify",
    paddingHorizontal: 0,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 28,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#1D533C",
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
inputField:{
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#7C7A7F",
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  }
});
