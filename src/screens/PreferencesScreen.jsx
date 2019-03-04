import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput as NativeTextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText, Title, Text
} from 'react-native-paper';
import { ImagePicker } from 'expo';
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
    this.state = {
      filePath: '',
    };
  }

  chooseFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({
        filePath: result.uri,
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const uri = this.state.filePath;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title style={styles.headline}>Application preferences</Title>
        <Button title="Choose File" onPress={this.chooseFile}>
          Choose File
        </Button>
        <Image source={{ uri }} style={{width: 200, height: 200}} />
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
