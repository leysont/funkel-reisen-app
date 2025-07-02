import React, { useEffect, useState } from 'react'
import {
  LucideArmchair,
  LucideBus,
  LucidePen,
  LucideRockingChair, LucideRoute,
  LucideTag,
  LucideTrash,
  LucideUser,
} from 'lucide-react'
import { FunkelDriver, FunkelRoute, FunkelVehicle } from '../../../types'
import { DbService } from '../DbService'
import { EntityListItem } from './EntityListItem'

function VehicleDetail({ vehicle }: { vehicle: FunkelVehicle }): React.ReactElement | null {
  const [driver, setDriver] = useState<FunkelDriver | undefined>(undefined)
  const [route, setRoute] = useState<FunkelRoute | undefined>(undefined)

  useEffect(() => {
    vehicle.getDriver().then((driver) => setDriver(driver))
  }, [vehicle])
  useEffect(() => {
    vehicle.getRoute().then((route) => setRoute(route))
  }, [vehicle])

  return (
    <div className={'flex flex-col gap-5'}>
      {/* Headline */}
      <div className={'flex gap-3 items-center'}>
        <h2>{vehicle.id}</h2>

        {/* Toolbar */}
        <div className={'flex gap-1'}>
          <button className={'btn-toolbar'}>
            <LucidePen size={20} />
            {/*Bearbeiten*/}
          </button>
          <button className={'btn-toolbar text-mocha-red'}>
            <LucideTrash size={20} />
            {/*Löschen*/}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={'flex gap-10'}>
        <div className={'flex flex-col gap-1'}>
          <h4 className={'flex gap-3 items-center'}>
            <LucideArmchair size={16} />
            Sitzplätze: {vehicle.capacity}
          </h4>
          <h4 className={'flex gap-3 items-center'}>
            <LucideTag size={16} />
            Typ: {vehicle.type}
          </h4>
        </div>
      </div>

      <div className={'flex gap-3 items-center'}>
        <LucideUser size={20} />
        <span>Geführt von:</span>
        <span>
          {driver?.nameFirst} {driver?.nameLast}
        </span>
      </div>

      <div className={'flex gap-3 items-center'}>
        <LucideRoute size={20} />
        <span>Fährt Route:</span>
        <span>
          {route?.name}
        </span>
      </div>
    </div>
  )
}

function Vehicles(): React.ReactElement | null {
  const [vehicles, setVehicles] = useState<FunkelVehicle[]>([])

  useEffect(() => {
    DbService.getVehicles().then((value) => {
      if (value) setVehicles(value)
    })
  }, [])

  const [vehicle, setVehicle] = useState<FunkelVehicle | undefined>(undefined)
  return (
    <div className={'flex gap-4'}>
      <div className="flex flex-col gap-4">
        <div className={'flex items-center gap-4'}>
          <LucideBus />
          <h2>Fahrzeuge</h2>
        </div>
        <VehiclesList
          vehicles={vehicles}
          currentVehicle={vehicle}
          onItemSelect={(vehicle) => {
            setVehicle(vehicle)
          }}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        {vehicle ? <VehicleDetail vehicle={vehicle} /> : <div> Kein Fahrzeug ausgewählt </div>}
      </div>
    </div>
  )
}

function VehiclesList({
  vehicles,
  width = '200px',
  currentVehicle,
  onItemSelect,
}: {
  vehicles: FunkelVehicle[]
  width?: string
  currentVehicle?: FunkelVehicle
  onItemSelect: (vehicle: FunkelVehicle) => void
}): React.ReactElement | null {
  return (
    <div className="flex flex-col" style={{ width }}>
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-119px)] flex flex-col gap-0.5">
        {vehicles.map((vehicle, index) => (
          <EntityListItem
            key={index}
            id={String(vehicle.id)}
            title={`${vehicle.type}`}
            active={currentVehicle?.id === vehicle.id}
            onClick={() => {
              onItemSelect(vehicle)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Vehicles
