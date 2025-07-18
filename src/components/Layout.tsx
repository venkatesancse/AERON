
'use client'

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { TrendingUp, AlertTriangle, Plane, Users, Clock, Settings, FileText, BarChart3, UserCheck, ClockIcon, CheckSquare, Wrench, Fuel, Calendar, Brain, Activity, Shield, Target } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Screen settings state with default configuration
  const [screenSettings] = useState([
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp, category: 'main', enabled: true, required: true, path: '/dashboard' },
    { id: 'flight-tracking', name: 'Flight Tracking Gantt', icon: Calendar, category: 'operations', enabled: true, required: false, path: '/flight-tracking' },
    { id: 'disruption', name: 'Affected Flights', icon: AlertTriangle, category: 'operations', enabled: true, required: false, path: '/disruption' },
    { id: 'recovery', name: 'Recovery Options', icon: Plane, category: 'operations', enabled: true, required: false, path: '/recovery' },
    { id: 'comparison', name: 'Comparison', icon: FileText, category: 'operations', enabled: true, required: false, path: '/comparison' },
    { id: 'detailed', name: 'Recovery Plan', icon: Users, category: 'operations', enabled: true, required: false, path: '/detailed' },
    { id: 'prediction-dashboard', name: 'Prediction Dashboard', icon: Brain, category: 'prediction', enabled: true, required: false, path: '/prediction-dashboard' },
    { id: 'flight-disruption-list', name: 'Flight Disruption List', icon: Target, category: 'prediction', enabled: true, required: false, path: '/flight-disruption-list' },
    { id: 'prediction-analytics', name: 'Prediction Analytics', icon: Activity, category: 'prediction', enabled: true, required: false, path: '/prediction-analytics' },
    { id: 'risk-assessment', name: 'Risk Assessment', icon: Shield, category: 'prediction', enabled: true, required: false, path: '/risk-assessment' },
    { id: 'pending', name: 'Pending Solutions', icon: ClockIcon, category: 'monitoring', enabled: true, required: false, path: '/pending' },
    { id: 'past-logs', name: 'Past Recovery Logs', icon: CheckSquare, category: 'monitoring', enabled: true, required: false, path: '/past-logs' },
    { id: 'maintenance', name: 'Aircraft Maintenance', icon: Wrench, category: 'monitoring', enabled: true, required: false, path: '/maintenance' },
    { id: 'passengers', name: 'Passenger Services', icon: UserCheck, category: 'services', enabled: true, required: false, path: '/passengers' },
    { id: 'fuel-optimization', name: 'Fuel Optimization', icon: Fuel, category: 'analytics', enabled: true, required: false, path: '/fuel-optimization' },
    { id: 'reports', name: 'Reports & Analytics', icon: BarChart3, category: 'analytics', enabled: true, required: false, path: '/reports' },
    { id: 'audit', name: 'Audit Logs', icon: Clock, category: 'analytics', enabled: true, required: false, path: '/audit' },
    { id: 'settings', name: 'Settings', icon: Settings, category: 'system', enabled: true, required: true, path: '/settings' }
  ])

  // Filter screens to only show enabled ones
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

  const getQuickStats = () => {
    const currentPath = location.pathname
    const screen = enabledScreens.find(s => s.path === currentPath)
    
    if (!screen) return null

    switch (screen.id) {
      case 'dashboard':
        return { icon: BarChart3, title: '89.3% Solution Adoption', subtitle: 'AED 5.2M Cost Savings', color: 'flydubai-blue' }
      case 'flight-tracking':
        return { icon: Calendar, title: '47 Aircraft Active', subtitle: '89 Flights Tracked', color: 'flydubai-blue' }
      case 'disruption':
        return { icon: AlertTriangle, title: '18 Flights Affected', subtitle: '3 High Priority', color: 'flydubai-orange' }
      case 'recovery':
        return { icon: Plane, title: '4 Options Generated', subtitle: '1 Recommended', color: 'flydubai-blue' }
      case 'prediction-dashboard':
        return { icon: Brain, title: '32 Disruptions Predicted', subtitle: '94.1% Accuracy Rate', color: 'flydubai-navy' }
      case 'flight-disruption-list':
        return { icon: Target, title: '85 Flights at Risk', subtitle: '12 High Risk', color: 'flydubai-navy' }
      case 'prediction-analytics':
        return { icon: Activity, title: '91% Model Confidence', subtitle: '4.8 hrs Avg Prediction Lead', color: 'flydubai-navy' }
      case 'risk-assessment':
        return { icon: Shield, title: '9 Risk Factors Active', subtitle: '2 Critical Alerts', color: 'flydubai-navy' }
      case 'passengers':
        return { icon: UserCheck, title: '3,247 Passengers Processed', subtitle: '96.8% Self-Service Rate', color: 'flydubai-blue' }
      case 'pending':
        return { icon: ClockIcon, title: '8 Solutions Pending', subtitle: '2 High Priority', color: 'flydubai-orange' }
      case 'past-logs':
        return { icon: CheckSquare, title: '189 Solutions Completed', subtitle: '96.1% Success Rate', color: 'flydubai-blue' }
      case 'maintenance':
        return { icon: Wrench, title: '6 Aircraft in Maintenance', subtitle: '2 A-Checks Scheduled', color: 'flydubai-orange' }
      case 'fuel-optimization':
        return { icon: Fuel, title: '12.1% Fuel Savings', subtitle: 'AED 2.8M Monthly Savings', color: 'flydubai-blue' }
      default:
        return null
    }
  }

  const quickStats = getQuickStats()
  const currentScreen = enabledScreens.find(s => s.path === location.pathname) || enabledScreens[0]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
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
                    const isActive = location.pathname === screen.path

                    return (
                      <Button
                        key={screen.id}
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 ${sidebarOpen ? 'px-3' : 'px-2'} ${isActive ? 'bg-white text-flydubai-blue hover:bg-gray-100' : 'text-white hover:text-[#ff8200]'}`}
                        onClick={() => navigate(screen.path)}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">
                {currentScreen?.name || 'Dashboard'}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
