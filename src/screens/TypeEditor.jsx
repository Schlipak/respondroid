import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView, View, ScrollView,
  TextInput as NativeTextInput,
} from 'react-native';
import {
  Title, Text, Button, TextInput, Headline, Divider,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';
import {
  addField, reset,
  change, changeAttr, saveItem, selectEditor, setMeta, saveNewItem, destroy,
} from '../ducks/editor';
import { selectLoaders } from '../ducks/Loaders';
import Container from '../components/Container';
import Table from '../middlewares/Api/Table';
import { selectMenu, setMenu } from '../ducks/menu';
import LoaderPlaceholder from '../components/LoaderPlaceholder';
import TypeEditorField from '../components/TypeEditorField';
import ConfirmButton from '../components/ConfirmButton';

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});

const extractor = state => ({
  api: selectApi(state),
  menu: selectMenu(state),
  editor: selectEditor(state),
  editorLoader: selectLoaders(state, 'editor'),
});

const dispatcher = dispatch => ({
  doSetMenu: (field, value) => dispatch(setMenu(field, value)),
  doSetMeta: (field, value) => dispatch(setMeta(field, value)),
  save: () => dispatch(saveItem()),
  saveNew: () => dispatch(saveNewItem()),
  doChange: (field, value) => dispatch(change(field, value)),
  doChangeAttr: (cat, idx, attr, val) => dispatch(changeAttr(cat, idx, attr, val)),
  doAddField: category => dispatch(addField(category)),
  doResetEditor: () => dispatch(reset()),
  doDestroy: () => dispatch(destroy()),
});

class TypeEditorScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    editor: PropType.objectOf(PropType.any).isRequired,
    saveNew: PropType.func.isRequired,
    save: PropType.func.isRequired,
    doResetEditor: PropType.func.isRequired,
    doSetMenu: PropType.func.isRequired,
    doDestroy: PropType.func.isRequired,
    doSetMeta: PropType.func.isRequired,
    doChange: PropType.func.isRequired,
    doAddField: PropType.func.isRequired,
    doChangeAttr: PropType.func.isRequired,
    editorLoader: PropType.objectOf(PropType.any).isRequired,
    api: PropType.objectOf(PropType.any).isRequired,
    menu: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  destroy = () => {
    const { navigation, doDestroy } = this.props;
    doDestroy().then(({ err }) => {
      if (!err) {
        navigation.navigate('Home');
      }
    });
  };

  save = () => {
    const {
      editor, navigation, saveNew, save, doResetEditor, doSetMenu,
    } = this.props;
    const { isNew } = editor;
    if (isNew) {
      saveNew().then(({ err, item }) => {
        if (!err) {
          doResetEditor();
          doSetMenu('type', item);
          navigation.navigate('TypeView');
        }
      });
    } else {
      save().then(({ err, item }) => {
        if (!err) {
          doSetMenu('title', `${item.fields.Name} Editor`);
        }
      });
    }
  };

  init = (item, type) => {
    const { doSetMeta } = this.props;
    if (!item && type && type.id) {
      doSetMeta('table', 'Types');
      doSetMeta('itemId', type.id);
      doSetMeta('item', type);
    } else if (!item && type && !type.id) {
      doSetMeta('table', 'Types');
      doSetMeta('isNew', true);
      doSetMeta('item', {
        id: 'create-item-id',
        fields: {
          Name: 'NewType',
          Description: '',
          Fields: {
            editable: [],
            locked: [],
            classMethods: [],
            methods: [],
          },
        },
      });
    }
  };

  displayFields = (fields, category) => fields.map((field, index) => {
    const { doChangeAttr } = this.props;
    return (
      <TypeEditorField
        field={field}
        index={index}
        changeAttr={doChangeAttr}
        category={category}
        collapsed
      />
    );
  });

  displayMethods = methods => methods.map(method => (
    <View>
      <Container>
        <TextInput
          value={method.name}
          mode="outlined"
          label="Method Name"
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

  cancel = () => {
    const { navigation, editor, doResetEditor } = this.props;
    const { isNew } = editor;
    doResetEditor();
    if (isNew) {
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  };

  render() {
    const {
      editorLoader, editor, api, menu, doChange, doAddField,
    } = this.props;
    const { item, isNew } = editor;
    const original = Table.findById(api.tables.Types, editor.itemId);
    const { type } = menu;
    this.init(item, type);
    if (editorLoader || !item) {
      return <LoaderPlaceholder />;
    }
    const {
      editable, locked, classMethods, methods,
    } = item.fields.Fields;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <ScrollView>
          <Container>
            <Title>
              {original && original.fields && original.fields.Name}
              {' '}
              {editor.synced === true ? 'Synced!' : ''}
            </Title>
            <Button onPress={this.cancel} mode="contained" color="orange">
              Cancel
            </Button>
            <Button onPress={this.save} mode="contained">
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
            onChangeText={text => doChange('Name', text)}
            render={props => (
              <NativeTextInput {...props} />
            )}
          />
          <TextInput
            label="Description"
            value={item.fields.Description}
            mode="outlined"
            onChangeText={text => doChange('Description', text)}
            multiline
            numberOfLines={3}
            render={props => (
              <NativeTextInput {...props} />
            )}
          />
          <View>
            <Container>
              <Headline>
                Editable fields
              </Headline>
              <Button
                icon="add"
                mode="outlined"
                onPress={() => {
                  doAddField('editable');
                }}
              >
                Add
              </Button>
            </Container>
            {editable && this.displayFields(editable, 'editable')}
          </View>
          <Divider />
          <View>
            <Container>
              <Headline>
                Locked fields
              </Headline>
              <Button
                icon="add"
                mode="outlined"
                onPress={() => {
                  doAddField('locked');
                }}
              >
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
              (classMethods && classMethods.length > 0
                && this.displayMethods(classMethods)) || <Text>No class methods found</Text>
            }
          </View>
          <View>
            <Text>
              Instance methods
            </Text>
            {
              (methods && methods.length > 0
                && this.displayMethods(methods)) || <Text>No methods found</Text>
            }
          </View>
          {
            !isNew && (
              <View>
                <Title>
                  Danger Zone
                </Title>
                <ConfirmButton
                  title="Confirm"
                  label="Delete"
                  color="crimson"
                  content={(
                    <Text>
                      {`Are you sure you want to delete ${type.fields.Name} ?`}
                    </Text>
                  )}
                  onCancel={() => {}}
                  onConfirm={this.destroy}
                />
              </View>
            )
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedTypeEditorScreen = connect(extractor, dispatcher)(TypeEditorScreen);
export default ConnectedTypeEditorScreen;
