'use strict';

const { handlePickupAndDelivery, socket } = require('./handler');
// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps'); // Connect to the caps namespace


socket.on('connect', () => {
  console.log('Connected to CAPS server');
  socket.on('pickup', handlePickupAndDelivery);
});


socket.on('disconnect', () => {
  console.log('Disconnected from the CAPS server');
});
