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
import { selectMenu, setMenu } from '../ducks/menu';

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
  menu: selectMenu(state),
  api: selectApi(state),
});

const dispatcher = dispatch => ({
  setMenu: menu => dispatch(setMenu(menu)),
});

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    menu: PropType.objectOf(PropType.any),
    api: PropType.objectOf(PropType.any),
  };

  constructor() {
    super();
    this.state = {};
  }

  onUpdate = () => {
    const { navigation, menu } = this.props;
    const type = navigation.getParam('type');
    if (!menu || !type) {
      return;
    }
    if (menu.name !== 'ListItemView') {
      this.props.setMenu({
        visible: true,
        name: 'ListItemView',
        destinations: [{ screen: 'TypeView', args: { title: type.fields.Name, type } }],
        icon: 'extension',
      });
    }
  }

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate() {
    this.onUpdate();
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
    const {
      editable, locked, classMethods, methods,
    } = type.fields.Fields;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <View style={{
          display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', margin: 4,
        }}
        >
          <Title style={styles.headline}>
            {type.fields.Name}
          </Title>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TypeView', { title: type.fields.Name, type })}
          >
            About
          </Button>
        </View>
        <Subheading>
          {type.fields.Description}
        </Subheading>
        {
          list.map(item => (
            <View style={{
              display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', margin: 10,
            }}
            >
              <Button
                style={{ margin: 4, width: '100%' }}
                mode="outlined"
                onPress={() => {}}
              >
                {type.fields.Name}
                {' '}
                <Text style={{ fontSize: 10 }}>{printDate(item.fields.CreatedAt, 'at')}</Text>
              </Button>
            </View>
          ))
        }
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
