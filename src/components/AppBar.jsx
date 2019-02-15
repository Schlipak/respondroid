import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

const dispatcher = (dispatch) => ({

});

const extractor = (state) => ({
  // menu
});

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { routeName } = state;
    const title = navigation.getParam('title', routeName);
    const menu = this.props.menu;
    return (
      <Appbar.Header>
        {routeName === 'Home' ? (
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()}/>
        ) : (
          <Appbar.Action
            icon={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back-ios'}
            onPress={() => navigation.goBack()}
          />
        )}
        <Appbar.Content title={routeName === 'Home' ? 'Kanbord' : title}/>
        {
          menu && <Appbar.Action
            icon={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back-ios'}
            onPress={() => navigation.goBack()}
          />
        }
      </Appbar.Header>
    );
  };
}

AppBar.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ConnectedAppBar = connect(extractor, dispatcher)(AppBar);
export default withTheme(ConnectedAppBar);
