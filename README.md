# CodingToolsProject
Useful Resources: http://danielnill.com/nodejs-tutorial-with-socketio
                  https://hackernoon.com/arduino-serial-data-796c4f7d27ce

https://libraries.io/npm/tonal-progressions
https://libraries.io/npm/teoria
https://libraries.io/npm/tonal-chord
https://libraries.io/npm/chord-dictionary
# Pad O' Color
**Pad O' Color** is a device thought for children. It's goal is to map chords to geometry shapes and colors, in order to exploit visual memory, memorize chords and their sound, creating a co-dipendence between the ***temporal lobe*** (responsible for memory and hearing) and the ***occipital lobe*** (responsible for vision).


An external electro-magnetic pad has been added in order to furtherly enhance the engagement of children, they can play with the pad in order to modify the sound that has been played.

As mentioned above, the project is divided in two macro areas: the _software pad_ and the _hardware pad_.


##Software Pad

The software pad is an `HTML` webpage. It includes a library of chords and it's responsible for the actual triggering and generation of sound events.

The _pad_ has this view:

![Image description](https://i.imgur.com/ZmXWNnq.jpg)

To start the code:
1) Access the repository with App.js file and run on windows CMD "Node app.js".

2) Once it's running, open the browser and go to "http://localhost:5000/socket.html" (change the port number accordingly to what it's written inside the code, the socket.html it's what he's asking to the client, he will answer with the page ande the connection)

NB: connect the arduino to the first USB port on the right of the computer (this is valid only in my case, it's just a reminder for myself)

NB2: the wobbling has a normalization based on a slider that goes from 1 to 200, so i have to convert those values into frequencies. Keep that in mind for developing and future development of the physical pad with arduino (i'll have to normalize the value on the X and Y axis).

If i change the html file, i have to change also the address inserted: http://localhost:5000/Pad/index.html like this 
