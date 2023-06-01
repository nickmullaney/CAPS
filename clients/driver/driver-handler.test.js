const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const { orderHandler, thankDriver, pickupOccurred, packageDelivered } = require('./handler');

jest.mock('socket.io-client', () => {
  return {
    io: jest.fn().mockReturnValue({
      on: jest.fn(),
      emit: jest.fn(),
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

describe('Vendor handlers', () => {
  test('Should log correct emit and console log for orderHandler', () => {
    const emitSpy = jest.spyOn(socket, 'emit');

    const payload = { orderId: 12345 };
    orderHandler(payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      `VENDOR: ORDER ready for pickup (${expect.any(Date)}):`,
      payload);
    expect(emitSpy).toHaveBeenCalledWith('pickup', { timestamp: expect.any(Date), payload });
  });

  test('Should log correct emit and console log for thankDriver', () => {
    const payload = { customer: 'Test Test' };
    thankDriver(payload);

    expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Thank you for your order', payload.customer);
  });
});

describe('Testing driver handlers', () => {
  test('Should log and emit in-transit after pick up occurs', () => {
    const emitSpy = jest.spyOn(socket, 'emit');

    const payload = { orderId: 12345 };
    pickupOccurred(payload);

    expect(emitSpy).toHaveBeenCalledWith('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: picked up', payload.orderId);
  });

  test('Should emit delivered and log Driver delivery', () => {
    const emitSpy = jest.spyOn(socket, 'emit');

    const payload = { orderId: 12345 };
    packageDelivered(payload);

    expect(emitSpy).toHaveBeenCalledWith('delivered', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered', payload.orderId);
  });
});
