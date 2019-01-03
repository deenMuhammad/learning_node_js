'use strict'
const net = require('net');
const client = net.connect({port: 60400});
client.on('data', (data)=>{
    let server_message = JSON.parse(data);
    if(server_message.type==='watching'){
        console.log(`Now watching: ${server_message.filename}`);
    }
    else if(server_message.type==='changed'){
        let date = new Date(server_message.timestamp);
        console.log(`File changed: ${date}`);
    }
    else{
        console.log("Unrecognized message");
    }
});