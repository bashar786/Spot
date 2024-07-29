import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
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
  const [buttonColor, setButtonColor] = useState("#66B18A");
  const [loading, setLoading] = useState(false); // State for loader
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (address && apt && zipCode && city) {
      setButtonColor("#1D533C");
    } else {
      setButtonColor("#66B18A");
    }
  }, [address, apt, zipCode, city, state]);

  const handleContinue = () => {
    if (address && apt && zipCode && city) {
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
        <View style={styles.container}>
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
              placeholderTextColor="#7C7B7B"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
                returnKeyType="done"
        selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
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
              placeholderTextColor="#7C7B7B"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
                returnKeyType="done"
        selectionColor="#1D533C"
              theme={{
                colors: {
                  primary: "#F2F2F2",
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
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                contentStyle={styles.inputContent}
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
              <Text style={styles.inputLabel}>Zip</Text>
              <TextInput
                value={zipCode}
                onChangeText={(text) => setZipCode(text)}
                placeholder="00000"
                placeholderTextColor="#7C7B7B"
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                keyboardType="numeric"
                maxLength={6}
                  returnKeyType="done"
        selectionColor="#1D533C"
                contentStyle={styles.inputContent}
                theme={{
                  colors: {
                    primary: "#F2F2F2",
                  },
                }}
              />
            </View>
          </View>
        
          <Modal visible={loading} transparent={true}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </Modal>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleContinue}
              style={[styles.button, { backgroundColor: buttonColor }]}
              disabled={!address || !apt || !zipCode || !city}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
      </PaperProvider>
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
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    color: '#1D533C',
    fontSize: 16,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 0, 
    color: '#444444'
  },
  inputContent: {
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: '#444444'
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
    bottom: 40,
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

export default AddressScreen;
