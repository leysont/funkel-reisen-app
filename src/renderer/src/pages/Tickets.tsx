import React from 'react'
import { LucideTicket } from 'lucide-react'

function Vehicles(): React.ReactElement | null {
  return (
    <div className={'flex items-center gap-4'}>
      <LucideTicket />
      <h2>Tickets</h2>
    </div>
  )
}

export default Vehicles
