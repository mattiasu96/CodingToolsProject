//Gradient color ---------------------------


var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#pad').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}


setInterval(updateGradient,10);

//End of gradient color -------------------------------------------

//LCD Display -------------------------------
lcdRGB.lcdNew("lcd1", ".hello");

lcdRGB.writeRow("lcd1","Pad O' Color", 0);
//LCD display  --------------------------------------




// Generazione synth ------------------------------
//var synth = new Tone.Synth().toMaster();



var mode = 0; // 0 = modalità single note, 1 = modalità multiple notes


notes = document.querySelectorAll(".hex");
Tone.context.resume();
var ac =  new AudioContext();

//NB questa soluzione in teoria funziona, in pratica mi da errore perchè non posso richiamare start 2 volte sullo stesso elemento (nodo). Una volta che lo stoppo non posso più ristartarlo. Quello che dovrei fare è o re-inserirlo nella funzione play, così ogni volta che è chiamata crea delle variabili locali che poi vengono distrutte, quindi la funzione start e stop lavora su variabili create nuove. Altrimenti invece di stop (se inserisco la definizione di osc e lfo all'esterno della funzione play) uso connect e disconnect.
//var osc = ac.createOscillator();
//var lfo = ac.createOscillator();

// REIMPLEMENTA LA FUNZIONE PLAY TRAMITE DEFINIZIONE + VARIABILE ALTRIMENTI NON FUNZIONA : BREVE ESEMPIO

/* function play(){
        var osc = ac.createOscillator();
    var lfo = ac.createOscillator();
     osc.frequency.value=1000;
	returnedObject={};
      returnedObject["value1"] = osc;
     returnedObject["value2"] = lfo;
     return returnedObject;}
var test = play(); */  //RITORNA I VALORI VOLUTI DI OSC E LFO 
    var freq = 17;
function play() {
    x =  event.target.title;
    var mynote;
    mynote = Tonal.freq(x);
    console.log(mynote);
  
    var ffreq = 1000;
    
    var depth = 50;

    var Q = 0;

    var osc = ac.createOscillator();
    var lfo = ac.createOscillator();
    var filter = ac.createBiquadFilter();
    osc.type = 'sine';
    var amp = ac.createGain();
    var lfoAmp = ac.createGain();
    lfo.connect(lfoAmp);
    lfoAmp.connect(filter.frequency);

    osc.frequency.value = mynote;

    filter.Q.value = Q;
    filter.frequency.value = ffreq;

    osc.connect(filter);
    filter.connect(amp);
    amp.connect(ac.destination);

    lfo.frequency.value = freq / 4;
    lfoAmp.gain.value = depth / 100 * ffreq;
   
    //il setValueAtTime praticamente setta a 0 il valore del gain all'istante ac.current time. Cioè inizializza a 0 il gain del mio apm in output
    //appena legge l'istruzione
    amp.gain.setValueAtTime(0, ac.currentTime);
    amp.gain.linearRampToValueAtTime(1, ac.currentTime + 0.001);
    amp.gain.setValueAtTime(1, ac.currentTime + 0.3);
    //amp.gain.linearRampToValueAtTime(0, ac.currentTime + 0.5);
    osc.start(ac.currentTime);
   // osc.stop(ac.currentTime + 3);
    lfo.start(ac.currentTime);
   // lfo.stop(ac.currentTime + 3);
    returnedObject={};
    returnedObject["value1"] = osc;
    returnedObject["value2"] = lfo;
    return returnedObject;
    
    
};
var test;
notes.forEach(function(note) {
    note.addEventListener("mouseover", () => (test = play()));
});


// Ho un problema di scope, questa funzione non ha accesso agli osc e lfo dichiarati nella funzione play 
// test.value1.stop(ac.currentTime); Ora ho il return nella funzione play, inserisco questo nella funzione stop.
// NB: così funziona, tuttavia se uso multiple notes, rischio di perdere la reference sul singolo oscillatore e quindi non posso più stopparlo, in quanto sovrascrivo la reference di test.
var stop = function () {
   x =  event.target.title;
   test.value1.stop(ac.currentTime);
   test.value2.stop(ac.currentTime); 
};

notes.forEach(function(note) {
    note.addEventListener("mouseout", stop);
});



// ----------------- GESTIONE DEGLI ACCORDI



/// GENERAZIONE CHORDS

var chord_list = Tonal.chord.names(); //aggiungere a mano degli accordi mancanti, vedere la table dei valori di tension,dissonance e modality, alcuni accordi sono acessibili tramite Tonal.Chords.notes("name") ma non vengono indicizzati dalla funzione .names, devo aggiungerli a mano 
chord_list.push("aug"); chord_list.push("6"); chord_list.push("aug7"); chord_list.push("7sus4"); chord_list.push("dim7"); chord_list.push("sus4"); chord_list.push("dim"); chord_list.push("m6"); chord_list.push("7"); chord_list.push("M"); chord_list.push("m"); chord_list.push("m7"); chord_list.push("m7b5"); chord_list.push("M7"); 
var chord_list_length = chord_list.length;
function addTable() {
  var myTableDiv = document.getElementById("chord-selector");

  var table = document.createElement('TABLE');
  table.setAttribute("id","matrix-chord");

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < chord_list_length/4; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < 4; j++) {
      var td = document.createElement('TD');

      var button = document.createElement("BUTTON");
      button.setAttribute("id", "b3");
      td.appendChild(button);
      
      tr.appendChild(td);
  
    }
  }
  myTableDiv.appendChild(table);
}
addTable();

// qui metto un forEach che itera sulla lista di accordi con un counter extra che incremento, così setto per ogni pulsante il nome dell'accordo che contiene 

chords_buttons = document.querySelectorAll("#b3");
var index = 0;
chord_list.forEach(function(chord){
  chords_buttons[index].innerHTML = chord;
  index++;
  
  
  
});




// SELEZIONE E LIGHTNING DEGLI ACCORDI 

var fundamental_notes_html; // variabile in cui piazzo gli elementi dell'html
var fundamental_notes; // variabile in cui piazzo la nota scelta
var chord_type_html;
var chord_type;
var full_chord;
var parameters_table = {
	M:{D:3.944,T:1.1606,M:5.3893},
	7:{D:5.1847,T:2.059,M:2.8712},
	aug:{D:4.99,T:6.173,M:1.495},
    M7:{D:4.843,T:0.803,M:1.1932},
	6:{D:4.962,T:1.2287,M:0.94456},
	aug7:{D:6.14,T:4.16,M:0.632},
    m7b5:{D:6.12226,T:2.6665,M:0.29159},
	//objects attribute must start with a non number element. In order to start with a number i have to use "" and then access the element with []
	"7sus4":{D:4.7313,T:2.7964,M:0.2592},
	dim7:{D:6.29,T:2.234,M:0.087},
	sus4:{D:3.9909,T:3.03697,M:0.0389},
	m7:{D:4.7279,T:1.0244,M:-0.06},
	dim:{D:5.6428,T:3.7355,M:-2.12},
	m6:{D:5.494,T:1.5,M:-2.714},
	m:{D:4.06,T:1.19,M:-5.117},

     myMethod: function(params) {
      console.log(params);
      console.log(this[params]);
		  return this[params];
    }
};

fundamental_notes_html =  document.querySelectorAll("#b1");
chord_type_html = chords_buttons;


var selected_note_function = function(){
    fundamental_notes = event.target.
    innerHTML;
    console.log("Clicked note!");
    console.log(Tonal.Chord.notes(event.target.
    innerHTML));
    
};

function reset_color(){
   notes.forEach(function(note){
                 
                 note.style.background="#ccc";   
                 
                 })
        
    
    
}

fundamental_notes_html.forEach(function(note) {
    note.addEventListener("click", selected_note_function);
    note.addEventListener("click", reset_color);

    
});



function light_chord(color){
        chord_notes = Tonal.Chord.notes(full_chord);
        console.log("Printo le chords notes:"+chord_notes);
     //ADESSO DEVO INSERIRE IL CUSTOM COLOR UTILIZZANDO IL PAPER. PER FAR CIO' CONVIENE UTILIZZARE UN OGGETTO CHE RAPPRESENTA LA TABELLA CON I DATI, LE VARIABILI CHE RAPPRESENTANO IL TIPO DI ACCORDO E POI CIASCUNA VAFIABILE HA 3 ENTRIES CHE SONO I VALORI DI TENSIONE, DISSONANCE E MODALITY. DOPO DI CHE INSERISCO UN METODO CHIAMABILE NELL'OGGETTO CHE RESITUISCE I 3 VALORI ASSOCIATI ALLA SIGLA PASSATA NELLA CHIAMATA 
        
     var selected_notes = chord_notes.map(title => document.getElementsByClassName(title));
    
    //var selected_notes = chord_notes.map(title => document.querySelectorAll(`[note="${title}"]`));
        
    [].forEach.call(selected_notes, function (element) {
        [].forEach.call(element, function (note){
            //console.log(note);
             note.style.background=color;   
            });
        });
}




var selected_chord_function = function(){
    chord_type = event.target.
    innerHTML;
    console.log("Clicked chord!");
    console.log(Tonal.Chord.notes("C"+event.target.
    innerHTML));
    full_chord = fundamental_notes+chord_type;
    console.log(full_chord);
    var color;
    if(parameters_table[chord_type]!= null){
        console.log("parametro esistente");
        var D =parameters_table[chord_type].D;
        console.log(D);
        var M = parameters_table[chord_type].M;
        console.log(M);
        var T =  parameters_table[chord_type].T;
        console.log(T);
        var h =(1.632 + 0.221*M - 0.159*T - 0.423*D)*180/3.14 ;
        if(h<0){
            h=360+h;
        }
        var s = (0.885+0.015*M-0.042*D)*100;
        var l = (0.475+0.018*M-0.021*T)*100;
        console.log("hue,saturation and luminance:");
        console.log(h,s,l);

        color = 'hsl('+h+',' +s+ '%,' + l +'%)';
    } else{
        color='red';
    }
    
    
    
    //METTERE UN IF CON LA CONDIZIONE SUL TIPO DI ACCORDO (MAJ, MINOR, AUG ECC...), E CHECKARE NELLA TABELLA. SE ESISTE, CALCOLO IL COLORE TRAMITE LA FUNZIONE DEL PAPER E LO PASSO ALLA FUNZIONE light_color(color), altrimenti setto di default 'red'.
    light_chord(color);
    
};

chord_type_html.forEach(function(item) {
    item.addEventListener("click", selected_chord_function);
});
