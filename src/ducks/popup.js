import createSelector from '../utils/selector';
import createAction from '../utils/actions';
import changeState from '../utils/changeState';

const PREFIX = '/ducks/menu';
const initialState = {
  isOpen: false,
  title: '',
  text: '',
  onConfirm: () => {},
};

// Selectors
export const selectPopup = createSelector('selectPopup', state => state.popup);

export const TYPES = {
  setPopupInfo: `${PREFIX}/setPopupInfo`,
};

export const setPopupInfo = createAction(TYPES.setPopupInfo, 'field', 'valueOrFunction');
function onSetPopupInfo(state, action) {
  return changeState(state, action.field, action.valueOrFunction);
}

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case TYPES.setPopupInfo: return onSetPopupInfo(state, payload);
  default: return state;
  }
}
