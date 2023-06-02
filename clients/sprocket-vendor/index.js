'use strict';

const { orderHandler, socket } = require('./handler');

// Create two separate stores
const store = 'sprockets';

// Connect to the CAPS Application Server using the caps namespace
socket.on('connect', () => {
  console.log('Sprockets Connected to CAPS server');

  // Subscribe to different queues for each store
  socket.emit('joinRoom', store);

  // Trigger the 'getAll' event to fetch messages from the server for each store's queue
  socket.emit('getAll', { queueId: store });
});

// Event handler when the socket disconnects from the CAPS server
socket.on('disconnect', () => {
  console.log('Disconnected from the CAPS server');
});

// Function to simulate placing an order for each store
setInterval(() => {
  orderHandler({ store });
}, 5000);
