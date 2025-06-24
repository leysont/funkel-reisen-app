export type FunkelTableName =
  | 'Busfahrer'
  | 'Fahrzeug'
  | 'fahrzeug_fährt_strecke'
  | 'Haltestelle'
  | 'haltestelle_wird_bedient_laut_strecke'
  | 'Strecke'
  | 'strecke_erfordert_ticket'
  | 'Ticket'


export type FunkelDriver = {
  Mitarbeiternummer: number,
  Vorname: string,
  Nachname: string,
  Postleitzahl: string,
  Straßenname: string,
  Ort: string,
  Telefonnummer: string,
}

export type FunkelVehicle = {
  Kennzeichen: string,
  Typ: string,
  Personenzahl: string,
}

export type FunkelStop = {
  Koordinaten: string[],
  Name: string,
  Richtung: string,
}

export type FunkelRoute = {
  Nummer: number,
  Name: string,
}

export type FunkelTicket = {
  Bezeichnung: string,
  Preis: number,
  Tarifregion: string,
}