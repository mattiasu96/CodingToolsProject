function [dissonance] = diss(f1,f2)
%D Summary of this function goes here
%   Detailed explanation goes here
xmax=0.24;
s = xmax/(0.0207*f1 + 18.96);
dissonance=exp(-3.51*s*(f2-f1))-exp(-5.75*s*(f2-f1));
end

