
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { FlightTracking } from './pages/FlightTracking'
import { DisruptionManagement } from './pages/DisruptionManagement'
import { RecoveryOptions } from './pages/RecoveryOptions'
import { ComparisonMatrix } from './pages/ComparisonMatrix'
import { DetailedRecoveryPlan } from './pages/DetailedRecoveryPlan'
import { PredictionDashboard } from './pages/PredictionDashboard'
import { FlightDisruptionList } from './pages/FlightDisruptionList'
import { PredictionAnalytics } from './pages/PredictionAnalytics'
import { RiskAssessment } from './pages/RiskAssessment'
import { PendingSolutions } from './pages/PendingSolutions'
import { PastRecoveryLogs } from './pages/PastRecoveryLogs'
import { AircraftMaintenance } from './pages/AircraftMaintenance'
import { PassengerServices } from './pages/PassengerServices'
import { FuelOptimization } from './pages/FuelOptimization'
import { Reports } from './pages/Reports'
import { AuditLogs } from './pages/AuditLogs'
import { Settings } from './pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flight-tracking" element={<FlightTracking />} />
          <Route path="/disruption" element={<DisruptionManagement />} />
          <Route path="/recovery" element={<RecoveryOptions />} />
          <Route path="/comparison" element={<ComparisonMatrix />} />
          <Route path="/detailed" element={<DetailedRecoveryPlan />} />
          <Route path="/prediction-dashboard" element={<PredictionDashboard />} />
          <Route path="/flight-disruption-list" element={<FlightDisruptionList />} />
          <Route path="/prediction-analytics" element={<PredictionAnalytics />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/pending" element={<PendingSolutions />} />
          <Route path="/past-logs" element={<PastRecoveryLogs />} />
          <Route path="/maintenance" element={<AircraftMaintenance />} />
          <Route path="/passengers" element={<PassengerServices />} />
          <Route path="/fuel-optimization" element={<FuelOptimization />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
