import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';

import AppBar from '../components/AppBar';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import theme from '../constants/theme';
import PreferencesScreen from '../screens/PreferencesScreen';
import TypeView from '../screens/TypeView';
import ListItemView from '../screens/ListItemView';
import HowToConnect from '../screens/HowToConnect';
import TypeEditor from '../screens/TypeEditor';
import ItemEditor from '../screens/ItemEditor';
import Friends from '../screens/Friends';
import FriendsMap from '../screens/FriendsMap';

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
    HowToConnect: { screen: WrapWithThemeProvider(HowToConnect) },
    TypeEditor: { screen: WrapWithThemeProvider(TypeEditor) },
    ItemEditor: { screen: WrapWithThemeProvider(ItemEditor) },
    Friends: { screen: WrapWithThemeProvider(Friends) },
    FriendsMap: { screen: WrapWithThemeProvider(FriendsMap) },
    Login: { screen: WrapWithThemeProvider(LoginScreen) },
    Preferences: { screen: WrapWithThemeProvider(PreferencesScreen) },
    TypeView: { screen: WrapWithThemeProvider(TypeView) },
    ListItemView: { screen: WrapWithThemeProvider(ListItemView) },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      header: <AppBar navigation={navigation} />,
    }),
  },
);
