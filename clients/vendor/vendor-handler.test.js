const { io } = require('socket.io-client');
const Chance = require('chance');
const socket = io('http://localhost:3001/caps');

const { orderHandler, deliveredMessage } = require('./handler');

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
  
    const payload = {
      orderId: 12345,
    };
  
    orderHandler(payload);
  
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/VENDOR: ORDER ready for pickup \(.+\):/),
      payload
    );
    expect(emitSpy).toHaveBeenCalledWith('pickup', { timestamp: expect.any(Date), payload });
  });
  
  test('Should log correct console log for deliveredMessage', (done) => {
    const payload = {
      store: 'Test Store',
      timestamp: new Date(),
    };
  
    deliveredMessage(payload);
  
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${payload.store}: VENDOR: Thank you for delivering this safely at ${payload.timestamp}`
      );
      done();
    }, 600);
  });
  
});
