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

lcdRGB.writeRow("lcd1","Kaoss Pad", 0);
//LCD display  --------------------------------------




// Generazione synth ------------------------------
//var synth = new Tone.Synth().toMaster();



var mode = 0; // 0 = modalità single note, 1 = modalità multiple notes


notes = document.querySelectorAll(".hex");
    Tone.context.resume();
var ac =  new AudioContext();

//NB questa soluzione in teoria funziona, in pratica mi da errore perchè non posso richiamare start 2 volte sullo stesso elemento (nodo). Una volta che lo stoppo non posso più ristartarlo. Quello che dovrei fare è o re-inserirlo nella funzione play, così ogni volta che è chiamata crea delle variabili locali che poi vengono distrutte, quindi la funzione start e stop lavora su variabili create nuove. Altrimenti invece di stop (se inserisco la definizione di osc e lfo all'esterno della funzione play) uso connect e disconnect.
var osc = ac.createOscillator();
var lfo = ac.createOscillator();
var play = function () {
    x =  event.target.title;
    var mynote;
    mynote = Tonal.freq(x);
    console.log(mynote);
  //prima prende il valore dall'html (ho il value inserito)
   // var freq = $('#freq').val();
    var freq = 17;
 
    //var ffreq = $('#ffreq').val();
    var ffreq = 1000;
    
    //var depth = $('#depth').val();
    var depth = 50;

    
    //var Q = $('#Q').val();
    var Q = 0;

    //var osc = ac.createOscillator();
    //var lfo = ac.createOscillator();
    var filter = ac.createBiquadFilter();
    osc.type = 'square';
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
};

notes.forEach(function(note) {
    note.addEventListener("mouseover", play);
});


// Ho un problema di scope, questa funzione non ha accesso agli osc e lfo dichiarati nella funzione play 

var stop = function () {
   x =  event.target.title;
   osc.stop(ac.currentTime);
   lfo.stop(ac.currentTime); 
};

notes.forEach(function(note) {
    note.addEventListener("mouseout", stop);
});