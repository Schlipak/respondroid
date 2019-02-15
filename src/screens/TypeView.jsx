import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView, TextInput as NativeTextInput, Image,
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText, Text, Title, Subheading,
} from 'react-native-paper';
import AirtableLogo from '../../assets/AirtableLogo.jpg';
import { selectApi } from '../ducks/api';
import { connectApi } from '../middlewares/Api/thunks';

const styles = StyleSheet.create({
  content: {

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
});

const dispatcher = dispatch => ({
});

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  displayFields = (fields, bg='aliceblue') => fields.map(field => (
    <View style={{ padding: 8, backgroundColor: bg }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subheading>
          {field.name}
        </Subheading>
        <Text>
          {field.type}
        </Text>
      </View>
      <Text>
        {field.description || 'No description available'}
      </Text>
    </View>
  ));

  displayMethods = (methods, bg='lightgreen') => methods.map(method => (
    <View style={{ padding: 8, backgroundColor: bg }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subheading>
          {method.name}
        </Subheading>
        <Text>
          {method.prototype}
        </Text>
      </View>
      <Text>
        {method.description || "No description available"}
      </Text>
    </View>
  ))

  render() {
    const {
      email, emailError, password, passwordError,
    } = this.state;
    const { navigation } = this.props;
    const type = navigation.getParam('type');
    if (!type) {
      return <View><Text>ERROR: No type provided</Text></View>;
    }
    const editable = type.fields.Fields.editable;
    const locked = type.fields.Fields.locked;
    const classMethods = type.fields.Fields.classMethods;
    const methods = type.fields.Fields.methods;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title style={styles.headline}>Description</Title>
        <Subheading>
          {type.fields.Description}
        </Subheading>
        <View>
          <Text>
            Editable fields
          </Text>
          {this.displayFields(editable)}
        </View>
        <View>
          <Text style={{ color: 'crimson' }}>
            Locked fields
          </Text>
          {this.displayFields(locked)}
        </View>
        <View>
          <Text>
            Class Methods
          </Text>
          {
            (classMethods.length > 0 && this.displayMethods(classMethods)) || <Text>No class methods found</Text>
          }
        </View>
        <View>
          <Text>
            Instance methods
          </Text>
          {
            (methods.length > 0 && this.displayMethods(methods)) || <Text>No methods found</Text>
          }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
