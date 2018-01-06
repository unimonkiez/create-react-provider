import createProvider from './create-provider';

const index = require('./index');

describe('should export', () => {
  it('create-provider as module', () => {
    expect(index).toBe(createProvider);
  });
});
