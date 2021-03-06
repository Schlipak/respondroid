import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView, TextInput as NativeTextInput, Image,
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText,
} from 'react-native-paper';
import AirtableLogo from '../../assets/AirtableLogo.jpg';
import { selectApi } from '../ducks/api';
import { connectApi } from '../middlewares/Api/thunks';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

const extractor = state => ({
  api: selectApi(state),
});

const dispatcher = dispatch => ({
  connectToApi: (e, p) => dispatch(connectApi({
    baseID: e,
    airtableID: p,
  })),
});

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    connectToApi: PropType.func.isRequired,
    api: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.myapikey = 'keyvjAQrGLMU55S4c';
    this.baseid = 'appnUR8P3LDjMeZjC';
    this.state = {
      email: this.baseid,
      emailError: false,
      password: this.myapikey,
      passwordError: false,
    };
  }

  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError: email.length === 0,
    });
  };

  validatePassword = () => {
    const { password } = this.state;
    this.setState({
      passwordError: password.length === 0,
    });
  };

  validateAndSubmit = () => {
    this.validateEmail();
    this.validatePassword();
    const { email, password } = this.state;
    const { connectToApi, navigation } = this.props;
    connectToApi(email, password).then(() => {
      navigation.navigate('Home');
    });
  };

  render() {
    const {
      email, emailError, password, passwordError,
    } = this.state;
    const { api } = this.props;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Image source={AirtableLogo} />
        <Headline style={styles.headline}>Sign in to Airtable</Headline>
        <View style={styles.inputContainer}>
          <TextInput
            disabled={api.connected}
            label="Account ID"
            value={email || this.baseid}
            error={emailError}
            mode="outlined"
            onChangeText={text => this.setState({ email: text })}
            onBlur={this.validateEmail}
            onSubmitEditing={() => this.passwordInput.focus()}
            blurOnSubmit={false}
            render={props => (
              <NativeTextInput
                {...props}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            )}
          />
          <HelperText type="error" visible={emailError}>
            Invalid ID
          </HelperText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            disabled={api.connected}
            ref={passwordInput => (this.passwordInput = passwordInput)}
            label="Account Key"
            value={password || this.myapikey}
            error={passwordError}
            mode="outlined"
            onChangeText={text => this.setState({ password: text })}
            onBlur={this.validatePassword}
            render={props => (
              <NativeTextInput {...props} textContentType="password" secureTextEntry />
            )}
          />
          <HelperText type="error" visible={passwordError}>
            Invalid Key
          </HelperText>
        </View>
        <View style={styles.inputContainer}>
          <Button
            style={styles.loginButton}
            mode="contained"
            disabled={emailError || passwordError || api.connected}
            onPress={this.validateAndSubmit}
          >
            Connect
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
