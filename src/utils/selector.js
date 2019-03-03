/**
 * When fetching data from the store, use selectors created via the method create selector.
 * It adds error checking to selectors.
 * @param name
 * @param selector
 * @returns {function(*)}
 */

export default function createSelector(name, selector) {
  const fakeSelector = 'A selector failed, please check the error logs.';
  return (...args) => {
    try {
      const selectedData = selector(...args);
      return selectedData;
    } catch (e) {
      // console.error('Selection failed in ' + name, e.message);
      return fakeSelector;
    }
  };
}
