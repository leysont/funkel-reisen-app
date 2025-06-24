import { ReactElement } from 'react'
import { LucideSettings } from 'lucide-react'

function Settings(): ReactElement | null {
  return (
    <div className={'flex items-center gap-4'}>
      <LucideSettings />
      <h2>Settings</h2>
    </div>
  )
}

export default Settings
