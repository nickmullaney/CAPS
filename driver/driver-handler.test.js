'use strict';

let eventEmitter = require('../eventPool');
const { pickupOccured, packageDelivered } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Testing driver handlers', () => {

  test('Should log and emit in-transit after pick up occurs', () => {
    let payload = { orderId: 12345 };
    pickupOccured(payload);

    expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', payload);
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up', payload.orderId);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = { orderId: 12345};
    packageDelivered(payload);

    expect(eventEmitter.emit).toHaveBeenCalledWith('delivered', payload);
    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered', payload.orderId);
  });


});