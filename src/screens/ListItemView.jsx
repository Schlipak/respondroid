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
import SwipableItemList from '../components/SwipableItemList';

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
          list.length > 0 && (
            <SwipableItemList
              list={list}
              parser={(it, index) => ({
                index,
                key: `${index}`,
                title: it.fields.Name,
                onClickLeft: (item) => { console.log(`YOU CLICKED LEFT ON ITEM ${item.key}`); },
                leftLabel: {
                  text: 'Save',
                  bg: 'green',
                  color: 'black',
                },
                swipeLeftLabel: {
                  text: 'Share',
                  bg: 'blue',
                  color: 'white',
                },
                onSwipeLeft: (item) => { console.log(`SwipeLeft on item ${item.key}`); },
                onClickRight: (item) => { console.log(`YOU CLICKED RIGHT ON ITEM ${item.key}`); },
                rightLabel: {
                  text: 'Destroy',
                  color: 'white',
                  bg: 'crimson',
                },
                onSwipeRight: (item) => { console.log(`SwipeRight on item ${item.key}`); },
                swipeRightLabel: {
                  text: 'Upload',
                  bg: 'orange',
                  color: 'red',
                },
                description: printDate(it.fields.CreatedAt, 'at'),
              })}
            />
          )
        }
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedLoginScreen = connect(extractor, dispatcher)(LoginScreen);
export default ConnectedLoginScreen;
