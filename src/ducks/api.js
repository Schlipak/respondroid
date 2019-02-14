/*
 *
 */

import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState, { removeState } from '../utils/changeState';
import SYNC_STATES from '../constants/SyncStates';

const PREFIX = '/ducks/api';
const initialState = {
  connected: false,
  tables: {},
  cache: {},
  sync: SYNC_STATES.UNDEFINED,
};

// Selectors
// Selectors
export const selectApi = createSelector('selectApi', (state, name) => state.api);

export const selectTable = createSelector('selectTable', (state, name) => state.api.tables[name]);

export const selectCache = createSelector('selectCache', (state, name) => state.api.cache);

export const selectSync = createSelector('selectSync', state => state.api.sync);

export const TYPES = {
  connectedToApi: `${PREFIX}/connectedToApi`,
  tableContent: `${PREFIX}/tableContent`,
  cacheItem: `${PREFIX}/cacheItem`,
  editItem: `${PREFIX}/editItem`,
  setSync: `${PREFIX}/setSync`,
  setItem: `${PREFIX}/setItem`,
  unloadCache: `${PREFIX}/unloadCache`,
};

export const connectedToApi = createAction(TYPES.connectedToApi, 'types');
function onConnectedToApi(state, args) {
  let next = changeState(state, 'types', args.types);
  next = changeState(next, 'connected', true);
  return next;
}

export const tableContent = createAction(TYPES.tableContent, 'name', 'content');
function onTableContent(state, args) {
  return changeState(state, 'tables', tables => ({ ...tables, [args.name]: args.content }));
}

export const cacheItem = createAction(TYPES.cacheItem, 'type', 'object', 'tag');
function onCacheItem(state, args) {
  return {
    ...state,
    cache: {
      ...state.cache,
      [args.type]: {
        ...state.cache[args.type],
        [args.object.id]: {
          ...state.cache[args.object.id],
          [args.tag]: args.object,
        },
      },
    },
  };
}

export const editItem = createAction(TYPES.editItem, 'type', 'object', 'changes', 'functions');
function onEditItem(state, args) {
  console.log(args);
  return changeState(state, `tables.${args.type}.content`, (items) => {
    const next = items.map((it) => {
      if (it.id === args.object.id) {
        let modified = { ...it };
        if (args.functions) {
          args.functions.forEach((f) => {
            modified = f(modified);
          });
        }
        return {
          ...modified,
          fields: {
            ...modified.fields,
            ...args.changes,
          },
        };
      }
      return it;
    });
    return next;
  });
}

export const setSync = createAction(TYPES.setSync, 'sync');
function onSetSync(state, args) {
  return changeState(state, 'sync', args.sync);
}

export const setItem = createAction(TYPES.setItem, 'type', 'id', 'object');
function onSetItem(state, args) {
  return changeState(state, `tables.${args.type}.content`, items => items.map((it) => {
    if (it.id === args.id) {
      return args.object;
    }
    return it;
  }));
}

export const unloadCache = createAction(TYPES.unloadCache, 'type', 'id', 'tag');
function onUnloadCache(state, args) {
  const { type, id, tag } = args;
  return removeState(state, `cache.${type}.${id}.${tag}`);
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.connectedToApi: return onConnectedToApi(state, payload);
  case TYPES.tableContent: return onTableContent(state, payload);
  case TYPES.editItem: return onEditItem(state, payload);
  case TYPES.cacheItem: return onCacheItem(state, payload);
  case TYPES.setSync: return onSetSync(state, payload);
  case TYPES.setItem: return onSetItem(state, payload);
  case TYPES.unloadCache: return onUnloadCache(state, payload);
  default: return state;
  }
}
