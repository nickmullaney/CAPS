'use strict';

const { handlePickupAndDelivery } = require('./handler');
const eventEmitter = require('../eventPool');

eventEmitter.on('pickup', handlePickupAndDelivery); 

// const pickupHandler = (payload) => {
//   setTimeout(() => {

//     pickupOccurred(payload);
//   }, 1000);
// };

// const deliveryHandler = (payload) => {
//   setTimeout(() => {

//     packageDelivered(payload);
//   }, 1000);
// };

// module.exports = { pickupHandler, deliveryHandler};