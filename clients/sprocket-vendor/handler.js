'use strict';
const socket = require('../socket'); // Connect to the caps namespace
const Chance = require('chance');
let chance = new Chance();
const store = 'sprockets';


// Function to handle the order
const orderHandler = (order = null) => {
  // If no payload is provided, generate a random payload with mock data
  if (!order) {
    order = {
      store,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  const timestamp = new Date();
  console.log(`VENDOR: ORDER ready for pickup (${timestamp}):`, order);

  // Emit the 'pickup' event with the timestamp and payload
  socket.emit('pickup', { timestamp, order });

  // Emit the 'received' event to confirm pickup
  // TODO changed messages to store
  socket.emit('received', { queueId: order.store });
};

// Function to handle the delivery message
const deliveredMessage = (payload) => {
  setTimeout(() => {
    console.log(`${payload.order.store}: VENDOR: Thank you for delivering this safely at ${payload.timestamp}`);
  }, 500);
};

// Register the 'delivered' event listener to invoke the deliveredMessage function
socket.on('delivered', deliveredMessage);

// Export the necessary functions and socket connection for other modules to use
module.exports = { orderHandler, deliveredMessage, socket };
