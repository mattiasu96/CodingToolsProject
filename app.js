var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;


const port = new SerialPort('COM3',{baudRate:115200}, () => {
console.log('Port Opened');
});
const parser = new parsers.Readline({
delimiter: '\n' //Delimiter for reding serial input, be sure it's \n in the Arduino 

});

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/socket.html': //se il path scritto è "url/socket.html, mi carica l'html chiamato socket. Sarà la mia homepage.
            //NB: DEVO FARGLI CHIAMARE LA PAGINA CON IL MIO PAD IMPLEMENTATO, ALLA QUALE DEVO AGGIUNGERE LA FUNZIONE DI RICEZIONE DEI MESSAGGI PRESENTE
            // NEL FILE socket.html
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});

server.listen(5000);
port.pipe(parser);
var listener = io.listen(server);

listener.sockets.on('connection', function(socket){ //è un listener. Il server attende una connessione, una volta detectata la connessione esegue questo codice
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