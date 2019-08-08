
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
f1 = 500; f2=700; xmax=0.24;
s = xmax/(0.0207*f1 + 18.96);

d=exp(-3.51*s*(f2-f1))-exp(-5.75*s*(f2-f1));

%% Testing C chord.
notes_frequencies = [261.63,329.63,392.00]; %Hint per svolgere l'eq: fai due matrici quadrate e poi prodotto righe per colonne


