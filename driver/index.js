'use strict';

const { handlePickupAndDelivery } = require('./handler');
const eventEmitter = require('../eventPool');

eventEmitter.on('pickup', handlePickupAndDelivery); 
