import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TransferMoney = () => {
  return (
    <View style={styles.container}>
      <Icon name="settings-outline" size={30} color="#FFFFFF" style={styles.icon} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
      <View style={styles.activity}>
      <Text style={styles.activityText}>ACTIVITY</Text>
      </View>
     
    </View>
  );
};

export default TransferMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3B2F', // Background color
    paddingTop: 40,
    paddingBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#FFFFFF',
  },
  activityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#1E3B2F',
  },
  activity:{
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#fff",
    width: '100%',
    padding: 10,
    alignItems: 'center'
  }
});
