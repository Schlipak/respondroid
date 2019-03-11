import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import LoaderLottie from '../../assets/loader.json';
import Container from './Container';

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  size: { width: 200, height: 200 },
});

const LoaderPlaceholder = () => (
  <Container style={styles.center} column>
    <LottieView
      source={LoaderLottie}
      autoPlay
      loop
      style={styles.size}
    />
    <Text>Loading...</Text>
  </Container>
);

export default LoaderPlaceholder;
