# CodingToolsProject
Useful Resources: http://danielnill.com/nodejs-tutorial-with-socketio
                  https://hackernoon.com/arduino-serial-data-796c4f7d27ce

https://libraries.io/npm/tonal-progressions
https://libraries.io/npm/teoria
https://libraries.io/npm/tonal-chord
https://libraries.io/npm/chord-dictionary


To start the code:
1) Access the repository with App.js file and run on windows CMD "Node app.js".

2) Once it's running, open the browser and go to "http://localhost:5000/socket.html" (change the port number accordingly to what it's written inside the code, the socket.html it's what he's asking to the client, he will answer with the page ande the connection)

NB: connect the arduino to the first USB port on the right of the computer (this is valid only in my case, it's just a reminder for myself)

NB2: the wobbling has a normalization based on a slider that goes from 1 to 200, so i have to convert those values into frequencies. Keep that in mind for developing and future development of the physical pad with arduino (i'll have to normalize the value on the X and Y axis) 
