
'use strict';

require('dotenv').config();
const {Server} = require('socket.io');
const PORT = process.env.PORT || 3001; 

const server = new Server();
server.listen(PORT);


server.on('connection', (socket) => {
  // proof of life for connection to server
  console.log('connected to the event server', socket.id);
  socket.on('MESSAGE', (payload) => {
    // we used logger for this in lab 11, can use socketio method for logging any event
    console.log('SERVER: Message event', payload);

    // 3 ways to emit [Cheat sheet](https://socket.io/docs/v4/emit-cheatsheet/)

    // socket.emit('MESSAGE', payload); //Basic emit back to sender
    // server.emit('MESSAGE', payload); //send to all clients connected to the server
    socket.broadcast.emit('MESSAGE', payload); // sends to all parties in the socket except for the sender
  });
  socket.on('RECEIVED', (payload) => {
    console.log('SERVER: Received event', payload);
    // Note that No One is listening for this!
    socket.broadcast.emit('RECEIVED', payload);
  });
});


const eventPool = require('./eventPool');

// Handlers, Making system aware of vendor and driver
require('./vendor/index');
require('./driver/index');

// Listeners: Listen to all events and log expected content
eventPool.on('event', (payload) => logger('pickup', payload));
eventPool.on('in-transit', (payload) => logger('in-transit', payload));
eventPool.on('delivered', (payload) => logger('delivered', payload));

// Logs the event, a timestamp and the payload
function logger(event, payload) {
  const timestamp = new Date();
  console.log('EVENT:', { event, timestamp, payload });
}
