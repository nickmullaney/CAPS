
// const { newOrderHandler } = require('./vendor/index');

const eventPool = require('./eventPool');
// const payload = require('./examples/chance');
require('./vendor/index');
require('./driver/index');

//invokes new order from vendor file to begin order process
// newOrderHandler(payload); 

eventPool.on('event', (payload) =>{logger('pickup', payload)});
eventPool.on('in-transit', (payload) =>{logger('in-transit', payload)});
eventPool.on('delivered', (payload) =>{logger('delivered', payload)});

function logger(event, payload){
  const timestamp = new Date();
  console.log('EVENT:', {event, timestamp, payload});
}