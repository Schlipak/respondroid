import Multilanguage from 'react-redux-multilang';
import common from './common';
import homepage from './homepage';
import signup from './signup';
import signin from './signin';
import deleteAccount from './deleteAccount';
import notifications from './notifications';
import home from './home';
import faq from './faq';
import inputs from './inputs';
import project from './project';
import profile from './profile';
import mapcreator from './mapcreator';

// Des exemples de fichiers de traduction
const scopes = {
  common,
  homepage,
  signup,
  deleteAccount,
  signin,
  notifications,
  home,
  faq,
  inputs,
  project,
  profile,
  mapcreator,
}

export function aggregate() {
  const source = {};
  ['fr', 'en'].forEach(language => {
    source[language] = {};
    Object.keys(scopes).forEach(scope => {
      source[language][scope] = scopes[scope][language];
    });
  });
  return source;
}

const source = aggregate();

const Multilang = new Multilanguage(source);

export default Multilang;
