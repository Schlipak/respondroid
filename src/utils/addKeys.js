export default function addKeys(arrayOrUndefined, target='id') {
  if (arrayOrUndefined) {
    return arrayOrUndefined.map(it => ({
      ...it,
      key: it[target],
    }));
  }
  return arrayOrUndefined;
}
