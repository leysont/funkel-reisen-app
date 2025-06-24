import React, { useEffect, useState } from 'react'
import { LucideUser } from 'lucide-react'
import { DbService } from '../DbService'
import { FunkelDriver } from '../../../types'

function Drivers(): React.ReactElement | null {
  return (
    <div className={'flex flex-col gap-4'}>
      <div className="border-r border-mocha-surface-0 flex flex-col gap-4">
        <div className={'flex items-center gap-4'}>
          <LucideUser />
          <h2>Fahrer</h2>
        </div>
        <DriversList />
      </div>
    </div>
  )
}

function DriversList({ width = '200px' }: { width?: string }): React.ReactElement | null {
  const [drivers, setDrivers] = useState<FunkelDriver[]>([])

  useEffect(() => {
    DbService.getTable('Busfahrer').then(setDrivers)
  }, [])

  return (
    <div className="flex flex-col" style={{ width }}>
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-4rem)] flex flex-col gap-2">
        {drivers.map((driver, index) => (
          <DriverListItem key={index} driver={driver} title={driver} />
        ))}
      </div>
    </div>
  )
}

function DriverListItem({ driver }: { driver: FunkelDriver }): React.ReactElement | null {
  const fullName = `${driver.Vorname} ${driver.Nachname}`
  return (
    <div
      className={
        'flex items-center gap-4 hover:bg-mocha-base px-2 py-1 rounded-md text-mocha-text/75 hover:text-mocha-text cursor-pointer'
      }
    >
      <div className="truncate flex gap-3 items-center" title={fullName}>
        {fullName}
      </div>
    </div>
  )
}

export default Drivers
