/**
 * Toute la logique de modification du store est presente dans ce fichier
 * On y retrouve les actions possibles (authStarted, authSuccess, authFailure)
 * Les actions export const name = params => ({...}) sont des events que va recevoir
 * la fonction reducer definit un peu plus bas.
 * En fonction des events recus, le reducer modifie l'etat de l'application : le store change
 */

// import { getCookie, setCookie } from '../utils/cookie';

const initialState = {

};

export function selectHelpers(state) {
  return state.app.helpers;
}

const prefix = 'ducks/app';
const TYPES = {

};

export function setAppLang(lang) {
  return function (dispatch) {
    if (lang === undefined) {
      dispatch({ type: 'SET_REDUX_LANGUAGE', code: lang });
    } else {
      dispatch({ type: 'SET_REDUX_LANGUAGE', code: lang });
      // setCookie('lang', lang, 1);
    }
  };
}

export function initialize() {
  return function (dispatch, getState, { notify }) {
    notify.setup(dispatch, getState);
    return Promise.resolve({});
  };
}

// Le reducer est le switch-case principal de l'application qui modifie le store en fonction
// des events recus.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case TYPES.storeHelpers:
    return {
      ...state,
      helpers: action.payload,
    };
  default:
    return state;
  }
}
