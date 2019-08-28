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

As mentioned above, the project is divided in two macro areas: the **_software pad_** and the **_hardware pad_.**
## Project description

### Software Pad

The software pad is an `HTML` webpage. It includes a library of chords and it's responsible for the actual triggering and generation of sound events.

The _pad_ has this view:

![Pad view](https://i.imgur.com/966YdFY.png)

As shown in the figure, it's composed by two main elements:
1. **Notes pad**: the colored pad on the right shows all the notes placed at vertical interval of fifth (musical interval), this allows (as explained later in the `readme`) to show **geometric patterns** of chords. <br />  This part is also responsible for triggering sound events: overing over a **_hexagonal cell_** will generate a sound with the corresponding note of the **_cell_**.
2. **Chords matrix**: the grey colored matrix on the left shows a dictionary of many different type of chords. <br /> 
Selecting a chords will light up all the **_hexagonal cells_** containing the notes of the selected chord.

In the following image a C major chord has been selected:

![C Major Chord](https://i.imgur.com/NAaE0Y3.png)

### Hardware pad

The software pad has been realized using an **Arduino** unit (inserire qui tipo di arduino). 

The analog input of the **Arduino** board have been connected to 9 copper plates. Each plates works as an **_electro-magnetic_** field generator, when the hand is moved over the plates, it "_disturbs_" the magnetic field, so it's possible to calculate the hand position by the amount of _disturbance_ that each plate "_feels_". 

**INSERIRE DESCRIZIONE PRECISA, FOTO E SCHEMATICS DEL CIRCUITO** 

## Getting started
To run the project:
1. **Download** the repository containing all the needed code. This should also include all the external Javascript libraries (you can still find a complete list of used libraries at the end of the `readme`).
2. **Build** the circuit as shown in the previous schematic and install the [Arduino code](pad9pad.ino).
3. Connect the **Arduino** to the relative USB port. NB: Read the paragraph [create an anchor](#Project-description)
3. **Access** the repository  with the [Server code](app.js) (which is the main directory) using the command line on windows (you can run `cd directoryname` in the command line to access to a subdirectory of the current directory). Then run `node app.js`.

4. **Open** the browser and go to `http://localhost:5000` (change the port number accordingly to what it's written inside the code, the socket.html it's what he's asking to the client, he will answer with the page ande the connection)

NB: connect the arduino to the first USB port on the right of the computer (this is valid only in my case, it's just a reminder for myself)

NB2: the wobbling has a normalization based on a slider that goes from 1 to 200, so i have to convert those values into frequencies. Keep that in mind for developing and future development of the physical pad with arduino (i'll have to normalize the value on the X and Y axis).

If i change the html file, i have to change also the address inserted: http://localhost:5000/Pad/index.html like this 
