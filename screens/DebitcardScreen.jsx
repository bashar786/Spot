import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import {
  TextInput,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { UpdatedDebitCardInfo } from "@/store/slice/UserInfoSlice";
import { useNavigation } from "expo-router";

const DebitCardScreen = () => {
  const navigation = useNavigation();
  const [maskedDebitCardNumber, setMaskedDebitCardNumber] = useState("");
  const [fullDebitCardNumber, setFullDebitCardNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [buttonColor, setButtonColor] = useState("#66B18A");
  const [cardType, setCardType] = useState("unknown");
  const [loading, setLoading] = useState(false); // State for loader
  const [maskedCvv, setMaskedCvv] = useState("");
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isCVVFocused, setIsCVVFocused] = useState(false);

  const handleCVVFocus = () => {
    setIsCVVFocused(true);
  };

  const handleCVVBlur = () => {
    setIsCVVFocused(false);
  };


  useEffect(() => {
    if (maskedDebitCardNumber && firstName && lastName && expiryDate && cvv) {
      setButtonColor("#1D533C");
    } else {
      setButtonColor("#66B18A");
    }
  }, [maskedDebitCardNumber, firstName, lastName, expiryDate, cvv]);

  useEffect(() => {
    setCardType(detectCardType(fullDebitCardNumber));
  }, [fullDebitCardNumber]);

  const detectCardType = (number) => {
    const firstTwoDigits = number.slice(0, 2);
    const firstThreeDigits = number.slice(0, 3);
    const cardPatterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5[0-9]{2})/,
      diners: /^3(?:0[0-5]|[68][0-9])/,
      jcb: /^(?:2131|1800|35\d{3})/,
      unionpay: /^(62|88)/,
      maestro: /^(50|56|57|58|6\d{2})/,
      rupay: /^(60|65|81|82|508)/,
      mir: /^220[0-4]/,
      elo: /^4011|^5067|^5090|^6277|^6363|^6362/,
      interpayment: /^636/,
      troy: /^65|^636/,
    };

    for (const [cardType, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(firstTwoDigits) || pattern.test(firstThreeDigits)) {
        return cardType;
      }
    }
    return "unknown";
  };

  const handleContinue = () => {
    if (maskedDebitCardNumber && firstName && lastName && expiryDate && cvv) {
      setLoading(true); // Show loader
      dispatch(
        UpdatedDebitCardInfo({
          debitCardNumber: fullDebitCardNumber,
          firstName,
          lastName,
          expiryDate,
          cvv, // Store the real CVV in Redux
        })
      );
      // Replace with your navigation logic
      setTimeout(() => {
        setLoading(false); // Hide loader after some time (mocking async operation)
        navigation.navigate("AddressScreen");
      }, 2000); // Mocking a delay for the loader
    }
  };

  const handleExpiryDateChange = (text) => {
    let cleaned = ("" + text).replace(/\D/g, "");
    if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 4);
    }
    const formatted = cleaned.replace(/(\d{2})(\d{2})/, "$1/$2");
    setExpiryDate(formatted);
  };
  const maskCardNumber = (number) => {
    const visibleDigits = 4;
    const maskChar = "•";

    if (number.length <= visibleDigits) {
      return number;
    }

    const maskedPart = maskChar.repeat(number.length - visibleDigits);
    const lastDigits = number.slice(-visibleDigits);

    // Format the masked part with spaces after every 4 characters
    const formattedMaskedPart = maskedPart.replace(/(.{4})/g, "$1 ").trim();
    const formattedLastDigits = lastDigits.replace(/(.{4})/g, "$1 ").trim();

    return `${formattedMaskedPart} ${formattedLastDigits}`.trim();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (fullDebitCardNumber.length > 12) {
      const visibleDigits = 4;
      const maskedPart = "•".repeat(fullDebitCardNumber.length - visibleDigits);
      const lastDigits = fullDebitCardNumber.slice(-visibleDigits);
      setMaskedDebitCardNumber(
        `${maskedPart.replace(/(.{4})/g, "$1 ")} ${lastDigits.replace(/(.{4})/g, "$1 ")}`
      );
    } else {
      setMaskedDebitCardNumber(maskCardNumber(fullDebitCardNumber));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setMaskedDebitCardNumber(fullDebitCardNumber.replace(/(.{4})(?=\d)/g, "$1 ").trim());
  };

  const updateDebitCardNumber = (text) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.length > 16) {
      cleaned = cleaned.slice(0, 16);
    }

    // Update the state with the cleaned number
    setFullDebitCardNumber(cleaned);

    if (isFocused) {
      setMaskedDebitCardNumber(cleaned.replace(/(.{4})(?=\d)/g, "$1 ").trim());
    } else {
      setMaskedDebitCardNumber(maskCardNumber(cleaned));
    }

    // Dispatch action to Redux
    dispatch(
      UpdatedDebitCardInfo({
        debitCardNumber: cleaned,
        firstName: firstName,
        lastName: lastName,
        expiryDate: expiryDate,
        cvv: cvv,
      })
    );
  };

  const getCardImage = () => {
    switch (cardType) {
      case "visa":
        return require("../assets/images/visa.png");
      case "mastercard":
        return require("../assets/images/mastercard.png");
      case "amex":
        return require("../assets/images/amex.png");
      case "discover":
        return require("../assets/images/discover.png");
      case "diners":
        return require("../assets/images/diners.png");
      case "jcb":
        return require("../assets/images/jcb.jpeg");
      case "unionpay":
        return require("../assets/images/unionpay.svg");
      case "maestro":
        return require("../assets/images/maestro.png");
      case "mir":
        return require("../assets/images/mir.png");
      case "elo":
        return require("../assets/images/elo.png");
      case "interpayment":
        return require("../assets/images/interpay.jpg");
      case "troy":
        return require("../assets/images/troy.png");
      default:
        return require("../assets/images/camera.png");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Header title="Add Debit Card" />
          <Text style={styles.verifyText}>
            Enter & verify your debit card information
          </Text>
        
          <View style={styles.inputContainer}>
          <Text style={{ fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 16 }}>Debit Card Number</Text>
            <View style={styles.inputWrapper}>
          {/* <TextInput
  value={isFocused ? maskedDebitCardNumber : maskCardNumber(fullDebitCardNumber)}
  onChangeText={updateDebitCardNumber}
  placeholder="Debit Card Number"
  placeholderTextColor="#7C7B7B"
  mode="flat"
  style={styles.input}
  underlineColor="transparent"
  keyboardType="numeric"
  maxLength={19} // 16 digits + 3 spaces
  contentStyle={styles.inputContent}
  labelStyle={{ fontFamily: "Poppins-Regular" }}
  returnKeyType="done"
  selectionColor="#1D533C"
  theme={{
    colors: {
      primary: "#F2F2F2",
    },
  }}
  onFocus={() => setIsFocused(true)}
  onBlur={() => {
    setIsFocused(false);
    setMaskedDebitCardNumber(maskCardNumber(fullDebitCardNumber)); // Update masked number on blur
  }}
/>*/}
  <TextInput
    value={maskedDebitCardNumber}
    onChangeText={updateDebitCardNumber}
    placeholder="Debit Card Number"
    placeholderTextColor="#7C7B7B"
    mode="flat"
    style={styles.input}
    underlineColor="transparent"
    keyboardType="numeric"
    maxLength={19} // 16 digits + 3 spaces
    contentStyle={styles.inputContent}
    labelStyle={{ fontFamily: "Poppins-Regular" }}
    returnKeyType="done"
    selectionColor="#1D533C"
    theme={{
      colors: {
        primary: "#F2F2F2",
      },
    }}
    onFocus={handleFocus} // Updated onFocus handler
    onBlur={handleBlur} // Updated onBlur handler
  />
  
              <Image source={getCardImage()} style={styles.cardIcon} />
            </View>
          </View>
          <View style={styles.inputContainer}>
          <Text style={{ fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 16 }}>First Name</Text>
            <TextInput
l              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              placeholder="First Name"
              contentStyle={styles.inputContent}
              labelStyle={{ fontFamily: "Poppins-Regular" }}
                 placeholderTextColor='#7C7B7B'
              returnKeyType="next"
              selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
                },
                fonts: {
                  regular: {
                    fontFamily: "Poppins-Regular",
                  },
                  medium: {
                    fontFamily: "Poppins-Medium",
                  },
                },
              }}
            />
          </View>
          <View style={styles.inputContainer}>
          <Text style={{ fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 16 }}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              contentStyle={styles.inputContent}
              labelStyle={{ fontFamily: "Poppins-Regular" }}
              mode="flat"
              placeholderTextColor='#7C7B7B'
              placeholder="Last Name"
              style={styles.input}
              underlineColor="transparent"
                 returnKeyType="done"
              selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
                },
                fonts: {
                  regular: {
                    fontFamily: "Poppins-Regular",
                  },
                  medium: {
                    fontFamily: "Poppins-Medium",
                  },
                },
              }}
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 16 }}>Expiration Date</Text>
              <TextInput
                value={expiryDate}

                onChangeText={handleExpiryDateChange}
                placeholder="MM/YY"
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={5}
                contentStyle={styles.inputContent}
                labelStyle={{ fontFamily: "Poppins-Regular" }}
                   returnKeyType="done"
              selectionColor="#1D533C"
                theme={{
                  colors: {
                    primary: "#F2F2F2",
                  },
                }}
              />
            </View>
            <View style={[styles.inputContainer, styles.halfInput]}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#1D533C', fontSize: 16 }}>Security Code/CVV</Text>
            <TextInput
        value={isCVVFocused ? cvv : cvv.replace(/./g, "•")} // Mask if not focused
        onChangeText={(text) => {
          // Clean and set CVV value
          const cleanedText = text.replace(/\D/g, "").slice(0, 4);
          setCvv(cleanedText);
        }}
        onFocus={handleCVVFocus}
        onBlur={handleCVVBlur}
        placeholder="000"
        placeholderTextColor="#7C7B7B"
        style={styles.input}
        underlineColor="#F2F2F2"
        keyboardType="numeric"
        maxLength={4}
        contentStyle={styles.inputContent}
        labelStyle={{ fontFamily: "Poppins-Regular" }}
        returnKeyType="done"
        selectionColor="#1D533C"
        theme={{
          colors: {
            primary: "#F2F2F2",
          },
        }}
      />
            </View>

          </View>

        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.button, { backgroundColor: buttonColor }]}
            disabled={
              !maskedDebitCardNumber ||
              !firstName ||
              !lastName ||
              !expiryDate ||
              !cvv
            }
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          </View>
        <Modal visible={loading} transparent={true}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </Modal>
    </ScrollView>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F2F2F2",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  verifyText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    textAlign: "center",
    color: '#454955'
  },
  inputContainer: {
    paddingBottom: -30,
    paddingHorizontal: 15,
    borderBottomColor: '#F2F2F2'
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: '#F2F2F2'

  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 0, 
    color: '#444444',
    borderBottomWidth: 0,
    borderBottomColor: '#F2F2F2'
  },
  label: {
    fontFamily: "Poppins-Regular",
  },
  inputContent: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: '#444444',
    borderBottomWidth: 0,
    borderBottomColor: '#F2F2F2'

  },
  cardIcon: {
    width: 40,
    height: 30,
    position: "absolute",
    right: 10,
    objectFit: "contain",
    bottom: 23,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.5,
  },
  button: {
    paddingVertical: 17,
    borderRadius: 8,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    position: 'absolute',
    bottom: 40
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer:{
    justifyContent: 'flex-start'
  }
});

export default DebitCardScreen;
