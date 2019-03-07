import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { selectMenu } from '../ducks/menu';

const dispatcher = dispatch => ({

});

const extractor = state => ({
  menu: selectMenu(state),
});

class AppBar extends React.Component {
  render() {
    const { navigation, menu } = this.props;
    const { state } = navigation;
    const { routeName } = state;
    const { title } = menu;
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
        <Appbar.Content title={routeName === 'Home' ? 'Kanbord' : title} />
      </Appbar.Header>
    );
  }
}

AppBar.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ConnectedAppBar = connect(extractor, dispatcher)(AppBar);
export default withTheme(ConnectedAppBar);
