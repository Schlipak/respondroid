import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';
import * as dotprop from 'dot-prop-immutable';
import { change, saveItem, selectEditor, setMeta } from '../ducks/editor';
import { selectLoaders } from '../ducks/Loaders';
import Container from '../components/Container';
import LottieView from 'lottie-react-native';
import LoaderLottie from '../../assets/loader.json';

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
  editor: selectEditor(state),
  editorLoader: selectLoaders(state, 'editor'),
});

const dispatcher = dispatch => ({
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
    this.props.save();
  };

  render() {
    const { navigation, editorLoader, editor } = this.props;
    const type = navigation.getParam('type');
    if (!this.props.editor.item && type) {
      this.props.setMeta('table', 'Types');
      this.props.setMeta('item', type);
    }
    const fields = dotprop.get(type, 'fields', {});
    if (editorLoader) {
      const loaderDisplay = (
        <Container style={{textAlign: 'center'}} column>
          <LottieView
            source={LoaderLottie}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text>Loading...</Text>
        </Container>
      );
      return loaderDisplay;
    }
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title>
          {fields.Name}
        </Title>
        <Button onPress={this.save}>
          Save
        </Button>
        <Text>
          {JSON.stringify(editor)}
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedTypeEditorScreen = connect(extractor, dispatcher)(TypeEditorScreen);
export default ConnectedTypeEditorScreen;
