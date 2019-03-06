import { newLoader, setLoading } from '../../ducks/Loaders';
import {
  connectedToApi, reset, selectApi, tableContent,
} from '../../ducks/api';


// Improve usage of data fetched form api
export function connectApi(form) {
  return (dispatch, getState, { api }) => {
    // Do nothing if already connected
    const state = getState();
    if (selectApi(state).connected) {
      return Promise.resolve();
    }
    // Start loading
    dispatch(newLoader('mainLoader', true));
    return api.connect(form).then((base) => {
      api.table('Meta').then((table) => {
        dispatch(tableContent('Meta', table));
      });
      api.table('Database').then((table) => {
        dispatch(tableContent('Database', table));
      });
      api.table('Types').then((table) => {
        dispatch(tableContent('Types', table));
      });
      if (base !== undefined) {
        dispatch(connectedToApi(['types']));
      }
      dispatch(setLoading('mainLoader', false));
      return Promise.resolve(base);
    });
  };
}

export function disconnectApi() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    if (!selectApi(state).connected) {
      return Promise.resolve();
    }
    return api.disconnect().then((success) => {
      if (success) {
        dispatch(reset());
      }
    });
  };
}
