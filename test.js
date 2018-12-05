// Require the serialport node module
var SerialPort = require('serialport');
// Open the port
var port = new SerialPort("COM3", {
    baudRate: 115200,
    parser: new SerialPort.parsers.Readline('\r\n')
});
// Read the port data
port.on("open", function () {
    console.log('open');
    port.on('data', function(data) {
        console.log(data);
    });
});