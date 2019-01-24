import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView, TextInput as NativeTextInput,
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText,
} from 'react-native-paper';

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

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
    };
  }

  componentDidMount() {
    this.toto = true;
  }

  componentWillUnmount() {
    console.log('gyfyt');
    this.toto = false;
  }

  validateEmail = () => {
    const { email } = this.state;
    const emailError = !email.match(/^[^@]+@[^@]+$/);

    if (this.toto) {
      console.log('toto');
      this.setState({ emailError });
    }
  };

  validatePassword = () => {
    const { password } = this.state;
    const passwordError = password.length < 6;

    if (this.toto) {
      this.setState({ passwordError });
    }
  };

  validateAndSubmit = () => {
    this.validateEmail();
    this.validatePassword();

    // const { emailError, passwordError } = this.state;
  };

  render() {
    const {
      email, emailError, password, passwordError,
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Headline style={styles.headline}>Sign in to ResponDroid</Headline>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            placeholder="john.doe@example.com"
            value={email}
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
            Please input a valid email address
          </HelperText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={passwordInput => (this.passwordInput = passwordInput)}
            label="Password"
            placeholder="••••••"
            value={password}
            error={passwordError}
            mode="outlined"
            onChangeText={text => this.setState({ password: text })}
            onBlur={this.validatePassword}
            render={props => (
              <NativeTextInput {...props} textContentType="password" secureTextEntry />
            )}
          />
          <HelperText type="error" visible={passwordError}>
            The password must be 6 characters or longer
          </HelperText>
        </View>
        <View style={styles.inputContainer}>
          <Button
            style={styles.loginButton}
            mode="outlined"
            disabled={emailError || passwordError}
            onPress={this.validateAndSubmit}
          >
            Log in
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
