import React from 'react'
import { LucideMapPin } from 'lucide-react'

function Vehicles(): React.ReactElement | null {
  return (
    <div className={'flex items-center gap-4'}>
      <LucideMapPin />
      <h2>Haltestellen</h2>
    </div>
  )
}

export default Vehicles
