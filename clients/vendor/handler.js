'use strict';

// Import the required dependencies
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps'); // Connect to the caps namespace
const Chance = require('chance');
let chance = new Chance();


// Event handler when the socket connects to the CAPS server
socket.on('connect', () => {
  console.log('Connected to CAPS server');
  socket.emit('joinRoom', 'VendorID'); // Join the room with the vendor ID
});

// Function to handle the order
const orderHandler = (payload = null) => {
  // If no payload is provided, generate a random payload with mock data
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
  
  // Emit the 'pickup' event with the timestamp and payload
  socket.emit('pickup', { timestamp, payload });
};

// Function to handle the delivery message
const deliveredMessage = (payload) => {
  setTimeout(() => {
    console.log(`${payload.payload.store}: VENDOR: Thank you for delivering this safely at ${payload.timestamp}`);
  }, 500);
};

// Event handler when the socket disconnects from the CAPS server
socket.on('disconnect', () => {
  console.log('Disconnected from the CAPS server');
});

// Register the 'delivered' event listener to invoke the deliveredMessage function
socket.on('delivered', deliveredMessage);

// Export the necessary functions
module.exports = { orderHandler, deliveredMessage };
