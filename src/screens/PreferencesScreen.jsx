import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView, TextInput as NativeTextInput, Image
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText, Text, Title,
} from 'react-native-paper';
import AirtableLogo from '../../assets/AirtableLogo.jpg';
import { selectApi } from '../ducks/api';
import { connectApi } from '../middlewares/Api/thunks';

const styles = StyleSheet.create({
  content: {

  },
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

const extractor = (state) => ({
  api: selectApi(state),
});

const dispatcher = (dispatch) => ({
});

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const type = navigation.getParam('type');
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title style={styles.headline}>Application preferences</Title>
        <Text>
          {JSON.stringify(type)}
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
