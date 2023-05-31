'use strict';
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');
const Chance = require('chance');
let chance = new Chance();


const orderHandler = (payload=null) => {
  if(!payload){
    payload = {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: ORDER ready for pickup:', payload);
  socket.emit('pickup', payload); 
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.customer);


const deliveredMessage = (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
};

module.exports = { orderHandler, deliveredMessage, thankDriver };
