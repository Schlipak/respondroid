import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView, View, ScrollView, Picker,
} from 'react-native';
import {
  Title, Text, Button, TextInput, Headline, Divider, Subheading,
} from 'react-native-paper';
import { TextInput as NativeTextInput } from 'react-native';
import { selectApi } from '../ducks/api';
import {
  addField,
  change, changeAttr, saveItem, selectEditor, setMeta,
} from '../ducks/editor';
import { selectLoaders } from '../ducks/Loaders';
import Container from '../components/Container';
import Table from '../middlewares/Api/Table';
import { selectMenu, setMenu } from '../ducks/menu';
import LoaderPlaceholder from '../components/LoaderPlaceholder';
import TypeEditorField from '../components/TypeEditorField';

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
  changeAttr: (cat, idx, attr, val) => dispatch(changeAttr(cat, idx, attr, val)),
  addField: (category) => dispatch(addField(category)),
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

  init = (item, type) => {
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
  };

  displayFields = (fields, category) => {
    return fields.map((field, index) => (
      <TypeEditorField
        field={field}
        index={index}
        changeAttr={this.props.changeAttr}
        category={category}
        collapsed
      />
    ));
  }

  displayMethods = (methods, bg = 'lightgreen') => methods.map(method => (
    <View style={{ padding: 8, backgroundColor: bg }}>
      <Container>
        <TextInput
          value={method.name}
          onChange={(text) => {}}
          mode={'outlined'}
          label={'Method Name'}
        />
        <Text>
          {method.prototype}
        </Text>
      </Container>
      <Text>
        {method.description || 'No description available'}
      </Text>
    </View>
  ));

  render() {
    const {
      navigation, editorLoader, editor, api, menu
    } = this.props;
    const { item } = editor;
    const original = Table.findById(api.tables.Types, editor.itemId);
    const { type } = menu;
    this.init(item, type);
    if (editorLoader || !item) {
      return <LoaderPlaceholder />
    }
    const editable = item.fields.Fields.editable;
    const locked = item.fields.Fields.locked;
    const classMethods = item.fields.Fields.classMethods;
    const methods = item.fields.Fields.methods;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <ScrollView>
          <Container>
            <Title>
              {original && original.fields && original.fields.Name} {editor.synced === true ? 'Synced!' : ''}
            </Title>
            <Button onPress={this.save} mode={'outlined'}>
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
          <View>
            <Container style={{ padding: 5 }}>
              <Headline style={{ fontWeight: 'bold' }}>
                Editable fields
              </Headline>
              <Button icon={'add'} mode={'outlined'} onPress={() => {
                this.props.addField('editable')
              }}>
                Add
              </Button>
            </Container>
            {editable && this.displayFields(editable, 'editable')}
          </View>
          <Divider />
          <View>
            <Container style={{ padding: 5 }}>
              <Headline style={{
                fontWeight: 'bold',
                color: 'crimson'
              }}>
                Locked fields
              </Headline>
              <Button icon={'add'} mode={'outlined'} onPress={() => {
                this.props.addField('locked')
              }}>
                Add
              </Button>
            </Container>
            {locked && this.displayFields(locked, 'locked')}
          </View>
          <View>
            <Text>
              Class Methods
            </Text>
            {
              (classMethods && classMethods.length > 0 && this.displayMethods(classMethods)) || <Text>No class methods found</Text>
            }
          </View>
          <View>
            <Text>
              Instance methods
            </Text>
            {
              (methods && methods.length > 0 && this.displayMethods(methods)) || <Text>No methods found</Text>
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedTypeEditorScreen = connect(extractor, dispatcher)(TypeEditorScreen);
export default ConnectedTypeEditorScreen;
