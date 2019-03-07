import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Title, Text, Button, TextInput,
} from 'react-native-paper';
import * as dotprop from 'dot-prop-immutable';
import LottieView from 'lottie-react-native';
import { TextInput as NativeTextInput } from 'react-native';
import { selectApi } from '../ducks/api';
import {
  change, saveItem, selectEditor, setMeta,
} from '../ducks/editor';
import { selectLoaders } from '../ducks/Loaders';
import Container from '../components/Container';
import LoaderLottie from '../../assets/loader.json';
import Table from '../middlewares/Api/Table';
import { selectMenu, setMenu } from '../ducks/menu';

const styles = StyleSheet.create({
  content: {
    padding: 5,
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
  menu: selectMenu(state),
  editor: selectEditor(state),
  editorLoader: selectLoaders(state, 'editor'),
});

const dispatcher = dispatch => ({
  setMenu: (field, value) => dispatch(setMenu(field, value)),
  setMeta: (field, value) => dispatch(setMeta(field, value)),
  save: () => dispatch(saveItem()),
  change: (field, value) => dispatch(change(field, value)),
});

class TypeEditorScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  save = () => {
    this.props.save().then(({err, item}) => {
      if (!err) {
        this.props.setMenu('title', `${item.fields.Name} Editor`);
      }
    });
  };

  render() {
    const {
      navigation, editorLoader, editor, api, menu
    } = this.props;
    const { item } = editor;
    const original = Table.findById(api.tables.Types, editor.itemId);
    const { type } = menu;
    if (!item && type && type.id) {
      this.props.setMeta('table', 'Types');
      this.props.setMeta('itemId', type.id);
      this.props.setMeta('item', type);
    } else if (!item && type && !type.id) {
      this.props.setMeta('table', 'Types');
      this.props.setMeta('isNew', true);
      this.props.setMeta('item', {
        id: 'create-item-id',
        fields: {
          Name: '',
          Description: '',
          Fields: '',
        },
      });
    }
    const fields = dotprop.get(type, 'fields', {});
    if (editorLoader || !item) {
      const loaderDisplay = (
        <Container style={{ textAlign: 'center' }} column>
          <LottieView
            source={LoaderLottie}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text>Loading...</Text>
        </Container>
      );
      return loaderDisplay;
    }
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Container>
          <Title>
            {original && original.fields && original.fields.Name} {editor.synced === true ? 'Synced!' : ''}
          </Title>
          <Button onPress={this.save}>
            Save
          </Button>
        </Container>
        <Text>
          {editor.error}
        </Text>
        <TextInput
          label="Name"
          value={item.fields.Name}
          mode="outlined"
          onChangeText={text => this.props.change('Name', text)}
          render={props => (
            <NativeTextInput {...props} />
          )}
        />
        <TextInput
          label="Description"
          value={item.fields.Description}
          mode="outlined"
          onChangeText={text => this.props.change('Description', text)}
          multiline
          numberOfLines={3}
          render={props => (
            <NativeTextInput {...props} />
          )}
        />
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedTypeEditorScreen = connect(extractor, dispatcher)(TypeEditorScreen);
export default ConnectedTypeEditorScreen;
