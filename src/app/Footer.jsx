import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import frenchFlag from '../../assets/french.jpeg';
import englishFlag from '../../assets/english.png';
import { setAppLang } from './appDucks';


import translate from '../utils/translate';
import Github from '../../assets/Icons/Github';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '../views/common/Container';

const dispatcher = dispatch => ({
  setAppLang: (lang) => dispatch(setAppLang(lang)),
});

const extractor = state => ({

});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontSize: '10px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 12,
  },
});

class FooterApp extends Component {
  //
  // static propTypes = {
  //     cookies: instanceOf(Cookies).isRequired
  // };

  constructor(props) {
    super(props);
    // const { cookies } = props;
    // const lang = cookies.get('lang') || 'en';
    const fr = (this.props.lang === 'en' ? 0.4 : 1);
    const en = (this.props.lang === 'en' ? 1 : 0.4);
    this.state = {
      french: fr,
      english: en,
      lang: this.props.lang,
      anchorEl: null,
    };
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = (lang) => {
    if (lang !== this.state.lang) {
      this.selectLanguage(lang);
    }
    this.setState({ anchorEl: null });
  }

  selectLanguage(lang) {
    this.props.setAppLang(lang);
    window.location.reload();
  }

  render() {
    return null;
    const { classes } = this.props;
    var languageFlag = this.state.lang === 'en' ? englishFlag : frenchFlag;
    return (
      <div style={{
        backgroundColor: '#2F7A72', width: '100%', position: 'fixed', bottom: '0', height: '32px',
      }}>
        <Container style={{ flexDirection: 'left', justifyContent: 'space-between' }} middle>
        </Container>
      </div>
    );
  }
}

const Footer = withRouter(connect(extractor, dispatcher)(FooterApp));
// export default withCookies(Footer);
export default withStyles(styles)(Footer);
