import React, { useEffect } from 'react'
import { LucideLayoutDashboard } from 'lucide-react'
import { DbService } from '../DbService'

function Home(): React.ReactElement | null {

  useEffect(() => {
    DbService.getDrivers().then((value) => {
      console.log('Busfahrer')
      console.log(value)
    })
    DbService.getVehicles().then((value) => {
      console.log('Fahrzeug')
      console.log(value)
    })
    DbService.getRoutes().then((value) => {
      console.log('Strecke')
      console.log(value)
    })
    DbService.getTickets().then((value) => {
      console.log('Ticket')
      console.log(value)
    })
    DbService.getStops().then((value) => {
      console.log('Haltestelle')
      console.log(value)
    })
  }, [])

  return (
    <div className={'flex items-center gap-4'}>
      <LucideLayoutDashboard />
      <h2>Dashboard</h2>
    </div>
  )
}

export default Home
