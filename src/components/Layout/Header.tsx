'use client'

import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Menu, X, Bell, Settings, User } from 'lucide-react'
import { ScreenSettings } from '../../types'

interface HeaderProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-flydubai-navy text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden hover:bg-blue-800 p-2"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-flydubai-orange rounded-lg flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">AERON</h1>
              <p className="text-xs text-blue-200 hidden lg:block">Aircraft Emergency Recovery Operations Network</p>
            </div>
          </div>
        </div>

        {/* Center section - Status indicator */}
        <div className="hidden md:flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">System Active</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hover:bg-blue-800 p-2">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-blue-800 p-2 hidden sm:flex">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>

          <Button variant="ghost" size="sm" className="hover:bg-blue-800 p-2">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

interface HeaderProps {
  screenSettings: ScreenSettings[]
  quickStats: any
}

export default function Header({ screenSettings, quickStats }: HeaderProps) {
  const location = useLocation()

  const getScreenIdFromRoute = (pathname: string) => {
    const routeMap: { [key: string]: string } = {
      '/': 'dashboard',
      '/flight-tracking': 'flight-tracking',
      '/disruption': 'disruption',
      '/recovery': 'recovery',
      '/comparison': 'comparison',
      '/detailed': 'detailed',
      '/prediction-dashboard': 'prediction-dashboard',
      '/flight-disruption-list': 'flight-disruption-list',
      '/prediction-analytics': 'prediction-analytics',
      '/risk-assessment': 'risk-assessment',
      '/pending': 'pending',
      '/past-logs': 'past-logs',
      '/maintenance': 'maintenance',
      '/passengers': 'passengers',
      '/fuel-optimization': 'fuel-optimization',
      '/reports': 'reports',
      '/audit': 'audit',
      '/settings': 'settings'
    }
    return routeMap[pathname] || 'dashboard'
  }

  const activeScreen = getScreenIdFromRoute(location.pathname)
  const enabledScreens = screenSettings.filter(screen => screen.enabled)

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {enabledScreens.find(s => s.id === activeScreen)?.name || 'Dashboard'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Flydubai AERON - AI-powered recovery and operational excellence
          </p>
        </div>

        {quickStats && (
          <div className={`flex items-center gap-3 px-4 py-2 bg-${quickStats.color === 'flydubai-blue' ? 'blue' : quickStats.color === 'flydubai-orange' ? 'orange' : 'blue'}-50 rounded-lg border border-${quickStats.color === 'flydubai-blue' ? 'blue' : quickStats.color === 'flydubai-orange' ? 'orange' : 'blue'}-200`}>
            {React.createElement(quickStats.icon, { className: `h-4 w-4 text-${quickStats.color === 'flydubai-blue' ? 'blue' : quickStats.color === 'flydubai-orange' ? 'orange' : 'blue'}-600` })}
            <div className="text-xs">
              <p className={`font-medium text-${quickStats.color === 'flydubai-blue' ? 'blue' : quickStats.color === 'flydubai-orange' ? 'orange' : 'blue'}-700`}>{quickStats.title}</p>
              <p className={`text-${quickStats.color === 'flydubai-blue' ? 'blue' : quickStats.color === 'flydubai-orange' ? 'orange' : 'blue'}-600`}>{quickStats.subtitle}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}