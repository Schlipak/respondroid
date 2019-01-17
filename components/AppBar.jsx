import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';

const AppBar = ({ navigation }) => {
  const { state } = navigation;
  const { routeName } = state;

  return (
    <Appbar.Header>
      {routeName === 'Home' ? (
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      ) : (
        <Appbar.Action
          icon={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back-ios'}
          onPress={() => navigation.goBack()}
        />
      )}
      <Appbar.Content title="ResponDroid" />
    </Appbar.Header>
  );
};

AppBar.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTheme(AppBar);
