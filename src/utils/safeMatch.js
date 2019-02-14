export default function safeMatch(item, regex) {
  try {
    return item.match(new RegExp(regex), 'i');
  } catch (e) {
    return false;
  }
}
