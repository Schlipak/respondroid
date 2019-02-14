import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/logo-blanccropped.png';
import translate from '../utils/translate';
import Icon from '@material-ui/icons/PowerSettingsNew';
import Container from '../views/common/Container';
import ConfirmPopup from '../views/common/ConfirmPopup';
import { selectTable } from '../ducks/api';
import Table from '../middlewares/Api/Table';
import ContextMenu from '../views/common/ContextMenu';

const dispatcher = (dispatch) => ({
  disconnect: () => {}, // TODO: NOT IMPLEMENTED
});

const extractor = state => ({
  state,
  meta: selectTable(state, 'Meta'),
});

const styles = {
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  input: {
    color: '#fdfdfd',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#f9f9f9'
    }
  }
};

class NavBarNotConnected extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    const email = document.getElementById('emailHeader').value;
    const password = document.getElementById('passwdHeader').value;
    this.props.login(email, password).then(response => {
      if (response.login) {
        this.props.helpers.notify.info(translate('notifications.login'));
        this.props.getInfos().then(me => {
          this.props.helpers.notify.info(translate('notifications.welcome') + ` ${me.username}`);
          this.props.history.push('/');
        });
      } else {
        this.props.helpers.notify.error(translate('notifications.badinfos'));
      }
    });
  }

  render() {
    const { classes } = this.props;
    const options = [
      {
        label: 'Edit types',
        confirm: true,
        onClick: () => this.props.history.push('/types'),
      },
    ];
    return (
      <AppBar style={{ height: '60px', backgroundColor: 'white' }} position="static" color="default">
        <Toolbar style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Container style={{ justifyContent: 'space-between' }}>
            <Link to="/"><img alt="logo" label="logo" style={{ width: '100px' }} src={logo}/></Link>
            <Container middle style={{ width: '128px' }}>
              <small>Base</small>&nbsp;
              <b style={{ color: 'crimson', marginRight: '5px' }}>
                {/*{ Meta.AppName }*/}
                { Table.getFieldByParentName(this.props.state.api.tables.Meta, 'AppName') }
              </b>
              <ContextMenu
                options={options}
              />
              <ConfirmPopup
                label={<Icon style={{ marginRight: '5px' }}/>}
                text={'Etes vous surs de vouloir vous deconnecter ?'}
                title={'Se deconnecter'}
                onConfirm={() => { this.props.disconnect(); }}
              />
            </Container>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}


const NavBar = withRouter(connect(extractor, dispatcher)(withStyles(styles)(NavBarNotConnected)));
export default NavBar;
