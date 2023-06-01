'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps'); // Connect to the caps namespace


// Function to handle pickup event
const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.payload.orderId); // Log pickup message with order ID
  socket.emit('in-transit', payload); // Emit 'in-transit' event to the server with payload data
};

// Function to handle delivery event
const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.payload.orderId); // Log delivery message with order ID
  socket.emit('delivered', payload); // Emit 'delivered' event to the server with payload data
};

// Function to handle pickup and delivery events with timers
const handlePickupAndDelivery = (payload) => {
  setTimeout(() => {
    pickupOccurred(payload); // Call pickupOccurred after 1 second
  }, 1000);
  setTimeout(() => {
    packageDelivered(payload); // Call packageDelivered after 2 seconds
  }, 2000);
};

// Export the functions and socket connection for other modules to use
module.exports = { pickupOccurred, packageDelivered, handlePickupAndDelivery, socket };
