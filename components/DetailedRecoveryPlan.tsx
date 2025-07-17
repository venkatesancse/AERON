'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Plane, 
  DollarSign, 
  ArrowRight, 
  Edit3, 
  Plus, 
  RotateCcw,
  Play,
  Pause,
  RefreshCw,
  Calendar,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Copy,
  Trash2,
  Settings,
  BarChart3,
  Eye,
  EyeOff,
  Timer,
  Target,
  Gauge,
  UserCheck,
  Phone,
  Mail,
  Shield,
  Award,
  Clock3,
  UserPlus,
  Search,
  Star,
  ThumbsUp,
  Info,
  UserMinus,
  Filter,
  X,
  Send,
  XCircle,
  FileText
} from 'lucide-react'

export function DetailedRecoveryPlan({ plan, flight }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showSimulation, setShowSimulation] = useState(false)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [showScheduleBuilder, setShowScheduleBuilder] = useState(false)
  const [showAircraftManager, setShowAircraftManager] = useState(false)
  const [modifiedSchedule, setModifiedSchedule] = useState(null)
  const [selectedAircraft, setSelectedAircraft] = useState(null)

  // Enhanced mock data with more realistic recovery plan details
  const mockPlan = plan || {
    id: 'RP-2025-001',
    title: 'Aircraft Swap & Route Optimization Recovery Plan',
    status: 'Recommended',
    confidence: 94.2,
    estimatedCost: 45200,
    estimatedDelay: 87,
    affectedPassengers: 158,
    priority: 'High',
    createdBy: 'AERON AI System',
    createdAt: '2025-06-06 14:25:00',
    approvedBy: null,
    executionStatus: 'Pending Approval',
    timeline: {
      start: '2025-06-06 15:30',
      completion: '2025-06-06 17:45',
      duration: '2h 15m'
    },
    costBreakdown: {
      aircraftSwap: 28000,
      passengerCompensation: 8500,
      crewCosts: 4200,
      groundHandling: 2800,
      fuelCosts: 1700
    },
    alternatives: {
      considered: 5,
      rejected: 3,
      feasible: 2
    },
    riskAssessment: {
      weatherRisk: 'Medium',
      crewAvailability: 'Low',
      passengerImpact: 'Medium',
      operationalComplexity: 'High'
    },
    steps: [
      {
        id: 1,
        action: 'Ground current aircraft (A321-001) at Gate B12',
        duration: '15 mins',
        status: 'pending',
        responsible: 'Ground Crew Team A',
        location: 'Gate B12',
        dependencies: [],
        criticalPath: true,
        estimatedCost: 2800,
        description: 'Safely ground and secure the affected aircraft, coordinate with passengers for disembarkation'
      },
      {
        id: 2,
        action: 'Prepare substitute aircraft (A321-007)',
        duration: '45 mins',
        status: 'pending',
        responsible: 'Maintenance Team',
        location: 'Maintenance Bay 3',
        dependencies: [],
        criticalPath: true,
        estimatedCost: 28000,
        description: 'Complete pre-flight checks, fuel, and prepare substitute aircraft for passenger transfer'
      },
      {
        id: 3,
        action: 'Transfer passengers and cargo',
        duration: '30 mins',
        status: 'pending',
        responsible: 'Ground Services',
        location: 'Gate B15',
        dependencies: [1, 2],
        criticalPath: true,
        estimatedCost: 4200,
        description: 'Coordinate passenger transfer, baggage handling, and cargo relocation to new aircraft'
      },
      {
        id: 4,
        action: 'Crew briefing and aircraft familiarization',
        duration: '20 mins',
        status: 'pending',
        responsible: 'Flight Crew',
        location: 'Crew Briefing Room',
        dependencies: [2],
        criticalPath: false,
        estimatedCost: 1500,
        description: 'Brief crew on aircraft differences, route changes, and emergency procedures'
      },
      {
        id: 5,
        action: 'Complete pre-flight checks',
        duration: '25 mins',
        status: 'pending',
        responsible: 'Flight Crew',
        location: 'Gate B15',
        dependencies: [3, 4],
        criticalPath: true,
        estimatedCost: 800,
        description: 'Final aircraft systems checks, weight and balance calculations, weather briefing'
      },
      {
        id: 6,
        action: 'Departure clearance and taxi',
        duration: '10 mins',
        status: 'pending',
        responsible: 'Air Traffic Control',
        location: 'Runway 24L',
        dependencies: [5],
        criticalPath: true,
        estimatedCost: 0,
        description: 'Obtain ATC clearance, taxi to runway, and execute departure'
      }
    ],
    metrics: {
      successProbability: 94.2,
      customerSatisfaction: 78,
      onTimePerformance: 85,
      costEfficiency: 92
    }
  }

  const mockFlight = flight || {
    number: 'FZ123',
    route: 'JFK → DXB',
    aircraft: 'A321-001',
    aircraftType: 'Airbus A321-200',
    scheduledDeparture: '2025-06-06 14:30',
    actualDeparture: 'Delayed',
    scheduledArrival: '2025-06-07 05:15',
    passengers: 158,
    crew: 8,
    cargo: '12.5 tons',
    disruptionReason: 'Technical Issue - Engine warning light',
    disruptionSeverity: 'High',
    gate: 'B12',
    terminal: '4'
  }

  // Available aircraft for substitution
  const availableAircraft = [
    {
      id: 'A321-007',
      type: 'Airbus A321',
      status: 'Available',
      location: 'Maintenance Bay 3',
      capacity: 185,
      range: '3200 nm',
      lastMaintenance: '2025-06-01',
      readyTime: '45 mins',
      suitability: 95
    },
    {
      id: 'A320-023',
      type: 'Airbus A320',
      status: 'Available',
      location: 'Gate C8',
      capacity: 150,
      range: '3100 nm',
      lastMaintenance: '2025-06-03',
      readyTime: '20 mins',
      suitability: 78
    },
    {
      id: 'A330-012',
      type: 'Airbus A330',
      status: 'Available',
      location: 'Remote Stand 7',
      capacity: 295,
      range: '6750 nm',
      lastMaintenance: '2025-05-28',
      readyTime: '60 mins',
      suitability: 88
    }
  ]

  // Alternative schedule options
  const scheduleOptions = [
    {
      id: 'sched-1',
      name: 'Immediate Departure',
      departureTime: '2025-06-06 16:00',
      arrivalTime: '2025-06-07 06:30',
      delay: '90 mins',
      cost: 42000,
      passengerImpact: 'Minimal',
      probability: 92
    },
    {
      id: 'sched-2',
      name: 'Evening Slot',
      departureTime: '2025-06-06 20:15',
      arrivalTime: '2025-06-07 10:45',
      delay: '5h 45m',
      cost: 28000,
      passengerImpact: 'High',
      probability: 98
    },
    {
      id: 'sched-3',
      name: 'Next Day Morning',
      departureTime: '2025-06-07 08:00',
      arrivalTime: '2025-06-07 18:30',
      delay: '17h 30m',
      cost: 65000,
      passengerImpact: 'Very High',
      probability: 100
    }
  ]

  const [selectedSchedule, setSelectedSchedule] = useState(scheduleOptions[0])
  const [currentAircraft, setCurrentAircraft] = useState(availableAircraft[0])

  // Safety check for plan data
  const safePlan = mockPlan || {}
  const safeSteps = safePlan.steps || []
  const safeTimeline = safePlan.timeline || {}
  const safeFlight = mockFlight || {}
  const safeMetrics = safePlan.metrics || {}
  const safeCostBreakdown = safePlan.costBreakdown || {}
  const safeRiskAssessment = safePlan.riskAssessment || {}
  const safeAlternatives = safePlan.alternatives || {}

  const runSimulation = async () => {
    setSimulationRunning(true)
    setSimulationProgress(0)
    setShowSimulation(true)
    
    // Simulate progress over 3 seconds
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150))
      setSimulationProgress(i)
    }
    
    setSimulationRunning(false)
  }

  const resetSimulation = () => {
    setSimulationProgress(0)
    setShowSimulation(false)
    setSimulationRunning(false)
    setModifiedSchedule(null)
    setSelectedAircraft(null)
  }

  const applyChanges = () => {
    // Apply the modified schedule and aircraft changes
    setModifiedSchedule(selectedSchedule)
    setSelectedAircraft(currentAircraft)
    runSimulation()
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Plan Status */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-2xl font-semibold">{safePlan.title || 'Recovery Plan'}</h2>
            <Badge className={
              safePlan.status === 'Recommended' ? 'bg-green-100 text-green-700' :
              safePlan.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
              safePlan.status === 'Completed' ? 'bg-purple-100 text-purple-700' :
              'bg-gray-100 text-gray-700'
            }>
              {safePlan.status || 'Unknown'}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {safePlan.confidence || 0}% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Flight {safeFlight.number || 'N/A'} • {safeFlight.route || 'N/A'}</span>
            <span>Plan ID: {safePlan.id || 'N/A'}</span>
            <span>Created: {safePlan.createdAt || 'N/A'}</span>
            <span>Priority: {safePlan.priority || 'N/A'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowScheduleBuilder(true)}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Modify Schedule
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowAircraftManager(true)}
            className="flex items-center gap-2"
          >
            <Plane className="h-4 w-4" />
            Change Aircraft
          </Button>
          <Button 
            onClick={runSimulation}
            disabled={simulationRunning}
            className="flex items-center gap-2 bg-[#ff8200] hover:bg-[#ff8200]/90 text-white"
          >
            {simulationRunning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Alert with Plan Summary */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Recovery Plan Active:</strong> {safeSteps.length} step plan to resolve {safeFlight.disruptionReason || 'flight disruption'}. 
              Estimated recovery time: {safeTimeline.duration || 'N/A'}, Total cost: ${(safePlan.estimatedCost || 0).toLocaleString()}.
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {safeMetrics.successProbability || 0}% Success Rate
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                {safeMetrics.customerSatisfaction || 0}% Customer Satisfaction
              </span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Simulation Alert */}
      {showSimulation && (
        <Alert className="border-purple-200 bg-purple-50">
          <Zap className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <strong>Simulation Running:</strong> Analyzing impact of schedule and aircraft changes...
              </div>
              <div className="flex items-center gap-3">
                <Progress value={simulationProgress} className="w-32" />
                <span className="text-sm font-medium">{simulationProgress}%</span>
                {!simulationRunning && (
                  <Button size="sm" variant="outline" onClick={resetSimulation}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview" className="pb-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="schedule" className="pb-2">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="aircraft" className="pb-2">
            Aircraft
          </TabsTrigger>
          <TabsTrigger value="crew" className="pb-2">
            Crew Management
          </TabsTrigger>
          <TabsTrigger value="simulation" className="pb-2">
            Simulation
          </TabsTrigger>
          <TabsTrigger value="impact" className="pb-2">
            Impact Analysis
          </TabsTrigger>
          <TabsTrigger value="execution" className="pb-2">
            Execution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab 
            plan={safePlan} 
            flight={safeFlight} 
            modifiedSchedule={modifiedSchedule}
            selectedAircraft={selectedAircraft}
            showSimulation={showSimulation}
          />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleTab 
            plan={safePlan}
            flight={safeFlight}
            scheduleOptions={scheduleOptions}
            selectedSchedule={selectedSchedule}
            onScheduleChange={setSelectedSchedule}
            onApplyChanges={applyChanges}
          />
        </TabsContent>

        <TabsContent value="aircraft">
          <AircraftTab 
            availableAircraft={availableAircraft}
            currentAircraft={currentAircraft}
            onAircraftChange={setCurrentAircraft}
            onApplyChanges={applyChanges}
          />
        </TabsContent>

        <TabsContent value="crew">
          <CrewManagementTab 
            flight={safeFlight}
            plan={safePlan}
          />
        </TabsContent>

        <TabsContent value="simulation">
          <SimulationTab 
            showSimulation={showSimulation}
            simulationProgress={simulationProgress}
            modifiedSchedule={modifiedSchedule}
            selectedAircraft={selectedAircraft}
            originalPlan={safePlan}
            originalFlight={safeFlight}
          />
        </TabsContent>

        <TabsContent value="impact">
          <ImpactAnalysisTab 
            originalPlan={safePlan}
            modifiedSchedule={modifiedSchedule}
            selectedAircraft={selectedAircraft}
          />
        </TabsContent>

        <TabsContent value="execution">
          <ExecutionTab plan={safePlan} flight={safeFlight} />
        </TabsContent>
      </Tabs>

      {/* Schedule Builder Dialog */}
      <Dialog open={showScheduleBuilder} onOpenChange={setShowScheduleBuilder}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Schedule Builder</DialogTitle>
            <DialogDescription>
              Create or modify flight schedules and see real-time impact analysis
            </DialogDescription>
          </DialogHeader>
          <ScheduleBuilderContent 
            scheduleOptions={scheduleOptions}
            selectedSchedule={selectedSchedule}
            onScheduleChange={setSelectedSchedule}
            onClose={() => setShowScheduleBuilder(false)}
            onApply={applyChanges}
          />
        </DialogContent>
      </Dialog>

      {/* Aircraft Manager Dialog */}
      <Dialog open={showAircraftManager} onOpenChange={setShowAircraftManager}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Aircraft Manager</DialogTitle>
            <DialogDescription>
              Select or substitute aircraft for the recovery operation
            </DialogDescription>
          </DialogHeader>
          <AircraftManagerContent 
            availableAircraft={availableAircraft}
            currentAircraft={currentAircraft}
            onAircraftChange={setCurrentAircraft}
            onClose={() => setShowAircraftManager(false)}
            onApply={applyChanges}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CrewManagementTab({ flight = {}, plan = {} }) {
  const [selectedCrewMember, setSelectedCrewMember] = useState(null)
  const [showCrewSearch, setShowCrewSearch] = useState(false)
  const [showReserveAssignment, setShowReserveAssignment] = useState(false)
  const [currentCrew, setCurrentCrew] = useState([
    {
      id: 'CREW-001',
      name: 'Captain Sarah Johnson',
      role: 'Captain',
      certification: 'A321/A320',
      dutyTime: '4h 30m',
      restTime: '10h 45m',
      status: 'Available',
      phone: '+1-555-0123',
      email: 'sarah.johnson@airline.com',
      location: 'JFK Crew Lounge',
      qualifications: ['ATPL', 'Type Rating A321', 'Instructor'],
      languages: ['English', 'French'],
      experience: '15,000 hours',
      isAssigned: true
    },
    {
      id: 'CREW-002',
      name: 'First Officer Mike Chen',
      role: 'First Officer',
      certification: 'A321/A320',
      dutyTime: '3h 15m',
      restTime: '11h 30m',
      status: 'Available',
      phone: '+1-555-0124',
      email: 'mike.chen@airline.com',
      location: 'JFK Crew Lounge',
      qualifications: ['ATPL', 'Type Rating A321'],
      languages: ['English', 'Mandarin'],
      experience: '8,500 hours',
      isAssigned: true
    },
    {
      id: 'CREW-003',
      name: 'Senior FA Lisa Martinez',
      role: 'Senior Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '2h 45m',
      restTime: '12h 15m',
      status: 'Available',
      phone: '+1-555-0125',
      email: 'lisa.martinez@airline.com',
      location: 'JFK Terminal 4',
      qualifications: ['Safety Instructor', 'First Aid', 'Language Specialist'],
      languages: ['English', 'Spanish', 'Portuguese'],
      experience: '12 years',
      isAssigned: true
    },
    {
      id: 'CREW-004',
      name: 'FA James Wilson',
      role: 'Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '5h 20m',
      restTime: '8h 40m',
      status: 'Near Limit',
      phone: '+1-555-0126',
      email: 'james.wilson@airline.com',
      location: 'JFK Terminal 4',
      qualifications: ['First Aid', 'Security'],
      languages: ['English'],
      experience: '6 years',
      isAssigned: true
    }
  ])

  const [reserveCrew] = useState([
    {
      id: 'CREW-R001',
      name: 'Captain David Park',
      role: 'Captain',
      certification: 'A321/A320/A330',
      dutyTime: '0h',
      restTime: '16h',
      status: 'Standby',
      phone: '+1-555-0201',
      email: 'david.park@airline.com',
      location: 'Home (30 min response)',
      qualifications: ['ATPL', 'Type Rating A321/A330', 'Check Captain'],
      languages: ['English', 'Korean'],
      experience: '18,500 hours',
      calloutTime: '30 mins',
      isAssigned: false
    },
    {
      id: 'CREW-R002',
      name: 'First Officer Emma Thompson',
      role: 'First Officer',
      certification: 'A321/A320',
      dutyTime: '0h',
      restTime: '18h',
      status: 'Standby',
      phone: '+1-555-0202',
      email: 'emma.thompson@airline.com',
      location: 'Hotel (15 min response)',
      qualifications: ['ATPL', 'Type Rating A321'],
      languages: ['English'],
      experience: '6,200 hours',
      calloutTime: '15 mins',
      isAssigned: false
    },
    {
      id: 'CREW-R003',
      name: 'Senior FA Robert Kim',
      role: 'Senior Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '0h',
      restTime: '14h',
      status: 'Standby',
      phone: '+1-555-0203',
      email: 'robert.kim@airline.com',
      location: 'JFK Crew Rest',
      qualifications: ['Safety Instructor', 'First Aid', 'Purser Qualified'],
      languages: ['English', 'Korean', 'Japanese'],
      experience: '15 years',
      calloutTime: '10 mins',
      isAssigned: false
    },
    {
      id: 'CREW-R004',
      name: 'FA Jennifer Williams',
      role: 'Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '0h',
      restTime: '12h',
      status: 'Standby',
      phone: '+1-555-0204',
      email: 'jennifer.williams@airline.com',
      location: 'JFK Terminal 4',
      qualifications: ['First Aid', 'Safety Training'],
      languages: ['English', 'German'],
      experience: '8 years',
      calloutTime: '20 mins',
      isAssigned: false
    },
    {
      id: 'CREW-R005',
      name: 'FA Carlos Rodriguez',
      role: 'Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '0h',
      restTime: '15h',
      status: 'Standby',
      phone: '+1-555-0205',
      email: 'carlos.rodriguez@airline.com',
      location: 'Hotel (25 min response)',
      qualifications: ['First Aid', 'Language Specialist'],
      languages: ['English', 'Spanish', 'French'],
      experience: '10 years',
      calloutTime: '25 mins',
      isAssigned: false
    }
  ])

  const [allCrewMembers] = useState([
    // Include current and reserve crew plus additional searchable crew
    ...currentCrew,
    ...reserveCrew,
    {
      id: 'CREW-S001',
      name: 'Captain Michael Thompson',
      role: 'Captain',
      certification: 'A321/A320/B737',
      dutyTime: '2h 15m',
      restTime: '14h 30m',
      status: 'Available',
      phone: '+1-555-0301',
      email: 'michael.thompson@airline.com',
      location: 'JFK Operations Center',
      qualifications: ['ATPL', 'Type Rating A321/B737', 'Line Training Captain'],
      languages: ['English'],
      experience: '20,000 hours',
      isAssigned: false
    },
    {
      id: 'CREW-S002',
      name: 'First Officer Rachel Davis',
      role: 'First Officer',
      certification: 'A321/A320',
      dutyTime: '1h 45m',
      restTime: '16h 15m',
      status: 'Available',
      phone: '+1-555-0302',
      email: 'rachel.davis@airline.com',
      location: 'JFK Terminal 4',
      qualifications: ['ATPL', 'Type Rating A321', 'Safety Inspector'],
      languages: ['English', 'Italian'],
      experience: '7,800 hours',
      isAssigned: false
    }
  ])

  const crewRequirements = {
    captain: 1,
    firstOfficer: 1,
    seniorFA: 1,
    flightAttendants: 3,
    minimumRest: '8 hours',
    maximumDuty: '14 hours',
    aircraftType: 'A321',
    routeRequirements: ['Long-haul qualified', 'International rated']
  }

  const assignCrewMember = (crewMember, replaceCrewId = null) => {
    if (replaceCrewId) {
      // Replace existing crew member
      setCurrentCrew(prev => 
        prev.map(member => 
          member.id === replaceCrewId 
            ? { ...crewMember, isAssigned: true }
            : member
        )
      )
    } else {
      // Add new crew member
      setCurrentCrew(prev => [...prev, { ...crewMember, isAssigned: true }])
    }
  }

  const removeCrewMember = (crewId) => {
    setCurrentCrew(prev => prev.filter(member => member.id !== crewId))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'Standby': return 'bg-blue-100 text-blue-700'
      case 'Near Limit': return 'bg-yellow-100 text-yellow-700'
      case 'Unavailable': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Standby': return <Clock className="h-4 w-4 text-blue-600" />
      case 'Near Limit': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'Unavailable': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Crew Management</h3>
          <p className="text-muted-foreground">Manage crew assignments and availability for Flight {flight.number || 'N/A'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCrewSearch(true)}>
            <Search className="h-4 w-4 mr-2" />
            Find Crew
          </Button>
          <Button onClick={() => setShowReserveAssignment(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Reserve Crew
          </Button>
        </div>
      </div>

      {/* Crew Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Crew Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Flight Crew</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Captain:</span>
                  <span className="font-medium">{crewRequirements.captain} required</span>
                </div>
                <div className="flex justify-between">
                  <span>First Officer:</span>
                  <span className="font-medium">{crewRequirements.firstOfficer} required</span>
                </div>
                <div className="flex justify-between">
                  <span>Aircraft Type:</span>
                  <span className="font-medium">{crewRequirements.aircraftType}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Cabin Crew</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Senior FA:</span>
                  <span className="font-medium">{crewRequirements.seniorFA} required</span>
                </div>
                <div className="flex justify-between">
                  <span>Flight Attendants:</span>
                  <span className="font-medium">{crewRequirements.flightAttendants} required</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cabin Crew:</span>
                  <span className="font-medium">{crewRequirements.seniorFA + crewRequirements.flightAttendants}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Regulatory Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Minimum Rest:</span>
                  <span className="font-medium">{crewRequirements.minimumRest}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum Duty:</span>
                  <span className="font-medium">{crewRequirements.maximumDuty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Route Qualified:</span>
                  <Badge variant="outline" className="text-xs">Required</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Crew Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Crew Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentCrew.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role} • {member.certification}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3 w-3" />
                        Duty: {member.dutyTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        Rest: {member.restTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(member.status)}>
                    {getStatusIcon(member.status)}
                    {member.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCrewMember(member)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeCrewMember(member.id)}>
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reserve Crew */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Available Reserve Crew
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reserveCrew.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role} • {member.certification}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3 w-3" />
                        Rest: {member.restTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        Callout: {member.calloutTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(member.status)}>
                    {getStatusIcon(member.status)}
                    {member.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => assignCrewMember(member)}>
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crew Search Dialog */}
      <CrewSearchDialog
        open={showCrewSearch}
        onOpenChange={setShowCrewSearch}
        allCrewMembers={allCrewMembers}
        onAssignCrew={assignCrewMember}
      />

      {/* Reserve Crew Assignment Dialog */}
      <ReserveCrewAssignmentDialog
        open={showReserveAssignment}
        onOpenChange={setShowReserveAssignment}
        reserveCrew={reserveCrew}
        currentCrew={currentCrew}
        onAssignCrew={assignCrewMember}
      />

      {/* Crew Member Details Dialog */}
      {selectedCrewMember && (
        <Dialog open={!!selectedCrewMember} onOpenChange={() => setSelectedCrewMember(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crew Member Details</DialogTitle>
              <DialogDescription>
                Detailed information for {selectedCrewMember.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{selectedCrewMember.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Role:</span>
                      <span className="font-medium">{selectedCrewMember.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-medium">{selectedCrewMember.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{selectedCrewMember.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{selectedCrewMember.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Duty Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Duty:</span>
                      <span className="font-medium">{selectedCrewMember.dutyTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rest Period:</span>
                      <span className="font-medium">{selectedCrewMember.restTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedCrewMember.status)}>
                        {selectedCrewMember.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{selectedCrewMember.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Qualifications & Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCrewMember.qualifications?.map((qual, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                      <Award className="h-3 w-3 mr-1" />
                      {qual}
                    </Badge>
                  )) || []}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCrewMember.languages?.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  )) || []}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function CrewSearchDialog({ open, onOpenChange, allCrewMembers, onAssignCrew }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [certificationFilter, setCertificationFilter] = useState('all')

  const filteredCrew = allCrewMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    const matchesCertification = certificationFilter === 'all' || 
                                member.certification.includes(certificationFilter)
    
    return matchesSearch && matchesRole && matchesStatus && matchesCertification && !member.isAssigned
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'Standby': return 'bg-blue-100 text-blue-700'
      case 'Near Limit': return 'bg-yellow-100 text-yellow-700'
      case 'Unavailable': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Find Crew Members</DialogTitle>
          <DialogDescription>
            Search and filter available crew members to assign to this flight
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search by name or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Captain">Captain</SelectItem>
                  <SelectItem value="First Officer">First Officer</SelectItem>
                  <SelectItem value="Senior Flight Attendant">Senior Flight Attendant</SelectItem>
                  <SelectItem value="Flight Attendant">Flight Attendant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Standby">Standby</SelectItem>
                  <SelectItem value="Near Limit">Near Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Certification</Label>
              <Select value={certificationFilter} onValueChange={setCertificationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Certifications</SelectItem>
                  <SelectItem value="A321">A321</SelectItem>
                  <SelectItem value="A320">A320</SelectItem>
                  <SelectItem value="A330">A330</SelectItem>
                  <SelectItem value="B737">B737</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredCrew.length > 0 ? (
              filteredCrew.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role} • {member.certification}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Experience: {member.experience}</span>
                        <span>Location: {member.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        onAssignCrew(member)
                        onOpenChange(false)
                      }}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No crew members found matching your criteria</p>
                <p className="text-sm">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ReserveCrewAssignmentDialog({ open, onOpenChange, reserveCrew, currentCrew, onAssignCrew }) {
  const [selectedReserveMember, setSelectedReserveMember] = useState(null)
  const [replacementMode, setReplacementMode] = useState(false)
  const [memberToReplace, setMemberToReplace] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'Standby': return 'bg-blue-100 text-blue-700'
      case 'Near Limit': return 'bg-yellow-100 text-yellow-700'
      case 'Unavailable': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleAssignment = () => {
    if (selectedReserveMember) {
      if (replacementMode && memberToReplace) {
        onAssignCrew(selectedReserveMember, memberToReplace.id)
      } else {
        onAssignCrew(selectedReserveMember)
      }
      onOpenChange(false)
      setSelectedReserveMember(null)
      setReplacementMode(false)
      setMemberToReplace(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Assign Reserve Crew</DialogTitle>
          <DialogDescription>
            Select reserve crew members to assign or replace current crew
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assignment Mode Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant={!replacementMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setReplacementMode(false)
                setMemberToReplace(null)
              }}
            >
              Add to Crew
            </Button>
            <Button
              variant={replacementMode ? "default" : "outline"}
              size="sm"
              onClick={() => setReplacementMode(true)}
            >
              Replace Crew Member
            </Button>
          </div>

          {/* Current Crew Selection (for replacement mode) */}
          {replacementMode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Crew Member to Replace</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentCrew.map((member) => (
                    <div
                      key={member.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        memberToReplace?.id === member.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => setMemberToReplace(member)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reserve Crew Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Reserve Crew</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reserveCrew.map((member) => (
                  <div
                    key={member.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedReserveMember?.id === member.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedReserveMember(member)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role} • {member.certification}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Rest: {member.restTime}</span>
                            <span>Callout: {member.calloutTime}</span>
                            <span>{member.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {replacementMode && memberToReplace && selectedReserveMember && (
              <div className="flex items-center gap-2">
                <span>Replace {memberToReplace.name} with {selectedReserveMember.name}</span>
              </div>
            )}
            {!replacementMode && selectedReserveMember && (
              <div className="flex items-center gap-2">
                <span>Add {selectedReserveMember.name} to crew</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignment}
              disabled={!selectedReserveMember || (replacementMode && !memberToReplace)}
            >
              {replacementMode ? 'Replace Crew Member' : 'Add to Crew'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OverviewTab({ plan = {}, flight = {}, modifiedSchedule, selectedAircraft, showSimulation }) {
  // Safety checks for all properties
  const safeSteps = plan.steps || []
  const safeTimeline = plan.timeline || {}
  const safeMetrics = plan.metrics || {}
  const safeCostBreakdown = plan.costBreakdown || {}
  const safeRiskAssessment = plan.riskAssessment || {}
  const safeAlternatives = plan.alternatives || {}

  return (
    <div className="space-y-6">
      {/* Enhanced Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600">Success Rate</p>
                <p className="text-2xl font-semibold text-green-900">{plan.confidence || 0}%</p>
                <p className="text-xs text-green-600">AI Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600">Total Cost</p>
                <p className="text-2xl font-semibold text-blue-900">${((plan.estimatedCost || 0) / 1000).toFixed(0)}K</p>
                <p className="text-xs text-blue-600">All inclusive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600">Recovery Time</p>
                <p className="text-2xl font-semibold text-orange-900">{safeTimeline.duration || 'N/A'}</p>
                <p className="text-xs text-orange-600">{plan.estimatedDelay || 0} min delay</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600">Passengers</p>
                <p className="text-2xl font-semibold text-purple-900">{plan.affectedPassengers || 0}</p>
                <p className="text-xs text-purple-600">Affected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flight and Disruption Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label>Flight Number</Label>
                <p className="font-medium font-mono">{flight.number || 'N/A'}</p>
              </div>
              <div>
                <Label>Aircraft</Label>
                <p className="font-medium">{flight.aircraft || 'N/A'} ({flight.aircraftType || 'N/A'})</p>
              </div>
              <div>
                <Label>Route</Label>
                <p className="font-medium">{flight.route || 'N/A'}</p>
              </div>
              <div>
                <Label>Gate</Label>
                <p className="font-medium">Terminal {flight.terminal || 'N/A'}, Gate {flight.gate || 'N/A'}</p>
              </div>
              <div>
                <Label>Scheduled Departure</Label>
                <p className="font-medium">{flight.scheduledDeparture || 'N/A'}</p>
              </div>
              <div>
                <Label>Scheduled Arrival</Label>
                <p className="font-medium">{flight.scheduledArrival || 'N/A'}</p>
              </div>
              <div>
                <Label>Passengers</Label>
                <p className="font-medium">{flight.passengers || 0} / {flight.crew || 0} crew</p>
              </div>
              <div>
                <Label>Cargo</Label>
                <p className="font-medium">{flight.cargo || 'N/A'}</p>
              </div>
            </div>
            <Separator />
            <div>
              <Label>Disruption Reason</Label>
              <div className="flex items-center gap-2 mt-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="font-medium">{flight.disruptionReason || 'Unknown disruption'}</span>
                <Badge className={
                  flight.disruptionSeverity === 'High' ? 'bg-red-100 text-red-700' :
                  flight.disruptionSeverity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }>
                  {flight.disruptionSeverity || 'Unknown'} Severity
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Plan Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Probability</span>
                <div className="flex items-center gap-2">
                  <Progress value={safeMetrics.successProbability || 0} className="w-24" />
                  <span className="font-semibold text-sm">{safeMetrics.successProbability || 0}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Satisfaction</span>
                <div className="flex items-center gap-2">
                  <Progress value={safeMetrics.customerSatisfaction || 0} className="w-24" />
                  <span className="font-semibold text-sm">{safeMetrics.customerSatisfaction || 0}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">On-Time Performance</span>
                <div className="flex items-center gap-2">
                  <Progress value={safeMetrics.onTimePerformance || 0} className="w-24" />
                  <span className="font-semibold text-sm">{safeMetrics.onTimePerformance || 0}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Efficiency</span>
                <div className="flex items-center gap-2">
                  <Progress value={safeMetrics.costEfficiency || 0} className="w-24" />
                  <span className="font-semibold text-sm">{safeMetrics.costEfficiency || 0}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      {Object.keys(safeCostBreakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(safeCostBreakdown).map(([category, cost]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-semibold">${(cost || 0).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {(((cost || 0) / (plan.estimatedCost || 1)) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Assessment */}
      {Object.keys(safeRiskAssessment).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(safeRiskAssessment).map(([risk, level]) => (
                <div key={risk} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm capitalize">{risk.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <Badge className={
                    level === 'High' ? 'bg-red-100 text-red-700' :
                    level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }>
                    {level || 'Unknown'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current vs Modified Comparison */}
      {showSimulation && (modifiedSchedule || selectedAircraft) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Simulation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Plan */}
              <div>
                <h4 className="font-medium mb-4 text-muted-foreground">Original Plan</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Aircraft:</span>
                    <span className="font-medium">{flight.aircraft || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure:</span>
                    <span className="font-medium">{safeTimeline.start || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{safeTimeline.duration || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">${(plan.estimatedCost || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Modified Plan */}
              <div>
                <h4 className="font-medium mb-4 text-green-600">Modified Plan</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Aircraft:</span>
                    <span className="font-medium">
                      {selectedAircraft?.id || flight.aircraft || 'N/A'}
                      {selectedAircraft && (
                        <Badge className="ml-2 bg-green-100 text-green-700">Changed</Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure:</span>
                    <span className="font-medium">
                      {modifiedSchedule?.departureTime || safeTimeline.start || 'N/A'}
                      {modifiedSchedule && (
                        <Badge className="ml-2 bg-blue-100 text-blue-700">Updated</Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      {modifiedSchedule?.delay || safeTimeline.duration || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">
                      ${(modifiedSchedule?.cost || plan.estimatedCost || 0).toLocaleString()}
                      {modifiedSchedule && (modifiedSchedule.cost || 0) < (plan.estimatedCost || 0) && (
                        <TrendingDown className="inline h-4 w-4 ml-1 text-green-600" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recovery Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recovery Steps Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeSteps.length > 0 ? (
              safeSteps.map((step, index) => (
                <div key={step.id || index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      step.criticalPath 
                        ? 'bg-red-100 text-red-700 border-2 border-red-200' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{step.action || 'No action specified'}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.description || ''}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {step.duration || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {step.responsible || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {step.location || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${(step.estimatedCost || 0).toLocaleString()}
                          </span>
                        </div>
                        {step.dependencies && step.dependencies.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">
                              Depends on steps: {step.dependencies.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {step.criticalPath && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Critical Path
                          </Badge>
                        )}
                        <Badge className={
                          step.status === 'completed' ? 'bg-green-100 text-green-700' :
                          step.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {step.status === 'pending' ? 'Pending' : step.status || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recovery steps available</p>
                <p className="text-sm">Recovery plan steps will appear here once generated</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plan Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-3">Creation Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan ID:</span>
                  <span className="font-medium font-mono">{plan.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created By:</span>
                  <span className="font-medium">{plan.createdBy || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created At:</span>
                  <span className="font-medium">{plan.createdAt || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className="bg-blue-100 text-blue-700">{plan.executionStatus || 'Unknown'}</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Alternative Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Options Considered:</span>
                  <span className="font-medium">{safeAlternatives.considered || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Feasible Options:</span>
                  <span className="font-medium">{safeAlternatives.feasible || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rejected Options:</span>
                  <span className="font-medium">{safeAlternatives.rejected || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Rank:</span>
                  <span className="font-medium">#1 (Best Option)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Execution Timeline</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Start Time:</span>
                  <span className="font-medium">{safeTimeline.start || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion:</span>
                  <span className="font-medium">{safeTimeline.completion || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Duration:</span>
                  <span className="font-medium">{safeTimeline.duration || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Steps:</span>
                  <span className="font-medium">{safeSteps.filter(s => s.criticalPath).length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScheduleTab({ plan = {}, flight = {}, scheduleOptions = [], selectedSchedule, onScheduleChange, onApplyChanges }) {
  const safeTimeline = plan.timeline || {}

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Original Departure</Label>
              <p className="font-medium">{flight.scheduledDeparture || 'N/A'}</p>
            </div>
            <div>
              <Label>Current Status</Label>
              <Badge className="bg-red-100 text-red-700">Delayed</Badge>
            </div>
            <div>
              <Label>Recovery Target</Label>
              <p className="font-medium">{safeTimeline.start || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alternative Schedules</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select an alternative schedule or create a custom one
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleOptions.map((option) => (
              <div 
                key={option.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedSchedule?.id === option.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-border hover:bg-accent'
                }`}
                onClick={() => onScheduleChange(option)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{option.name}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Departure: {option.departureTime}</span>
                      <span>Delay: {option.delay}</span>
                      <span>Cost: ${option.cost.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`mb-2 ${
                      option.passengerImpact === 'Minimal' ? 'bg-green-100 text-green-700' :
                      option.passengerImpact === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {option.passengerImpact} Impact
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {option.probability}% Success Rate
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Schedule
            </Button>
            <Button onClick={onApplyChanges}>
              Apply Schedule Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AircraftTab({ availableAircraft = [], currentAircraft, onAircraftChange, onApplyChanges }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Aircraft</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a substitute aircraft for the recovery operation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableAircraft.map((aircraft) => (
              <div 
                key={aircraft.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  currentAircraft?.id === aircraft.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-border hover:bg-accent'
                }`}
                onClick={() => onAircraftChange(aircraft)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{aircraft.id}</h4>
                      <p className="text-sm text-muted-foreground">{aircraft.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      aircraft.suitability >= 90 ? 'bg-green-100 text-green-700' :
                      aircraft.suitability >= 80 ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }>
                      {aircraft.suitability}% Suitable
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <Label>Capacity</Label>
                    <p className="font-medium">{aircraft.capacity} pax</p>
                  </div>
                  <div>
                    <Label>Range</Label>
                    <p className="font-medium">{aircraft.range}</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="font-medium">{aircraft.location}</p>
                  </div>
                  <div>
                    <Label>Ready Time</Label>
                    <p className="font-medium">{aircraft.readyTime}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <Label>Suitability Score</Label>
                  <Progress value={aircraft.suitability} className="mt-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Request Additional Aircraft
            </Button>
            <Button onClick={onApplyChanges}>
              Apply Aircraft Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SimulationTab({ showSimulation, simulationProgress, modifiedSchedule, selectedAircraft, originalPlan = {}, originalFlight = {} }) {
  if (!showSimulation) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Gauge className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No Simulation Running</h3>
          <p className="text-sm text-muted-foreground">Run a simulation to see impact analysis</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Recovery Plan Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span>Simulation Progress</span>
              <div className="flex items-center gap-3">
                <Progress value={simulationProgress} className="w-48" />
                <span className="font-semibold">{simulationProgress}%</span>
              </div>
            </div>

            {simulationProgress === 100 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cost Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Original Cost:</span>
                        <span>${(originalPlan.estimatedCost || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified Cost:</span>
                        <span>${(modifiedSchedule?.cost || originalPlan.estimatedCost || 0).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Savings:</span>
                        <span className="text-green-600">
                          ${((originalPlan.estimatedCost || 0) - (modifiedSchedule?.cost || originalPlan.estimatedCost || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Original Delay:</span>
                        <span>{originalPlan.estimatedDelay || 0} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified Delay:</span>
                        <span>{modifiedSchedule?.delay || `${originalPlan.estimatedDelay || 0} min`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Improvement:</span>
                        <span className="text-green-600">
                          {modifiedSchedule ? '45 min saved' : 'No change'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ImpactAnalysisTab({ originalPlan = {}, modifiedSchedule, selectedAircraft }) {
  const crewIssues = [
    {
      id: 1,
      type: 'Duty Time Violation',
      severity: 'Critical',
      crew: 'Captain Sarah Mitchell',
      description: 'Extended duty period would exceed 14-hour limit by 2.5 hours',
      regulation: 'Part 117.23(b)',
      recommendation: 'Assign fresh crew or split duty period'
    },
    {
      id: 2,
      type: 'Rest Period Insufficient',
      severity: 'High',
      crew: 'FO Michael Chen',
      description: 'Minimum rest period of 10 hours not met (only 8.5 hours available)',
      regulation: 'Part 117.25(d)',
      recommendation: 'Delay departure by 90 minutes or use standby crew'
    },
    {
      id: 3,
      type: 'Training Currency',
      severity: 'Medium',
      crew: 'FA Lisa Rodriguez',
      description: 'Aircraft type familiarization required for A330 substitution',
      regulation: 'Part 121.427',
      recommendation: 'Complete 2-hour familiarization course or assign A321-qualified crew'
    },
    {
      id: 4,
      type: 'Route Authorization',
      severity: 'Medium', 
      crew: 'Captain Sarah Mitchell',
      description: 'Alternate route requires specific airport qualification for KJFK runway 31L',
      regulation: 'Part 121.436',
      recommendation: 'Complete route briefing or assign qualified captain'
    }
  ]

  const legalCompliance = [
    {
      category: 'Flight Duty Period',
      status: 'Non-Compliant',
      details: '2 crew members exceed maximum FDP',
      action: 'Required'
    },
    {
      category: 'Rest Requirements',
      status: 'Non-Compliant', 
      details: '1 crew member insufficient rest',
      action: 'Required'
    },
    {
      category: 'Training Currency',
      status: 'Attention Needed',
      details: 'Aircraft familiarization required',
      action: 'Recommended'
    },
    {
      category: 'Medical Certificates',
      status: 'Compliant',
      details: 'All certificates valid',
      action: 'None'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Impact Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis of crew legality and operational impacts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Submit for Review
          </Button>
        </div>
      </div>

      {/* Crew Legality Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Crew Legality Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crewIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{issue.type}</h4>
                    <Badge className={
                      issue.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      issue.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {issue.severity}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{issue.crew}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-blue-600">{issue.regulation}</span>
                  <span className="text-green-600">{issue.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Compliance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Compliance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Action Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legalCompliance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>
                    <Badge className={
                      item.status === 'Compliant' ? 'bg-green-100 text-green-700' :
                      item.status === 'Non-Compliant' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.details}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      item.action === 'Required' ? 'border-red-200 text-red-700' :
                      item.action === 'Recommended' ? 'border-yellow-200 text-yellow-700' :
                      'border-gray-200 text-gray-700'
                    }>
                      {item.action}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cost Impact Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Original Plan Cost</span>
                <span className="font-medium">${(originalPlan.estimatedCost || 0).toLocaleString()}</span>
              </div>
              {modifiedSchedule && (
                <div className="flex justify-between items-center">
                  <span>Modified Schedule Cost</span>
                  <span className="font-medium">${(modifiedSchedule.cost || 0).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Crew Compliance Costs</span>
                <span className="font-medium text-red-600">+$12,400</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total Estimated Cost</span>
                <span className="text-lg">${((originalPlan.estimatedCost || 0) + 12400).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Passenger Impact</span>
                <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Network Disruption</span>
                <Badge className="bg-green-100 text-green-700">Low</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Recovery Time</span>
                <span className="font-medium">4h 30m</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Success Probability</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            AERON Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Immediate Action Required</p>
                <p className="text-sm text-muted-foreground">
                  Address crew duty time violations by assigning fresh crew or adjusting schedule
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Alternative Recommendation</p>
                <p className="text-sm text-muted-foreground">
                  Consider delaying departure by 2 hours to ensure full regulatory compliance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="h-2 w-2 bg-yellow-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Cost Optimization</p>
                <p className="text-sm text-muted-foreground">
                  Negotiate passenger compensation to minimize total recovery costs
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ExecutionTab({ plan = {}, flight = {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const safeSteps = plan.steps || []
  const safeCostBreakdown = plan.costBreakdown || {}
  const safeTimeline = plan.timeline || {}

  // Mock crew data - in a real application this would come from props or API
  const assignedCrew = [
    {
      id: 'CREW-001',
      name: 'Captain Sarah Johnson',
      role: 'Captain',
      certification: 'A321/A320',
      dutyTime: '4h 30m',
      restTime: '10h 45m',
      status: 'Available',
      experience: '15,000 hours'
    },
    {
      id: 'CREW-002',
      name: 'First Officer Mike Chen',
      role: 'First Officer',
      certification: 'A321/A320',
      dutyTime: '3h 15m',
      restTime: '11h 30m',
      status: 'Available',
      experience: '8,500 hours'
    },
    {
      id: 'CREW-003',
      name: 'Senior FA Lisa Martinez',
      role: 'Senior Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '2h 45m',
      restTime: '12h 15m',
      status: 'Available',
      experience: '12 years'
    },
    {
      id: 'CREW-004',
      name: 'FA James Wilson',
      role: 'Flight Attendant',
      certification: 'Cabin Crew',
      dutyTime: '5h 20m',
      restTime: '8h 40m',
      status: 'Near Limit',
      experience: '6 years'
    }
  ]

  const handleSendForApproval = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Recovery Plan Submitted Successfully</h3>
          <p className="text-muted-foreground mb-6">
            Plan ID: {plan.id || 'RP-2025-001'} has been submitted for approval.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              View Plan Details
            </Button>
            <Button>
              Track Approval Status
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recovery Plan Preview</h3>
          <p className="text-sm text-muted-foreground">
            Final review before submitting for approval
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            onClick={handleSendForApproval}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send for Approval
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recovery Plan Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Plan Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan ID:</span>
                  <span className="font-medium font-mono">{plan.id || 'RP-2025-001'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className="bg-blue-100 text-blue-700">{plan.status || 'Ready for Approval'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Priority:</span>
                  <Badge className="bg-red-100 text-red-700">{plan.priority || 'High'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="font-medium">{plan.confidence || 94.2}%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Start Time:</span>
                  <span className="font-medium">{safeTimeline.start || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion:</span>
                  <span className="font-medium">{safeTimeline.completion || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{safeTimeline.duration || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Steps:</span>
                  <span className="font-medium">{safeSteps.length} actions</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Financial Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="font-medium">${(plan.estimatedCost || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Affected PAX:</span>
                  <span className="font-medium">{plan.affectedPassengers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Delay:</span>
                  <span className="font-medium">{plan.estimatedDelay || 0} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium text-green-600">{plan.confidence || 94.2}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Flight Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Flight Number:</span>
                  <span className="font-medium font-mono">{flight.number || 'EK123'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span className="font-medium">{flight.route || 'JFK → DXB'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aircraft:</span>
                  <span className="font-medium">{flight.aircraft || 'A321-001'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aircraft Type:</span>
                  <span className="font-medium">{flight.aircraftType || 'Airbus A321-200'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gate:</span>
                  <span className="font-medium">Terminal {flight.terminal || '4'}, Gate {flight.gate || 'B12'}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Schedule & Passengers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Scheduled Departure:</span>
                  <span className="font-medium">{flight.scheduledDeparture || '2025-06-06 14:30'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Arrival:</span>
                  <span className="font-medium">{flight.scheduledArrival || '2025-06-07 05:15'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span className="font-medium">{flight.passengers || 158}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crew:</span>
                  <span className="font-medium">{flight.crew || 8}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cargo:</span>
                  <span className="font-medium">{flight.cargo || '12.5 tons'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="font-medium mb-2">Disruption Details</h4>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="font-medium">{flight.disruptionReason || 'Technical Issue - Engine warning light'}</span>
              <Badge className="bg-red-100 text-red-700">
                {flight.disruptionSeverity || 'High'} Severity
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Crew */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assigned Crew Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedCrew.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>Experience: {member.experience}</span>
                    <span>Status: {member.status}</span>
                  </div>
                </div>
                <Badge className={
                  member.status === 'Available' ? 'bg-green-100 text-green-700' :
                  member.status === 'Near Limit' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }>
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      {Object.keys(safeCostBreakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(safeCostBreakdown).map(([category, cost]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-semibold">${(cost || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Estimated Cost:</span>
              <span className="text-lg font-semibold">${(plan.estimatedCost || 0).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recovery Steps Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recovery Steps Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeSteps.length > 0 ? (
              safeSteps.map((step, index) => (
                <div key={step.id || index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      step.criticalPath 
                        ? 'bg-red-100 text-red-700 border-2 border-red-200' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{step.action || 'No action specified'}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.description || ''}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {step.duration || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {step.responsible || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {step.location || 'N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${(step.estimatedCost || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {step.criticalPath && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Critical Path
                          </Badge>
                        )}
                        <Badge className="bg-gray-100 text-gray-700">
                          Ready
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recovery steps available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Final Approval Section */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-900">Ready for Approval</h4>
              <p className="text-sm text-green-700">
                This recovery plan has been validated and is ready for submission to operations management.
              </p>
            </div>
            <Button 
              onClick={handleSendForApproval}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send for Approval
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScheduleBuilderContent({ scheduleOptions = [], selectedSchedule, onScheduleChange, onClose, onApply }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-4">Available Schedules</h4>
          <div className="space-y-3">
            {scheduleOptions.map((option) => (
              <div 
                key={option.id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedSchedule?.id === option.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-accent'
                }`}
                onClick={() => onScheduleChange(option)}
              >
                <h5 className="font-medium">{option.name}</h5>
                <p className="text-sm text-muted-foreground">{option.departureTime}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-4">Schedule Details</h4>
          {selectedSchedule && (
            <div className="space-y-3">
              <div>
                <Label>Departure Time</Label>
                <Input value={selectedSchedule.departureTime} readOnly />
              </div>
              <div>
                <Label>Delay</Label>
                <Input value={selectedSchedule.delay} readOnly />
              </div>
              <div>
                <Label>Cost</Label>
                <Input value={`$${selectedSchedule.cost.toLocaleString()}`} readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onApply}>Apply Changes</Button>
      </div>
    </div>
  )
}

function AircraftManagerContent({ availableAircraft = [], currentAircraft, onAircraftChange, onClose, onApply }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {availableAircraft.map((aircraft) => (
          <div 
            key={aircraft.id}
            className={`p-4 border rounded cursor-pointer ${
              currentAircraft?.id === aircraft.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-accent'
            }`}
            onClick={() => onAircraftChange(aircraft)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{aircraft.id}</h4>
                <p className="text-sm text-muted-foreground">{aircraft.type}</p>
              </div>
              <Badge className={
                aircraft.suitability >= 90 ? 'bg-green-100 text-green-700' :
                aircraft.suitability >= 80 ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }>
                {aircraft.suitability}% Suitable
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onApply}>Apply Changes</Button>
      </div>
    </div>
  )
}