'use strict'

const net = require('net');
const fs = require('fs');
const filename = process.argv[2];

if(!filename){
    throw Error("Valid Filename must be included!");
}
net.createServer(connection=>{
    console.log("Subscriber Connected");
    connection.write(`Now watching ${filename} for changes...\n`);

    const watcher = fs.watch(filename, ()=>{
        connection.write(`File changed: ${new Date()}\n`)
    });
    connection.on('close', ()=>{
        console.log("Subscriber Disconnected");
        watcher.close();
    })
    connection.on('error', ()=>{
        console.log('Connection Error');
    })
}).listen('/tmp/watcher.sock', ()=>{console.log("Listening for Subscribers...")});