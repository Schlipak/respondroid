import createSelector from '../utils/selector';
import { setItem } from './api';

const initialState = {};

export const selectApi = createSelector('selectApi', state => state.api);

export function saveUserProfilePicture(id, b64Image) {
  return (dispatch, getState, { api }) => api.update('Meta', id, {
    Value: b64Image,
  }).then(({ err, record }) => {
    if (!err) { dispatch(setItem('Meta', record.id, record)); }
    return Promise.resolve({ err, record });
  });
}

export function saveUsername(id, username) {
  return (dispatch, getState, { api }) => api.update('Meta', id, {
    Value: username,
  }).then(({ err, record }) => {
    if (!err) { dispatch(setItem('Meta', record.id, record)); }
    return Promise.resolve({ err, record });
  });
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  default: return state;
  }
}
