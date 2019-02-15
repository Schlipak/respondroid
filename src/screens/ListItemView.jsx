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
import { printDate } from '../utils/date';

const styles = StyleSheet.create({
  content: {
    padding: 4,
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

  render() {
    const {
      email, emailError, password, passwordError,
    } = this.state;
    const { navigation, api } = this.props;
    const type = navigation.getParam('type');
    if (!type) {
      return <View><Text>ERROR: No type provided</Text></View>;
    }
    const { Database } = api.tables;
    const list = Database.content.filter(it => it.fields.Type.includes(type.id));
    const { editable, locked, classMethods, methods } = type.fields.Fields;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title style={styles.headline}>{type.fields.Name}</Title>
        <Subheading>
          {type.fields.Description}
        </Subheading>
        {
          list.map(item => {
            return (
              <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <Button mode={'contained'} onPress={() => {}}>
                  {item.fields.Name}
                </Button>
                <Text>
                  {printDate(item.fields.CreatedAt, 'at')}
                </Text>
              </View>
            )
          })
        }
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
