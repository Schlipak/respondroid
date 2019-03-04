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
import { saveUserProfilePicture } from '../ducks/user';

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
  changeProfilePicture: (id, b64img) => dispatch(saveUserProfilePicture(id, b64img)),
});

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {
      filePath: '',
    };
  }

  saveProfilePic = () => {
    const { api } = this.props;
    const row = api.tables.Meta.content.find(it => it.fields.Name === 'Picture');
    if (row && row.id) {
      this.props.changeProfilePicture(row.id, `data:image/png;base64,${this.state.data}`)
    }
  };

  toBase64 = (file, callback) => {
    const reader = new FileReader();
    console.log('FileReader started job on file');
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  chooseFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      aspect: [1,1],
      quality: 0.25,
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({
        filePath: result.uri,
        data: result.base64,
      });
    }
  };

  render() {
    const img = this.state.data && `data:image/png;base64,${this.state.data}`;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
          <Title style={styles.headline}>Application preferences</Title>
          <Button onPress={this.saveProfilePic}>
            Save
          </Button>
        </View>
        <Button title="Choose File" onPress={this.chooseFile}>
          Choose File
        </Button>
        <Image source={{ uri: img }} style={{width: 200, height: 200}} />
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedPreferencesScreen = connect(extractor, dispatcher)(PreferencesScreen);
export default ConnectedPreferencesScreen;
