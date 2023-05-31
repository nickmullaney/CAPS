'use strict';

let eventEmitter = require('./eventPool');

// kicks off first package
require('./vendor/index.js');

// Handlers
const { pickupHandler } = require('./driver');
const { deliveryHandler } = require('./driver');
const { deliveredHandler } = require('./driver');
const { thankYouHandler } = require('./driver');

// Listeners
eventEmitter.on('NEW_ORDER', pickupHandler);
eventEmitter.on('DELIVERY', deliveryHandler);
eventEmitter.on('HAPPENING', deliveredHandler);
eventEmitter.on('DELIVERED', thankYouHandler);
