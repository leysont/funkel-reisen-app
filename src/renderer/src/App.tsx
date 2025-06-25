import React from 'react'
import { HashRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import {
  LucideBus,
  LucideLayoutDashboard,
  LucideMapPin,
  LucideRoute,
  LucideSettings,
  LucideTicket,
  LucideUser
} from 'lucide-react'
import Settings from '@renderer/pages/Settings'
import Home from '@renderer/pages/Home'
import Drivers from './pages/Drivers'
import Vehicles from './pages/Vehicles'
import Stops from './pages/Stops'
import Tickets from './pages/Tickets'
import Lines from './pages/Lines'

function App(): React.ReactElement | null {
  return (
    <div className={'h-screen w-screen flex flex-col'}>
      <Titlebar name={'Funkel Reisen'} />
      <div className="flex flex-1 overflow-hidden p-2 pl-0">
        <Router>
          {/* Sidebar */}
          <div className="flex flex-col justify-between p-2">
            <div className="flex flex-col gap-2">
              <NavButton to="/" Icon={LucideLayoutDashboard} />
              <NavButton to="/drivers" Icon={LucideUser} />
              <NavButton to="/vehicles" Icon={LucideBus} />
              <NavButton to="/stops" Icon={LucideMapPin} />
              <NavButton to="/routes" Icon={LucideRoute} />
              <NavButton to="/tickets" Icon={LucideTicket} />
            </div>

            <div className="flex flex-col gap-3">
              <NavButton to="/settings" Icon={LucideSettings} />
            </div>
          </div>

          {/* Main */}
          <div className="w-full p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/stops" element={<Stops />} />
              <Route path="/routes" element={<Lines />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

function Titlebar({ name }: { name: string }): React.ReactElement | null {
  return (
    <div className="titlebar flex gap-3 w-full h-[31px]">
      <div className="flex items-center justify-center text-sm w-full">{name}</div>
      <div className=""></div>
    </div>
  )
}

interface NavButtonProps {
  to: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> // Specify the correct type for LucideReact icons
}

function NavButton({ to, Icon }: NavButtonProps): React.ReactElement | null {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex p-2 items-center gap-5 justify-center
         text-mocha-text/75 rounded-xl border-1 transition-colors
         ${
           isActive
             ? 'bg-accent/10 border-accent/40 text-accent'
             : 'border-transparent hover:bg-accent/20 hover:text-accent active:bg-accent/15 active:border-accent/20'
         }`
      }
    >
      {Icon && <Icon />}
      <div className="hidden">{to}</div>
    </NavLink>
  )
}

export default App
