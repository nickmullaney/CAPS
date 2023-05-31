
'use strict';

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
