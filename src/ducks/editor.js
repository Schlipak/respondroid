// Editor Duck

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';
import { newLoader, setLoading } from './Loaders';

const PREFIX = '/ducks/editor';
const initialState = {
  table: undefined,
  itemId: undefined,
  item: undefined,
  modified: false,
  error: undefined,
};

export const selectEditor = createSelector('selectEditor', state => state.editor);

export const TYPES = {
  setMeta: `${PREFIX}/setMeta`,
  change: `${PREFIX}/change`,
};

export function saveItem() {
  return function (dispatch, getState, { api }) {
    const state = getState();
    const editor = selectEditor(state);
    dispatch(newLoader('editor', true));
    if (editor.table === 'Types') {
      return api.update('Types', editor.itemId, {
        Name: editor.item.fields.Name,
        Description: editor.item.fields.Description,
        Fields: editor.item.fields.Fields,
      }).then(() => {
        dispatch(setLoading('editor', false));
      }).catch(err => {
        dispatch(setMeta('error', err));
        dispatch(setLoading('editor', false));
      })
    }
  };
}

export const setMeta = createAction(TYPES.setMeta, 'field', 'valueOrFunction');
function onSetMeta(state, action) {
  return changeState(state, action.field, action.valueOrFunction)
}

export const change = createAction(TYPES.change, 'field', 'valueOrFunction');
function onChange(state, action) {
  return changeState(state, `item.${action.field}`, action.valueOrFunction);
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case TYPES.change: return onChange(state, payload);
    case TYPES.setMeta: return onSetMeta(state, payload);
    default: return state;
  }
}
