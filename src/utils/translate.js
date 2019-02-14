import dotProp from 'dot-prop-immutable';
import Multilang from './multilang/multilang';

export default function translate(string) {
  let fallback = '';
  fallback = string;
  let value = dotProp.get(Multilang, string, fallback);
  return value || fallback;
}
