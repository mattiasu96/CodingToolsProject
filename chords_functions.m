
%dissonance function plot. First temptative
% ho la minima dissonanza per il valore 2, che significa il doppio della
% frequenza di base, oppure 12 semitoni, dipende dalla reference. In questo
% caso i valori sull'asse x indicano il freqency ratio, cioè ad esempio
% f2=2f1 nel caso della x massima.
%Da qui ho ottenuto il plot della funzione di dissonanza d(x).
figure();
fplot(@(x) (exp(-3.51*x)-exp(-5.75*x)),[0,7],'b')

%%
%different parameters
gamma=3.53; alpha=1.20; beta=4;
figure();
fplot(@(x) (gamma*(exp(-alpha*x)-exp(-beta*x))),[0,10],'b')

%%
%Altra versione presa da cook direttamente.

B1=-0.80; B2=-1.60;B3=4;gamma1=1.25;
figure();
fplot(@(x) (B3*(exp(-B1*x^(gamma1))-exp(-B2*x^(gamma1)))),[0,10],'b')

%% Testing function 1) dissonance of two frequencies
f1 = 261.63; f2=392; xmax=0.24;
s = xmax/(0.0207*f1 + 18.96);
x=log(f2/f1);
d=exp(-3.51*s*(x))-exp(-5.75*s*(x));

%% Testing initialization
notes_frequencies = [261.63 ,329.63,392.00]; %Hint per svolgere l'eq: fai matrice quadrata:
A=repmat(261.63,1,6);
B=repmat(329.63,1,6);
C=repmat(415.30,1,6);


matrix_repeated= [A;B;C];

partial_amp = [1,0.88,0.76,0.64,0.58,0.52];
partial_amp = repmat(partial_amp,3,1);
matrix_with_partials= [1,2,3,4,5,6];
matrix_with_partials=repmat(matrix_with_partials,3,1);
matrix_multiple_freq = matrix_repeated.*matrix_with_partials;
matrix_multiple_freq= matrix_multiple_freq.*partial_amp;
matrix_multiple_freq=matrix_multiple_freq';
matrix_multiple_freq=matrix_multiple_freq(:);
%%

d=dissmeasure(matrix_multiple_freq.',[1,0.88,0.76,0.64,0.58,0.52,1,0.88,0.76,0.64,0.58,0.52,1,0.88,0.76,0.64,0.58,0.52]);
d1 = dissmeasure([261.63,415.30],[1,1]);
%% test dissonance a mano
%Probably ho trovato il modello. Si discosta dal modello del paper di
%qualche piccolo valore, ma l'andamento è coerente: Major ha dissonanza
%minore dell'accordo minore, e augmented ha dissonanza maggiore
%dell'accordo minore
freq1= 261.63*[1,2,3,4,5];
freq2= 329.63*[1,2,3,4,5];
freq3=415.30*[1,2,3,4,5];
amp=ones(size(freq1));
d1=dissmeasure([freq1 freq2],[amp,amp]);
d2=dissmeasure([freq1 freq3],[amp,amp]);
d3=dissmeasure([freq2 freq3],[amp,amp]);
dtot=d1+d2+d3;

%% la curva di dissonanza la traccio chiamando ripetutamente la funzione di dissonanza per due frequenze
freq=500*[1 2 3 4 5 6 7]; amp=ones(size(freq));
range=2.3; inc=0.01; diss=[0];
%
% call function dissmeasure for each interval
%

%qui stabilisco con alpha quali siano i multipli della fondamentale della
%quale tracciare la dissonanza. Praticamente ho una frequenza fondamentale
%con i suoi n armonici, dopo di che inizio a scandire incrementando la
%frequenza base del secondo suono e calcolo ogni volta la dissonanza. inc è
%l'incremento, range è il range massimo fin dove arrivo. Alla fine ci avevo
%azeccato con l'algoritmo.

%Praticamente per calcolar la dissonanza tra due suoni, "impilo" TUTTE le
%armoniche dei due con relative amplitude, praticamente avrò una lista di
%frequenze e ampiezze e su di esse calcolo la dissonanza come avevo già
%fatto prima.
for alpha=1+inc:inc:range,
f=[freq alpha*freq];
a=[amp, amp];
d=dissmeasure(f, a);
diss=[diss d];
end
plot(1:inc:range,diss)

%% implementing psychoacustical tension of triads. 

%Gaussian function of tension
fplot(@(x) (exp(-(((x)/0.6))^2))); %NB: IN TEORIA DEVO CONVERTIRE GLI INTERVALLI DI FREQUENZA F2-F1 E F3-F2 IN INTERVALLI DI SEMITONI
%NEI PAPER SI CAPISCE POCO, MA A INTUITO LA GAUSSIANA PRESENTATA E' UNA
%GAUSSIANA CENTRATA IN ZERO E CON RANGE +1 E -1. SOSTITUENDO IL VALORE
%DELLA X OTTENGO IL RISULTATO. COME VISTO SUL PAPER, SE LA SOTTRAZIONE TRA
%GLI INTERVALLI DELLA TRIADE E' 0, HO UNA TENSIONE, ALTRIMENTI SE E' 1 O -1
%NO (DIPENDENTEMENTE SE E' MINORE O MAGGIORE). QUINDI IN TEORIA PER
%FUNZIONARE DEVO CONVERTIRE TUTTO IN INTERVALLI DI SEMITONI, ANCHE SE MI
%PARE INCONGRUENTE CON LA DEFINIZIONE CHE USA LE FREQUENZE.


