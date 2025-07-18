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
import { Checkbox } from './ui/checkbox'
import { Separator } from './ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { 
  UserCheck, 
  Plane, 
  Hotel, 
  UtensilsCrossed, 
  Car, 
  Search, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Send,
  Filter,
  Plus,
  Star,
  Crown,
  Shield,
  Heart,
  Baby,
  Accessibility,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  Minus
} from 'lucide-react'
import { FlightRebooking } from './FlightRebooking'
import { HotelBooking } from './HotelBooking'
import { VoucherManagement } from './VoucherManagement'
import { PassengerLookup } from './PassengerLookup'

export function PassengerRebooking() {
  const [activeTab, setActiveTab] = useState('lookup')
  const [selectedPassengers, setSelectedPassengers] = useState([])
  const [passengerType, setPassengerType] = useState('all')
  const [sortBy, setSortBy] = useState('priority')
  const [sortOrder, setSortOrder] = useState('desc')

  // Enhanced mock passenger data with detailed priority information
  const affectedPassengers = [
    {
      id: 'PAX001',
      name: 'John Smith',
      type: 'Ticketed',
      pnr: 'ABC123',
      flight: 'FZ123',
      seat: '12A',
      class: 'Economy',
      status: 'Affected',
      loyaltyTier: 'Gold',
      specialNeeds: ['Wheelchair'],
      contact: 'john.smith@email.com',
      priorityScore: 85,
      priorityRank: 'High',
      priorityFactors: {
        frequentFlyer: 25,
        ticketClass: 15,
        specialNeeds: 20,
        connectionRisk: 10,
        bookingChannel: 5,
        businessTravel: 0,
        medicalClearance: 10
      },
      connectionDetails: {
        hasConnection: true,
        connectionFlight: 'FZ456',
        connectionTime: 90,
        connectionRisk: 'Medium'
      },
      bookingInfo: {
        bookingDate: '2025-01-05',
        bookingChannel: 'Website',
        fareType: 'Economy Saver',
        totalPaid: 450
      },
      passengerProfile: {
        age: 45,
        travelFrequency: 'Regular',
        preferredLanguage: 'English',
        dietaryRestrictions: [],
        mobilityAssistance: true
      }
    },
    {
      id: 'PAX002',
      name: 'Sarah Johnson',
      type: 'Ticketless',
      pnr: 'DEF456',
      flight: 'FZ123',
      seat: 'Unassigned',
      class: 'Business',
      status: 'Pending Rebooking',
      loyaltyTier: 'Silver',
      specialNeeds: [],
      contact: 'sarah.j@email.com',
      priorityScore: 95,
      priorityRank: 'Critical',
      priorityFactors: {
        frequentFlyer: 20,
        ticketClass: 30,
        specialNeeds: 0,
        connectionRisk: 15,
        bookingChannel: 10,
        businessTravel: 15,
        medicalClearance: 5
      },
      connectionDetails: {
        hasConnection: true,
        connectionFlight: 'FZ789',
        connectionTime: 45,
        connectionRisk: 'High'
      },
      bookingInfo: {
        bookingDate: '2024-12-20',
        bookingChannel: 'Corporate',
        fareType: 'Business Flex',
        totalPaid: 1250
      },
      passengerProfile: {
        age: 38,
        travelFrequency: 'Frequent',
        preferredLanguage: 'English',
        dietaryRestrictions: ['Vegetarian'],
        mobilityAssistance: false
      }
    },
    {
      id: 'PAX003',
      name: 'Michael Chen',
      type: 'FIM',
      pnr: 'GHI789',
      flight: 'FZ456',
      seat: '5C',
      class: 'First',
      status: 'On FIM',
      loyaltyTier: 'Platinum',
      specialNeeds: ['Dietary'],
      contact: 'mchen@email.com',
      priorityScore: 100,
      priorityRank: 'VIP',
      priorityFactors: {
        frequentFlyer: 30,
        ticketClass: 35,
        specialNeeds: 5,
        connectionRisk: 10,
        bookingChannel: 10,
        businessTravel: 10,
        medicalClearance: 0
      },
      fimDetails: {
        originalCarrier: 'BA',
        agreementCode: 'IATA-302',
        validUntil: '2025-06-08'
      },
      connectionDetails: {
        hasConnection: false,
        connectionFlight: null,
        connectionTime: 0,
        connectionRisk: 'None'
      },
      bookingInfo: {
        bookingDate: '2025-01-08',
        bookingChannel: 'Premium Service',
        fareType: 'First Class',
        totalPaid: 3200
      },
      passengerProfile: {
        age: 42,
        travelFrequency: 'VIP',
        preferredLanguage: 'English',
        dietaryRestrictions: ['Kosher'],
        mobilityAssistance: false
      }
    },
    {
      id: 'PAX004',
      name: 'Maria Rodriguez',
      type: 'Ticketed',
      pnr: 'JKL012',
      flight: 'FZ123',
      seat: '18F',
      class: 'Economy',
      status: 'Affected',
      loyaltyTier: 'Bronze',
      specialNeeds: ['Infant', 'Medical Equipment'],
      contact: 'maria.r@email.com',
      priorityScore: 75,
      priorityRank: 'High',
      priorityFactors: {
        frequentFlyer: 5,
        ticketClass: 15,
        specialNeeds: 25,
        connectionRisk: 5,
        bookingChannel: 5,
        businessTravel: 0,
        medicalClearance: 20
      },
      connectionDetails: {
        hasConnection: false,
        connectionFlight: null,
        connectionTime: 0,
        connectionRisk: 'None'
      },
      bookingInfo: {
        bookingDate: '2025-01-03',
        bookingChannel: 'Mobile App',
        fareType: 'Economy Standard',
        totalPaid: 380
      },
      passengerProfile: {
        age: 29,
        travelFrequency: 'Occasional',
        preferredLanguage: 'Spanish',
        dietaryRestrictions: [],
        mobilityAssistance: false
      }
    },
    {
      id: 'PAX005',
      name: 'Ahmed Al-Rashid',
      type: 'Ticketed',
      pnr: 'MNO345',
      flight: 'FZ789',
      seat: '7A',
      class: 'Business',
      status: 'Affected',
      loyaltyTier: 'Gold',
      specialNeeds: [],
      contact: 'ahmed.ar@email.com',
      priorityScore: 70,
      priorityRank: 'Medium',
      priorityFactors: {
        frequentFlyer: 25,
        ticketClass: 30,
        specialNeeds: 0,
        connectionRisk: 5,
        bookingChannel: 5,
        businessTravel: 5,
        medicalClearance: 0
      },
      connectionDetails: {
        hasConnection: true,
        connectionFlight: 'FZ234',
        connectionTime: 120,
        connectionRisk: 'Low'
      },
      bookingInfo: {
        bookingDate: '2025-01-02',
        bookingChannel: 'Travel Agent',
        fareType: 'Business Standard',
        totalPaid: 980
      },
      passengerProfile: {
        age: 35,
        travelFrequency: 'Regular',
        preferredLanguage: 'Arabic',
        dietaryRestrictions: ['Halal'],
        mobilityAssistance: false
      }
    }
  ]

  const handlePassengerSelection = (passengerId, selected) => {
    if (selected) {
      setSelectedPassengers([...selectedPassengers, passengerId])
    } else {
      setSelectedPassengers(selectedPassengers.filter(id => id !== passengerId))
    }
  }

  const handleSelectAll = () => {
    const filteredPassengers = getFilteredAndSortedPassengers()
    const allIds = filteredPassengers.map(p => p.id)
    setSelectedPassengers(allIds)
  }

  const handleClearSelection = () => {
    setSelectedPassengers([])
  }

  const getFilteredAndSortedPassengers = () => {
    let filtered = affectedPassengers
    
    if (passengerType !== 'all') {
      filtered = filtered.filter(p => p.type.toLowerCase() === passengerType)
    }
    
    // Sort by the selected criteria
    return filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'priority':
          aValue = a.priorityScore
          bValue = b.priorityScore
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'class':
          const classOrder = { 'First': 3, 'Business': 2, 'Economy': 1 }
          aValue = classOrder[a.class] || 0
          bValue = classOrder[b.class] || 0
          break
        case 'loyalty':
          const loyaltyOrder = { 'Platinum': 4, 'Gold': 3, 'Silver': 2, 'Bronze': 1 }
          aValue = loyaltyOrder[a.loyaltyTier] || 0
          bValue = loyaltyOrder[b.loyaltyTier] || 0
          break
        default:
          return 0
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })
  }

  const getPriorityIcon = (priorityRank) => {
    switch (priorityRank) {
      case 'VIP': return <Crown className="h-4 w-4 text-purple-600" />
      case 'Critical': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'High': return <ArrowUp className="h-4 w-4 text-orange-600" />
      case 'Medium': return <Minus className="h-4 w-4 text-yellow-600" />
      case 'Low': return <ArrowDown className="h-4 w-4 text-gray-600" />
      default: return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priorityRank) => {
    switch (priorityRank) {
      case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Low': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getSpecialNeedsIcons = (specialNeeds) => {
    return specialNeeds.map(need => {
      switch (need.toLowerCase()) {
        case 'wheelchair': return <Accessibility key={need} className="h-3 w-3 text-blue-600" />
        case 'infant': return <Baby key={need} className="h-3 w-3 text-pink-600" />
        case 'medical equipment': return <Heart key={need} className="h-3 w-3 text-red-600" />
        case 'dietary': return <UtensilsCrossed key={need} className="h-3 w-3 text-green-600" />
        default: return <Shield key={need} className="h-3 w-3 text-gray-600" />
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Passenger Services & Rebooking</h2>
          <p className="text-muted-foreground">Manage passenger rebooking with priority-based processing</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {selectedPassengers.length} Selected
          </Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Passenger List
          </Button>
        </div>
      </div>

      {/* Enhanced Quick Stats with Priority Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-medium">Total Affected</h4>
            </div>
            <p className="text-2xl font-semibold">{affectedPassengers.length}</p>
            <p className="text-xs text-muted-foreground">Passengers requiring assistance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <h4 className="text-sm font-medium">VIP</h4>
            </div>
            <p className="text-2xl font-semibold">{affectedPassengers.filter(p => p.priorityRank === 'VIP').length}</p>
            <p className="text-xs text-muted-foreground">Highest priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-medium">Critical</h4>
            </div>
            <p className="text-2xl font-semibold">{affectedPassengers.filter(p => p.priorityRank === 'Critical').length}</p>
            <p className="text-xs text-muted-foreground">Immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Rebooked</h4>
            </div>
            <p className="text-2xl font-semibold">156</p>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <h4 className="text-sm font-medium">Special Needs</h4>
            </div>
            <p className="text-2xl font-semibold">{affectedPassengers.filter(p => p.specialNeeds.length > 0).length}</p>
            <p className="text-xs text-muted-foreground">Require assistance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <UtensilsCrossed className="h-4 w-4 text-purple-600" />
              <h4 className="text-sm font-medium">Vouchers Issued</h4>
            </div>
            <p className="text-2xl font-semibold">89</p>
            <p className="text-xs text-muted-foreground">Meal & transport</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="lookup" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Priority Lookup
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Flight Rebooking
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel className="h-4 w-4" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="vouchers" className="flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Vouchers
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Transport
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lookup">
          <PassengerLookupPanel 
            passengers={affectedPassengers}
            selectedPassengers={selectedPassengers}
            onPassengerSelection={handlePassengerSelection}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            passengerType={passengerType}
            setPassengerType={setPassengerType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            getFilteredAndSortedPassengers={getFilteredAndSortedPassengers}
            getPriorityIcon={getPriorityIcon}
            getPriorityColor={getPriorityColor}
            getSpecialNeedsIcons={getSpecialNeedsIcons}
          />
        </TabsContent>

        <TabsContent value="flights">
          <FlightRebooking 
            selectedPassengers={selectedPassengers}
            passengers={affectedPassengers}
          />
        </TabsContent>

        <TabsContent value="hotels">
          <HotelBooking 
            selectedPassengers={selectedPassengers}
            passengers={affectedPassengers}
          />
        </TabsContent>

        <TabsContent value="vouchers">
          <VoucherManagement 
            selectedPassengers={selectedPassengers}
            passengers={affectedPassengers}
          />
        </TabsContent>

        <TabsContent value="transport">
          <TransportVoucherPanel 
            selectedPassengers={selectedPassengers}
            passengers={affectedPassengers}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PassengerLookupPanel({ 
  passengers, 
  selectedPassengers, 
  onPassengerSelection, 
  onSelectAll, 
  onClearSelection,
  passengerType,
  setPassengerType,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  getFilteredAndSortedPassengers,
  getPriorityIcon,
  getPriorityColor,
  getSpecialNeedsIcons
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [flightFilter, setFlightFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  let filteredPassengers = getFilteredAndSortedPassengers().filter(passenger => {
    const matchesSearch = passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         passenger.pnr.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFlight = flightFilter === 'all' || passenger.flight === flightFilter
    const matchesPriority = priorityFilter === 'all' || passenger.priorityRank === priorityFilter
    return matchesSearch && matchesFlight && matchesPriority
  })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="space-y-4">
      {/* Enhanced Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Priority-Based Passenger Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Search Passengers</Label>
              <Input
                id="search"
                placeholder="Name or PNR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="type">Passenger Type</Label>
              <Select value={passengerType} onValueChange={setPassengerType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ticketed">Ticketed</SelectItem>
                  <SelectItem value="ticketless">Ticketless</SelectItem>
                  <SelectItem value="fim">FIM Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="flight">Flight</Label>
              <Select value={flightFilter} onValueChange={setFlightFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Flights</SelectItem>
                  <SelectItem value="FZ123">FZ123</SelectItem>
                  <SelectItem value="FZ456">FZ456</SelectItem>
                  <SelectItem value="FZ789">FZ789</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="class">Ticket Class</SelectItem>
                  <SelectItem value="loyalty">Loyalty Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              <Button onClick={toggleSortOrder} variant="outline" size="sm">
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {sortOrder === 'asc' ? 'Asc' : 'Desc'}
              </Button>
              <Button onClick={onSelectAll} variant="outline" size="sm">
                Select All ({filteredPassengers.length})
              </Button>
              <Button onClick={onClearSelection} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </div>

          {/* Priority Information Alert */}
          <Alert className="border-green-200 bg-green-50 mb-4">
            <Star className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Priority System Active:</strong> Passengers are automatically prioritized based on frequent flyer status, ticket class, special needs, connection risk, and booking type. VIP and Critical passengers receive immediate attention.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Enhanced Passenger List with Priority Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            Priority-Sorted Passengers ({filteredPassengers.length})
            {selectedPassengers.length > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-700">
                {selectedPassengers.length} selected
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPassengers.map((passenger) => (
              <div key={passenger.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={selectedPassengers.includes(passenger.id)}
                  onCheckedChange={(checked) => onPassengerSelection(passenger.id, checked)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-3">
                  {/* Main passenger info row */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                      <p className="font-medium">{passenger.name}</p>
                      <p className="text-sm text-muted-foreground">{passenger.contact}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getPriorityIcon(passenger.priorityRank)}
                        <Badge className={getPriorityColor(passenger.priorityRank)}>
                          {passenger.priorityRank}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Score: {passenger.priorityScore}</p>
                    </div>
                    
                    <div>
                      <Badge className={
                        passenger.type === 'Ticketed' ? 'bg-green-100 text-green-700' :
                        passenger.type === 'Ticketless' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }>
                        {passenger.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground">PNR: {passenger.pnr}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm">Flight: <span className="font-medium">{passenger.flight}</span></p>
                      <p className="text-sm">Seat: {passenger.seat}</p>
                      <p className="text-sm">Class: {passenger.class}</p>
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {passenger.loyaltyTier}
                      </Badge>
                      <p className="text-sm">Age: {passenger.passengerProfile.age}</p>
                      <p className="text-sm">Lang: {passenger.passengerProfile.preferredLanguage}</p>
                    </div>
                    
                    <div>
                      <Badge className={
                        passenger.status === 'Affected' ? 'bg-red-100 text-red-700' :
                        passenger.status === 'Pending Rebooking' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {passenger.status}
                      </Badge>
                      {passenger.specialNeeds.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          {getSpecialNeedsIcons(passenger.specialNeeds)}
                          <span className="text-xs text-muted-foreground ml-1">
                            {passenger.specialNeeds.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Priority breakdown and connection details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Priority Factors</h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Frequent Flyer:</span>
                          <span className="font-medium">{passenger.priorityFactors.frequentFlyer} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ticket Class:</span>
                          <span className="font-medium">{passenger.priorityFactors.ticketClass} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Special Needs:</span>
                          <span className="font-medium">{passenger.priorityFactors.specialNeeds} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Connection Risk:</span>
                          <span className="font-medium">{passenger.priorityFactors.connectionRisk} pts</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2">Connection & Booking Info</h5>
                      <div className="space-y-1 text-xs">
                        {passenger.connectionDetails.hasConnection ? (
                          <>
                            <div className="flex justify-between">
                              <span>Next Flight:</span>
                              <span className="font-medium">{passenger.connectionDetails.connectionFlight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Connection Time:</span>
                              <span className="font-medium">{passenger.connectionDetails.connectionTime} min</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Level:</span>
                              <span className={`font-medium ${
                                passenger.connectionDetails.connectionRisk === 'High' ? 'text-red-600' :
                                passenger.connectionDetails.connectionRisk === 'Medium' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {passenger.connectionDetails.connectionRisk}
                              </span>
                            </div>
                          </>
                        ) : (
                          <p className="text-muted-foreground">No connections</p>
                        )}
                        <div className="flex justify-between">
                          <span>Booking Channel:</span>
                          <span className="font-medium">{passenger.bookingInfo.bookingChannel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fare Paid:</span>
                          <span className="font-medium">${passenger.bookingInfo.totalPaid}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TransportVoucherPanel({ selectedPassengers, passengers }) {
  const [voucherType, setVoucherType] = useState('taxi')
  const [amount, setAmount] = useState('25')
  const [quantity, setQuantity] = useState('1')

  const transportOptions = [
    { id: 'taxi', name: 'Taxi Voucher', defaultAmount: '25', description: 'For local taxi transportation' },
    { id: 'train', name: 'Train/Metro Voucher', defaultAmount: '15', description: 'Public transportation voucher' },
    { id: 'bus', name: 'Bus Voucher', defaultAmount: '10', description: 'Bus transportation voucher' },
    { id: 'rental', name: 'Car Rental Voucher', defaultAmount: '75', description: 'Car rental discount voucher' }
  ]

  const handleIssueVouchers = () => {
    if (selectedPassengers.length === 0) {
      alert('Please select passengers first')
      return
    }
    
    const selectedOption = transportOptions.find(opt => opt.id === voucherType)
    alert(`Issuing ${quantity} ${selectedOption.name}(s) worth $${amount} each to ${selectedPassengers.length} passenger(s)`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Transportation Voucher Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="voucherType">Voucher Type</Label>
                <Select value={voucherType} onValueChange={(value) => {
                  setVoucherType(value)
                  const option = transportOptions.find(opt => opt.id === value)
                  setAmount(option.defaultAmount)
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transportOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name} - ${option.defaultAmount}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {transportOptions.find(opt => opt.id === voucherType)?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount per Voucher ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity per Passenger</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max="5"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted rounded">
                <h4 className="font-medium mb-2">Voucher Summary</h4>
                <div className="text-sm space-y-1">
                  <p>Selected Passengers: <span className="font-medium">{selectedPassengers.length}</span></p>
                  <p>Voucher Type: <span className="font-medium">{transportOptions.find(opt => opt.id === voucherType)?.name}</span></p>
                  <p>Amount per Voucher: <span className="font-medium">${amount}</span></p>
                  <p>Quantity per Passenger: <span className="font-medium">{quantity}</span></p>
                  <Separator className="my-2" />
                  <p>Total Cost: <span className="font-medium text-green-600">
                    ${(selectedPassengers.length * parseFloat(amount) * parseInt(quantity)).toFixed(2)}
                  </span></p>
                </div>
              </div>

              <Button 
                onClick={handleIssueVouchers} 
                className="w-full"
                disabled={selectedPassengers.length === 0}
              >
                <Send className="h-4 w-4 mr-2" />
                Issue Transportation Vouchers
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-3">Recently Issued Vouchers</h4>
              <div className="space-y-2">
                <div className="p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Taxi Vouchers</p>
                      <p className="text-sm text-muted-foreground">Issued to 12 passengers</p>
                    </div>
                    <Badge variant="outline">$300 total</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">14:25 - Flight FZ123 passengers</p>
                </div>
                
                <div className="p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Train Vouchers</p>
                      <p className="text-sm text-muted-foreground">Issued to 8 passengers</p>
                    </div>
                    <Badge variant="outline">$120 total</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">13:45 - Flight FZ456 passengers</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPassengers.length === 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Please select passengers from the Priority Lookup tab to issue transportation vouchers.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}