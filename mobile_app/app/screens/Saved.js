import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Saved = () => {
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Saved</Text>
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#e0f4fe",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "black",
      top: 170,
      position: "absolute",
    },
  });