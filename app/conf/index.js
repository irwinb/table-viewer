// @flow
/**
 * Static config for app.
 */
import DotProp from 'dot-prop';

// Defaults
const store = {
  data: {
    maxRowsPerRequest: 1000,
    defaultRowsPerPage: 10
  }
};

export type Value =
  | string
  | number;

export type SetKey =
  | string
  | {};

export default {
  /**
   * Get a config value.
   * @param  {[type]} key:          string    key of config value to get
   * @param  {[type]} defaultValue: ?Value    optional default value to return if key not found
   * @return {[type]}               the value
   */
  get(key: string, defaultValue: ?Value) {
    return DotProp.get(store, key, defaultValue);
  },

  /**
   * Set a config value
   * @param {[type]} key: SetKey key of config value to set
   * @param {[type]} val: Value  the value to set
   */
  set(key: SetKey, val: Value) {
    if (typeof key === 'object') {
      Object
      .keys(key)
      .forEach(k => DotProp.set(store, k, key[k]));
    } else {
      DotProp.set(store, key, val);
    }
  }
};
