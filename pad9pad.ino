#include<CapacitiveSensor.h>
#include "filter.h"

CapacitiveSensor sensUL = CapacitiveSensor(10,12);
CapacitiveSensor sensUC = CapacitiveSensor(10,11);
CapacitiveSensor sensUR = CapacitiveSensor(10,9);

CapacitiveSensor sensCL = CapacitiveSensor(10,8);
CapacitiveSensor sensCC = CapacitiveSensor(10,7);
CapacitiveSensor sensCR = CapacitiveSensor(10,6);

CapacitiveSensor sensDL = CapacitiveSensor(10,5);
CapacitiveSensor sensDC = CapacitiveSensor(10,4);
CapacitiveSensor sensDR = CapacitiveSensor(10,3);

Filter filtro1;
Filter filtro2;
Filter filtro3;
Filter filtro4;
Filter filtro5;
Filter filtro6;
Filter filtro7;
Filter filtro8;
Filter filtro9;

void setup() {
  
  Serial.begin(115200);
  
  filtro1.setDepthFilter(5);
  filtro2.setDepthFilter(5);
  filtro3.setDepthFilter(5);
  filtro4.setDepthFilter(5);
  filtro5.setDepthFilter(5);
  filtro6.setDepthFilter(5);
  filtro7.setDepthFilter(5);
  filtro8.setDepthFilter(5);
  filtro9.setDepthFilter(5);
  
}

void loop() {
  
  unsigned int sxdx;
  unsigned int updo;
  
  unsigned int valULF = filtro1.filterSamples(sensUL.capacitiveSensor(20));
  unsigned int valUCF = filtro2.filterSamples(sensUC.capacitiveSensor(20));
  unsigned int valURF = filtro3.filterSamples(sensUR.capacitiveSensor(20));

  unsigned int valCLF = filtro1.filterSamples(sensCL.capacitiveSensor(20));
//  unsigned int valCCF = filtro2.filterSamples(sensCC.capacitiveSensor(20));
  unsigned int valCRF = filtro3.filterSamples(sensCR.capacitiveSensor(20));
  
  unsigned int valDLF = filtro1.filterSamples(sensDL.capacitiveSensor(20));
  unsigned int valDCF = filtro2.filterSamples(sensDC.capacitiveSensor(20));
  unsigned int valDRF = filtro3.filterSamples(sensDR.capacitiveSensor(20));
  
//  if ((valURF+valCRF+valDRF+valULF+valCLF+valDLF)>900){
    sxdx=50*(valURF+valCRF+valDRF-valULF-valCLF-valDLF)/(valURF+valCRF+valDRF+valULF+valCLF+valDLF);
    updo=50*(valULF+valURF+valUCF-valDLF-valDRF-valDCF)/(valURF+valUCF+valDRF+valULF+valDCF+valDLF);
//  }
//  else {
//    sxdx=0;
//    updo=0;
//  }


//  for (uint8_t i = 0; i<7; i++) {
//    switch (i) {
//      case 0:
      Serial.print(sxdx);
//      break;
//      case 1:
//      Serial.print(sxdx);
//      break;
//      case 2:
//      Serial.print(valCLF);
//      break;
//      case 3:
//      Serial.print(valULF);
//      break;
//      case 4:
//      Serial.print(updo);
//      break;
//      case 5:
//      Serial.print(valURF);
//      break;
//    }
//    if (i < 7)
//      Serial.print(" ");
//      Serial.print(updo);
//      Serial.println();
//  }
//  
  Serial.print('\n');
}
