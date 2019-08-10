function [tension] = tension(f1,f2,f3)
%TENSION Summary of this function goes here
%   Detailed explanation goes here
%Specifically, a tension value (T) is obtained from each
%triplet combination of partials from the three fundamental
%tones, as follows: quindi devo calcolare la tension di ogni singola nota
%facendo triple sugli overtones della singola nota, e poi sommare le
%tension.
 Fdif1 = log(f2/f1);
 Fdif2 = log(f3/f2);
 alpha = 0.60;
 tension = exp(-(((Fdif2 - Fdif1)/alpha))^2);
end

