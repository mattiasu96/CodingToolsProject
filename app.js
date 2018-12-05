var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;


const port = new SerialPort('COM3', () => {
console.log('Port Opened');
});
const parser = new parsers.Readline({
delimiter: '\n'

});

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/socket.html':
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

server.listen(8001);
port.pipe(parser);

io.listen(server);

var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
   
    function ReadSerialData(data){
        console.log(data, );
        //do stuff here
        socket.emit('message', {'message': data})
    }
    
    setInterval(function(){socket.emit('message', {'message': 'Bella'})},1000);
    parser.on('data', ReadSerialData);
});