import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState, { removeState } from '../utils/changeState';
import commonReducer from '../utils/reducer';

// Initial state
const initialState = {
  knownLoaders: {},
};

// Selectors
export const selectLoaders = createSelector('selectLoaders', (state, name) => {
  return state.loaders.knownLoaders[name];
});

// Actions
export const PREFIX = 'ducks/loaders';
// - Types
export const TYPES = {
  newLoader: `${PREFIX}/newLoader`,
  removeLoader: `${PREFIX}/removeLoader`,
  setLoading: `${PREFIX}/setLoading`,
};

// Actions
export const newLoader = createAction(TYPES.newLoader, 'name', 'isLoading');
export const removeLoader = createAction(TYPES.removeLoader, 'name');
export const setLoading = createAction(TYPES.setLoading, 'name', 'isLoading');

// Reactions
function onNewLoader(state, action) {
  return changeState(state, `knownLoaders.${action.payload.name}`, action.payload.isLoading);
}

function onRemoveLoader(state, action) {
  // Delete field.
  return removeState(state, `knownLoaders.${action.payload.name}`);
}

function onSetLoading(state, action) {
  return changeState(state, `knownLoaders.${action.payload.name}`, action.payload.isLoading);
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TYPES.newLoader: return onNewLoader(state, action);
    case TYPES.removeLoader: return onRemoveLoader(state, action);
    case TYPES.setLoading: return onSetLoading(state, action);
    default: return state;
  }
}
