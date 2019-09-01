# CodingToolsProject
Useful Resources: http://danielnill.com/nodejs-tutorial-with-socketio
                  https://hackernoon.com/arduino-serial-data-796c4f7d27ce

https://li
aries.io/npm/tonal-progressions
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
3. **Connect** the **Arduino** to the relative USB port. **NB**: Read the paragraph [Technology considerations](#Technology-considerations) in order to properly connect the **Arduino** to your PC.
4. **Access** the repository  with the [Server code](app.js) (which is the main directory) using the command line on windows (you can run `cd directoryname` in the command line to access to a subdirectory of the current directory). Then run `node app.js`.

5. **Open** the browser and go to `http://localhost:5000` (you can change the port number accordingly to what it's written inside the [Server code](app.js) (line 35), the `index.html` is the requeste file by the client)

## Technology considerations 
1. **Why use javascript?** <br /> The great availability of libraries and framework made easy the implementation of graphic and audio content. In particular the [Web Audio Api](https://developer.mozilla.org/en/docs/Web/API/Web_Audio_API) and [Tone.js](https://tonejs.github.io) simplify the creation and management of sound path and audio generation.

2. **Is javascript the best solution?** <br />  Yes and no. For the standalone application (only the **_software pad_**) javascript and the browser approach are pretty good solution: _no installation required_, _accessible from everywhere_ and _client hardware/software independent_. <br /> On the other hand, the use of an external hardware is pretty _tricky_: the browser **_completely blocks_** any access to peripheral device by default (for safety reasons).<br /> Solutions for enabling the access to the external devices have not been investigated (maybe it's possible, maybe not), this leads to the following point.

3. **Why a Node.js local server?** <br /> Since the access to external devices is not allowed by the browser (the **Arduino** is connected via USB and sends serial data) I managed to bypass this problem using a **_local server_**. <br /> The **_local server_** has access to the devices connected to the PC, so it will collect the data from the USB input and then send it to the browser (which acts as a _client_). <br />This way the browser is able to retrieve the data from the USB port without directly accessing to it (since it's blocked as mentioned above). 

4. **Does the local server introduce any problems?** <br />Absolutely yes.<br />The problem with this approach is the reduced **_accessibility_**. <br /> The user has to manually run the **_server_**, the project as a whole can't be made accessible on the _world wide web_ (at least, not with its full functionalities).  
NB: connect the arduino to the first USB port on the right of the computer (this is valid only in my case, it's just a reminder for myself)

5. **How do i connect my Arduino?**<br /> Just plug the USB port of your **Arduino** to an USB port of your PC. <br /> You have to be sure of choosing the correct USB port, the selection is made in [Server code](app.js) at line 10. You have to change the name of the port `COM3` with the USB port name of your PC that you decide to use. <br /> Connect your **Arduino** unit to any USB port you like, go to **_device manager_** and check the name of the serial port connected, then copy it into the code.

6. **Why only 9 copper plates? Does this reduce resolution?** <br /> Yes. <br /> The number of plates is the maximum number connectable to the analog inputs of an **Arduino** unit. A higher number of plates with smaller dimension would improve the resolution of the **_hardware pad_**.<br /> Furthermore the **Arduino** unit is not powerful enough to process that amount of real time data.

## Scientific background

Many scientific papers have been used to build this project, in particular the part regarding of mapping colors to chords.

### Calculate chords _parameters_ 
In order to map chords to colors, 3 main _features_ have been used: **_dissonance_**, **_tension_** and **_modality_**. Some [Matlab code](/matlab_code/chords_functions.m) code has been written in order to properly calculate those parameters. 
#### 1) Chord dissonance
The **_chords dissonance_** measures the total dissonance of a chord. <br />
The dissonance calculation is based on a model of the perceived **_dissonance_** of two frequencies: the human hear is composed of many different biological **_band pass filters_** also called **_critical bands_**, when two frequencies are too close, the brain is not capable of recognizing them very well, this leads to a not pleasant feeling when two notes or frequencies are played together.<br /> For more details look here: [dissonance explained](http://hep.physics.indiana.edu/~rickv/consonance_and_dissonance.html)

The dissonance has been calculated following Sethares definition that can be found here: [local dissonance definition](http://sethares.engr.wisc.edu/paperspdf/consonance.pdf).

Basically what we're doing is model the function in the picture, then we apply it for each couple of frequencies.

![Dissonance plot](http://sethares.engr.wisc.edu/images/image3.gif)

**NB:** The mathematical functions in the paper can be misleading, we're considering all the unique couples of frequencies, not duplicates and not unisons (look at [dissonance function](/matlab_code/dissmeasure.m)).

#### 2) Chord tension
Chord tension takes into account the behavior of triplets of frequencies. From the literature ([The Psychophysics of Harmony Perception:
Harmony is a Three-Tone Phenomenon](https://pdfs.semanticscholar.org/f05e/56c9548fa18c64efeed248742e3a6afb0c02.pdf)) it's known that triplets with equal interval distance (each note has the same interval with the previous) generate a **_tension_** feeling.<br /> 
The behavior can be modeled with a **_gaussian function_**:

![Tension plot](https://www.researchgate.net/profile/Takashi_Fujisawa/publication/238730240/figure/download/fig2/AS:298725349052420@1448233081944/A-model-of-harmonic-tension-The-factor-determining-the-tension-of-the-triad-is-the.png)

Where the x axis represent the total difference between the two intervals of the three note chord measured in semitones.  

**For example**: if we have a **C diminished** chord **_C-Eb-Gb_**, from _C_ to _Eb_ we have an interval of 3 semitones, between _Eb_ and _Gb_ we have also an interval of 3 semitones. Now we make the difference 3-3 = 0, this leads to maximum tension as shown in the picture.

The **_chord tension_** has been calculated in [Matlab code](/matlab_code/chords_functions.m) following the formulas in ([The Psychophysics of Harmony Perception:
Harmony is a Three-Tone Phenomenon](https://pdfs.semanticscholar.org/f05e/56c9548fa18c64efeed248742e3a6afb0c02.pdf)). 

As mentioned above, the formulas in the paper are misleading: the tension is calculated iterating over all the unique triplets of frequencies  considering also harmonics if present (no unisons, no duplicates, no triplets with 2 equal frequencies and one different).


#### 3) Chord modality
However, the chord tension is useful only to model the _tension_ of the chord, that can be reduced to a "_binary_" detection of equal or non equal simmetry of the intervals, this gives us informations only about the _resolved_ or _unresolved_ type of chords. <br /> 
Therefore we need something to model the obvious difference between a **_Major_** and a **_Minor_** chord.

As mentioned in [The Psychophysics of Harmony Perception:
Harmony is a Three-Tone Phenomenon](https://pdfs.semanticscholar.org/f05e/56c9548fa18c64efeed248742e3a6afb0c02.pdf) (even if there are some influences by the western music culture) it's undeniable that **_minor chords_** are perceived more as _sad_, _weak_ and _dark_, while **_major chords_** are perceived more as _happy_, _strong_ and _bright_. 

In order to model this behavior, we use **_modality_**. This parameter is calculated following the formula in [The Psychophysics of Harmony Perception:
Harmony is a Three-Tone Phenomenon](https://pdfs.semanticscholar.org/f05e/56c9548fa18c64efeed248742e3a6afb0c02.pdf) iterating over all the triplets of frequencies (the same we did for the [chord tension](#Chord-tension), setting the parameter \\epsilon in order to have **_modality_**=1 for _Major chords_ in root position, and -1 for _minor chords_ in root position.

![Modality plot](https://www.researchgate.net/profile/Takashi_Fujisawa/publication/215646505/figure/fig4/AS:667681967575056@1536199194588/The-modality-curve-The-difference-in-the-magnitude-of-the-intervals-upper-minus-lower.ppm)

NB2: the wobbling has a normalization based on a slider that goes from 1 to 200, so i have to convert those values into frequencies. Keep that in mind for developing and future development of the physical pad with arduino (i'll have to normalize the value on the X and Y axis).

If i change the html file, i have to change also the address inserted: http://localhost:5000/Pad/index.html like this 
