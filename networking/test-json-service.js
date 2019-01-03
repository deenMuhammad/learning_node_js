'use strict'

const server = require('net').createServer(connection=>{
    console.log('Subscriber Connected');

    const firsChunk = `{"type": "changed", "timesta`;
    const secondChunk = 'mp": 1550694379995}\n';

    connection.write(firsChunk);

    const timer = setTimeout(()=>{
        connection.write(secondChunk);
        connection.end();
    }, 100);

    connection.on('end', ()=>{
        clearTimeout(timer);
        console.log('Subscriber Disconnected');
    });
});
server.listen(60400, function(){
    console.log('Test Server listening for subscribers...');
});