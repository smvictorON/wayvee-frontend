export default interface Address {
  street?: string;
  number?: number
  city?: string;
  state?: string;
  zipCode?: string;
}

export const CitiesObj: any[] = [
  { city: "Arco-íris", state: "SP" },
  { city: "Bastos", state: "SP" },
  { city: "Herculândia", state: "SP" },
  { city: "Iacri", state: "SP" },
  { city: "Osvaldo Cruz", state: "SP" },
  { city: "Pompéia", state: "SP" },
  { city: "Parapuã", state: "SP" },
  { city: "Quatá", state: "SP" },
  { city: "Queiroz", state: "SP" },
  { city: "Quintana", state: "SP" },
  { city: "Rinópolis", state: "SP" },
  { city: "Tupã", state: "SP" },
  { city: "Universo", state: "SP" },
]

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

export const States: string[] = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]