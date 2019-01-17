import React from 'react';
import PropType from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 20,
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.content}>
    <Text>Open up App.js to start working on your app!</Text>
    <Divider style={styles.divider} />
    <Button mode="contained" onPress={() => navigation.navigate('FooBar')}>
      <Text>Go to FooBar</Text>
    </Button>
  </View>
);

HomeScreen.propTypes = {
  navigation: PropType.objectOf(PropType.any).isRequired,
};

export default HomeScreen;
