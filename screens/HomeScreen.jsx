import React, { Component } from 'react';
import PropType from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox, Divider } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import CheckAnimation from '../assets/check_animation.json';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  render() {
    const { navigation } = this.props;
    const { looping } = this.state;

    return (
      <View style={styles.content}>
        <LottieView
          ref={animation => (this.animation = animation)}
          style={styles.animation}
          source={CheckAnimation}
          loop={looping}
        />
        <View>
          <Text>Loop</Text>
          <Checkbox
            status={looping ? 'checked' : 'unchecked'}
            onPress={() => this.setState({ looping: !looping })}
          />
        </View>
        <Button mode="text" onPress={this.startAnimation} compact>
          Start
        </Button>
        <Text>Open up App.js to start working on your app!</Text>
        <Divider style={styles.divider} />
        <Button mode="contained" onPress={() => navigation.navigate('Login')}>
          Log in
        </Button>
      </View>
    );
  }
}
