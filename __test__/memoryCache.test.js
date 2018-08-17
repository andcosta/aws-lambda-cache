const MemoryCache = require('../src/memoryCache');

describe('Memory Cache', () => {
  test('Set cache', async () => {
    const memoryCache = new MemoryCache();
    memoryCache.set('key', 'value');
    //     // expect(response.statusCode).toEqual(200);
    //     // expect(data.module.value.lastUpdate).not.toBeNull();
  });
});
