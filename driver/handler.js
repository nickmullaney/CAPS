// 'use strict';

// let eventEmitter = require('../eventPool');


// const pickupHandler = (payload) => {
//   setTimeout(() => {
//     handler(payload)
//     // console.log('EVENT: Driver is on their way to pickup: ', payload);
//     // eventEmitter.emit('DELIVERY', payload);
//   }, 1000);
// };

// const deliveryHandler = (payload) => {
//   setTimeout(() => {
//     console.log('EVENT: In-Transit: ', payload);
//     eventEmitter.emit('HAPPENING', payload);
//   }, 1000);
// }

// const deliveredHandler = (payload) => {
//   setTimeout(() => {
//     console.log('EVENT: Package has been delivered', payload);
//     eventEmitter.emit('DELIVERED', payload);
//   }, 1000);
// }

// const thankYouHandler = (payload) => {
//   setTimeout(() => {
//     console.log('EVENT: Thank you, your order has been handed off', payload);
    
//   }, 1000);
// }

// module.exports = { pickupHandler, deliveryHandler, deliveredHandler, thankYouHandler };
