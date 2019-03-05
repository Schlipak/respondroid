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

export function saveUserProfilePicture(id, b64Image) {
  return function (dispatch, getState, { api }) {
    console.log(`Started save pp for ID ${id}`);
    return api.update('Meta', id, {
      Value: b64Image,
    });
  };
}

export function saveUsername(id, username) {
  return function (dispatch, getState, { api }) {
    return api.update('Meta', id, {
      Value: username,
    });
  };
}

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
