'use strict';

let eventEmitter = require('../eventPool');

const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.orderId);
  eventEmitter.emit('in-transit', payload);
};

const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.orderId);
  eventEmitter.emit('delivered', payload);
  // eventEmitter.emit('in-transit', payload);
};

const handlePickupAndDelivery = (payload) => {
  setTimeout(() => {
    pickupOccurred(payload);
  }, 1000);
  setTimeout(() => {
    packageDelivered(payload);
  }, 2000);
};
// eventEmitter.on('in-transit', packageDelivered);

module.exports = { pickupOccurred, packageDelivered, handlePickupAndDelivery };