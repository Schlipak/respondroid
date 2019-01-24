import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';

import AppBar from '../components/AppBar';

import HomeScreen from '../screens/HomeScreen';
import FooBarScreen from '../screens/FooBarScreen';
import ItemsScreen from '../screens/ItemsScreen';
import LoginScreen from '../screens/LoginScreen';

import theme from '../constants/theme';

const WrapWithThemeProvider = (ChildComponent) => {
  const ScreenWithThemeHOC = props => (
    <PaperProvider theme={theme}>
      <ChildComponent {...props} />
    </PaperProvider>
  );

  ScreenWithThemeHOC.navigationOptions = ({ navigation }) => ({
    header: <AppBar navigation={navigation} theme={theme} />,
  });

  return ScreenWithThemeHOC;
};

export default createStackNavigator(
  {
    Home: { screen: WrapWithThemeProvider(HomeScreen) },
    FooBar: { screen: WrapWithThemeProvider(FooBarScreen) },
    Items: { screen: WrapWithThemeProvider(ItemsScreen) },
    Login: { screen: WrapWithThemeProvider(LoginScreen) },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      header: <AppBar navigation={navigation} />,
    }),
  },
);
