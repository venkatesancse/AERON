
'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScreenSettings } from '../../types'

interface SidebarProps {
  screenSettings: ScreenSettings[]
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ screenSettings, sidebarOpen }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const enabledScreens = screenSettings.filter(screen => screen.enabled)

  const categories = {
    main: { name: 'Main', color: 'text-flydubai-blue' },
    operations: { name: 'Operations', color: 'text-flydubai-blue' },
    prediction: { name: 'Prediction', color: 'text-flydubai-navy' },
    monitoring: { name: 'Monitoring', color: 'text-flydubai-navy' },
    services: { name: 'Services', color: 'text-flydubai-blue' },
    analytics: { name: 'Analytics', color: 'text-flydubai-navy' },
    system: { name: 'System', color: 'text-gray-600' }
  }

  const getRouteFromScreenId = (screenId: string) => {
    const routeMap: { [key: string]: string } = {
      'dashboard': '/',
      'flight-tracking': '/flight-tracking',
      'disruption': '/disruption',
      'recovery': '/recovery',
      'comparison': '/comparison',
      'detailed': '/detailed',
      'prediction-dashboard': '/prediction-dashboard',
      'flight-disruption-list': '/flight-disruption-list',
      'prediction-analytics': '/prediction-analytics',
      'risk-assessment': '/risk-assessment',
      'pending': '/pending',
      'past-logs': '/past-logs',
      'maintenance': '/maintenance',
      'passengers': '/passengers',
      'fuel-optimization': '/fuel-optimization',
      'reports': '/reports',
      'audit': '/audit',
      'settings': '/settings'
    }
    return routeMap[screenId] || '/'
  }

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

  return (
    <div className="w-64 bg-flydubai-blue text-white border-r border-blue-700 flex flex-col">
      {/* Sidebar Header - flydubai Branding */}
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex flex-col items-center gap-2">
              {/* flydubai Logo Placeholder */}
              <div className="h-9 w-24 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">flydubai</span>
              </div>
              <div className="text-center">
                <h1 className="text-base font-semibold text-white">
                  AERON
                </h1>
                <p className="text-xs text-blue-200 leading-tight">
                  Adaptive Engine for Recovery &<br />Operational Navigation
                </p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="flex items-center justify-center w-full">
              <div className="relative">
                <div className="h-6 w-16 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">FZ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        {Object.entries(categories).map(([categoryKey, category]) => {
          const categoryScreens = enabledScreens.filter(screen => screen.category === categoryKey)

          // Don't render category if no enabled screens
          if (categoryScreens.length === 0) return null

          return (
            <div key={categoryKey} className="mb-6">
              {sidebarOpen && (
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    {category.name}
                  </h3>
                </div>
              )}

              <div className="space-y-1 px-2">
                {categoryScreens.map((screen) => {
                  const Icon = screen.icon
                  const isActive = activeScreen === screen.id
                  const route = getRouteFromScreenId(screen.id)

                  return (
                    <Button
                      key={screen.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${sidebarOpen ? 'px-3' : 'px-2'} ${isActive ? 'bg-white text-flydubai-blue hover:bg-gray-100' : 'text-white hover:text-[#ff8200]'}`}
                      onClick={() => navigate(route)}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarOpen && <span className="truncate">{screen.name}</span>}
                    </Button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sidebar Footer - flydubai Partnership */}
      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Online
          </Badge>
          {sidebarOpen && (
            <div className="text-right flex-1">
              <p className="text-xs font-medium text-white">Friday, January 10, 2025</p>
              <p className="text-xs text-blue-200">14:32 GST</p>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <div className="mt-2 pt-2 border-t border-blue-700">
            <p className="text-xs text-blue-200">
              Powered by Flydubai × AERON Partnership
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
