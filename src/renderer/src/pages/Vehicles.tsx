import React from 'react'
import { LucideBus } from 'lucide-react'

function Vehicles(): React.ReactElement | null {
  return (
    <div className={'flex items-center gap-4'}>
      <LucideBus />
      <h2>Fahrzeuge</h2>
    </div>
  )
}

export default Vehicles
