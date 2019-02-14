import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from './Footer';
import NavBarConnected from './NavBarConnected';
import NavBarNotConnected from './NavBarNotConnected';

const dispatcher = dispatch => ({
});

const extractor = state => ({
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2F7A72',
      main: '#2F7A72',
      dark: '#2F7A72',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F3A303',
      main: '#F3A303',
      dark: '#F3A303',
      contrastText: '#fff',
    },
  },
});

class ClientApp extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <NavBarNotConnected />
          {this.props.content()}
          {
            <Footer />
          }
        </MuiThemeProvider>
      </div>
    );
  }
}

const App = connect(extractor, dispatcher)(ClientApp);
export default App;
