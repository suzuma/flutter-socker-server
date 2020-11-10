
const { Client } = require('socket.io/dist/client');
const { io }=require('../index');

const Bands =require('../models/bands');
const Band =require('../models/band');
const bands=new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Heroes del Silencio'));

//mensajes de sockets
io.on('connection',client=>{
    console.log('cliente conectado...');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect',()=>{
        console.log('Cliente desconectado...');
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje...',payload);
        io.emit('mensaje',{admin:'nuevo mensaje'});
    });

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });
    client.on('add-band',(payload)=>{
        const newBand=new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });


    // client.on('emitir-mensaje',(payload)=>{
    //     // io.emit('nuevo-mensaje',payload); //emite el msg a todos
    //     client.broadcast.emit('nuevo-mensaje',payload);  // emite a todos menos al que lo mando
    // });
});