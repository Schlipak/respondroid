import React, { Component } from 'react';
import Container from './Container';
import { Text } from 'react-native-paper';
import LoaderLottie from '../../assets/loader.json';
import LottieView from 'lottie-react-native';

class LoaderPlaceholder extends Component {
  render() {
    return (
      <Container style={{ textAlign: 'center' }} column>
        <LottieView
          source={LoaderLottie}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text>Loading...</Text>
      </Container>
    )
  }
}

export default LoaderPlaceholder;
