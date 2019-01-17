import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import { Provider as PaperProvider, Drawer } from 'react-native-paper';

import theme from '../constants/theme';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
});

const AppDrawer = ({ navigation }) => {
  const { state } = navigation;
  const { routes: routesData } = state;
  const { index, routes } = routesData[0];
  const { routeName } = routes[index];

  return (
    <PaperProvider theme={theme}>
      <View style={styles.drawerContent}>
        <Drawer.Section title="Menu">
          <Drawer.Item
            label="Home"
            icon="home"
            active={routeName === 'Home'}
            onPress={() => navigation.navigate('Home')}
          />
          <Drawer.Item
            label="FooBar"
            icon="more-horiz"
            active={routeName === 'FooBar'}
            onPress={() => navigation.navigate('FooBar')}
          />
        </Drawer.Section>
      </View>
    </PaperProvider>
  );
};

AppDrawer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AppDrawer;
