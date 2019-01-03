'use strict' 

const netClient = require('net').connect({port: 60400});
const ldjCLient = require('./lib/ldj-client').connect(netClient);

ldjCLient.on('message', (message)=>{
    if(message.type === 'watching'){
        console.log(`Watching file: ${message.filename}`);
    }
    else if(message.type === 'changed'){
        console.log(`File Changed ${new Date(message.timestamp)}`);
    }
    else{
        throw Error(`Unrecognized message: ${message}`);
    }
});