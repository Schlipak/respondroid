import React, { Component } from 'react';
import PropType from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Divider, Headline, Paragraph, Title,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import BookIcon from '../assets/bookIcon.png';

import CheckAnimation from '../assets/check_animation.json';

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

export default class HomeScreen extends Component {
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
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
          <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
          <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        </View>
      );
    }
    return (
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
        <Paragraph style={{ padding: 5, textAlign: 'center', flex: 1 }}>{text}</Paragraph>
        <Image source={icon} style={{ width: 64, height: 64, padding: 5 }} />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { looping } = this.state;

    return (
      <View style={styles.content}>
        <Title style={{ color: 'crimson' }}>
          Kanbord
        </Title>
        <Paragraph>
          Kanbord is a powerful tool. Design your own solutions !
        </Paragraph>
        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            style={{ flex: 1 }}
            mode={'contained'}
            onPress={() => navigation.navigate('Login')}>
            Subscribe
          </Button>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            or
          </Text>
          <Button
            style={{ flex: 1 }}
            mode={'contained'}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
        </View>
        {this.preview(BookIcon, 'Create any Object you want. Memo, Event, Task, Project, Reading Notes...')}
        {this.preview(BookIcon, 'Program custom behaviors and views for each.', false)}
        {this.preview(BookIcon, 'Empower yourself and save time daily')}
        {/* <LottieView */}
        {/* ref={animation => (this.animation = animation)} */}
        {/* style={styles.animation} */}
        {/* source={CheckAnimation} */}
        {/* loop={looping} */}
        {/* /> */}
        {/* <View> */}
        {/* <Text>Loop</Text> */}
        {/* <Checkbox */}
        {/* status={looping ? 'checked' : 'unchecked'} */}
        {/* onPress={() => this.setState({ looping: !looping })} */}
        {/* /> */}
        {/* </View> */}
        {/* <Button mode="text" onPress={this.startAnimation} compact> */}
        {/* Start */}
        {/* </Button> */}
        {/* <Divider style={styles.divider} /> */}
        {/* <Button mode="contained" onPress={() => navigation.navigate('Login')}> */}
        {/* Connect */}
        {/* </Button> */}
      </View>
    );
  }
}
