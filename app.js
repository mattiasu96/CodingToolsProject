var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var  path = require('path');
var express = require('express');
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;


const port = new SerialPort('COM3',{baudRate:115200}, () => {
console.log('Port Opened');
});
const parser = new parsers.Readline({
delimiter: '\n' //Delimiter for reding serial input, be sure it's \n in the Arduino 

});


app.get('/', function(req, res) {
   // res.redirect('index.html');
    res.status(200);
    res.sendFile(path.join(__dirname,"Pad","index.html"));
});


app.use(express.static(path.join(__dirname, 'Pad')));





/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/socket.html');
});*/
server.listen(5000);
port.pipe(parser);


io.on('connection', function(socket){ //è un listener. Il server attende una connessione, una volta detectata la connessione esegue questo codice
    console.log('1 connection');
    socket.emit('message', {'message': 'Bella zio'});

    function ReadSerialData(data){
        // NB: A OGNI CARICAMENTO PAGINA CREA UN NUOVO CLIENT E QUINDI SUL CONSOLE LOG DEL SERVER CI SONO MESAGGI DUPLICATI TANTI QUANTI
        //I CLIENT CREATI
        console.log(data);
        //do stuff here

        socket.emit('message', {'message': data})
    }
    
    parser.on('data', ReadSerialData);
});