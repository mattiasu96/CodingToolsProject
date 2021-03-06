
%dissonance function plot. First temptative
% ho la minima dissonanza per il valore 2, che significa il doppio della
% frequenza di base, oppure 12 semitoni, dipende dalla reference. In questo
% caso i valori sull'asse x indicano il freqency ratio, cio� ad esempio
% f2=2f1 nel caso della x massima.
%Da qui ho ottenuto il plot della funzione di dissonanza d(x).
figure();
fplot(@(x) (exp(-3.51*x)-exp(-5.75*x)),[0,7],'b')

%%
%different parameters 
% this is done to show of we can shape the function to map over the ear
% behavior
gamma=3.53; alpha=1.20; beta=4;
figure();
fplot(@(x) (gamma*(exp(-alpha*x)-exp(-beta*x))),[0,10],'b')

%% Testing function 1) dissonance of two frequencies
f1 = 261.63; f2=392; xmax=0.24;
s = xmax/(0.0207*f1 + 18.96);
x=log(f2/f1);
d=exp(-3.51*s*(x))-exp(-5.75*s*(x));

%% test dissonance a mano
%Calculus of dissonance by hand. Si discosta dal modello del paper di
%qualche piccolo valore (dato dai valori di amplitude delle armoniche + valori della funzione), ma l'andamento � coerente: Major ha dissonanza
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
%freq=500*[1 2 3 4 5 6 7]; amp=ones(size(freq));
range=2.3; inc=0.01; diss=[0];
%
% call function dissmeasure for each interval
%NB: NOTA COME SE GLI ARMONICI SONO PRECISI (OSSIA F=f0*N con N intero), IL
%GRAFICO DELLA DISSONANZA E' PRECISO SULL'OTTAVA, ALTRIMENTI E'
%STRETCHATO/COMPRESSO. VEDERE IL SITO DI SETHARES PER MAGGIORI INFO.
freq = [500 2*500]; amp = [10 10];
%qui stabilisco con alpha quali siano i multipli della fondamentale della
%quale tracciare la dissonanza. Praticamente ho una frequenza fondamentale
%con i suoi n armonici, dopo di che inizio a scandire incrementando la
%frequenza base del secondo suono e calcolo ogni volta la dissonanza. inc �
%l'incremento, range � il range massimo fin dove arrivo. Alla fine ci avevo
%azeccato con l'algoritmo.

%Praticamente per calcolar la dissonanza tra due suoni, "impilo" TUTTE le
%armoniche dei due con relative amplitude, praticamente avr� una lista di
%frequenze e ampiezze e su di esse calcolo la dissonanza come avevo gi�
%fatto prima.
%La scala di base sotto in questo caso � il frequency ratio
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

%% Complete function of tension, considering all possible increasing triplets 
%Con il C major e un overtone (quindi 1 e 2 come moltiplicatori nelle parentesi)
%il valore della tensione � coerente con i paper "The Psychophysics of Harmony Perception:
%Harmony is a Three-Tone Phenomenon" e "Calculation of the acoustical
%properties of triadic harmonies"
 
%Per� ad esempio con il diminuito non � pi� coerente, ottengo 4 di tensione
%invece di 1.68.
%Tuttavia i due paper sono coerenti tra loro. Provare a implementare
%un'altra versione con TUTTE LE TRIPLETS (cio� iterando completamente sulle
%3 sommatorie come riportato nel paper) e n in teoria � il numero totale
%delle componenti armoniche (quindi seguendo quella formula, in teoria avr�
%anche triplets costituite dall'unisono di 3 note uguali, provare per
%vedere se � coerente)

%L'andamento dei valori � coerente con i risultati dei paper (accordi
%maggiori e minori hanno tensione simile, l'aumentato ha il valore maggiore
%e il diminuito e di 2 punti minore dell'aumentato), tuttavia i valori
%assoluti son diversi 
freq1= 261.63*[1,2];
freq2=311.13*[1,2];
freq3=369.99*[1,2];
frequencies = [freq1, freq2, freq3];
frequencies = sort(frequencies);
total_tension = 0;
for i=1:length(frequencies)-2
   for j=(i+1):length(frequencies)-1
      for k=(j+1):length(frequencies)
          total_tension = total_tension + tension(frequencies(i),frequencies(j),frequencies(k));
      end
   end
end
%% Tension counting only adjacent triplets

freq1= 261.63*[1,2];
freq2= 311.13*[1,2];
freq3=369.99*[1,2];
frequencies = [freq1, freq2, freq3];
frequencies = sort(frequencies);
total_tension = 0;
for i=1:length(frequencies)-2
   for j=(2):length(frequencies)-1
      for k=(3):length(frequencies)
          total_tension = total_tension + tension(frequencies(i),frequencies(j),frequencies(k));
      end
   end
end
%% tension counting ALL POSSIBLE triplets (even duplicates)

freq1= 261.63*[1,2];
freq2= 311.13*[1,2];
freq3=369.99*[1,2];
frequencies = [freq1, freq2, freq3];
frequencies = sort(frequencies);
total_tension = 0;
for i=1:length(frequencies)
   for j=(1):length(frequencies)
      for k=(1):length(frequencies)
          total_tension = total_tension + tension(frequencies(i),frequencies(j),frequencies(k));
      end
   end
end

%% Tension by japanese 

%curve tension. Per come � implementato in origine il codice, ho il primo
%intervallo (tra tonica e seconda nota) che � una terza minore. Il secondo
%intervallo (tra la seconda e terza nota) e uno sliding interval che parte
%dall'unisono e aumenta ogni volta. Dal grafico si vede come (nel caso
%senza upper harmonics, quindi solo la fondamentale) la tensione assume
%valore 1 quando l'accordo complessivo � un diminuito, cio� il secondo
%intervallo � di 3 semitoni. 
figure();
for n=2:2
    m =3.0; 
    for l=0:0.01:12.0-m
        LF0=261.63;
        MF0=2^(m/12)*LF0;
        HF0=2^(l/12)*MF0;
        for s=1:n^3
            i=round(mod(s-1,n)+1);  %%queste i,j,k sono gli indici moltiplicativi per ottenere per ciascuna fondamentale 
            %(LF0,MF0 e HF0) le relative armoniche. Il ciclo for con s mi
            %restituisce tutte le possibili combinazioni di triadi senza
            %ripetizioni, quindi le triadi uniche. Tali triadi inoltre non
            %hanno duplicati di armonici (non prendo in considerazione in
            %una triade pi� volte la medesima nota/elemento). Per sapere il
            %numero di combinazioni uniche di x elementi dato un insieme di
            %n elementi, vedere calcolo combinatorio
            j=round(mod((s-i)/n,n)+1);
            k=round((s-n*(j-1)-i)/(n^2)+1);
            
            freq(s,1) = LF0.*i;
            freq(s,2)=MF0.*j;
            freq(s,3)=HF0.*k;
            
            freq(s,:)=sort(freq(s,:));
            
            amp(s,1)=1.^(i-1);
            amp(s,2)=1.^(j-1);
            amp(s,3) = 1.^(k-1);
        end
        DI=12*log2((freq(:,2).^2).*(1./(freq(:,1).*freq(:,3)))); %%il 12log2 converte una differenza in hertz in semitoni.
        %l'equazione successiva � lo sviluppo di quella data all'inizio di
        %log(f3/f2)-log(f2/f1)
        V=amp(:,1).*amp(:,2).*amp(:,3);
        T=V.*exp(-((DI./0.6).^2));
        hold on; plot(l,sum(T), 'o');
       
    end
end

xlabel('2nd interval (semitones)'); ylabel('Tension(T)'); grid on;
%% Modality curves


figure();
for n=2:2
    m =3.0; 
    for l=0:0.01:12.0-m
        LF0=261.63;
        MF0=2^(m/12)*LF0;
        HF0=2^(l/12)*MF0;
        for s=1:n^3
            i=round(mod(s-1,n)+1);  %%queste i,j,k sono gli indici moltiplicativi per ottenere per ciascuna fondamentale 
            %(LF0,MF0 e HF0) le relative armoniche. Il ciclo for con s mi
            %restituisce tutte le possibili combinazioni di triadi senza
            %ripetizioni, quindi le triadi uniche. Tali triadi inoltre non
            %hanno duplicati di armonici (non prendo in considerazione in
            %una triade pi� volte la medesima nota/elemento). Per sapere il
            %numero di combinazioni uniche di x elementi dato un insieme di
            %n elementi, vedere calcolo combinatorio
            j=round(mod((s-i)/n,n)+1);
            k=round((s-n*(j-1)-i)/(n^2)+1);
            
            freq(s,1) = LF0.*i;
            freq(s,2)=MF0.*j;
            freq(s,3)=HF0.*k;
            
            freq(s,:)=sort(freq(s,:));
            
            amp(s,1)=1.^(i-1);
            amp(s,2)=1.^(j-1);
            amp(s,3) = 1.^(k-1);
        end
        DI=12*log2((freq(:,2).^2).*(1./(freq(:,1).*freq(:,3)))); %%il 12log2 converte una differenza in hertz in semitoni.
        %l'equazione successiva � lo sviluppo di quella data all'inizio di
        %log(f3/f2)-log(f2/f1)
        V=amp(:,1).*amp(:,2).*amp(:,3);
        M=V.*((2.*DI./1.56).*exp((-(DI.^4)./4)));
        hold on; plot(l,1/6*sum(M), 'o');
        
        
       
    end
end

