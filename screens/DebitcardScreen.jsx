import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  ActivityIndicator,
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
  const [cvv, setCvv] = useState("");
  const [buttonColor, setButtonColor] = useState("#A99ABB");
  const [cardType, setCardType] = useState("unknown");
  const [loading, setLoading] = useState(false); // State for loader
  const [maskedCvv, setMaskedCvv] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (maskedDebitCardNumber && firstName && lastName && expiryDate && cvv) {
      setButtonColor("#1E3B2F");
    } else {
      setButtonColor("#63927E");
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

  const updateCvv = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 3); // Remove non-digits and limit to 3 characters
    setCvv(cleaned); // Store the actual CVV value

    // Mask the CVV input with mid dots (•)
    setMaskedCvv(cleaned.replace(/\d/g, "•"));
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

  const updateDebitCardNumber = (text) => {
    // Remove all non-digit characters
    let cleaned = text.replace(/\D/g, "");

    // Restrict input to a maximum of 16 digits
    if (cleaned.length > 16) {
      cleaned = cleaned.slice(0, 16);
    }

    let formatted;
    // Update the state with the masked card number and the full cleaned number
    if (cleaned.length === 16) {
      formatted = maskCardNumber(cleaned);
    } else {
      // Format the number by adding a space after every 4 digits for display
      formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    setMaskedDebitCardNumber(formatted);
    setFullDebitCardNumber(cleaned); // Store the real full debit card number in state

    // Dispatch action to Redux with the full cleaned number
    dispatch(
      UpdatedDebitCardInfo({
        debitCardNumber: cleaned, // Store the real full debit card number in Redux
        firstName: "", // Replace with the actual first name state
        lastName: "", // Replace with the actual last name state
        expiryDate: "", // Replace with the actual expiry date state
        cvv: "", // Replace with the actual CVV state
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
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Header title="Add Debit Card" />
          <Text style={styles.verifyText}>
            Enter & verify your debit card information
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                label={<Text style={styles.label}>Debit Card Number</Text>}
                value={maskedDebitCardNumber}
                onChangeText={updateDebitCardNumber}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="grey"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={19} // 16 digits + 3 spaces
                contentStyle={styles.inputContent}
                labelStyle={{ fontFamily: "Poppins-Regular" }}
                theme={{
                  colors: {
                    primary: "grey",
                  },
                }}
              />

              <Image source={getCardImage()} style={styles.cardIcon} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label={<Text style={styles.label}>First Name</Text>}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
              labelStyle={{ fontFamily: "Poppins-Regular" }}
              theme={{
                colors: {
                  primary: "grey",
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
            <TextInput
              label={<Text style={styles.label}>Last Name</Text>}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              contentStyle={styles.inputContent}
              labelStyle={{ fontFamily: "Poppins-Regular" }}
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: "grey",
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
              <TextInput
                label={<Text style={styles.label}>Expiration Date</Text>}
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                placeholder="MM/YY"
                placeholderTextColor="grey"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={5}
                contentStyle={styles.inputContent}
                labelStyle={{ fontFamily: "Poppins-Regular" }}
                theme={{
                  colors: {
                    primary: "grey",
                  },
                }}
              />
            </View>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <TextInput
                label={<Text style={styles.label}>Security Code/CVV</Text>}
                value={cvv.length === 3 ? "•••" : cvv} // Mask after 3 digits
                onChangeText={(text) => setCvv(text)}
                placeholder="000"
                placeholderTextColor="grey"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={3}
                contentStyle={styles.inputContent}
                labelStyle={{ fontFamily: "Poppins-Regular" }}
                theme={{
                  colors: {
                    primary: "grey",
                  },
                }}
              />
            </View>
          </View>
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
        </SafeAreaView>
        <Modal visible={loading} transparent={true}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </Modal>
      </PaperProvider>
    </ScrollView>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "grey",
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
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    paddingBottom: -30,
    paddingHorizontal: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    lineHeight: 35,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    fontFamily: "Poppins-Regular",
  },
  inputContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
  },
  cardIcon: {
    width: 40,
    height: 30,
    position: "absolute",
    right: 10,
    objectFit: "contain",
    bottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.5,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default DebitCardScreen;
