import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ loading }) => {
  return (
    <Modal transparent={true} visible={loading} animationType="fade">
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent grey background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
