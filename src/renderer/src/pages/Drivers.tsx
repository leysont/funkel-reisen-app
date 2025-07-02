import React, { useEffect, useState } from 'react'
import {
  LucideBus,
  LucideHash,
  LucideHouse,
  LucidePen,
  LucidePhone,
  LucideTrash,
  LucideUser,
} from 'lucide-react'
import { DbService } from '../DbService'
import { FunkelDriver, FunkelVehicle } from '../../../types'
import { EntityListItem } from './EntityListItem'

function DriverDetail({ driver }: { driver: FunkelDriver }): React.ReactElement | null {
  const [vehicle, setVehicle] = useState<FunkelVehicle | undefined>(undefined)
  useEffect(() => {
    driver.getVehicle().then((vehicle) => setVehicle(vehicle))
  }, [driver])

  return (
    <div className={'flex flex-col gap-5'}>
      {/* Headline */}
      <div className={'flex gap-3 items-center'}>
        <h2>
          {driver.nameFirst} {driver.nameLast}
        </h2>

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
            <LucideHash size={16} />
            {driver.id}
          </h4>
          <h4 className={'flex gap-3 items-center'}>
            <LucidePhone size={16} />
            {driver.phone}
          </h4>
        </div>
        <div className={'flex flex-col gap-1'}>
          <h4 className={'flex gap-3 items-center'}>
            <LucideHouse size={16} />
            <span>{driver.street}</span>
          </h4>
          <h4 className={'pl-7'}>
            <span>
              {driver.postalCode}, {driver.locality}
            </span>
          </h4>
        </div>
      </div>

      <div className={'flex gap-3 items-center'}>
        <LucideBus size={20} />
        <span>Geführtes Fahrzeug:</span>
        <span>{vehicle?.id}</span>
      </div>
    </div>
  )
}

function Drivers(): React.ReactElement | null {
  const [drivers, setDrivers] = useState<FunkelDriver[]>([])

  useEffect(() => {
    DbService.getDrivers().then((value) => {
      if (value) setDrivers(value)
    })
  }, [])

  const [driver, setDriver] = useState<FunkelDriver | undefined>(undefined)
  return (
    <div className={'flex gap-4'}>
      <div className="flex flex-col gap-4">
        <div className={'flex items-center gap-4'}>
          <LucideUser />
          <h2>Fahrer</h2>
        </div>
        <DriversList
          drivers={drivers}
          currentDriver={driver}
          onItemSelect={(driver) => {
            setDriver(driver)
          }}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        {driver ? <DriverDetail driver={driver} /> : <div> Kein Fahrer ausgewählt </div>}
      </div>
    </div>
  )
}

function DriversList({
  drivers,
  width = '200px',
  currentDriver,
  onItemSelect,
}: {
  drivers: FunkelDriver[]
  width?: string
  currentDriver?: FunkelDriver
  onItemSelect: (driver: FunkelDriver) => void
}): React.ReactElement | null {
  return (
    <div className="flex flex-col" style={{ width }}>
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-119px)] flex flex-col gap-0.5">
        {drivers.map((driver, index) => (
          <EntityListItem
            key={index}
            id={String(driver.id)}
            title={`${driver.nameFirst} ${driver.nameLast}`}
            active={currentDriver?.id === driver.id}
            onClick={() => {
              onItemSelect(driver)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Drivers
