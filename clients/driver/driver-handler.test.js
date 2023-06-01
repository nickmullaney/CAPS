const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const { pickupOccurred, packageDelivered } = require('./handler');

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

describe('Driver handlers', () => {
  test('Should log correct emit and console log for orderHandler', () => {
    const payload = { orderId: 12345 };
    pickupOccurred(payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      `DRIVER: picked up ${payload.orderId}`);
    expect(socket.emit).toHaveBeenCalledWith('in-transit', payload);
  });

  test('Should emit delivered and log Driver delivery', () => {
    const payload = { orderId: 12345 };
    packageDelivered(payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      `DRIVER: delivered ${payload.orderId}`);
    expect(socket.emit).toHaveBeenCalledWith('delivered', payload);
  });
});
