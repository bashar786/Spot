// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <FontAwesome
        name="angle-left"
        onPress={() => navigation.goBack()}
        size={35}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E3B2F',
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

export default Header;
