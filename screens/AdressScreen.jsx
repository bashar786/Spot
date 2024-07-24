import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
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
import { UpdatedDebitCardAddress } from "@/store/slice/UserInfoSlice";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [buttonColor, setButtonColor] = useState("#A99ABB");
  const [loading, setLoading] = useState(false); // State for loader
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (address && apt && zipCode && city) {
      setButtonColor("#1E3B2F");
    } else {
      setButtonColor("#63927E");
    }
  }, [address, apt, zipCode, city, state]);

  const handleContinue = () => {
    if (address && apt && zipCode && city ) {
      setLoading(true); // Show loader
      dispatch(UpdatedDebitCardAddress({ address, apt, zipCode, city, state }));
      // Replace with your navigation logic
      setTimeout(() => {
        setLoading(false); // Hide loader after some time (mocking async operation)
        navigation.navigate("ThankyouScreen");
      }, 2000); // Mocking a delay for the loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Header title="Add Address" />
          <Text style={styles.verifyText}>
            Enter your billing address information
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Street address. No PO boxes."
              placeholderTextColor="grey"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
              theme={{
                colors: {
                  primary: "grey",
                },
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Apt / Ste</Text>
            <TextInput
              value={apt}
              onChangeText={(text) => setApt(text)}
              placeholder="Apt / Ste"
              placeholderTextColor="grey"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
              theme={{
                colors: {
                  primary: "grey",
                },
              }}
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="City"
                placeholderTextColor="grey"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                contentStyle={styles.inputContent}
                theme={{
                  colors: {
                    primary: "grey",
                  },
                }}
              />
            </View>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <Text style={styles.inputLabel}>Zip</Text>
              <TextInput
                value={zipCode}
                onChangeText={(text) => setZipCode(text)}
                placeholder="00000"
                placeholderTextColor="grey"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={6}
                contentStyle={styles.inputContent}
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
            style={[styles.continueButton, { backgroundColor: buttonColor }]}
            activeOpacity={0.5}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          {loading && (
            <Modal transparent={true} visible={true} animationType="fade">
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            </Modal>
          )}
        </SafeAreaView>
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
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  verifyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    color: '#1E3B2F',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 0,
  },
  inputContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.5,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AddressScreen;
