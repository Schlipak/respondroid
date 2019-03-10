// Item Editor Duck

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';
import { newLoader, setLoading } from './Loaders';
import { addItem, removeItem, setItem } from './api';

const PREFIX = '/ducks/editor';
const initialState = {
  isNew: false,
  type: undefined,
  itemId: undefined,
  item: undefined,
  modified: false,
  error: undefined,
  synced: undefined,
};

export const selectItemEditor = createSelector('selectItemEditor', state => state.itemEditor);

export const TYPES = {
  setMeta: `${PREFIX}/setMeta`,
  change: `${PREFIX}/change`,
  changeAttr: `${PREFIX}/changeAttr`,
  reset: `${PREFIX}/reset`,
};

export const reset = createAction(TYPES.reset);
function onReset() {
  return {
    isNew: false,
    table: undefined,
    itemId: undefined,
    item: undefined,
    modified: false,
    error: undefined,
    synced: undefined,
  };
}

export const setMeta = createAction(TYPES.setMeta, 'field', 'valueOrFunction');
function onSetMeta(state, action) {
  return changeState(state, action.field, action.valueOrFunction);
}

export const change = createAction(TYPES.change, 'field', 'valueOrFunction');
function onChange(state, action) {
  return changeState(state, `item.fields.Value.${action.field}`, action.valueOrFunction);
}

// Exemple: dispatch('editable', 0, 'name', 'NewName')
export const changeAttr = createAction(TYPES.changeAttr, 'category', 'index', 'field', 'valueOrFunction');
function onChangeAttr(state, action) {
  const nextState = changeState(state,
    `item.fields.Fields.${action.category}`,
    cat => cat.map((attr, index) => {
      if (index === action.index) {
        if (typeof action.valueOrFunction === 'function') {
          return {
            ...attr,
            [action.field]: action.valueOrFunction(attr),
          };
        }
        return {
          ...attr,
          [action.field]: action.valueOrFunction,
        };
      }
      return attr;
    }));
  return nextState;
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.change: return onChange(state, payload);
  case TYPES.setMeta: return onSetMeta(state, payload);
  case TYPES.changeAttr: return onChangeAttr(state, payload);
  case TYPES.reset: return onReset(state, payload);
  default: return state;
  }
}

export function destroy() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectItemEditor(state);
    const { table, itemId } = editor;
    dispatch(newLoader('itemEditor', true));
    return api.destroy(table, itemId).then(({ err, record }) => {
      dispatch(removeItem(table, itemId));
      dispatch(setLoading('itemEditor', false));
      return Promise.resolve({ err, record });
    });
  };
}

export function saveNewItem() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectItemEditor(state);
    dispatch(newLoader('itemEditor', true));
    const it = {
      ...editor.item.fields,
    };
    it.Value = JSON.stringify(it.Value);
    return api.create('Database', it).then(({ err, item }) => {
      if (err) {
        dispatch(setMeta('error', JSON.stringify(err)));
      } else {
        dispatch(addItem('Database', item.id, item));
        dispatch(setMeta('synced', true));
      }
      dispatch(setLoading('itemEditor', false));
      return Promise.resolve({ err, item });
    }).catch((err) => {
      dispatch(setMeta('error', JSON.stringify(err)));
      dispatch(setLoading('itemEditor', false));
    });
  };
}

export function saveItem() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectItemEditor(state);
    dispatch(newLoader('itemEditor', true));
    return api.sync(editor.item, 'Database').then(({ err, item }) => {
      if (err) {
        dispatch(setMeta('error', err));
      } else {
        dispatch(setItem('Database', item.id, item));
        dispatch(setMeta('synced', true));
      }
      dispatch(setLoading('itemEditor', false));
      return Promise.resolve({ err, item });
    }).catch((err) => {
      dispatch(setMeta('error', err));
      dispatch(setLoading('itemEditor', false));
    });
  };
}

export function createItem(type) {
  return (dispatch) => {
    dispatch(reset());
    dispatch(setMeta('isNew', true));
    dispatch(setMeta('type', type));
    dispatch(setMeta('item', {
      id: 'create-item-id',
      fields: {
        Name: 'New',
        Type: [type.id],
        Value: {},
      },
    }));
    return Promise.resolve({});
  };
}
