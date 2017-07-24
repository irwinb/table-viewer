// @flow
/**
 * Static config for app.
 */
import Store from 'electron-store';
import defaults from './defaults';

const store = new Store({
  defaults
});

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
  get(key: string) {
    return store.get(key);
  },

  /**
   * Set a config value
   * @param {[type]} key: SetKey key of config value to set
   * @param {[type]} val: Value  the value to set
   */
  set(key: SetKey, val: Value) {
    store.set(key, val);
  }
};
