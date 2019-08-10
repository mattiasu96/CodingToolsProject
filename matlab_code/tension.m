function [tension] = tension(f1,f2,f3)
%TENSION Summary of this function goes here
%   Detailed explanation goes here
%Specifically, a tension value (T) is obtained from each
%triplet combination of partials from the three fundamental
%tones, as follows: quindi devo calcolare la tension di ogni singola nota
%facendo triple sugli overtones della singola nota, e poi sommare le
%tension.
frequencies = [f1,f2,f3];
notes = zeros(1,3);
for i=1:3
    note =  music.freq2note(frequencies(i));
    %mi da errore di dimensioni perchè mi returna una sigla con la nota, ad
    %esempio C4 che occupa due caselle ovviamente.
    notes(i) = note;
end
 Fdif1 = log(f2/f1);
 Fdif2 = log(f3/f2);
 alpha = 0.60;
 tension = exp(-(((Fdif2 - Fdif1)/alpha))^2);
 
 
end

