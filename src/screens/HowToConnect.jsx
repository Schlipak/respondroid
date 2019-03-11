import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Title, Text,
} from 'react-native-paper';

const styles = StyleSheet.create({
  content: {},
  headline: {
    marginBottom: 5,
  },
  basicView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
});

const PreferencesScreen = () => ({
  render() {
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <View style={styles.basicView}>
          <Title style={styles.headline}>How to create an account</Title>
          <Text>
            You need to create an account on Airtable before using Kanbord.
            This will no longer be required in the next version. We are sorry for the inconvenience.
          </Text>
          <Text>1. Go to airtable.com and create an account</Text>
          <Text>2. Once your account is created, create a new base</Text>
          <Text>3. In the new base, create 3 tables</Text>
          <Text>a. Meta, with two columns Name(String) and Value(String)</Text>
          <Text>b. Types, with four columns:</Text>
          <Text>Name (String), Description (String), Fields(String), CreatedAt (Created Time)</Text>
          <Text>c. Database, with two columns Name(String), Type(Reference To Type)</Text>
          <Text>Once you have Airtable set up, go to the API documentation</Text>
          <Text>Find your airtable base id and airtable api key, you can now login</Text>
        </View>
      </KeyboardAvoidingView>
    );
  },
});

export default PreferencesScreen;
