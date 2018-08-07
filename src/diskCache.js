'use strict';

class DiskCache {
  constructor() {
    this._defaulExpiresAt = 5; // 5 Minutes.
  }

  set(key, value, expiresAtMinutes) {
    var payload = {
      expiresAt: new Date(new Date().getTime() + this._expiresAt(expiresAtMinutes) * 60000).getTime(),
      payload: value
    };

    fs.writeFileSync(`/tmp/${key}.json`, JSON.stringify(payload));
  }

  get(key) {
    var result = undefined;

    try {
      var item = fs.readFileSync(`/tmp/${key}.json`, 'utf8');

      if (item) {
        var jsonItem = JSON.parse(item);

        if (new Date().getTime() >= jsonItem.expiresAt) {
          this.remove(key);
          result = undefined;
        } else {
          result = jsonItem.payload;
        }
      }
    } catch (err) {
      result = undefined;
    }

    return result;
  }
}

module.exports = DiskCache;
