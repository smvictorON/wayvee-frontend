export default interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export const Cities: string[] = [
  "Arco-íris",
  "Bastos",
  "Herculândia",
  "Iacri",
  "Osvaldo Cruz",
  "Pompéia",
  "Parapuã",
  "Quatá",
  "Queiroz",
  "Quintana",
  "Rinópolis",
  "Tupã",
  "Universo",
]

export enum States {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}