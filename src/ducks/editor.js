// Editor Duck

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';
import { newLoader, setLoading } from './Loaders';
import { setItem } from './api';
import { setMenu } from './menu';

const PREFIX = '/ducks/editor';
const initialState = {
  isNew: false,
  table: undefined,
  itemId: undefined,
  item: undefined,
  modified: false,
  error: undefined,
  synced: undefined,
};

export const selectEditor = createSelector('selectEditor', state => state.editor);

export const TYPES = {
  setMeta: `${PREFIX}/setMeta`,
  change: `${PREFIX}/change`,
  changeAttr: `${PREFIX}/changeAttr`,
};

export const setMeta = createAction(TYPES.setMeta, 'field', 'valueOrFunction');
function onSetMeta(state, action) {
  return changeState(state, action.field, action.valueOrFunction);
}

export const change = createAction(TYPES.change, 'field', 'valueOrFunction');
function onChange(state, action) {
  return changeState(state, `item.fields.${action.field}`, action.valueOrFunction);
}

// Exemple: dispatch('editable', 0, 'name', 'NewName')
export const changeAttr = createAction(TYPES.changeAttr, 'category', 'index', 'field', 'valueOrFunction');
function onChangeAttr(state, action) {
  console.log(action);
  nextState = changeState(state,
    `item.fields.Fields.${action.category}`,
    (cat) => {
    return cat.map((attr, index) => {
      if (index === action.index) {
        if (typeof action.valueOrFunction === 'function') {
          return {
            ...attr,
            [action.field]: action.valueOrFunction(attr),
          };
        } else {
          return {
            ...attr,
            [action.field]: action.valueOrFunction,
          }
        }
      }
      return attr;
    });
    });
  console.log(nextState);
  return nextState;
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.change: return onChange(state, payload);
  case TYPES.setMeta: return onSetMeta(state, payload);
  case TYPES.changeAttr: return onChangeAttr(state, payload);
  default: return state;
  }
}

export function saveItem() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectEditor(state);
    dispatch(newLoader('editor', true));
    if (editor.table === 'Types') {
      console.warn(`Updating a type item with id ${editor.itemId}`);
      return api.sync(editor.item).then(({ err, item }) => {
        if (err) {
          dispatch(setMeta('error', err));
        } else {
          dispatch(setItem('Types', item.id, item));
          dispatch(setMeta('synced', true));
        }
        dispatch(setLoading('editor', false));
        dispatch(setMenu('type', item));
        return Promise.resolve({ err, item })
      }).catch((err) => {
        dispatch(setMeta('error', err));
        dispatch(setLoading('editor', false));
      });
    }
    return Promise.resolve({ err: 'Invalid type' });
  };
}
