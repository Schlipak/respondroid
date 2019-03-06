import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import {
  Button,
  Divider, Headline, Paragraph, Subheading, Title,
} from 'react-native-paper';
import * as dotprop from 'dot-prop-immutable';
import Container from '../components/Container';
import LottieView from 'lottie-react-native';
import LoaderLottie from '../../assets/loader.json';
import { selectApi } from '../ducks/api';
import Table from '../middlewares/Api/Table';
import addKeys from '../utils/addKeys';

const styles = StyleSheet.create({
  content: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  divider: {
    height: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

const dispatcher = dispatch => ({

});

const extractor = state => ({
  api: selectApi(state),
});

class UserHomeScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();

    this.state = { looping: false };
  }

  startAnimation = () => {
    this.animation.play();
  };

  preview = (icon, text, left = true) => {
    if (left) {
      return (
        <View style={{
          display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center',
        }}
        >
          <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
          <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        </View>
      );
    }
    return (
      <View style={{
        display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center',
      }}
      >
        <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
      </View>
    );
  };

  render() {
    const { navigation, api } = this.props;
    const loaderDisplay = (
      <Container style={{ textAlign: 'center' }} column>
        <LottieView
          source={LoaderLottie}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text>Loading...</Text>
      </Container>
    );
    if (!api || !api.connected) {
      return loaderDisplay;
    }
    const Meta = addKeys(dotprop.get(api, 'tables.Meta.content'));
    const Types = addKeys(dotprop.get(api, 'tables.Types.content'));
    const Database = addKeys(dotprop.get(api, 'tables.Database.content'));
    if (!Meta || !Types || !Database) {
      return loaderDisplay;
    }
    const letters = [];
    return (
      <View style={styles.content}>
        <Title style={{ color: 'crimson' }}>
          Welcome
        </Title>
        {
          Types.sort((a, b) => {
            if (a.fields.Name < b.fields.Name) { return -1; }
            if (a.fields.Name > b.fields.Name) { return 1; }
            return 0;
          }).map((type, index) => {
            const addLetter = !letters.includes(type.fields.Name[0].toLowerCase());
            if (addLetter) {
              letters.push(type.fields.Name[0].toLowerCase());
            }
            return (
              <View key={index}>
                {
                  addLetter && <Subheading style={{ fontWeight: 'bold' }}>{type.fields.Name[0].toUpperCase()}</Subheading>
                }
                <Button
                  style={{ margin: 4 }}
                  mode="outlined"
                  onPress={() => navigation.navigate('ListItemView', { title: type.fields.Name, type })}
                >
                  {type.fields.Name}
                </Button>
              </View>
            );
          })
        }
      </View>
    );
  }
}

const ConnectedUserHomeScreen = connect(extractor, dispatcher)(UserHomeScreen);
export default ConnectedUserHomeScreen;
