'use strict';

const socket = require('../socket'); // Connect to the caps namespace

socket.emit('getAll', { queueId: 'driver' });

// Function to handle pickup event
const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload); // Log pickup message with order ID
  socket.emit('received', { queueId: 'driver' });
  socket.emit('in-transit', payload); // Emit 'in-transit' event to the server with payload data
};

// Function to handle delivery event
const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.order); // Log delivery message with order ID
  socket.emit('delivered', payload); // Emit 'delivered' event to the server with payload data
};

// Function to handle pickup and delivery events with timers
const handlePickupAndDelivery = (payload) => {
  const pickupDelay = 1000; // Delay before calling pickupOccurred function (in milliseconds)
  const deliveryDelay = 2000; // Delay before calling packageDelivered function (in milliseconds)

  setTimeout(() => {
    pickupOccurred(payload); // Call pickupOccurred after the specified delay
  }, pickupDelay);

  setTimeout(() => {
    packageDelivered(payload); // Call packageDelivered after the specified delay
  }, deliveryDelay);
};

// Export the functions and socket connection for other modules to use
module.exports = { pickupOccurred, packageDelivered, handlePickupAndDelivery, socket };
