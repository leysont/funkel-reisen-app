export type FunkelTableName =
  | 'Busfahrer'
  | 'Fahrzeug'
  | 'Haltestelle'
  | 'Strecke'
  | 'Ticket'
  | 'fahrzeug_fährt_strecke'
  | 'haltestelle_wird_bedient_laut_strecke'
  | 'strecke_erfordert_ticket'

export type FunkelEntity = FunkelDriver | FunkelVehicle | FunkelStop | FunkelRoute | FunkelTicket


export type FunkelDriver = {
  id: number,
  nameFirst: string,
  nameLast: string,
  street: string,
  postalCode: string,
  locality: string,
  phone: string,
  getVehicle: () => Promise<FunkelVehicle | undefined>,
}

export type FunkelVehicle = {
  id: string,
  type: string,
  capacity: string,
  getDriver: () => Promise<FunkelDriver | undefined>,
  getRoute: () => Promise<FunkelRoute | undefined>,
}

export type FunkelStop = {
  coords: string,
  name: string,
  direction: string,
  getRoute: () => Promise<FunkelRoute | undefined>,
}

export type FunkelRoute = {
  id: number,
  name: string,
  getVehicle: () => Promise<FunkelVehicle | undefined>,
  getStops: () => Promise<FunkelStop[] | undefined>,
  getTickets: () => Promise<FunkelTicket[] | undefined>,
}

export type FunkelTicket = {
  name: string,
  price: number,
  region: string,
  getRoute: () => Promise<FunkelRoute | undefined>,
}