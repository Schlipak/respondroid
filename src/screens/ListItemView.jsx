import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView,
} from 'react-native';
import {
  Button, Text, Title, Subheading, Divider,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';
import { printDate } from '../utils/date';
import { selectMenu, setMenu } from '../ducks/menu';
import SwipableItemList from '../components/SwipableItemList';
import { createItem, setMeta } from '../ducks/itemEditor';
import { setPopupInfo } from '../ducks/popup';
import Container from '../components/Container';

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
  headline: {
    marginBottom: 5,
  },
  createButton: { width: '100%', marginBottom: 5 },
});

const extractor = state => ({
  menu: selectMenu(state),
  api: selectApi(state),
});

const dispatcher = dispatch => ({
  setMenu: menu => dispatch(setMenu(menu)),
  setInEditor: (key, value) => dispatch(setMeta(key, value)),
  doCreateItem: type => dispatch(createItem(type)),
  doSetPopupInfo: (key, value) => dispatch(setPopupInfo(key, value)),
});

class ListItemView extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    menu: PropType.objectOf(PropType.any).isRequired,
    api: PropType.objectOf(PropType.any).isRequired,
    doSetPopupInfo: PropType.func().isRequired,
    setInEditor: PropType.func().isRequired,
    doCreateItem: PropType.func().isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  popup = (title, text, callback) => {
    const { doSetPopupInfo } = this.props;
    doSetPopupInfo('isOpen', true);
    doSetPopupInfo('title', title);
    doSetPopupInfo('text', text);
    doSetPopupInfo('onConfirm', () => { callback(); });
  };

  goTo = (screen, type, item) => {
    const { navigation, setInEditor, doCreateItem } = this.props;
    // Set what is needed in item editor
    if (item) {
      setInEditor('itemId', item.id);
      const copy = { ...item };
      type.fields.Fields.editable.forEach((field) => {
        if (!copy.fields.Value[field.name]) {
          copy.fields.Value[field.name] = null;
        }
      });
      setInEditor('item', { ...copy });
      setInEditor('table', 'Database');
      setInEditor('isNew', false);
      setInEditor('type', type);
    } else {
      doCreateItem(type);
    }
    navigation.navigate(screen);
  };

  render() {
    const { navigation, api, menu } = this.props;
    const { type } = menu;
    if (!type || !type.fields || !type.fields.Fields) {
      return <View><Text>ERROR: No type provided</Text></View>;
    }
    const { Database } = api.tables;
    const list = Database.content.filter(it => it.fields.Type.includes(type.id));

    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Container>
          <Title style={styles.headline}>
            {type.fields.Name}
          </Title>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TypeView', { title: type.fields.Name, type })}
          >
            About
          </Button>
        </Container>
        <Subheading>
          {type.fields.Description}
        </Subheading>
        <Button mode="outlined" style={styles.createButton} onPress={() => this.goTo('ItemEditor', type)}>
          {`Create ${type.fields.Name}`}
        </Button>
        <Divider />
        {
          list.length > 0 && (
            <SwipableItemList
              list={list}
              onPress={item => this.goTo('ItemEditor', type, item)}
              parser={(it, index) => {
                let fieldName = it.fields.Name;
                try {
                  fieldName = it.fields.Value.Name
                    || it.fields.Value.Title
                    || it.fields.value.name
                    || it.fields.value.title;
                } catch (e) {
                  fieldName = it.fields.Name;
                }
                return {
                  index,
                  key: `${index}`,
                  ref: it,
                  title: fieldName,
                  onClickLeft: () => { this.goTo('ItemEditor', type); },
                  leftLabel: {
                    text: 'Edit',
                    bg: 'green',
                    color: 'black',
                  },
                  description: printDate(it.fields.CreatedAt, 'at'),
                };
              }}
            />
          )
        }
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedListItemView = connect(extractor, dispatcher)(ListItemView);
export default ConnectedListItemView;
