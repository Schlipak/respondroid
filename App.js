import React from 'react';
import PropTypes from 'prop-types';
import { I18nManager, Platform } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import AppDrawer from './src/components/AppDrawer';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/store/store';

export const NavigationContent = ({ navigation }) => <AppDrawer navigation={navigation} />;

NavigationContent.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const App = createDrawerNavigator(
  { Root: { screen: RootNavigator } },
  {
    contentComponent: NavigationContent,
    drawerPosition: Platform.OS === 'android' && (I18nManager.isRTL ? 'right' : 'left'),
  },
);

export const AppContainer = createAppContainer(App);

export default () => (
  <Provider store={ store }>
    <AppContainer />
  </Provider>
);
