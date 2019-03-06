/*
 *
 */

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';

// const PREFIX = '/ducks/user';
const initialState = {
  name: undefined,
  mail: undefined,
  ppUrl: undefined,
};

export const selectApi = createSelector('selectApi', state => state.api);

export const TYPES = {};

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

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    // case TYPES.connectedToApi: return onConnectedToApi(state, payload);
    default: return state;
  }
}
