'use strict';

class Cache {
  constructor() {
    this._store = Object.create(null);
    this._defaulExpiresAt = 5; // 5 Minutes.
  }

  set(key, value, expiresAtMinutes) {
    this._store[key] = {
      expiresAt: new Date(new Date().getTime() + this._expiresAt(expiresAtMinutes) * 60000).getTime(),
      payload: value
    };
  }

  get(key) {
    const item = this._store[key];

    if (!item) return undefined;
    if (new Date().getTime() >= item.expiresAt) {
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
