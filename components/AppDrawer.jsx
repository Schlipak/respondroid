import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, StyleSheet, Platform,
} from 'react-native';
import {
  Provider as PaperProvider, Drawer, Card, Text, TouchableRipple,
} from 'react-native-paper';

import theme from '../constants/theme';
import { standardColors } from '../constants/colors';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 22,
  },
  card: {
    overflow: 'hidden',
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  cardOverlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.overlay.dark,
    paddingVertical: 16,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  cardIcon: {
    width: 75,
    height: 75,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: standardColors.white.light,
  },
  cardUsername: {
    marginBottom: 4,
    color: standardColors.white.light,
    fontWeight: 'bold',
  },
  cardEmail: {
    color: standardColors.white.light,
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
        <View style={styles.card}>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/700/?image=893' }}
            style={styles.cardImage}
          />
          <TouchableRipple
            onPress={() => console.log('Ripple')}
            rippleColor={theme.colors.overlay.light}
            style={styles.cardOverlay}
          >
            <>
              <Card.Cover
                source={{ uri: 'https://picsum.photos/700/?image=1027' }}
                style={styles.cardIcon}
              />
              <Text style={styles.cardUsername}>Username</Text>
              <Text style={styles.cardEmail}>firstname.lastname@host.com</Text>
            </>
          </TouchableRipple>
        </View>
        <ScrollView>
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
            <Drawer.Item
              label="FooBar"
              icon="list"
              active={routeName === 'Items'}
              onPress={() => navigation.navigate('Items')}
            />
          </Drawer.Section>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

AppDrawer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AppDrawer;
