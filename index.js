const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
const express = require ('express');
const path=require('path');
require('dotenv').config();

//app express
const app=express();

//node del server
const server=require('http').createServer(app);
module.exports.io=require('socket.io')(server);

require('./sockets/socket');


//pat publico

const pathName=path.resolve(__dirname,'public');

app.use(express.static(pathName));

server.listen(process.env.PORT,(err)=>{
    if(err)throw new Error(err);
    console.log('Servidor Corriendo en el Puerto ',process.env.PORT);
});