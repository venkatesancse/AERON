'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { BarChart3, Users, Plane, Settings, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react'

const comparisonData = [
  {
    metric: 'Total Cost',
    optionA: '$45,000',
    optionB: '$35,000',
    optionC: '$52,000',
    best: 'B',
    type: 'cost'
  },
  {
    metric: 'OTP Score',
    optionA: '82%',
    optionB: '75%',
    optionC: '91%',
    best: 'C',
    type: 'percentage'
  },
  {
    metric: 'Aircraft Swaps',
    optionA: '1',
    optionB: '2',
    optionC: '0',
    best: 'C',
    type: 'number'
  },
  {
    metric: 'Crew Rule Violations',
    optionA: '0',
    optionB: '1 (Soft Rule)',
    optionC: '0',
    best: 'A,C',
    type: 'violations'
  },
  {
    metric: 'PAX Accommodated',
    optionA: '98%',
    optionB: '85%',
    optionC: '100%',
    best: 'C',
    type: 'percentage'
  },
  {
    metric: 'Regulatory Risk',
    optionA: 'Low',
    optionB: 'Medium',
    optionC: 'Low',
    best: 'A,C',
    type: 'risk'
  }
]

const detailedBreakdown = {
  A: {
    crew: {
      pattern: [
        { time: '06:00', activity: 'Report for Duty', crew: 'Original Crew' },
        { time: '07:30', activity: 'Flight Preparation', crew: 'Original Crew' },
        { time: '09:00', activity: 'Standby (Aircraft Swap)', crew: 'Original Crew' },
        { time: '12:00', activity: 'Fresh Crew Reports', crew: 'Replacement Crew' },
        { time: '13:00', activity: 'Delayed Departure', crew: 'Replacement Crew' }
      ],
      costs: {
        overtime: '$5,000',
        standby: '$3,000',
        replacement: '$4,000'
      }
    },
    passenger: {
      total: 287,
      rebooked: 6,
      accommodated: 281,
      compensation: '$8,000',
      services: ['Meal vouchers', 'Lounge access', 'Hotel for 6 pax']
    },
    maintenance: [
      { time: '14:00', type: 'Pre-flight Check', duration: '1h', status: 'Scheduled' },
      { time: '18:00', type: 'Post-flight Inspection', duration: '2h', status: 'Scheduled' }
    ]
  }
}

export function ComparisonMatrix({ onSelectPlan }) {
  const [selectedOption, setSelectedOption] = useState(null)

  const getCellStyle = (metric, option) => {
    const isBest = metric.best.includes(option)
    if (isBest) {
      return 'bg-green-50 text-green-700 font-semibold'
    }
    return ''
  }

  const getRiskBadgeStyle = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Solution Comparison Matrix</h2>
          <p className="text-muted-foreground">Compare all recovery options side by side</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Main Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Solution</TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">A</span>
                      Option A
                    </div>
                    <span className="text-xs text-muted-foreground">Aircraft Swap</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">B</span>
                      Option B
                    </div>
                    <span className="text-xs text-muted-foreground">Route Optimization</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">C</span>
                      Option C
                    </div>
                    <span className="text-xs text-muted-foreground">Premium Recovery</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className={`text-center ${getCellStyle(row, 'A')}`}>
                    {row.type === 'risk' ? (
                      <Badge className={getRiskBadgeStyle(row.optionA)}>{row.optionA}</Badge>
                    ) : (
                      row.optionA
                    )}
                  </TableCell>
                  <TableCell className={`text-center ${getCellStyle(row, 'B')}`}>
                    {row.type === 'risk' ? (
                      <Badge className={getRiskBadgeStyle(row.optionB)}>{row.optionB}</Badge>
                    ) : row.type === 'violations' && row.optionB.includes('Soft') ? (
                      <span className="text-orange-600">{row.optionB}</span>
                    ) : (
                      row.optionB
                    )}
                  </TableCell>
                  <TableCell className={`text-center ${getCellStyle(row, 'C')}`}>
                    {row.type === 'risk' ? (
                      <Badge className={getRiskBadgeStyle(row.optionC)}>{row.optionC}</Badge>
                    ) : (
                      row.optionC
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed View Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['A', 'B', 'C'].map((option) => (
          <Card key={option}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Option {option} Details</h3>
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {option}
                </span>
              </div>
              
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      View Crew Pattern
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Crew Pattern - Option {option}</DialogTitle>
                    </DialogHeader>
                    <CrewPatternView option={option} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Passenger Reaccommodation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Passenger Reaccommodation - Option {option}</DialogTitle>
                    </DialogHeader>
                    <PassengerView option={option} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Maintenance Timeline
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Maintenance Conflicts - Option {option}</DialogTitle>
                    </DialogHeader>
                    <MaintenanceView option={option} />
                  </DialogContent>
                </Dialog>

                <Button 
                  className="w-full bg-[#ff8200] hover:bg-[#ff8200]/90 text-white" 
                  onClick={() => onSelectPlan({ id: option })}
                >
                  Select Option {option}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-8 w-8 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Recommendation Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">Best Overall</Badge>
                  <span>Option C - Premium Recovery (91% OTP, Low Risk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">Most Cost-Effective</Badge>
                  <span>Option B - Route Optimization ($35,000)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">Balanced</Badge>
                  <span>Option A - Aircraft Swap (Good balance of all factors)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CrewPatternView({ option }) {
  const pattern = detailedBreakdown.A?.crew?.pattern || []
  const costs = detailedBreakdown.A?.crew?.costs || {}

  return (
    <div className="space-y-4">
      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-3">
          {pattern.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
              <div>
                <p className="font-medium">{item.time}</p>
                <p className="text-sm text-muted-foreground">{item.activity}</p>
              </div>
              <Badge variant="outline">{item.crew}</Badge>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="costs" className="space-y-3">
          {Object.entries(costs).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-3 bg-muted rounded">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PassengerView({ option }) {
  const passenger = detailedBreakdown.A?.passenger || {}

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-muted rounded">
          <p className="text-2xl font-semibold">{passenger.total}</p>
          <p className="text-sm text-muted-foreground">Total Passengers</p>
        </div>
        <div className="text-center p-4 bg-muted rounded">
          <p className="text-2xl font-semibold text-green-600">{passenger.accommodated}</p>
          <p className="text-sm text-muted-foreground">Accommodated</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Services Provided</h4>
        {passenger.services?.map((service, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">{service}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
        <span>Total Compensation</span>
        <span className="font-semibold text-orange-600">{passenger.compensation}</span>
      </div>
    </div>
  )
}

function MaintenanceView({ option }) {
  const maintenance = detailedBreakdown.A?.maintenance || []

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {maintenance.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="font-medium">{item.type}</p>
              <p className="text-sm text-muted-foreground">{item.time} • Duration: {item.duration}</p>
            </div>
            <Badge className={item.status === 'Scheduled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">AMOS Integration Status</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          All maintenance schedules verified and conflicts resolved. Next available slot: Tomorrow 08:00 UTC
        </p>
      </div>
    </div>
  )
}