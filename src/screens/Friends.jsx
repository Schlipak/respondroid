import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button, Title,
} from 'react-native-paper';
import Container from '../components/Container';

const styles = StyleSheet.create({
  content: {},
  headline: {
    marginBottom: 5,
  },
});

const PreferencesScreen = () => (
  <KeyboardAvoidingView style={styles.content} behavior="padding">
    <Container>
      <Title style={styles.headline}>Friends</Title>
      <Button title="Change Profile Picture" onPress={() => {}} mode="outlined">
        Add Friend
      </Button>
    </Container>
  </KeyboardAvoidingView>
);

export default PreferencesScreen;
