'use strict' 

const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

const publisher = zmq.socket('pub');

fs.watch(filename, ()=>{
    publisher.send(JSON.stringify({
        type: 'changed',
        filename: filename,
        timestamp: Date.now()       
    }));
});

publisher.on('connect', ()=>{
    console.log('Connection Established')
})
publisher.bind('tcp://*:60400', err=>{
    if(err){
        throw err;
    }
    console.log("Listening for zmq subscribers...");
})