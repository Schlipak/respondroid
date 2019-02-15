/*
 *
 */

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState, { removeState } from '../utils/changeState';

const PREFIX = '/ducks/menu';
const initialState = {
  icon: '',
  name: '',
  visible: false,
  destinations: [],
};

// Selectors
export const selectMenu = createSelector('selectMenu', state => state.menu);

export const TYPES = {
  setMenu: `${PREFIX}/setMenu`,
};

export const setMenu = createAction(TYPES.setMenu, 'menu');
function onSetMenu(state, args) {
  console.warn('SetMENU to ', args.menu);
  return {
    ...state,
    ...args.menu,
  };
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.setMenu: return onSetMenu(state, payload);
  default: return state;
  }
}
