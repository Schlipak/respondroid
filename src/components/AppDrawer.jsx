import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, StyleSheet, Platform,
} from 'react-native';
import {
  Provider as PaperProvider, Drawer, Card, Text, TouchableRipple, Button,
} from 'react-native-paper';

import theme from '../constants/theme';
import { standardColors } from '../constants/colors';
import { connect } from 'react-redux';
import { selectApi } from '../ducks/api';
import Table from '../middlewares/Api/Table';

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

const dispatcher = (dispatch) => ({

});

const extractor = (state) => ({
  api: selectApi(state),
});

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, api } = this.props;
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
              rippleColor={theme.colors.overlay.light}
              style={styles.cardOverlay}
            >
              <>
                <Card.Cover
                  source={{ uri: Table.getFieldByParentName(api.tables.Meta, 'Picture') }}
                  style={styles.cardIcon}
                />
                {
                  api.connected && (
                    <View>
                      <Text style={styles.cardUsername}>{Table.getFieldByParentName(api.tables.Meta, 'Creator')}</Text>
                      <Text style={styles.cardEmail}>Welcome !</Text>
                    </View>
                  )
                }
                {
                  !api.connected && (
                    <View>
                      <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Login')}
                      >
                        Login
                      </Button>
                    </View>
                  )
                }
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
  }
};

AppDrawer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ConnectedAppDrawer = connect(extractor, dispatcher)(AppDrawer);
export default ConnectedAppDrawer;
