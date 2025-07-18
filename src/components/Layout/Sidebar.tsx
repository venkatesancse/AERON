'use client'

import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { cn } from '../components/ui/utils'
import { 
  Home, 
  BarChart3, 
  Calendar, 
  ClockIcon, 
  CheckSquare, 
  UserCheck, 
  Brain, 
  Plane, 
  Settings, 
  FileText,
  X
} from 'lucide-react'
import { ScreenSettings } from '../../types'

interface SidebarProps {
  enabledScreens: ScreenSettings[]
  navigateToScreen: (screenId: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ enabledScreens, navigateToScreen, isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'flight-tracking', label: 'Flight Tracking', icon: Calendar, path: '/flight-tracking' },
    { id: 'prediction-dashboard', label: 'Disruption Prediction', icon: Brain, path: '/prediction' },
    { id: 'pending', label: 'Pending Solutions', icon: ClockIcon, path: '/pending' },
    { id: 'past-logs', label: 'Recovery Logs', icon: CheckSquare, path: '/logs' },
    { id: 'passengers', label: 'Passenger Services', icon: UserCheck, path: '/passengers' },
    { id: 'reports', label: 'Analytics', icon: BarChart3, path: '/reports' },
    { id: 'audit-logs', label: 'Audit Logs', icon: FileText, path: '/audit-logs' },
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.id === 'dashboard' || enabledScreens.find(screen => screen.id === item.id)
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-flydubai-navy text-white transition-transform duration-300 ease-in-out z-50",
        "w-64 md:w-72 lg:w-80",
        "md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-800 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-flydubai-orange rounded-lg flex items-center justify-center font-bold text-sm">
                A
              </div>
              <h2 className="text-lg font-bold">AERON</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-blue-800 p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    navigateToScreen(item.id)
                    onClose() // Close sidebar on mobile after navigation
                  }}
                  className={cn(
                    "w-full justify-start gap-3 h-12 text-left hover:bg-blue-800 transition-colors",
                    isActive && "bg-flydubai-orange hover:bg-orange-600"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-blue-800">
            <Button
              variant="ghost"
              onClick={() => {
                navigateToScreen('settings')
                onClose()
              }}
              className="w-full justify-start gap-3 h-12 hover:bg-blue-800"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>

            <div className="mt-4 text-xs text-blue-200">
              <p className="font-medium">Flydubai Operations</p>
              <p>AERON v2.1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}