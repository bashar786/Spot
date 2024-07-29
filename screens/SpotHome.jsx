import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
const SpotHome = () => {
  return (
    <View>
       <ImageBackground source={require('@/assets/images/Screenshot.png')} style={styles.background}>
 
  </ImageBackground>
    </View>
  )
}

export default SpotHome

const styles = StyleSheet.create({
  background: {
   height: '100%',
   width: '100%',
   resizeMode: "contain"
  },
})