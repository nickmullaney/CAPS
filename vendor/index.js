'use strict';

let eventEmitter = require('../eventPool.js');

var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

// Generate a new order for pickup
setInterval(() => {
  const payload = {
    time: chance.timestamp(),
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  eventEmitter.emit('NEW_ORDER', { payload });
  // console.log('NEW_ORDER', { payload });
}, 9000);

// module.exports = {newOrderHandler};