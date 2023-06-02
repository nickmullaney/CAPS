'use strict';

const { handlePickupAndDelivery, socket } = require('./handler');

// Listen for the 'connect' event on the socket
// When the socket connects to the server, the callback function will be executed
// It logs a message indicating the successful connection to the CAPS server
// It also registers an event listener for the 'pickup' event and associates it with the handlePickupAndDelivery function
socket.on('connect', () => {
  console.log('Connected to CAPS server');
  // Subscribe to different queues for each store
  socket.emit('joinRoom', 'driver');

  // Trigger the 'getAll' event to fetch messages from the server for each store's queue
  socket.on('pickup', handlePickupAndDelivery);
});

// Listen for the 'disconnect' event on the socket
// When the socket disconnects from the server, the callback function will be executed
// It logs a message indicating the disconnection from the CAPS server
socket.on('disconnect', () => {
  console.log('Disconnected from the CAPS server');
});
