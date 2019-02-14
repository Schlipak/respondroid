import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLoaders } from '../ducks/Loaders';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import NavBarNotConnected from './NavBarNotConnected';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import Footer from './Footer';
import FillLoader from '../views/common/FillLoader';
import { selectApi, selectSync } from '../ducks/api';
import NavBarConnected from './NavBarConnected';
import cookie from 'react-cookies';
import { connectApi } from '../middlewares/Api/thunks';
import SYNC_STATE from '../constants/SyncStates';

const dispatcher = (dispatch) => ({
  connectApi: (form) => dispatch(connectApi(form)),
});

const extractor = (store) => ({
  mainLoader: selectLoaders(store, 'mainLoader'),
  connected: selectApi(store).connected,
  sync: selectSync(store),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3E5FC',
      main: '#03A9F4',
      dark: '#0288D1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B2DFDB',
      main: '#009688',
      dark: '#00796B',
      contrastText: '#fff',
    },
  },
});

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      airtableID: cookie.load('airtableID'),
      baseID: cookie.load('baseID'),
    };
  }

  connect = () => {
    this.props.connectApi({
      airtableID: this.state.airtableID,
      baseID: this.state.baseID,
      remember: this.state.remember,
    });
  };

  componentDidMount() {
    if (this.state.airtableID && this.state.baseID) {
      this.connect();
    }
  }

  render() {
    const { connected, mainLoader, sync, hide} = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme} style={{ width: '100%' }}>
          {
            !hide && <div>
              { connected ? <NavBarConnected /> : <NavBarNotConnected/> }
            </div>
          }
          { mainLoader || sync === SYNC_STATE.SYNCING ? <FillLoader color={'#4363d8'} /> : this.props.children }
          <Footer />
        </MuiThemeProvider>
      </div>
    );
  }
}

const ConnectedLayout = connect(extractor, dispatcher)(Layout);
export default ConnectedLayout;
