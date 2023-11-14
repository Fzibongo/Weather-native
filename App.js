import React from 'react';
import { StyleSheet, View } from 'react-native';
import Weather from './Components/Weather';

export default function App() {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
