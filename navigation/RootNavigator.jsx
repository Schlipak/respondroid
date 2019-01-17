import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';

import AppBar from '../components/AppBar';
import HomeScreen from '../screens/HomeScreen';
import FooBarScreen from '../screens/FooBarScreen';

import theme from '../constants/theme';

const WrapWithThemeProvider = (ChildComponent) => {
  const HOC = props => (
    <PaperProvider theme={theme}>
      <ChildComponent {...props} />
    </PaperProvider>
  );

  HOC.navigationOptions = ({ navigation }) => ({
    header: <AppBar navigation={navigation} theme={theme} />,
  });

  return HOC;
};

export default createStackNavigator(
  {
    Home: { screen: WrapWithThemeProvider(HomeScreen) },
    FooBar: { screen: WrapWithThemeProvider(FooBarScreen) },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      header: <AppBar navigation={navigation} />,
    }),
  },
);
