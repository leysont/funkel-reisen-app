import React, { useEffect } from 'react'
import { LucideLayoutDashboard } from 'lucide-react'
import { DbService } from '../DbService'

function Home(): React.ReactElement | null {

  useEffect(() => {
    DbService.getTable('Busfahrer').then((value) => {
      console.log('Busfahrer')
      console.log(value)
    })
    DbService.getTable('Fahrzeug').then((value) => {
      console.log('Fahrzeug')
      console.log(value)
    })
    DbService.getTable('Ticket').then((value) => {
      console.log('Ticket')
      console.log(value)
    })
    DbService.getTable('Haltestelle').then((value) => {
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
