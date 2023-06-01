'use strict';
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps'); // Connect to the caps namespace
const Chance = require('chance');
let chance = new Chance();

socket.on('connect', () => {
  console.log('Connected to CAPS server');
  socket.emit('joinRoom', 'VendorID'); // Join the room with the vendor ID
});


const orderHandler = (payload = null) => {
  if (!payload) {
    payload = {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  const timestamp = new Date();
  console.log(`VENDOR: ORDER ready for pickup (${timestamp}):`, payload); 

  socket.emit('pickup', { timestamp, payload });
};


const deliveredMessage = (payload) => {
  setTimeout(() => {
    console.log(`${payload.store}: VENDOR: Thank you for delivering this safely at ${payload.timestamp}`);
  }, 500);
};
// const thankDriver = (payload) => {
//   console.log(`VENDOR: Your order has been delivered (${payload.timestamp}):`, payload.customer);
// }

socket.on('disconnect', () => {
  console.log('Disconnected from the CAPS server');
});

socket.on('delivered', deliveredMessage);

module.exports = { orderHandler, deliveredMessage };
