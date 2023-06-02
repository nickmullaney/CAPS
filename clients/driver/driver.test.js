'use strict';

const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');
const { pickupOccurred, packageDelivered } = require('./handler');

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  return {
    io: jest.fn().mockReturnValue({
      emit,
      on,
    }),
  };
});


let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe('Testing driver handlers', () => {

  test('Should log and emit in-transit after pick up occurs', () => {
    let payload = { orderID: 12345 };
    pickupOccurred(payload);

    expect(socket.emit).toHaveBeenCalledWith('in-transit', payload.orderID);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: picked up', payload.orderID);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = { orderID: 12345};
    packageDelivered(payload);

    expect(socket.emit).toHaveBeenCalledWith('delivered', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered', payload.orderID);
  });


});