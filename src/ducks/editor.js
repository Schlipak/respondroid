// Editor Duck

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';
import { newLoader, setLoading } from './Loaders';
import { addItem, removeItem, setItem } from './api';
import { setMenu } from './menu';
import FIELD_TYPES from '../constants/fieldTypes';

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
  addField: `${PREFIX}/addField`,
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

export const addField = createAction(TYPES.addField, 'category');
function onAddField(state, action) {
  return changeState(state, `item.fields.Fields.${action.category}`, fields => [...fields, {
    name: '',
    description: '',
    type: FIELD_TYPES.string,
  }]);
}

export const change = createAction(TYPES.change, 'field', 'valueOrFunction');
function onChange(state, action) {
  return changeState(state, `item.fields.${action.field}`, action.valueOrFunction);
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
  case TYPES.addField: return onAddField(state, payload);
  case TYPES.reset: return onReset(state, payload);
  default: return state;
  }
}

export function saveItem() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectEditor(state);
    dispatch(newLoader('editor', true));
    if (editor.table === 'Types') {
      return api.sync(editor.item).then(({ err, item }) => {
        if (err) {
          dispatch(setMeta('error', err));
        } else {
          dispatch(setItem('Types', item.id, item));
          dispatch(setMeta('synced', true));
        }
        dispatch(setLoading('editor', false));
        dispatch(setMenu('type', item));
        return Promise.resolve({ err, item });
      }).catch((err) => {
        dispatch(setMeta('error', err));
        dispatch(setLoading('editor', false));
      });
    }
    return Promise.resolve({ err: 'Invalid type' });
  };
}

export function destroy() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectEditor(state);
    const { table, itemId } = editor;
    dispatch(newLoader('editor', true));
    return api.destroy(table, itemId).then(({ err, record }) => {
      dispatch(removeItem(table, itemId));
      dispatch(setLoading('editor', false));
      return Promise.resolve({ err, record });
    });
  };
}

export function saveNewItem() {
  return (dispatch, getState, { api }) => {
    const state = getState();
    const editor = selectEditor(state);
    dispatch(newLoader('editor', true));
    if (editor.table === 'Types') {
      const it = {
        ...editor.item.fields,
      };
      it.Fields = JSON.stringify(it.Fields);
      return api.create(editor.table, it).then(({ err, item }) => {
        if (err) {
          dispatch(setMeta('error', JSON.stringify(err)));
        } else {
          dispatch(addItem('Types', item.id, item));
          dispatch(setMeta('synced', true));
        }
        dispatch(setLoading('editor', false));
        dispatch(setMenu('type', item));
        return Promise.resolve({ err, item });
      }).catch((err) => {
        dispatch(setMeta('error', JSON.stringify(err)));
        dispatch(setLoading('editor', false));
      });
    }
    return Promise.resolve({ err: 'Invalid type' });
  };
}

export function createType() {
  return (dispatch) => {
    dispatch(reset());
    dispatch(setMenu('type', {
      fields: {
        Name: 'NewType',
      },
    }));
    return Promise.resolve({});
  };
}
