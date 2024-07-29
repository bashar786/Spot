import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, CheckBox } from 'react-native-elements';
import Header from '../components/Header';
import { Feather } from '@expo/vector-icons';
const PrivacyScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true); // State for initial loading

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 0); // Reduced delay
  }, []);

  const handleContinue = () => {
    if (isChecked) {
      navigation.navigate('EmailScreen');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3B2F" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
      <View style={styles.header}>
      <Feather 
      name="arrow-left"
        onPress={() => navigation.navigate('NumberInputScreen')}
        size={35}
        color="white"
        style={styles.icon}
        />
      <Text style={styles.headerText}>Privacy Policy</Text>
    </View>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Section Title */}
          <Text style={styles.sectionTitle}>
            How will <Text style={styles.highlightText}>SPOT®</Text> use my data?
          </Text>

          {/* Paragraphs with Bullets */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              When you use our app, we access and/or collect information from you. For instance, location and device data may be used to provide an enhanced user experience.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              We use third-party software to scan your device to detect malware and protect your account from misuse. No data is stored or collected through this scan.
            </Text>
          </View>

          {/* Link and Legal Information */}
          <Text style={styles.paragraph}>
            Learn more about what data we collect and how we use it in our <Text style={styles.link}>Just In Time Notice</Text> and <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          {/* Safety Guidelines */}
          <Text style={styles.sectionTitle}>How can I keep my money safe?</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.paragraph}>
              Only send money to people you know and trust. Make sure to use the correct UAE mobile number. See our <Text style={styles.link}>website</Text> and <Text style={styles.link}>Service Agreement</Text> for more details on using SPOT® safely.
            </Text>
          </View>
        </ScrollView>

        {/* Checkbox and Continue Button */}
        <View style={styles.footer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#1E3B2F"
              containerStyle={styles.checkboxContainer}
            />
            <Text style={styles.checkboxLabel}>
              By checking this box, you agree to our <Text style={styles.link}>E-Sign Consent</Text>, <Text style={styles.link}>Privacy Policy</Text>, and <Text style={styles.link}>Service Agreement</Text>.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueButton, { backgroundColor: isChecked ? '#1E3B2F' : '#66B18A' }]}
            disabled={!isChecked}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 80, // Ensure space for footer
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    marginBottom: 10,
    color: '#454955',
  },
  highlightText: {
    color: '#454955',
    fontFamily: 'Poppins-Medium',
  },
  paragraphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  bullet: {
    marginRight: 10,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  paragraph: {
    flex: 1,
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 19,
    paddingBottom: 5,
    fontFamily: 'Poppins-Medium',
    color: '#262628',
    letterSpacing: 0
  },
  link: {
    color: '#1E3B2F',
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Adjust background color
    borderWidth: 0, // Ensure no additional border
    paddingHorizontal: 0, // Adjust padding if necessary
    margin: 0, // Adjust margin if necessary
    paddingLeft: 10,
  },
  checkboxLabel: {
    fontSize: 12,
    color: 'black',
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  continueButton: {
    marginTop: 20,
    padding: 17,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent grey background
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: '#1D3B2F',
    height: 95,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    position: 'relative',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: 2,
    bottom: -8,
    color: '#FFFFFF',
    padding: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650'
  },
});

export default PrivacyScreen;
