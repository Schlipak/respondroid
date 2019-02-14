import { newLoader, setLoading } from '../../ducks/Loaders';
import { connectedToApi, selectApi, tableContent } from '../../ducks/api';

export function connectApi(form) {
  return function (dispatch, getState, { api }) {
    // Do nothing if already connected
    const state = getState()
    if (selectApi(state).connected) {
      return Promise.resolve();
    }
    // Start loading
    dispatch(newLoader('mainLoader', true));
    return api.connect(form).then((base) => {
      api.table('Meta').then(table => {
        dispatch(tableContent('Meta', table));
      });
      api.table('Database').then(table => {
        dispatch(tableContent('Database', table));
      });
      api.table('Types').then(table => {
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
