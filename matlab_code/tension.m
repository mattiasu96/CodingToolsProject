function [tension] = tension(f1,f2,f3)
%TENSION Summary of this function goes here
%   Detailed explanation goes here
%Specifically, a tension value (T) is obtained from each
%triplet combination of partials from the three fundamental
%tones, as follows: quindi devo calcolare la tension di ogni singola nota
%facendo triple sugli overtones della singola nota, e poi sommare le
%tension.




 freq = [f1,f2,f3];
 freq = sort(freq);
 %Così ho implementato la versione con i semitoni, che mi da correttamente
 %il grafico riportato sui paper (la gaussiana), ma comunque non torna con
 %i valori sperimentali dei vari grafici
 Fdif1 = round(music.freq2cent(freq(1),freq(2)))/100;
 Fdif2 = round(music.freq2cent(freq(2),freq(3)))/100;
 %Fdif1 = log(f2/f1);
 %Fdif2 = log(f3/f2);
 alpha = 0.60;
 tension = exp(-(((Fdif2 - Fdif1)/alpha))^2);
 
 
end

