'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'
import { Slider } from './ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { 
  Zap, 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp, 
  Plane, 
  Settings, 
  RefreshCw,
  Target,
  AlertTriangle,
  CheckCircle,
  Star,
  Eye,
  Play,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
  ArrowRight,
  MapPin,
  Timer,
  UserCheck,
  ArrowLeft,
  Filter,
  Search
} from 'lucide-react'

const optimizationParameters = {
  costMinimization: { name: 'Cost Minimization', icon: DollarSign, color: 'green', weight: 25 },
  timeEfficiency: { name: 'Time Efficiency', icon: Clock, color: 'blue', weight: 25 },
  passengerSatisfaction: { name: 'Passenger Satisfaction', icon: Users, color: 'purple', weight: 25 },
  otpImpact: { name: 'OTP Recovery', icon: TrendingUp, color: 'orange', weight: 25 },
  resourceOptimization: { name: 'Resource Optimization', icon: Plane, color: 'indigo', weight: 0 },
  riskMinimization: { name: 'Risk Minimization', icon: AlertTriangle, color: 'red', weight: 0 }
}

// Mock flight data for selection
const availableFlights = [
  {
    id: 'FL_001',
    flightNumber: 'FZ215',
    origin: 'DXB',
    destination: 'BOM', 
    originCity: 'Dubai',
    destinationCity: 'Mumbai',
    scheduledDeparture: '2025-01-10T15:30:00',
    scheduledArrival: '2025-01-10T20:15:00',
    currentStatus: 'Delayed',
    delay: 120,
    aircraft: 'B737-800',
    gate: 'T2-B12',
    passengers: 189,
    crew: 6,
    disruptionType: 'weather',
    severity: 'high',
    impact: 'Departure delayed due to sandstorm at DXB',
    lastUpdate: '2 mins ago',
    priority: 'High',
    connectionFlights: 8,
    vipPassengers: 4
  },
  {
    id: 'FL_002',
    flightNumber: 'FZ203',
    origin: 'DXB',
    destination: 'DEL',
    originCity: 'Dubai', 
    destinationCity: 'Delhi',
    scheduledDeparture: '2025-01-10T16:45:00',
    scheduledArrival: '2025-01-10T21:20:00',
    currentStatus: 'Cancelled',
    delay: null,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A08',
    passengers: 195,
    crew: 6,
    disruptionType: 'weather',
    severity: 'high',
    impact: 'Flight cancelled due to severe fog at DEL',
    lastUpdate: '5 mins ago',
    priority: 'Critical',
    connectionFlights: 5,
    vipPassengers: 3
  },
  {
    id: 'FL_003',
    flightNumber: 'FZ235',
    origin: 'KHI',
    destination: 'DXB',
    originCity: 'Karachi',
    destinationCity: 'Dubai',
    scheduledDeparture: '2025-01-10T08:30:00',
    scheduledArrival: '2025-01-10T11:45:00',
    currentStatus: 'Diverted',
    delay: 180,
    aircraft: 'B737-800',
    gate: 'T2-C15',
    passengers: 181,
    crew: 6,
    disruptionType: 'weather',
    severity: 'medium',
    impact: 'Diverted to AUH due to DXB closure',
    lastUpdate: '8 mins ago',
    priority: 'High',
    connectionFlights: 7,
    vipPassengers: 2
  },
  {
    id: 'FL_004',
    flightNumber: 'FZ147',
    origin: 'IST',
    destination: 'DXB',
    originCity: 'Istanbul',
    destinationCity: 'Dubai',
    scheduledDeparture: '2025-01-10T21:15:00',
    scheduledArrival: '2025-01-11T03:30:00',
    currentStatus: 'Delayed',
    delay: 45,
    aircraft: 'B737 MAX 8',
    gate: 'T2-A15',
    passengers: 189,
    crew: 6,
    disruptionType: 'technical',
    severity: 'medium',
    impact: 'Aircraft maintenance check delay',
    lastUpdate: '12 mins ago',
    priority: 'Medium',
    connectionFlights: 4,
    vipPassengers: 2
  },
  {
    id: 'FL_005',
    flightNumber: 'FZ181',
    origin: 'DXB',
    destination: 'COK',
    originCity: 'Dubai',
    destinationCity: 'Kochi',
    scheduledDeparture: '2025-01-10T14:20:00',
    scheduledArrival: '2025-01-10T19:45:00',
    currentStatus: 'Delayed',
    delay: 90,
    aircraft: 'B737-800',
    gate: 'T2-B12',
    passengers: 175,
    crew: 6,
    disruptionType: 'crew',
    severity: 'medium',
    impact: 'Crew duty time limitation',
    lastUpdate: '15 mins ago',
    priority: 'Medium',
    connectionFlights: 3,
    vipPassengers: 1
  }
]

export function RecoveryOptionsGenerator({ selectedFlight, onSelectPlan, onCompare }) {
  const [optimizationWeights, setOptimizationWeights] = useState(optimizationParameters)
  const [recoveryOptions, setRecoveryOptions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendedOption, setRecommendedOption] = useState(null)
  const [lastGenerated, setLastGenerated] = useState(null)
  const [selectedFlights, setSelectedFlights] = useState(selectedFlight || [])
  const [showFlightSelector, setShowFlightSelector] = useState(!selectedFlight || selectedFlight.length === 0)
  const [flightFilters, setFlightFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all'
  })

  const generateRecoveryOptions = () => {
    setIsGenerating(true)
    
    // Simulate AI processing time
    setTimeout(() => {
      const options = generateOptionsForFlights(selectedFlights, optimizationWeights)
      setRecoveryOptions(options)
      setRecommendedOption(options.find(opt => opt.recommended))
      setLastGenerated(new Date())
      setIsGenerating(false)
    }, 2500)
  }

  const generateOptionsForFlights = (flights, weights) => {
    if (!flights || flights.length === 0) return []

    // Calculate total impact
    const totalPassengers = flights.reduce((sum, f) => sum + f.passengers, 0)
    const totalConnections = flights.reduce((sum, f) => sum + f.connectionFlights, 0)
    const avgDelay = flights.filter(f => f.delay).reduce((sum, f) => sum + f.delay, 0) / flights.filter(f => f.delay).length || 0

    const baseOptions = [
      {
        id: 'OPT_A',
        name: 'Aircraft Substitution',
        type: 'Equipment Change',
        description: 'Replace affected aircraft with available backup fleet',
        estimatedCost: 145000 + (flights.length * 25000),
        timeToImplement: 60 + (flights.length * 15),
        passengerImpact: Math.floor(totalPassengers * 0.1),
        otpRecovery: 92,
        riskLevel: 'Low',
        resourceRequirement: 'Medium',
        feasibility: 94,
        recommended: false,
        affectedFlights: flights.length,
        details: {
          implementation: `Substitute ${flights.length} aircraft with backup fleet`,
          passengerHandling: 'Minimal rebooking required - same routing',
          crewAssignment: 'Current crews can operate substitute aircraft',
          maintenanceImpact: 'Additional aircraft utilization',
          timeline: 'Implementation within 60-90 minutes',
          estimatedDelay: '15-30 minutes additional delay'
        },
        flightSpecific: flights.map(flight => ({
          flightNumber: flight.flightNumber,
          originalAircraft: flight.aircraft,
          substituteAircraft: flight.aircraft.includes('A380') ? 'B777-300ER' : 'A350-900',
          seatReduction: flight.aircraft.includes('A380') ? 89 : 0,
          estimatedDelay: 25
        }))
      },
      {
        id: 'OPT_B',
        name: 'Flight Consolidation',
        type: 'Schedule Optimization',
        description: 'Consolidate passengers onto available flights with capacity',
        estimatedCost: 89000 + (flights.length * 15000),
        timeToImplement: 120 + (flights.length * 20),
        passengerImpact: Math.floor(totalPassengers * 0.7),
        otpRecovery: 78,
        riskLevel: 'Medium',
        resourceRequirement: 'Low',
        feasibility: 85,
        recommended: false,
        affectedFlights: flights.length,
        details: {
          implementation: `Redistribute ${totalPassengers} passengers across ${Math.ceil(flights.length / 2)} consolidated flights`,
          passengerHandling: 'Full rebooking required with hotel vouchers for overnight stays',
          crewAssignment: 'Crew reallocation to consolidated flights',
          maintenanceImpact: 'Reduced aircraft utilization',
          timeline: 'Implementation within 2-3 hours',
          estimatedDelay: 'Same-day rebooking for 60% of passengers'
        },
        flightSpecific: flights.map((flight, index) => ({
          flightNumber: flight.flightNumber,
          action: index % 2 === 0 ? 'Cancelled - passengers redistributed' : 'Consolidated with additional passengers',
          newDeparture: index % 2 === 0 ? null : '18:45',
          passengerLoad: index % 2 === 0 ? 0 : flight.passengers + Math.floor(flights[index-1]?.passengers || 0),
          rebookingRequired: index % 2 === 0 ? flight.passengers : Math.floor(flights[index-1]?.passengers || 0)
        }))
      },
      {
        id: 'OPT_C',
        name: 'Route Diversions',
        type: 'Alternative Routing',
        description: 'Divert flights to alternative airports with ground transportation',
        estimatedCost: 198000 + (flights.length * 35000),
        timeToImplement: 45 + (flights.length * 10),
        passengerImpact: totalPassengers,
        otpRecovery: 85,
        riskLevel: 'High',
        resourceRequirement: 'High',
        feasibility: 79,
        recommended: false,
        affectedFlights: flights.length,
        details: {
          implementation: `Divert ${flights.length} flights to alternative airports`,
          passengerHandling: 'Ground transportation provided to final destinations',
          crewAssignment: 'Extended duty time approvals required',
          maintenanceImpact: 'Additional fuel costs and landing fees',
          timeline: 'Immediate implementation possible',
          estimatedDelay: '2-4 hours including ground transport'
        },
        flightSpecific: flights.map(flight => ({
          flightNumber: flight.flightNumber,
          originalDestination: flight.destination,
          alternativeAirport: flight.destination === 'JFK' ? 'LGA' : flight.destination === 'LHR' ? 'LGW' : 'Alternative',
          groundTransportTime: flight.destination === 'JFK' ? 45 : 60,
          additionalCost: 28000,
          fuelSurcharge: 12000
        }))
      },
      {
        id: 'OPT_D',
        name: 'Partner Airline Transfer',
        type: 'Collaborative Solution',
        description: 'Transfer passengers to partner airlines maintaining schedule integrity',
        estimatedCost: 256000 + (flights.length * 45000),
        timeToImplement: 180 + (flights.length * 25),
        passengerImpact: totalPassengers,
        otpRecovery: 95,
        riskLevel: 'Low',
        resourceRequirement: 'Low',
        feasibility: 82,
        recommended: false,
        affectedFlights: flights.length,
        details: {
          implementation: `Transfer ${totalPassengers} passengers to partner airlines`,
          passengerHandling: 'Full service transfer with priority rebooking',
          crewAssignment: 'No crew impact - partner airline crews',
          maintenanceImpact: 'No impact on own fleet',
          timeline: 'Implementation within 3-4 hours',
          estimatedDelay: 'Most passengers depart within original schedule window'
        },
        flightSpecific: flights.map(flight => ({
          flightNumber: flight.flightNumber,
          partnerAirline: flight.destination.includes('LHR') ? 'British Airways' : flight.destination.includes('DXB') ? 'Emirates' : 'Partner Airline',
          alternativeFlights: 2,
          transferFee: 45000,
          passengerCompensation: flight.passengers * 150
        }))
      },
      {
        id: 'OPT_E',
        name: 'Delayed Operations',
        type: 'Wait & Recover',
        description: 'Maintain original schedule with extended delays until conditions improve',
        estimatedCost: 67000 + (flights.length * 8000),
        timeToImplement: 15,
        passengerImpact: Math.floor(totalPassengers * 0.95),
        otpRecovery: 45,
        riskLevel: 'Medium',
        resourceRequirement: 'Medium',
        feasibility: 88,
        recommended: false,
        affectedFlights: flights.length,
        details: {
          implementation: `Delay ${flights.length} flights until operational conditions improve`,
          passengerHandling: 'Passenger services and meal vouchers during delay',
          crewAssignment: 'Duty time extensions and potential crew changes',
          maintenanceImpact: 'Extended gate occupancy and slot management',
          timeline: 'Dependent on weather/operational conditions',
          estimatedDelay: '3-6 hours depending on conditions'
        },
        flightSpecific: flights.map(flight => ({
          flightNumber: flight.flightNumber,
          estimatedNewDeparture: '21:30',
          delayDuration: 300,
          passengerServices: 'Meals, accommodation if overnight',
          crewChange: flight.delay > 240 ? 'Required' : 'Not required',
          slotAvailability: 'Confirmed'
        }))
      }
    ]

    // Calculate scores based on optimization weights and flight-specific factors
    const scoredOptions = baseOptions.map(option => {
      let score = 0
      
      // Cost score (inverted - lower cost = higher score)
      const costScore = Math.max(0, 100 - (option.estimatedCost / 3000))
      score += (costScore * weights.costMinimization.weight / 100)
      
      // Time score (inverted - faster = higher score)
      const timeScore = Math.max(0, 100 - (option.timeToImplement / 3))
      score += (timeScore * weights.timeEfficiency.weight / 100)
      
      // Passenger satisfaction (inverted impact - less impact = higher score)
      const passengerScore = Math.max(0, 100 - (option.passengerImpact / (totalPassengers / 100)))
      score += (passengerScore * weights.passengerSatisfaction.weight / 100)
      
      // OTP recovery score
      score += (option.otpRecovery * weights.otpImpact.weight / 100)
      
      // Resource optimization (inverted requirement)
      const resourceScore = option.resourceRequirement === 'Low' ? 90 : 
                           option.resourceRequirement === 'Medium' ? 70 : 50
      score += (resourceScore * weights.resourceOptimization.weight / 100)
      
      // Risk minimization (inverted risk)
      const riskScore = option.riskLevel === 'Low' ? 90 : 
                       option.riskLevel === 'Medium' ? 70 : 50
      score += (riskScore * weights.riskMinimization.weight / 100)
      
      return {
        ...option,
        totalScore: Math.round(score),
        scores: {
          cost: Math.round(costScore),
          time: Math.round(timeScore),
          passenger: Math.round(passengerScore),
          otp: option.otpRecovery,
          resource: Math.round(resourceScore),
          risk: Math.round(riskScore)
        }
      }
    })

    // Sort by score and mark the highest as recommended
    const sortedOptions = scoredOptions.sort((a, b) => b.totalScore - a.totalScore)
    sortedOptions[0].recommended = true

    return sortedOptions
  }

  const updateWeight = (parameter, value) => {
    const newWeights = {
      ...optimizationWeights,
      [parameter]: {
        ...optimizationWeights[parameter],
        weight: value[0]
      }
    }
    setOptimizationWeights(newWeights)
  }

  const resetWeights = () => {
    setOptimizationWeights(optimizationParameters)
  }

  const getParameterTotal = () => {
    return Object.values(optimizationWeights).reduce((sum, param) => sum + param.weight, 0)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getChangeIndicator = (current, baseline = 75) => {
    const diff = current - baseline
    if (Math.abs(diff) < 2) return <Minus className="h-3 w-3 text-gray-500" />
    return diff > 0 ? 
      <ArrowUp className="h-3 w-3 text-green-600" /> : 
      <ArrowDown className="h-3 w-3 text-red-600" />
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200'
      case 'Delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Diverted': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white'
      case 'High': return 'bg-orange-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-white'
      case 'Low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  // Filter available flights
  const filteredFlights = availableFlights.filter(flight => {
    if (flightFilters.search && !flight.flightNumber.toLowerCase().includes(flightFilters.search.toLowerCase()) && 
        !flight.originCity.toLowerCase().includes(flightFilters.search.toLowerCase()) &&
        !flight.destinationCity.toLowerCase().includes(flightFilters.search.toLowerCase())) return false
    if (flightFilters.status !== 'all' && flight.currentStatus !== flightFilters.status) return false
    if (flightFilters.priority !== 'all' && flight.priority !== flightFilters.priority) return false
    return true
  })

  const handleFlightSelection = (flightId, checked) => {
    if (checked) {
      const flight = availableFlights.find(f => f.id === flightId)
      if (flight && !selectedFlights.find(f => f.id === flightId)) {
        setSelectedFlights([...selectedFlights, flight])
      }
    } else {
      setSelectedFlights(selectedFlights.filter(f => f.id !== flightId))
    }
  }

  const handleSelectAllFlights = (checked) => {
    if (checked) {
      setSelectedFlights(filteredFlights)
    } else {
      setSelectedFlights([])
    }
  }

  const handleProceedWithSelectedFlights = () => {
    setShowFlightSelector(false)
    generateRecoveryOptions()
  }

  // Auto-generate options when weights change
  useEffect(() => {
    if (selectedFlights && selectedFlights.length > 0 && Object.values(optimizationWeights).some(param => param.weight > 0) && !showFlightSelector) {
      const debounceTimer = setTimeout(() => {
        generateRecoveryOptions()
      }, 1000)
      
      return () => clearTimeout(debounceTimer)
    }
  }, [optimizationWeights, selectedFlights, showFlightSelector])

  // Update selectedFlights when prop changes
  useEffect(() => {
    if (selectedFlight && selectedFlight.length > 0) {
      setSelectedFlights(selectedFlight)
      setShowFlightSelector(false)
    }
  }, [selectedFlight])

  if (showFlightSelector) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Select Flights for Recovery</h2>
            <p className="text-muted-foreground">Choose the affected flights to generate AERON recovery options</p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {selectedFlights.length} flights selected
          </Badge>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Available Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input 
                    placeholder="Flight, city..."
                    value={flightFilters.search}
                    onChange={(e) => setFlightFilters({...flightFilters, search: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={flightFilters.status} onValueChange={(value) => setFlightFilters({...flightFilters, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Diverted">Diverted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select value={flightFilters.priority} onValueChange={(value) => setFlightFilters({...flightFilters, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flight Selection Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Available Flights ({filteredFlights.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={selectedFlights.length === filteredFlights.length && filteredFlights.length > 0}
                  onCheckedChange={handleSelectAllFlights}
                />
                <span className="text-sm">Select All</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Select</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Passengers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFlights.map((flight) => (
                    <TableRow key={flight.id} className={selectedFlights.find(f => f.id === flight.id) ? 'bg-blue-50' : ''}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedFlights.find(f => f.id === flight.id) !== undefined}
                          onCheckedChange={(checked) => handleFlightSelection(flight.id, checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{flight.flightNumber}</div>
                          <div className="text-sm text-muted-foreground">{flight.aircraft}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{flight.origin}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{flight.destination}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flight.originCity} → {flight.destinationCity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatTime(flight.scheduledDeparture)}</div>
                          {flight.delay && (
                            <div className="text-sm text-red-600">+{flight.delay}m</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(flight.currentStatus)}>
                          {flight.currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(flight.priority)}>
                          {flight.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{flight.passengers}</div>
                          <div className="text-sm text-muted-foreground">
                            {flight.connectionFlights} connections
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedFlights.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">Ready to Generate Recovery Options</h4>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">{selectedFlights.length}</span>
                      <span className="text-blue-700 ml-1">flights selected</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">
                        {selectedFlights.reduce((sum, f) => sum + f.passengers, 0).toLocaleString()}
                      </span>
                      <span className="text-blue-700 ml-1">passengers affected</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleProceedWithSelectedFlights} className="bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Generate Recovery Options
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (!selectedFlights || selectedFlights.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">No Flights Selected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please select affected flights to generate AERON recovery options
            </p>
            <Button variant="outline" onClick={() => setShowFlightSelector(true)}>
              <Plane className="h-4 w-4 mr-2" />
              Select Flights
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AERON Recovery Options Generator</h2>
          <p className="text-muted-foreground">
            Generating recovery solutions for {selectedFlights.length} affected flight{selectedFlights.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFlightSelector(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Change Flight Selection
          </Button>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            AI-Powered
          </Badge>
          {lastGenerated && (
            <span className="text-xs text-muted-foreground">
              Last updated: {lastGenerated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Selected Flights Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-blue-800">Selected Flights for Recovery</h4>
            <Badge variant="outline" className="bg-white text-blue-700">
              {selectedFlights.length} flights
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">
                {selectedFlights.reduce((sum, f) => sum + f.passengers, 0).toLocaleString()}
              </p>
              <p className="text-xs text-blue-700">Total Passengers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">
                {selectedFlights.reduce((sum, f) => sum + f.connectionFlights, 0)}
              </p>
              <p className="text-xs text-blue-700">Connection Flights</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">
                {selectedFlights.filter(f => f.priority === 'Critical' || f.priority === 'High').length}
              </p>
              <p className="text-xs text-blue-700">High Priority</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">
                {Math.round(selectedFlights.filter(f => f.delay).reduce((sum, f) => sum + f.delay, 0) / 
                  selectedFlights.filter(f => f.delay).length || 0)}m
              </p>
              <p className="text-xs text-blue-700">Average Delay</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {selectedFlights.map(flight => (
              <div key={flight.id} className="flex items-center justify-between bg-white p-2 rounded text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{flight.flightNumber}</span>
                  <span className="text-gray-600">{flight.origin} → {flight.destination}</span>
                  <Badge className={
                    flight.currentStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    flight.currentStatus === 'Delayed' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-orange-100 text-orange-700'
                  }>
                    {flight.currentStatus}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  <span>{flight.passengers} pax</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Parameters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Optimization Parameters
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Total Weight: {getParameterTotal()}%
              </span>
              <Button variant="outline" size="sm" onClick={resetWeights}>
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(optimizationWeights).map(([key, param]) => {
              const Icon = param.icon
              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${param.color}-50 border border-${param.color}-200/50`}>
                        <Icon className={`h-4 w-4 text-${param.color}-600`} />
                      </div>
                      <div>
                        <Label className="font-medium text-gray-900">{param.name}</Label>
                        <p className="text-xs text-gray-500 mt-0.5">Optimization priority level</p>
                      </div>
                    </div>
                    <Badge 
                      className={`
                        px-2.5 py-1 text-xs font-semibold
                        bg-${param.color}-100 text-${param.color}-700 
                        border border-${param.color}-200
                        rounded-md
                      `}
                    >
                      {param.weight}%
                    </Badge>
                  </div>
                  
                  {/* Modern Range Slider */}
                  <div className="relative px-2 py-2">
                    {/* Track Container */}
                    <div className="relative h-2 bg-gray-100 rounded-full border border-gray-200/60">
                      {/* Selected Range */}
                      <div 
                        className={`
                          absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-out
                          bg-${param.color}-500 shadow-sm
                        `}
                        style={{ width: `${param.weight}%` }}
                      />
                      
                      {/* Thumb Handle */}
                      <div 
                        className={`
                          absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full cursor-pointer
                          bg-white border-2 border-${param.color}-500 shadow-md
                          hover:scale-110 active:scale-95 transition-all duration-200
                          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-${param.color}-500/40
                          z-10
                        `}
                        style={{ left: `calc(${param.weight}% - 10px)` }}
                      />
                    </div>
                    
                    {/* Value Labels */}
                    <div className="flex justify-between mt-3 px-1">
                      <span className="text-xs text-gray-500 font-medium">0%</span>
                      <span className="text-xs text-gray-500 font-medium">25%</span>
                      <span className="text-xs text-gray-500 font-medium">50%</span>
                      <span className="text-xs text-gray-500 font-medium">75%</span>
                      <span className="text-xs text-gray-500 font-medium">100%</span>
                    </div>
                    
                    {/* Hidden input for interaction */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={param.weight}
                      onChange={(e) => updateWeight(key, [parseInt(e.target.value)])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      aria-label={`${param.name} optimization weight`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          
          {getParameterTotal() !== 100 && (
            <Alert className="mt-4 border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Note:</strong> Total optimization weight is {getParameterTotal()}%. 
                Consider adjusting parameters to 100% for optimal results.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Generated Options */}
      {recoveryOptions.length > 0 && (
        <div className="space-y-4">
          {/* Recommended Solution Highlight */}
          {recommendedOption && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800">AERON Recommended Solution</CardTitle>
                  <Badge className="bg-green-600 text-white">Score: {recommendedOption.totalScore}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">{recommendedOption.name}</h4>
                    <p className="text-sm text-green-700 mb-3">{recommendedOption.description}</p>
                    <div className="flex gap-2">
                      <Button onClick={() => onSelectPlan(recommendedOption)} size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Execute
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onSelectPlan(recommendedOption)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-600 font-medium">Total Cost</p>
                      <p className="text-green-800">${recommendedOption.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-green-600 font-medium">Implementation</p>
                      <p className="text-green-800">{recommendedOption.timeToImplement} min</p>
                    </div>
                    <div>
                      <p className="text-green-600 font-medium">Passenger Impact</p>
                      <p className="text-green-800">{recommendedOption.passengerImpact} affected</p>
                    </div>
                    <div>
                      <p className="text-green-600 font-medium">OTP Recovery</p>
                      <p className="text-green-800">{recommendedOption.otpRecovery}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Performance Scores</h5>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(optimizationWeights).map(([key, param]) => {
                        if (param.weight === 0) return null
                        const scoreKey = key === 'costMinimization' ? 'cost' :
                                       key === 'timeEfficiency' ? 'time' :
                                       key === 'passengerSatisfaction' ? 'passenger' :
                                       key === 'otpImpact' ? 'otp' :
                                       key === 'resourceOptimization' ? 'resource' : 'risk'
                        const score = recommendedOption.scores[scoreKey]
                        return (
                          <div key={key} className="text-center">
                            <div className={`p-1 rounded text-xs font-medium ${getScoreColor(score)}`}>
                              {score}
                            </div>
                            <p className="text-green-600 mt-1">{param.name.split(' ')[0]}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Options */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Recovery Options ({recoveryOptions.length})</CardTitle>
                <Button variant="outline" onClick={onCompare}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Options
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recoveryOptions.map((option) => (
                  <Card key={option.id} className={`transition-all hover:shadow-md ${option.recommended ? 'ring-2 ring-green-200' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{option.name}</h4>
                          {option.recommended && (
                            <Badge className="bg-green-600 text-white">Recommended</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className={getScoreColor(option.totalScore)}>
                          Score: {option.totalScore}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Cost:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">${(option.estimatedCost / 1000).toFixed(0)}K</span>
                            {getChangeIndicator(option.scores.cost)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{option.timeToImplement}m</span>
                            {getChangeIndicator(option.scores.time)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Risk:</span>
                          <Badge className={
                            option.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                            option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {option.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Feasibility:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{option.feasibility}%</span>
                            <Progress value={option.feasibility} className="w-12 h-2" />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onSelectPlan(option)}
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => onSelectPlan(option)}
                          className="flex-1"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Execute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="font-medium mb-2">AERON AI Processing...</h3>
            <p className="text-sm text-muted-foreground">
              Analyzing {selectedFlights.length} flights and generating optimal recovery solutions
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}