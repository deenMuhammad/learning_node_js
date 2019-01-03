'use strict'

const zmq = require('zeromq');

const subscriber = zmq.socket('sub');

subscriber.subscribe('');

subscriber.on('message', (data)=>{
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File "${message.filename}" changed at ${date}`)
});

subscriber.connect('tcp://localhost:60400');