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
  Headline, TextInput, Button, HelperText, Title, Text, Subheading,
} from 'react-native-paper';
import { ImagePicker } from 'expo';
import { selectApi } from '../ducks/api';
import { saveUsername, saveUserProfilePicture } from '../ducks/user';
import Table from '../middlewares/Api/Table';
import { change, reset, saveItem, saveNewItem, selectItemEditor } from '../ducks/itemEditor';
import LoaderPlaceholder from '../components/LoaderPlaceholder';
import FIELD_TYPES from '../constants/fieldTypes';
import Container from '../components/Container';
import { selectLoaders } from '../ducks/Loaders';
import { setMenu } from '../ducks/menu';
import Switch from '../components/Switch';

const styles = StyleSheet.create({
  content: {
    padding: 10,
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
  editor: selectItemEditor(state),
  editorLoader: selectLoaders(state, 'itemEditor'),
});

const dispatcher = dispatch => ({
  saveNewItem: () => dispatch(saveNewItem()),
  saveItem: () => dispatch(saveItem()),
  change: (field, value) => dispatch(change(field, value)),
  setMenu: (key, value) => dispatch(setMenu(key, value)),
  resetEditor: () => dispatch(reset()),
});

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  save = () => {
    const { editor, navigation } = this.props;
    const { isNew, type } = editor;
    if (isNew) {
      this.props.saveNewItem().then(({ err, item }) => {
        if (!err) {
          this.props.setMenu('type', type);
          this.props.resetEditor();
          navigation.navigate('ListItemView');
        }
      });
    } else {
      this.props.saveItem();
    }
  };

  displayFields = (fields, item, bg = 'aliceblue') => fields.map(field => (
    <View style={{ padding: 8, backgroundColor: bg, width: '100%' }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {
          field.type === FIELD_TYPES.string && <Container>
            <TextInput
              style={{ flex: 1 }}
              mode={'outlined'}
              value={item.fields.Value[field.name]}
              onChangeText={(text) => {this.props.change(field.name, text)}}
              label={field.name}
            />
          </Container>
        }
        {
          field.type === FIELD_TYPES.number && <Container>
            <TextInput
              style={{ flex: 1 }}
              mode={'outlined'}
              value={item.fields.Value[field.name]}
              keyboardType={'numeric'}
              onChangeText={(text) => {this.props.change(field.name, text)}}
              label={field.name}
            />
          </Container>
        }
        {
          field.type === FIELD_TYPES.text && <Container>
            <TextInput
              style={{ flex: 1 }}
              mode={'outlined'}
              value={item.fields.Value[field.name]}
              multiline
              numberOfLines={3}
              onChangeText={(text) => {this.props.change(field.name, text)}}
              label={field.name}
            />
          </Container>
        }
        {
          field.type === FIELD_TYPES.bool && <Container>
            <Text>{field.name}</Text>
            <Switch
              value={item.fields.Value[field.name]}
              onToggle={(value) => { this.props.change(field.name, value)}}
            />
          </Container>
        }
      </View>
    </View>
  ));

  render() {
    const { editor } = this.props;
    const { type, item, isNew } = editor;
    const { editorLoader } = this.props;
    if (!editor || !type || editorLoader) {
      return <LoaderPlaceholder />;
    }
    const fields = type.fields.Fields.editable;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <View>
          <Container style={{ marginBottom: 10 }}>
            <Title style={styles.headline}>{editor.item.fields.Name}</Title>
            <Button mode={'outlined'} onPress={this.save}>
              { isNew ? 'Create' : 'Save' }
            </Button>
          </Container>
          <Text>
            {editor.error && editor.error.message}
          </Text>
          <View>
            {fields && this.displayFields(fields, item)}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedPreferencesScreen = connect(extractor, dispatcher)(PreferencesScreen);
export default ConnectedPreferencesScreen;
