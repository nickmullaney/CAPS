'use strict';

const { orderHandler } = require('./handler');

// starts the event cycle, note that the pickup emit is inside the orderHandler
setInterval(() => {
  orderHandler();
}, 5000);


