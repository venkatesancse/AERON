'use client'

import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  AlertTriangle, 
  Plane, 
  Users, 
  Clock, 
  TrendingUp, 
  Settings, 
  FileText, 
  UserCheck, 
  ClockIcon, 
  CheckSquare, 
  BarChart3, 
  Wrench, 
  Fuel, 
  Calendar, 
  Brain, 
  Activity, 
  Shield, 
  Target 
} from 'lucide-react'

// Layout Components
import Sidebar from './src/components/Layout/Sidebar'
import Header from './src/components/Layout/Header'

// Page Components
import Dashboard from './src/pages/Dashboard'
import AuditLogs from './src/pages/AuditLogs'

// Feature Components
import { FlightTrackingGantt } from './src/components/components/FlightTrackingGantt'
import { DisruptionInput } from './src/components/components/DisruptionInput'
import { RecoveryOptionsGenerator } from './src/components/components/RecoveryOptionsGenerator'
import { ComparisonMatrix } from './src/components/components/ComparisonMatrix'
import { DetailedRecoveryPlan } from './src/components/components/DetailedRecoveryPlan'
import { SettingsPanel } from './src/components/components/SettingsPanel'
import { AuditReporting } from './src/components/components/AuditReporting'
import { PassengerRebooking } from './src/components/components/PassengerRebooking'
import { PendingSolutions } from './src/components/components/PendingSolutions'
import { PastRecoveryLogs } from './src/components/components/PastRecoveryLogs'
import { AircraftMaintenance } from './src/components/components/AircraftMaintenance'
import { FuelOptimization } from './src/components/components/FuelOptimization'
import { DisruptionPredictionDashboard } from './src/components/components/DisruptionPredictionDashboard'
import { FlightDisruptionList } from './src/components/components/FlightDisruptionList'
import { PredictionAnalytics } from './src/components/components/PredictionAnalytics'
import { RiskAssessment } from './src/components/components/RiskAssessment'

// Hooks and Types
import { useNavigation } from './src/hooks/useNavigation'
import { FilterState, ScreenSettings } from './src/types'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const navigationHook = useNavigation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    flightNumber: '',
    station: '',
    region: '',
    dateTime: ''
  })

  // Screen settings state with default configuration including new prediction screens
  const [screenSettings, setScreenSettings] = useState<ScreenSettings[]>([
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

  const handleScreenSettingsChange = (newSettings: ScreenSettings[]) => {
    setScreenSettings(newSettings)

    // If the current active screen is disabled, switch to dashboard
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
    const currentScreen = newSettings.find(s => s.id === activeScreen)
    if (currentScreen && !currentScreen.enabled) {
      navigate('/')
    }
  }

  const getQuickStats = () => {
    const activeScreen = location.pathname

    switch (activeScreen) {
      case '/':
        return { icon: BarChart3, title: '89.3% Solution Adoption', subtitle: 'AED 5.2M Cost Savings', color: 'flydubai-blue' }
      case '/flight-tracking':
        return { icon: Calendar, title: '47 Aircraft Active', subtitle: '89 Flights Tracked', color: 'flydubai-blue' }
      case '/disruption':
        return { icon: AlertTriangle, title: '18 Flights Affected', subtitle: '3 High Priority', color: 'flydubai-orange' }
      case '/recovery':
        return { icon: Plane, title: '4 Options Generated', subtitle: '1 Recommended', color: 'flydubai-blue' }
      case '/prediction-dashboard':
        return { icon: Brain, title: '32 Disruptions Predicted', subtitle: '94.1% Accuracy Rate', color: 'flydubai-navy' }
      case '/flight-disruption-list':
        return { icon: Target, title: '85 Flights at Risk', subtitle: '12 High Risk', color: 'flydubai-navy' }
      case '/prediction-analytics':
        return { icon: Activity, title: '91% Model Confidence', subtitle: '4.8 hrs Avg Prediction Lead', color: 'flydubai-navy' }
      case '/risk-assessment':
        return { icon: Shield, title: '9 Risk Factors Active', subtitle: '2 Critical Alerts', color: 'flydubai-navy' }
      case '/passengers':
        return { icon: UserCheck, title: '3,247 Passengers Processed', subtitle: '96.8% Self-Service Rate', color: 'flydubai-blue' }
      case '/pending':
        return { icon: ClockIcon, title: '8 Solutions Pending', subtitle: '2 High Priority', color: 'flydubai-orange' }
      case '/past-logs':
        return { icon: CheckSquare, title: '189 Solutions Completed', subtitle: '96.1% Success Rate', color: 'flydubai-blue' }
      case '/maintenance':
        return { icon: Wrench, title: '6 Aircraft in Maintenance', subtitle: '2 A-Checks Scheduled', color: 'flydubai-orange' }
      case '/fuel-optimization':
        return { icon: Fuel, title: '12.1% Fuel Savings', subtitle: 'AED 2.8M Monthly Savings', color: 'flydubai-blue' }
      default:
        return null
    }
  }

  const quickStats = getQuickStats()

  // Helper function to navigate to screen by ID
  const navigateToScreen = (screenId: string) => {
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

    const screen = enabledScreens.find(s => s.id === screenId)
    if (screen) {
      navigate(routeMap[screenId] || '/')
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        screenSettings={screenSettings}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <Header 
          screenSettings={screenSettings}
          quickStats={quickStats}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  filters={filters}
                  setFilters={setFilters}
                  onCreateRecoveryPlan={navigationHook.handleCreateRecoveryPlan}
                  enabledScreens={enabledScreens}
                  navigateToScreen={navigateToScreen}
                />
              } 
            />

            <Route path="/flight-tracking" element={<FlightTrackingGantt />} />

            <Route 
              path="/disruption" 
              element={
                <DisruptionInput 
                  disruption={navigationHook.selectedDisruption}
                  onSelectFlight={navigationHook.handleSelectFlight}
                />
              } 
            />

            <Route 
              path="/recovery" 
              element={
                <RecoveryOptionsGenerator 
                  selectedFlight={navigationHook.selectedFlight}
                  onSelectPlan={navigationHook.handleSelectRecoveryPlan}
                  onCompare={() => navigate('/comparison')}
                />
              } 
            />

            <Route 
              path="/comparison" 
              element={
                <ComparisonMatrix 
                  selectedFlight={navigationHook.selectedFlight}
                  onSelectPlan={navigationHook.handleSelectRecoveryPlan}
                />
              } 
            />

            <Route 
              path="/detailed" 
              element={
                <DetailedRecoveryPlan 
                  plan={navigationHook.selectedRecoveryPlan}
                  flight={navigationHook.selectedFlight}
                />
              } 
            />

            {/* Prediction Screens */}
            <Route path="/prediction-dashboard" element={<DisruptionPredictionDashboard />} />
            <Route path="/flight-disruption-list" element={<FlightDisruptionList />} />
            <Route path="/prediction-analytics" element={<PredictionAnalytics />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />

            <Route path="/pending" element={<PendingSolutions />} />
            <Route path="/past-logs" element={<PastRecoveryLogs />} />
            <Route path="/maintenance" element={<AircraftMaintenance />} />
            <Route path="/passengers" element={<PassengerRebooking />} />
            <Route path="/fuel-optimization" element={<FuelOptimization />} />
            <Route path="/reports" element={<AuditReporting />} />
            <Route path="/audit" element={<AuditLogs />} />

            <Route 
              path="/settings" 
              element={
                <SettingsPanel 
                  screenSettings={screenSettings}
                  onScreenSettingsChange={handleScreenSettingsChange}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}