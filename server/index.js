'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

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

    // Broadcast pickup event to all sockets except the sender
    socket.broadcast.emit('pickup', payload);
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
});

// Start the server

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
