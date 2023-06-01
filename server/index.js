'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./lib/queue');
let messageQueue = new Queue();

// Socket server singleton (sometimes called io)
const server = new Server();

// Accept connections on a namespace called "caps"
const capsNamespace = server.of('/caps');

// Configure socket objects from clients
capsNamespace.on('connect', (socket) => {
  console.log('Connected to the event server', socket.id);

  // Join room event
  socket.on('joinRoom', (room) => {
    console.log('These are the rooms', socket.adapter.rooms);
    console.log('---payload is the room name in this example---', room);

    socket.join(room);

    console.log(`You've joined the ${room} room`);
    console.log('these are All the current rooms', socket.adapter.rooms);
  });

  // Pickup event
  socket.on('pickup', (payload) => {
    const timestamp = new Date();
    console.log(`EVENT: pickup (${timestamp}):`, payload);

    let currentQueue = messageQueue.read(payload.queueId);
    // first time we run our server this queue wont exist, we need validation
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    // Now that we KNOW we have a current queue, lets store the incoming message
    // Because that unique messageId is a string, Javascript will maintain order for us.
    currentQueue.store(payload.messageId, payload);

    // Broadcast pickup event to all sockets except the sender
    socket.broadcast.emit('pickup', payload);
  });

  // Received Event
  socket.on('received', (payload) => {
    console.log('Server: Received event', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('We have messages but no Queue');
    }
    let message = currentQueue.remove(payload.queueId);

    socket.broadcast.emit('received', message);
  });

  // In-transit event
  socket.on('in-transit', (payload) => {
    const timestamp = new Date();
    console.log(`EVENT: in-transit (${timestamp}):`, payload);
  });

  // Delivered event
  socket.on('delivered', (payload) => {
    const timestamp = new Date();
    console.log(`EVENT: delivered (${timestamp}):`, payload);
    socket.broadcast.emit('delivered', payload);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    // Remove socket from all rooms
    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
  });

  socket.on('getAll', (payload) => {
    console.log('Attempting to get messages');
    let currentQueue = messageQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(messageId => {
        // Sending saved messages that were missed by recipient
        // Maybe sending to the correct room also works
        socket.emit('MESSAGE', currentQueue.read(messageId));
        // Once we emit then our code should receive the messages and remove them
      });
    }
  });
});


// Start the server

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
