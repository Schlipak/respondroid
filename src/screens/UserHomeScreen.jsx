import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Subheading, Title } from 'react-native-paper';
import * as dotprop from 'dot-prop-immutable';
import { selectApi } from '../ducks/api';
import addKeys from '../utils/addKeys';
import { setMenu } from '../ducks/menu';
import LoaderPlaceholder from '../components/LoaderPlaceholder';

const crimson = 'crimson';

const styles = StyleSheet.create({
  content: {
    padding: 15,
    height: '100%',
  },
});

const dispatcher = dispatch => ({
  doSetMenu: (key, value) => dispatch(setMenu(key, value)),
});

const extractor = state => ({
  api: selectApi(state),
});

class UserHomeScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    doSetMenu: PropType.func.isRequired,
    api: PropType.objectOf(PropType.any).isRequired,
  };

  goTo = (screen, type = {}) => {
    const { navigation, doSetMenu } = this.props;
    if (type.fields) {
      doSetMenu('title', type.fields.Name);
      doSetMenu('type', type);
    } else {
      doSetMenu('title', 'Create type');
      doSetMenu('type', {});
    }
    navigation.navigate(screen);
  };

  render() {
    const { api } = this.props;
    if (!api || !api.connected) {
      return <LoaderPlaceholder />;
    }
    const Meta = addKeys(dotprop.get(api, 'tables.Meta.content'));
    const Types = addKeys(dotprop.get(api, 'tables.Types.content'));
    const Database = addKeys(dotprop.get(api, 'tables.Database.content'));
    if (!Meta || !Types || !Database) {
      return <LoaderPlaceholder />;
    }
    const letters = [];
    return (
      <ScrollView style={styles.content}>
        <Title style={{ color: crimson }}>
          Welcome
        </Title>
        {
          Types.sort((a, b) => {
            if (a.fields.Name < b.fields.Name) { return -1; }
            if (a.fields.Name > b.fields.Name) { return 1; }
            return 0;
          }).map((type) => {
            const addLetter = !letters.includes(type.fields.Name[0].toLowerCase());
            if (addLetter) {
              letters.push(type.fields.Name[0].toLowerCase());
            }
            return (
              <View key={`list-${type.id}`}>
                {
                  addLetter && <Subheading>{type.fields.Name[0].toUpperCase()}</Subheading>
                }
                <Button
                  mode="outlined"
                  onPress={() => this.goTo('ListItemView', type)}
                >
                  {type.fields.Name}
                </Button>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

const ConnectedUserHomeScreen = connect(extractor, dispatcher)(UserHomeScreen);
export default ConnectedUserHomeScreen;
