/**
* App est notre component principal.
* Il est connecte au store.
* Quand on se connecte au store, on recupere de la donnee (extractor)
* et on recupere des fonctions (dispatcher)
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import FontAwesome from 'react-fontawesome';
// import { CookiesProvider } from 'react-cookie';
// import { withCookies, Cookies } from 'react-cookie';

import { initialize, setAppLang } from './appDucks';
// import { refresh } from '../ducks/User/User';
import Router from '../router/Router';

// Notre app peut s'initialiser et lancer une requete d'authentication
const dispatcher = dispatch => ({
  setAppLang: (lang) => dispatch(setAppLang(lang)),
  initialize: () => dispatch(initialize()),
});

// Elle observe l'etat de l'app et pour que les notifications fonctionnent,
// elle recupere aussi les notifications du store (react-redux-notifications-system)
const extractor = state => ({
  notifications: state.notifications,
});

class ConnectedApp extends Component {
  componentDidMount() {
    this.props.initialize();
    document.title = 'Kanbord';
    this.props.setAppLang();
    // this.props.setUserConnection();
  }

  render() {
    const { notifications } = this.props;
    return (
      <div>
        <Notifications notifications={notifications} />
        <Router />
      </div>
    );
  }
}

// On exporte un component App qui est en fait le resultat de connect (react-redux)
// applique a ConnectedApp.
const App = connect(extractor, dispatcher)(ConnectedApp);
// export default withCookies(App);
export default App;
