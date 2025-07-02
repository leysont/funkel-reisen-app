import { FunkelDriver, FunkelRoute, FunkelStop, FunkelTicket, FunkelVehicle } from '../../types'

type SqlDriver = {
  Mitarbeiternummer: number
  Vorname: string
  Nachname: string
  Postleitzahl: string
  // noinspection JSNonASCIINames, NonAsciiCharacters
  Straße: string
  Ort: string
  Telefonnummer: string
}

type SqlVehicle = {
  Kennzeichen: string
  Typ: string
  Personenzahl: string
}

type SqlStop = {
  Koordinaten: string[]
  Name: string
  Richtung: string
}

type SqlRoute = {
  Nummer: number
  Name: string
}

type SqlTicket = {
  Bezeichnung: string
  Preis: number
  Tarifregion: string
}

type SqlDriverVehicle = {
  Mitarbeiternummer: number
  Kennzeichen: string
}

type FunkelDriverVehicle = {
  driverId: number
  vehicleId: string
}

type SqlVehicleRoute = {
  Kennzeichen: string
  Nummer: number
}

type FunkelVehicleRoutes = {
  vehicleId: string
  routeId: number
}

type SqlRouteStops = {
  Nummer: number
  Koordinaten: number
}

type FunkelRouteStops = {
  routeId: number
  stopCoords: string
}

export const DbService = {
  async getDriverVehicles(): Promise<FunkelDriverVehicle[]> {
    try {
      const rels: SqlDriverVehicle[] = await getTable('busfahrer_führt_fahrzeug')
      return rels.map((rel) => ({
        driverId: rel.Mitarbeiternummer,
        vehicleId: rel.Kennzeichen,
      }))
    } catch (error) {
      console.error('Failed to fetch driver vehicle:', error)
      throw error
    }
  },

  async getVehicleRoutes(): Promise<FunkelVehicleRoutes[]> {
    try {
      const rels: SqlVehicleRoute[] = await getTable('fahrzeug_fährt_strecke')
      return rels.map((rel) => ({
        vehicleId: rel.Kennzeichen,
        routeId: rel.Nummer,
      }))
    } catch (error) {
      console.error('Failed to fetch vehicle routes:', error)
      throw error
    }
  },

  async getDrivers(): Promise<FunkelDriver[]> {
    try {
      const drivers: SqlDriver[] = await getTable('Busfahrer')
      // noinspection JSNonASCIINames, NonAsciiCharacters
      return drivers.map((driver) => ({
        id: driver.Mitarbeiternummer,
        nameFirst: driver.Vorname,
        nameLast: driver.Nachname,
        street: driver.Straße,
        postalCode: driver.Postleitzahl,
        locality: driver.Ort,
        phone: driver.Telefonnummer,
        getVehicle: async () => {
          const driverVehicles: FunkelDriverVehicle[] = await this.getDriverVehicles()
          const vehicleId = driverVehicles.find(
            (value) => value.driverId === driver.Mitarbeiternummer
          )?.vehicleId
          const vehicles = await this.getVehicles()
          return vehicles.find((value) => value.id === vehicleId)
        },
      }))
    } catch (error) {
      console.error('Failed to fetch drivers:', error)
      throw error
    }
  },
  async getVehicles(): Promise<FunkelVehicle[]> {
    try {
      const vehicles: SqlVehicle[] = await getTable('Fahrzeug')
      return vehicles.map((vehicle) => ({
        id: vehicle.Kennzeichen,
        type: vehicle.Typ,
        capacity: vehicle.Personenzahl,
        getDriver: async () => {
          const driverVehicles: FunkelDriverVehicle[] = await this.getDriverVehicles()
          const driverId = driverVehicles.find(
            (value) => value.vehicleId === vehicle.Kennzeichen
          )?.driverId
          const drivers = await this.getDrivers()
          return drivers.find((value) => value.id === driverId)
        },
        getRoute: async () => {
          const vehicleRoutes: FunkelVehicleRoutes[] = await this.getVehicleRoutes()
          const routeId = vehicleRoutes.find(
            (value) => value.vehicleId === vehicle.Kennzeichen
          )?.routeId
          const routes = await this.getRoutes()
          return routes.find((value) => value.id === routeId)
        },
      }))
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      throw error
    }
  },
  async getRoutes(): Promise<FunkelRoute[]> {
    try {
      const routes: SqlRoute[] = await getTable('Strecke')
      return routes.map((route) => ({
        id: route.Nummer,
        name: route.Name,
        getStops: async () => {
          const routeStops: FunkelRouteStops[] = await this.getRouteStops()
          const stopCoords = routeStops.find(
            (value) => value.routeId === route.Nummer
          )?.stopCoords
          const stops = await this.getStops()
            return stops.find((value) => value.coords === stopCoords)
        }
      }))
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      throw error
    }
  },
  async getStops(): Promise<FunkelStop[]> {
    try {
      const stops: SqlStop[] = await getTable('Haltestelle')
      return stops.map((stop) => ({
        coords: stop.Koordinaten,
        name: stop.Name,
        direction: stop.Richtung,
      }))
    } catch (error) {
      console.error('Failed to fetch stops:', error)
      throw error
    }
  },
  async getTickets(): Promise<FunkelTicket[]> {
    try {
      const tickets: SqlTicket[] = await getTable('Ticket')
      return tickets.map((ticket) => ({
        name: ticket.Bezeichnung,
        price: ticket.Preis,
        region: ticket.Tarifregion,
      }))
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
      throw error
    }
  },
}

const getTable = async (table: string): Promise<any> => {
  return window.api.getTable(table)
}
