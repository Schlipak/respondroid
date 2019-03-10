import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import {
  Button,
  Paragraph, Title,
} from 'react-native-paper';
import { connect } from 'react-redux';
import BookIcon from '../../assets/bookIcon.png';

import { selectApi } from '../ducks/api';
import UserHomeScreen from './UserHomeScreen';
import Container from '../components/Container';

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});

const dispatcher = () => ({});

const extractor = state => ({
  api: selectApi(state),
});

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  preview = (icon, text, left = true) => {
    if (left) {
      return (
        <Container>
          <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
          <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        </Container>
      );
    }
    return (
      <Container>
        <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
      </Container>
    );
  };

  render() {
    const { navigation, api } = this.props;
    if (api.connected) {
      return <UserHomeScreen navigation={navigation} />;
    }
    return (
      <View style={styles.content}>
        <Title style={{ color: 'crimson' }}>
          Kanbord
        </Title>
        <Paragraph>
          Kanbord is a powerful tool. Design your own solutions !
        </Paragraph>
        <View style={{
          marginTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          <Button
            style={{ flex: 1 }}
            mode="contained"
            onPress={() => navigation.navigate('HowToConnect')}
          >
            Discover
          </Button>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            or
          </Text>
          <Button
            style={{ flex: 1 }}
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
        </View>
        {this.preview(BookIcon, 'Create any Object you want. Memo, Event, Task, Project, Reading Notes...')}
        {this.preview(BookIcon, 'Program custom behaviors and views for each.', false)}
        {this.preview(BookIcon, 'Empower yourself and save time daily')}
      </View>
    );
  }
}

const ConnectedHomeScreen = connect(extractor, dispatcher)(HomeScreen);
export default ConnectedHomeScreen;
