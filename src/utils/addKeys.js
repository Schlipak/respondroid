export default function addKeys(arrayOrUndefined, target = 'id') {
  if (arrayOrUndefined) {
    return arrayOrUndefined.filter(it => it).map(it => ({
      ...it,
      key: it[target],
    }));
  }
  return arrayOrUndefined;
}
