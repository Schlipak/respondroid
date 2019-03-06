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
  Headline, TextInput, Button, HelperText, Title, Text,
} from 'react-native-paper';
import { ImagePicker } from 'expo';
import { selectApi } from '../ducks/api';
import { saveUsername, saveUserProfilePicture } from '../ducks/user';
import Table from '../middlewares/Api/Table';

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
  changeProfilePicture: (id, b64img) => dispatch(saveUserProfilePicture(id, b64img)),
  changeUsername: (id, username) => dispatch(saveUsername(id, username)),
});

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {
      filePath: '',
      updated: false,
    };
  }

  saveProfilePic = () => {
    const { api } = this.props;
    const row = api.tables.Meta.content.find(it => it.fields.Name === 'Picture');
    if (row && row.id) {
      this.setState({
        updating: true,
        updated: false,
      });
      this.props.changeProfilePicture(row.id, `data:image/png;base64,${this.state.data}`)
        .then((err, record) => {
          if (!err) {
            this.setState({
              updated: true,
              updating: false,
            });
            setTimeout(() => {
              this.setState({
                updated: false,
              });
            }, 2000);
          }
        });
    }
  };

  saveUsername = () => {
    const { api } = this.props;
    const row = api.tables.Meta.content.find(it => it.fields.Name === 'Creator');
    if (row && row.id) {
      this.setState({
        updating: true,
        updated: false,
      });
      this.props.changeUsername(row.id, this.state.username).then((err, record) => {
        if (!err) {
          this.setState({
            updated: true,
            updating: false,
          });
          setTimeout(() => {
            this.setState({
              updated: false,
            });
          }, 2000);
        }
      });
    }
  }

  save = () => {
    if (this.state.filePath) {
      this.saveProfilePic();
    }
    if (this.state.username) {
      this.saveUsername();
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
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      aspect: [1, 1],
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
        }}
        >
          <Title style={styles.headline}>Application preferences</Title>
          <Button onPress={this.save} disabled={this.state.updating}>
            { this.state.updating ? 'Saving... ' : 'Save' }
          </Button>
        </View>
        {
          this.state.updated && (
            <Text>
            Saved !
            </Text>
          )
        }
        <Image source={{ uri: img || Table.getFieldByParentName(this.props.api.tables.Meta, 'Picture') }} style={{ width: 64, height: 64 }} />
        <Button title="Change Profile Picture" onPress={this.chooseFile}>
          Choose File
        </Button>
        <View style={styles.inputContainer}>
          <TextInput
            disabled={this.state.updating}
            label="Username"
            value={this.state.username && this.state.username.length >= 0 ? this.state.username : Table.getFieldByParentName(this.props.api.tables.Meta, 'Creator')}
            mode="outlined"
            error={undefined}
            onChangeText={text => this.setState({ username: text || '' })}
            onBlur={() => true}
            render={props => (
              <NativeTextInput {...props} />
            )}
          />
          <HelperText type="error" visible={false}>
            Invalid Key
          </HelperText>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedPreferencesScreen = connect(extractor, dispatcher)(PreferencesScreen);
export default ConnectedPreferencesScreen;
