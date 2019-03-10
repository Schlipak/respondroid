import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextInput, Button, Title, Text,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';
import {
  change, reset, saveItem, saveNewItem, selectItemEditor,
} from '../ducks/itemEditor';
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
  displayFieldsRoot: bg => ({ padding: 8, backgroundColor: bg, width: '100%' }),
  displayFieldsHead: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  flexGrow: { flex: 1 },
});

const extractor = state => ({
  api: selectApi(state),
  editor: selectItemEditor(state),
  editorLoader: selectLoaders(state, 'itemEditor'),
});

const dispatcher = dispatch => ({
  doSaveNewItem: () => dispatch(saveNewItem()),
  doSaveItem: () => dispatch(saveItem()),
  doChange: (field, value) => dispatch(change(field, value)),
  doSetMenu: (key, value) => dispatch(setMenu(key, value)),
  resetEditor: () => dispatch(reset()),
});

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    doSaveNewItem: PropType.func.isRequired,
    doSaveItem: PropType.func.isRequired,
    doChange: PropType.func.isRequired,
    doSetMenu: PropType.func.isRequired,
    resetEditor: PropType.func.isRequired,
    editor: PropType.objectOf(PropType.any).isRequired,
    editorLoader: PropType.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  save = () => {
    const {
      editor, navigation, doSetMenu, resetEditor, doSaveNewItem, doSaveItem,
    } = this.props;
    const { isNew, type } = editor;
    if (isNew) {
      doSaveNewItem().then(({ err }) => {
        if (!err) {
          doSetMenu('type', type);
          resetEditor();
          navigation.navigate('ListItemView');
        }
      });
    } else {
      doSaveItem();
    }
  };

  displayFields = (fields, item, bg = 'aliceblue') => fields.map((field) => {
    const { doChange } = this.props;
    return (
      <View style={styles.displayFieldsRoot(bg)}>
        <View style={styles.displayFieldsHead}>
          {
            field.type === FIELD_TYPES.string && (
              <Container>
                <TextInput
                  style={styles.flexGrow}
                  mode="outlined"
                  value={item.fields.Value[field.name]}
                  onChangeText={(text) => { doChange(field.name, text); }}
                  label={field.name}
                />
              </Container>
            )
          }
          {
            field.type === FIELD_TYPES.number && (
              <Container>
                <TextInput
                  style={styles.flexGrow}
                  mode="outlined"
                  value={item.fields.Value[field.name]}
                  keyboardType="numeric"
                  onChangeText={(text) => { doChange(field.name, text); }}
                  label={field.name}
                />
              </Container>
            )
          }
          {
            field.type === FIELD_TYPES.text && (
              <Container>
                <TextInput
                  style={styles.flexGrow}
                  mode="outlined"
                  value={item.fields.Value[field.name]}
                  multiline
                  numberOfLines={3}
                  onChangeText={(text) => { doChange(field.name, text); }}
                  label={field.name}
                />
              </Container>
            )
          }
          {
            field.type === FIELD_TYPES.bool && (
              <Container>
                <Text>{field.name}</Text>
                <Switch
                  value={item.fields.Value[field.name]}
                  onToggle={(value) => { doChange(field.name, value); }}
                />
              </Container>
            )
          }
        </View>
      </View>
    );
  });

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
          <Container>
            <Title style={styles.headline}>{editor.item.fields.Name}</Title>
            <Button mode="outlined" onPress={this.save}>
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
