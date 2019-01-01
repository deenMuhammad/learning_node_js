'use strict'

const net = require('net');
const fs = require('fs');
const filename = process.argv[2];

if(!filename){
    throw Error("Valid Filename must be included!");
}
net.createServer(connection=>{
    console.log("Subscriber Connected");
    connection.write(JSON.stringify({type: 'watching', file: filename}));

    const watcher = fs.watch(filename, ()=>{
        connection.write(JSON.stringify({type: 'changed', timestamp: Date.now()}+'\n'));
    });
    connection.on('close', ()=>{
        console.log("Subscriber Disconnected");
        watcher.close();
    })
}).listen('/tmp/watcher.sock', ()=>{console.log("Listening for Subscribers...")});