import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import uaeflag from '../assets/images/uaeflag.png';
import Header from "@/components/Header";
import { Feather } from '@expo/vector-icons';
const EmailScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.11:3000/sendEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        dispatch(updatedUserInfo({ email }));
        navigation.navigate("OTPScreenEmail", { email });
      } else {
        setError("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const customTheme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: { fontFamily: 'Poppins-Regular' },
      medium: { fontFamily: 'Poppins-Medium' },
    },
   
  };

  return (
    <PaperProvider theme={customTheme}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
       <Header title="Enter Email" />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
         
          <View style={styles.inputArea}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#1E3B2F', fontSize: 20 }}>Email</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.prefixDiv}>

                <Feather name="mail" size={34} color="#1E3B2F" style={styles.prefixImg} />
              </View>
              <PaperTextInput
                placeholder="Enter your email"
                placeholderTextColor="grey"
                style={styles.textInput}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                autoCapitalize= 'none'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="email-address"
                 underlineColor="transparent"
                underlineColorAndroid="transparent"
                mode="flat"
                error={!!error}
                contentStyle={styles.inputContent}
                inputStyle={{ fontFamily: 'Poppins-Regular'}
                }
                theme={customTheme}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.description}>
              By continuing you agree to receive an authorization code to the email provided
            </Text>
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: email.trim() === "" || error ? "#63927E" : "#1E3B2F" },
              ]}
              disabled={loading}
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
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

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: "#1E3B2F",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
    height: 95,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650'
  },
  inputArea: {
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 20,
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
    left: 10,
    bottom: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  prefixImg: {
    width: 50,
    height: 45,
    resizeMode: 'contain'
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 0,
    backgroundColor: '#F2F2F2',
    border: "none"
  },
  inputContent: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 55
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
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
    color: "#5F5E61",
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular',
    textAlign: "left",
    paddingHorizontal: 0
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    fontFamily: 'Poppins-Regular',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
