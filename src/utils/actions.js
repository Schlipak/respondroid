/**
 * Please use this function to create actions.
 * @param type
 * @param args
 * @returns {{type: *}}
 */
export default function createAction(type, ...namedArgs) {
  return (...args) => {
    // if (args.length !== namedArgs.length) {
    //   console.warn(`Invalid action ${type} parameters,
    // received ${args.length} expected ${namedArgs.length}`);
    // } else {
    //   console.log('Action dispatched with createAction', { type, payload: { ...args } });
    // }
    const payload = {};
    namedArgs.forEach((namedArg, index) => {
      payload[namedArg] = args[index];
    });
    return {
      type,
      payload,
    };
  };
}
