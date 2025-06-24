import React from 'react'
import { LucideRoute } from 'lucide-react'

function Vehicles(): React.ReactElement | null {
  return (
    <div className={'flex items-center gap-4'}>
      <LucideRoute />
      <h2>Strecke</h2>
    </div>
  )
}

export default Vehicles
