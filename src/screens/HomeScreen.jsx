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

const crimson = 'crimson';

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  previewParagraph: { padding: 5, textAlign: 'center', flex: 1 },
  previewIcon: { width: 64, height: 64, padding: 5 },
  crimsonText: { color: crimson },
  flexGrow: { flex: 1 },
  flexGrowAndCenter: { flex: 1, textAlign: 'center' },
});

const dispatcher = () => ({});

const extractor = state => ({
  api: selectApi(state),
});

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    api: PropType.objectOf(PropType.any).isRequired,
  };

  preview = (icon, text, left = true) => {
    if (left) {
      return (
        <Container>
          <Image source={icon} style={styles.previewIcon} />
          <Paragraph style={styles.previewParagraph}>{text}</Paragraph>
        </Container>
      );
    }
    return (
      <Container>
        <Paragraph style={styles.previewParagraph}>{text}</Paragraph>
        <Image source={icon} style={styles.previewIcon} />
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
        <Title style={styles.crimsonText}>
          Kanbord
        </Title>
        <Paragraph>
          <Text>
            Kanbord is a powerful tool. Design your own solutions !
          </Text>
        </Paragraph>
        <Container>
          <Button
            style={styles.flexGrow}
            mode="contained"
            onPress={() => navigation.navigate('HowToConnect')}
          >
            Discover
          </Button>
          <Text style={styles.flexGrowAndCenter}>
            or
          </Text>
          <Button
            style={styles.flexGrow}
            mode="outlined"
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
        </Container>
        {this.preview(BookIcon, 'Create any Object you want. Memo, Event, Task, ...')}
        {this.preview(BookIcon, 'Program custom behaviors and views for each.', false)}
        {this.preview(BookIcon, 'Empower yourself and save time daily')}
      </View>
    );
  }
}

const ConnectedHomeScreen = connect(extractor, dispatcher)(HomeScreen);
export default ConnectedHomeScreen;
