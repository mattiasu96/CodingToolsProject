function ReadSerialData(data){
  console.log(data);
  //do stuff here
}

const SerialPort = require('serialport');
const port = new SerialPort('COM3', () => {
console.log('Port Opened');
});
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
delimiter: '\n'

});

port.pipe(parser);

parser.on('data', ReadSerialData);
