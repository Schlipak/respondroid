/*
 *
 */

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState, { removeState } from '../utils/changeState';

const PREFIX = '/ducks/menu';
const initialState = {
  title: '',
  type: undefined,
};

// Selectors
export const selectMenu = createSelector('selectMenu', state => state.menu);

export const TYPES = {
  setMenu: `${PREFIX}/setMenu`,
};

export const setMenu = createAction(TYPES.setMenu, 'field', 'valueOrFunction');
function onSetMenu(state, action) {
  return changeState(state, action.field, action.valueOrFunction);
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.setMenu: return onSetMenu(state, payload);
  default: return state;
  }
}
