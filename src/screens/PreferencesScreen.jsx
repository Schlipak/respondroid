import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput as NativeTextInput,
  Image,
} from 'react-native';
import {
  TextInput, Button, HelperText, Title,
} from 'react-native-paper';
import { ImagePicker } from 'expo';
import LottieView from 'lottie-react-native';
import { selectApi } from '../ducks/api';
import { saveUsername, saveUserProfilePicture } from '../ducks/user';
import Table from '../middlewares/Api/Table';
import Container from '../components/Container';
import LoaderLottie from '../../assets/success.json';

const styles = StyleSheet.create({
  content: {},
  headline: {
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  lottieV: { width: '100%', textAlign: 'center', justifyContent: 'center' },
  lottieWidth: { width: 256 },
  containerPadding: { paddingLeft: 32, paddingRight: 32 },
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
    api: PropType.objectOf(PropType.any).isRequired,
    changeProfilePicture: PropType.func.isRequired,
    changeUsername: PropType.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      filePath: '',
      updated: false,
    };
  }

  saveProfilePic = () => {
    const { api, changeProfilePicture } = this.props;
    const row = api.tables.Meta.content.find(it => it.fields.Name === 'Picture');
    if (row && row.id) {
      this.setState({
        updating: true,
        updated: false,
      });
      const { data } = this.state;
      changeProfilePicture(row.id, `data:image/png;base64,${data}`)
        .then(({ err }) => {
          if (!err) {
            this.setState({
              updated: true,
              updating: false,
            });
            setTimeout(() => {
              this.setState({
                filePath: '',
                updated: false,
              });
            }, 2500);
          }
        });
    }
  };

  saveUsername = () => {
    const { api, changeUsername } = this.props;
    const row = api.tables.Meta.content.find(it => it.fields.Name === 'Creator');
    if (row && row.id) {
      this.setState({
        updating: true,
        updated: false,
      });
      const { username } = this.state;
      changeUsername(row.id, username).then(({ err }) => {
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

  save = () => {
    const { filePath, username } = this.state;
    if (filePath) {
      this.saveProfilePic();
    }
    if (username) {
      this.saveUsername();
    }
  };

  toBase64 = (file, callback) => {
    const reader = new FileReader();
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
    const {
      data, updating, updated, username,
    } = this.state;
    const { api } = this.props;
    const img = data && `data:image/png;base64,${data}`;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Container>
          <Title style={styles.headline}>Preferences</Title>
          <Button onPress={this.save} disabled={updating} mode="contained">
            { updating ? 'Saving... ' : 'Save' }
          </Button>
        </Container>
        { updated && (
          <Container style={styles.lottieV}>
            <LottieView
              source={LoaderLottie}
              autoPlay
              style={styles.lottieWidth}
            />
          </Container>
        )
        }
        <Container style={styles.containerPadding}>
          <Image source={{ uri: img || Table.getFieldByParentName(api.tables.Meta, 'Picture') }} style={styles.containerPadding} />
          <Button title="Change Profile Picture" onPress={this.chooseFile} mode="outlined" disabled={updating}>
            Change Picture
          </Button>
        </Container>
        <View style={styles.inputContainer}>
          <TextInput
            disabled={updating}
            label="Username"
            value={username && username.length >= 0 ? username : Table.getFieldByParentName(api.tables.Meta, 'Creator')}
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
