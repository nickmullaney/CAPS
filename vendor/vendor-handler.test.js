'use strict';

const { test } = require('node:test');
let eventEmitter = require('../eventPool');

const { orderHandler, deliveredMessage } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Vendor handlers', () => {

  test('Should log correct emit and console log for orderHandler', () => {
    let payload = {
      orderId: 12345,
    };

    orderHandler(payload);

    expect(console.log).toHaveBeenCalledWith('VENDOR ORDER:', payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Should log correct emit and console log for deliveredMessage', () => {
    let payload = {
      customer: 'Test Test',
    };

    deliveredMessage(payload);

    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for your order', payload.customer);
  });

});