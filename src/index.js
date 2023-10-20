const { join } = require('path')
const express = require("express");
const app = express();
const http = require('http').Server(app);

//Socketio y iniciando socket
const io = require("socket.io")(http);

// Rutas o EndPoint
app.get('/', function(req, res){
    res.sendFile(join(__dirname, 'index.html'));
});
app.get('/blog', function(req, res){
    res.send("BLOG");
});

//Conectando clientes con socket.io
io.on("connection", function(socket){
    console.log('Un cliente conectado');

    // Capturar el mensaje del cliente
    socket.on('my-chat', (msg => {
        console.log('Message: ', msg);
        socket.broadcast.emit('my-chat', msg)
    }))

    socket.on("disconnect", function(){
        console.log("Cliente desconectado...");
    })
});

// Configuiracion del servidor
http.listen(3000, function(req, res){
    console.log("Servidor iniciado en: (http://127.0.0.1:3000)");
});