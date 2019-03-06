import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button, Title,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';

const styles = StyleSheet.create({
  content: {},
  headline: {
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  loginButton: {
    marginTop: 8,
  },
});

const extractor = state => ({
  api: selectApi(state),
});

const dispatcher = dispatch => ({
});

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}
        >
          <Title style={styles.headline}>Friends</Title>
        </View>
        <Button title="Change Profile Picture" onPress={() => {}} mode="outlined">
          Add Friend
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedPreferencesScreen = connect(extractor, dispatcher)(PreferencesScreen);
export default ConnectedPreferencesScreen;
