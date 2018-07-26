'use strict';

class Cache {
  constructor() {
    this._store = Object.create(null);
    this._defaulExpiresAt = 21600000; // 6 hours.
  }

  set(key, value, expiresAt) {
    this._store[key] = {
      expiresAt: Date.now() + this._expiresAt(expiresAt),
      payload: value
    };
  }

  get(key) {
    const item = this._store[key];

    if (!item) return undefined;
    if (Date.now() >= item.expiresAt) {
      this.remove(key);
      return undefined;
    }

    return item.payload;
  }

  remove(key) {
    delete this._store[key];
  }

  clear() {
    this._store = Object.create(null);
  }

  _expiresAt(expiresAt) {
    if (typeof expiresAt !== 'number') return this._defaulExpiresAt;
    if (expiresAt <= 0) return this._defaulExpiresAt;

    return expiresAt;
  }
}

module.exports = Cache;
