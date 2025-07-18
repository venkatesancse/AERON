'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Input } from './components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Alert, AlertDescription } from './components/ui/alert'
import { Progress } from './components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Separator } from './components/ui/separator'
import { AlertTriangle, Plane, Users, Clock, TrendingUp, Settings, FileText, Plus, Filter, BarChart3, Download, UserCheck, ClockIcon, CheckSquare, Menu, X, Zap, Wrench, Fuel, Calendar, Brain, Activity, Shield, Target } from 'lucide-react'
import { WorldMap } from './components/WorldMap'
import { KPIWidgets } from './components/KPIWidgets'
import { DisruptionInput } from './components/DisruptionInput'
import { RecoveryOptionsGenerator } from './components/RecoveryOptionsGenerator'
import { ComparisonMatrix } from './components/ComparisonMatrix'
import { DetailedRecoveryPlan } from './components/DetailedRecoveryPlan'
import { SettingsPanel } from './components/SettingsPanel'
import { AuditReporting } from './components/AuditReporting'
import { PassengerRebooking } from './components/PassengerRebooking'
import { PendingSolutions } from './components/PendingSolutions'
import { PastRecoveryLogs } from './components/PastRecoveryLogs'
import { AircraftMaintenance } from './components/AircraftMaintenance'
import { FuelOptimization } from './components/FuelOptimization'
import { FlightTrackingGantt } from './components/FlightTrackingGantt'
import { DisruptionPredictionDashboard } from './components/DisruptionPredictionDashboard'
import { FlightDisruptionList } from './components/FlightDisruptionList'
import { PredictionAnalytics } from './components/PredictionAnalytics'
import { RiskAssessment } from './components/RiskAssessment'

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [selectedDisruption, setSelectedDisruption] = useState(null)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedRecoveryPlan, setSelectedRecoveryPlan] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState({
    flightNumber: '',
    station: '',
    region: '',
    dateTime: ''
  })

  // Screen settings state with default configuration including new prediction screens
  const [screenSettings, setScreenSettings] = useState([
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp, category: 'main', enabled: true, required: true },
    { id: 'flight-tracking', name: 'Flight Tracking Gantt', icon: Calendar, category: 'operations', enabled: true, required: false },
    { id: 'disruption', name: 'Affected Flights', icon: AlertTriangle, category: 'operations', enabled: true, required: false },
    { id: 'recovery', name: 'Recovery Options', icon: Plane, category: 'operations', enabled: true, required: false },
    { id: 'comparison', name: 'Comparison', icon: FileText, category: 'operations', enabled: true, required: false },
    { id: 'detailed', name: 'Recovery Plan', icon: Users, category: 'operations', enabled: true, required: false },
    { id: 'prediction-dashboard', name: 'Prediction Dashboard', icon: Brain, category: 'prediction', enabled: true, required: false },
    { id: 'flight-disruption-list', name: 'Flight Disruption List', icon: Target, category: 'prediction', enabled: true, required: false },
    { id: 'prediction-analytics', name: 'Prediction Analytics', icon: Activity, category: 'prediction', enabled: true, required: false },
    { id: 'risk-assessment', name: 'Risk Assessment', icon: Shield, category: 'prediction', enabled: true, required: false },
    { id: 'pending', name: 'Pending Solutions', icon: ClockIcon, category: 'monitoring', enabled: true, required: false },
    { id: 'past-logs', name: 'Past Recovery Logs', icon: CheckSquare, category: 'monitoring', enabled: true, required: false },
    { id: 'maintenance', name: 'Aircraft Maintenance', icon: Wrench, category: 'monitoring', enabled: true, required: false },
    { id: 'passengers', name: 'Passenger Services', icon: UserCheck, category: 'services', enabled: true, required: false },
    { id: 'fuel-optimization', name: 'Fuel Optimization', icon: Fuel, category: 'analytics', enabled: true, required: false },
    { id: 'reports', name: 'Reports & Analytics', icon: BarChart3, category: 'analytics', enabled: true, required: false },
    { id: 'audit', name: 'Audit Logs', icon: Clock, category: 'analytics', enabled: true, required: false },
    { id: 'settings', name: 'Settings', icon: Settings, category: 'system', enabled: true, required: true }
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

  const handleCreateRecoveryPlan = (disruption) => {
    setSelectedDisruption(disruption)
    setSelectedFlight(null)
    setActiveScreen('disruption')
  }

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
    setActiveScreen('recovery')
  }

  const handleSelectRecoveryPlan = (plan) => {
    setSelectedRecoveryPlan(plan)
    setActiveScreen('detailed')
  }

  const handleScreenSettingsChange = (newSettings) => {
    setScreenSettings(newSettings)

    // If the current active screen is disabled, switch to dashboard
    const currentScreen = newSettings.find(s => s.id === activeScreen)
    if (currentScreen && !currentScreen.enabled) {
      setActiveScreen('dashboard')
    }
  }

  const getQuickStats = () => {
    switch (activeScreen) {
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
            {!sidebarOpen && (
              <div className="flex items-center justify-center w-full">
                <div className="relative">
                  <div className="h-6 w-16 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">FZ</span>
                  </div>
                </div>
              </div>
            )}
            {/* <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-white hover:bg-blue-700"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button> */}
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

                    return (
                      <Button
                        key={screen.id}
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 ${sidebarOpen ? 'px-3' : 'px-2'} ${isActive ? 'bg-white text-flydubai-blue hover:bg-gray-100' : 'text-white hover:text-[#ff8200]'}`}
                        onClick={() => setActiveScreen(screen.id)}
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {activeScreen === 'dashboard' && (
            <DashboardScreen 
              filters={filters}
              setFilters={setFilters}
              onCreateRecoveryPlan={handleCreateRecoveryPlan}
              setActiveScreen={setActiveScreen}
              enabledScreens={enabledScreens}
            />
          )}

          {activeScreen === 'flight-tracking' && <FlightTrackingGantt />}

          {activeScreen === 'disruption' && (
            <DisruptionInput 
              disruption={selectedDisruption}
              onSelectFlight={handleSelectFlight}
            />
          )}

          {activeScreen === 'recovery' && (
            <RecoveryOptionsGenerator 
              selectedFlight={selectedFlight}
              onSelectPlan={handleSelectRecoveryPlan}
              onCompare={() => setActiveScreen('comparison')}
            />
          )}

          {activeScreen === 'comparison' && (
            <ComparisonMatrix 
              selectedFlight={selectedFlight}
              onSelectPlan={handleSelectRecoveryPlan}
            />
          )}

          {activeScreen === 'detailed' && (
            <DetailedRecoveryPlan 
              plan={selectedRecoveryPlan}
              flight={selectedFlight}
            />
          )}

          {/* Prediction Screens */}
          {activeScreen === 'prediction-dashboard' && <DisruptionPredictionDashboard />}
          {activeScreen === 'flight-disruption-list' && <FlightDisruptionList />}
          {activeScreen === 'prediction-analytics' && <PredictionAnalytics />}
          {activeScreen === 'risk-assessment' && <RiskAssessment />}

          {activeScreen === 'pending' && <PendingSolutions />}

          {activeScreen === 'past-logs' && <PastRecoveryLogs />}

          {activeScreen === 'maintenance' && <AircraftMaintenance />}

          {activeScreen === 'passengers' && <PassengerRebooking />}

          {activeScreen === 'fuel-optimization' && <FuelOptimization />}

          {activeScreen === 'reports' && <AuditReporting />}

          {activeScreen === 'settings' && (
            <SettingsPanel 
              screenSettings={screenSettings}
              onScreenSettingsChange={handleScreenSettingsChange}
            />
          )}

          {activeScreen === 'audit' && (
            <AuditLogsScreen />
          )}
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ filters, setFilters, onCreateRecoveryPlan, setActiveScreen, enabledScreens }) {
  // Helper function to check if a screen is enabled before navigating
  const navigateToScreen = (screenId) => {
    const screen = enabledScreens.find(s => s.id === screenId)
    if (screen) {
      setActiveScreen(screenId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Banner - flydubai specific */}
      <Alert className="border-flydubai-orange bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-flydubai-orange" />
        <AlertDescription className="text-orange-800">
          <strong>Active Disruptions:</strong> 18 Flydubai flights affected by sandstorm at DXB. AERON recovery plans available.
        </AlertDescription>
      </Alert>

      {/* Quick Analytics Banner - flydubai themed */}
      <Card className="bg-gradient-flydubai-light border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-flydubai-blue" />
                <div className="absolute -inset-1 bg-flydubai-blue rounded-lg opacity-10 blur-sm"></div>
              </div>
              <div>
                <h3 className="font-medium text-flydubai-navy">Flydubai AERON Performance Today</h3>
                <p className="text-sm text-muted-foreground">8 recovery decisions processed • 96.1% success rate</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-flydubai-blue">AED 312K</p>
                <p className="text-xs text-muted-foreground">Cost Savings</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-flydubai-navy">7.8 min</p>
                <p className="text-xs text-muted-foreground">Avg Decision</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-flydubai-orange">2,847</p>
                <p className="text-xs text-muted-foreground">Passengers Served</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigateToScreen('reports')} className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50">
                View Full Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters - flydubai destinations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-flydubai-blue" />
            Flydubai Network Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Flight Number</label>
              <Input 
                placeholder="FZ123"
                value={filters.flightNumber}
                onChange={(e) => setFilters({...filters, flightNumber: e.target.value})}
                className="input-flydubai"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Station</label>
              <Select value={filters.station} onValueChange={(value) => setFilters({...filters, station: value})}>
                <SelectTrigger className="select-flydubai">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dxb">DXB - Dubai</SelectItem>
                  <SelectItem value="auh">AUH - Abu Dhabi</SelectItem>
                  <SelectItem value="sll">SLL - Salalah</SelectItem>
                  <SelectItem value="khi">KHI - Karachi</SelectItem>
                  <SelectItem value="bom">BOM - Mumbai</SelectItem>
                  <SelectItem value="del">DEL - Delhi</SelectItem>
                  <SelectItem value="cok">COK - Kochi</SelectItem>
                  <SelectItem value="cmb">CMB - Colombo</SelectItem>
                  <SelectItem value="khi">KHI - Karachi</SelectItem>
                  <SelectItem value="ist">IST - Istanbul</SelectItem>
                  <SelectItem value="bcn">BCN - Barcelona</SelectItem>
                  <SelectItem value="prg">PRG - Prague</SelectItem>
                  <SelectItem value="tbz">TBZ - Tabriz</SelectItem>
                  <SelectItem value="beg">BEG - Belgrade</SelectItem>
                  <SelectItem value="skp">SKP - Skopje</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select value={filters.region} onValueChange={(value) => setFilters({...filters, region: value})}>
                <SelectTrigger className="select-flydubai">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gcc">GCC</SelectItem>
                  <SelectItem value="indian-subcontinent">Indian Subcontinent</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="middle-east">Middle East</SelectItem>
                  <SelectItem value="central-asia">Central Asia</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date/Time</label>
              <Input 
                type="datetime-local"
                value={filters.dateTime}
                onChange={(e) => setFilters({...filters, dateTime: e.target.value})}
                className="input-flydubai"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {/* World Map */}
        <div>
          <WorldMap />
        </div>
      </div>

      {/* Action Buttons - flydubai themed */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => onCreateRecoveryPlan(null)} className="flex items-center gap-2 btn-flydubai-primary">
          <Plus className="h-4 w-4" />
          View Affected Flights
        </Button>

        {enabledScreens.find(s => s.id === 'prediction-dashboard') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('prediction-dashboard')}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-flydubai-navy border-blue-200"
          >
            <Brain className="h-4 w-4" />
            Disruption Prediction
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'flight-tracking') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('flight-tracking')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200"
          >
            <Calendar className="h-4 w-4" />
            Flight Tracking Gantt
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'pending') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('pending')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200"
          >
            <ClockIcon className="h-4 w-4" />
            View Pending Solutions
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'past-logs') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('past-logs')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200"
          >
            <CheckSquare className="h-4 w-4" />
            Past Recovery Logs
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'passengers') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('passengers')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200"
          >
            <UserCheck className="h-4 w-4" />
            Passenger Services
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'reports') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('reports')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics Dashboard
          </Button>
        )}
      </div>
    </div>
  )
}

function AuditLogsScreen() {
  const auditLogs = [
    {
      id: 'LOG-2025-001',
      timestamp: '2025-01-10 14:32:15',
      action: 'Recovery plan executed',
      user: 'ops.manager@flydubai.com',
      flight: 'FZ123',
      details: 'Option B selected and executed successfully via AERON for DXB-BOM route',
      status: 'Success'
    },
    {
      id: 'LOG-2025-002', 
      timestamp: '2025-01-10 14:15:22',
      action: 'Solution override',
      user: 'supervisor@flydubai.com',
      flight: 'FZ456',
      details: 'Manual override from Option A to Option C for weather contingency at KHI',
      status: 'Warning'
    },
    {
      id: 'LOG-2025-003',
      timestamp: '2025-01-10 13:45:10',
      action: 'Recovery plan generated',
      user: 'system.aeron',
      flight: 'FZ789',
      details: 'AERON auto-generated 4 recovery options for DXB-DEL technical delay',
      status: 'Success'
    },
    {
      id: 'LOG-2025-004',
      timestamp: '2025-01-10 13:20:45',
      action: 'Predictive alert triggered',
      user: 'system.aeron',
      flight: 'FZ234',
      details: 'Weather disruption predicted for IST-DXB route, proactive measures initiated',
      status: 'Success'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Audit Trail</h2>
          <p className="text-muted-foreground">Complete log of AERON system actions and user decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter Logs
          </Button>
          <Button className="btn-flydubai-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-flydubai-navy">Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-flydubai">
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-blue-50">
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge className="badge-flydubai">{log.flight}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md">{log.details}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        log.status === 'Success' ? 'status-success' :
                        log.status === 'Warning' ? 'status-warning' : 'status-error'
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}