import dotProp from 'dot-prop-immutable';

export default function changeState(state, path, valueOrFunction) {
  return dotProp.set(state, path, valueOrFunction);
}

export function removeState(state, path) {
  return dotProp.delete(state, path);
}
