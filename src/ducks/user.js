/*
 *
 */

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState, { removeState } from '../utils/changeState';

const PREFIX = '/ducks/user';
const initialState = {
  name: undefined,
  mail: undefined,
  ppUrl: undefined,
};

// Selectors
export const selectApi = createSelector('selectApi', (state) => {
  return state.api;
});

export const TYPES = {
  // connectedToApi: `${PREFIX}/connectedToApi`,
};

export const connectedToApi = createAction(TYPES.connectedToApi, 'types');
function onConnectedToApi(state, args) {
  let next = changeState(state, 'types', args.types);
  next = changeState(next, 'connected', true);
  return next;
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    // case TYPES.connectedToApi: return onConnectedToApi(state, payload);
    default: return state;
  }
}
