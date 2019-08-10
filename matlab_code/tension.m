function [tension] = tension(f1,f2,f3)
%TENSION Summary of this function goes here
%   Detailed explanation goes here
%Specifically, a tension value (T) is obtained from each
%triplet combination of partials from the three fundamental
%tones, as follows: quindi devo calcolare la tension di ogni singola nota
%facendo triple sugli overtones della singola nota, e poi sommare le
%tension.



 %Fdif1 = log(f2/f1);
 %Fdif2 = log(f3/f2);
 
 %Così ho implementato la versione con i semitoni, che mi da correttamente
 %il grafico riportato sui paper (la gaussiana), ma comunque non torna con
 %i valori sperimentali dei vari grafici
 Fdif1 = round(music.freq2cent(f1,f2))/100;
 Fdif2 = round(music.freq2cent(f2,f3))/100;

 alpha = 0.60;
 tension = exp(-(((Fdif2 - Fdif1)/alpha))^2);
 
 
end

