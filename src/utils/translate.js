import dotProp from 'dot-prop-immutable';
import Multilang from './multilang/multilang';

export default function translate(string) {
  const fallback = string || '';
  return dotProp.get(Multilang, string, fallback);
}
