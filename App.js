/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

import colors from './constants/colors';

const { white } = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => (
  <PaperProvider>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        <Text>Autre texte</Text>
      </Button>
    </View>
  </PaperProvider>
);
