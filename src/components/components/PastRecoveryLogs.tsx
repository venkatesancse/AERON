'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Clock,
  DollarSign,
  Users,
  Plane
} from 'lucide-react'

const pastRecoveryLogs = [
  {
    id: 'SOL-2025-001',
    disruptionId: 'DIS-001',
    flightNumber: 'EK123',
    route: 'DXB → JFK',
    disruptionType: 'Weather Delay',
    priority: 'High',
    dateExecuted: '2025-06-05 16:45:00',
    duration: '2h 15m',
    status: 'Successful',
    affectedPassengers: 287,
    actualCost: 118000,
    estimatedCost: 125000,
    costVariance: -5.6,
    otpImpact: -1.8,
    solutionChosen: 'Option B',
    totalOptions: 3,
    executedBy: 'ops.manager@airline.com',
    approvedBy: 'supervisor@airline.com',
    passengerSatisfaction: 8.2,
    rebookingSuccess: 94.5,
    details: {
      description: 'Weather delay resolved with alternative routing',
      passengerRebookings: 156,
      hotelVouchers: 89,
      mealVouchers: 287,
      compensation: 45000
    }
  },
  {
    id: 'SOL-2025-002',
    disruptionId: 'DIS-002',
    flightNumber: 'EK456',
    route: 'LHR → DXB',
    disruptionType: 'Aircraft Technical',
    priority: 'Critical',
    dateExecuted: '2025-06-05 14:30:00',
    duration: '1h 45m',
    status: 'Successful',
    affectedPassengers: 156,
    actualCost: 95000,
    estimatedCost: 89000,
    costVariance: 6.7,
    otpImpact: -2.3,
    solutionChosen: 'Option A',
    totalOptions: 4,
    executedBy: 'supervisor@airline.com',
    approvedBy: 'director@airline.com',
    passengerSatisfaction: 7.8,
    rebookingSuccess: 89.2,
    details: {
      description: 'Aircraft swap completed successfully',
      passengerRebookings: 87,
      hotelVouchers: 34,
      mealVouchers: 156,
      compensation: 28000
    }
  },
  {
    id: 'SOL-2025-003',
    disruptionId: 'DIS-003',
    flightNumber: 'EK789',
    route: 'DXB → FRA',
    disruptionType: 'Crew Shortage',
    priority: 'Medium',
    dateExecuted: '2025-06-04 18:20:00',
    duration: '45m',
    status: 'Successful',
    affectedPassengers: 198,
    actualCost: 23000,
    estimatedCost: 45000,
    costVariance: -48.9,
    otpImpact: -0.5,
    solutionChosen: 'Option A',
    totalOptions: 2,
    executedBy: 'crew.manager@airline.com',
    approvedBy: 'ops.manager@airline.com',
    passengerSatisfaction: 9.1,
    rebookingSuccess: 98.5,
    details: {
      description: 'Standby crew deployed quickly',
      passengerRebookings: 12,
      hotelVouchers: 0,
      mealVouchers: 45,
      compensation: 5000
    }
  },
  {
    id: 'SOL-2025-004',
    disruptionId: 'DIS-004',
    flightNumber: 'EK234',
    route: 'DXB → SYD',
    disruptionType: 'Airport Closure',
    priority: 'Critical',
    dateExecuted: '2025-06-04 12:15:00',
    duration: '4h 30m',
    status: 'Partial Success',
    affectedPassengers: 345,
    actualCost: 189000,
    estimatedCost: 165000,
    costVariance: 14.5,
    otpImpact: -3.2,
    solutionChosen: 'Option C',
    totalOptions: 5,
    executedBy: 'ops.manager@airline.com',
    approvedBy: 'director@airline.com',
    passengerSatisfaction: 6.9,
    rebookingSuccess: 76.8,
    details: {
      description: 'Airport closure required significant rebooking',
      passengerRebookings: 298,
      hotelVouchers: 167,
      mealVouchers: 345,
      compensation: 78000
    }
  }
]

export function PastRecoveryLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [disruptionTypeFilter, setDisruptionTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState('last7days')
  const [selectedLog, setSelectedLog] = useState(null)
  const [activeTab, setActiveTab] = useState('logs')

  const filteredLogs = pastRecoveryLogs.filter(log => {
    const matchesSearch = log.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || log.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesType = disruptionTypeFilter === 'all' || log.disruptionType === disruptionTypeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Successful': return 'bg-green-100 text-green-700'
      case 'Partial Success': return 'bg-yellow-100 text-yellow-700'
      case 'Failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const calculateStats = () => {
    return {
      totalSolutions: pastRecoveryLogs.length,
      successRate: ((pastRecoveryLogs.filter(log => log.status === 'Successful').length / pastRecoveryLogs.length) * 100).toFixed(1),
      avgCostVariance: (pastRecoveryLogs.reduce((sum, log) => sum + log.costVariance, 0) / pastRecoveryLogs.length).toFixed(1),
      totalPassengers: pastRecoveryLogs.reduce((sum, log) => sum + log.affectedPassengers, 0),
      totalCost: pastRecoveryLogs.reduce((sum, log) => sum + log.actualCost, 0),
      avgSatisfaction: (pastRecoveryLogs.reduce((sum, log) => sum + log.passengerSatisfaction, 0) / pastRecoveryLogs.length).toFixed(1),
      avgRebookingSuccess: (pastRecoveryLogs.reduce((sum, log) => sum + log.rebookingSuccess, 0) / pastRecoveryLogs.length).toFixed(1)
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Past Recovery Logs</h2>
          <p className="text-muted-foreground">Historical recovery solutions and performance analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Analytics
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logs" className="pb-3">
            Recovery Logs
          </TabsTrigger>
          <TabsTrigger value="analytics" className="pb-3">
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="trends" className="pb-3">
            Trends & Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6 mt-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                  <h4 className="text-sm font-medium">Success Rate</h4>
                </div>
                <p className="text-2xl font-semibold">{stats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Of all solutions</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <h4 className="text-sm font-medium">Avg Cost Variance</h4>
                </div>
                <p className={`text-2xl font-semibold ${parseFloat(stats.avgCostVariance) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.avgCostVariance}%
                </p>
                <p className="text-xs text-muted-foreground">vs estimated</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <h4 className="text-sm font-medium">Passengers Served</h4>
                </div>
                <p className="text-2xl font-semibold">{stats.totalPassengers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total affected</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <h4 className="text-sm font-medium">Satisfaction</h4>
                </div>
                <p className="text-2xl font-semibold">{stats.avgSatisfaction}/10</p>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Search Logs</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Flight number, route..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="successful">Successful</SelectItem>
                      <SelectItem value="partial">Partial Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Disruption Type</Label>
                  <Select value={disruptionTypeFilter} onValueChange={setDisruptionTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Weather Delay">Weather Delay</SelectItem>
                      <SelectItem value="Aircraft Technical">Aircraft Technical</SelectItem>
                      <SelectItem value="Crew Shortage">Crew Shortage</SelectItem>
                      <SelectItem value="Airport Closure">Airport Closure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last90days">Last 90 Days</SelectItem>
                      <SelectItem value="lastyear">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                      setDisruptionTypeFilter('all')
                      setDateRange('last7days')
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recovery History ({filteredLogs.length} records)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead >Solution ID</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Disruption</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Executed</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost Variance</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.flightNumber}</p>
                          <p className="text-sm text-muted-foreground">{log.route}</p>
                        </div>
                      </TableCell>
                      <TableCell>{log.disruptionType}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(log.priority)}>
                          {log.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.dateExecuted}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${log.costVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {log.costVariance > 0 ? '+' : ''}{log.costVariance}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{log.passengerSatisfaction}/10</span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedLog(log)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium text-green-600">{stats.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Cost Variance:</span>
                    <span className={`font-medium ${parseFloat(stats.avgCostVariance) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.avgCostVariance}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Passenger Satisfaction:</span>
                    <span className="font-medium">{stats.avgSatisfaction}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rebooking Success:</span>
                    <span className="font-medium text-blue-600">{stats.avgRebookingSuccess}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-medium">${stats.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disruption Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Weather Delay', 'Aircraft Technical', 'Crew Shortage', 'Airport Closure'].map(type => {
                    const count = pastRecoveryLogs.filter(log => log.disruptionType === type).length
                    const percentage = ((count / pastRecoveryLogs.length) * 100).toFixed(1)
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm">{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Key Insights:</strong> Solution execution time has improved by 23% over the past month. 
              Cost variance is trending positive with an average 12% under-budget performance.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Improving Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Solution execution speed (+23%)</p>
                  <p>• Cost efficiency (+12% under budget)</p>
                  <p>• Passenger satisfaction (+0.8 points)</p>
                  <p>• Rebooking success rate (+5.2%)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Average Resolution Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Weather Delays: 2h 45m</p>
                  <p>• Technical Issues: 1h 30m</p>
                  <p>• Crew Shortages: 45m</p>
                  <p>• Airport Closures: 3h 15m</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Cost Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Total Solutions: {stats.totalSolutions}</p>
                  <p>• Total Cost: ${stats.totalCost.toLocaleString()}</p>
                  <p>• Avg per Solution: ${Math.round(stats.totalCost / stats.totalSolutions).toLocaleString()}</p>
                  <p>• Cost vs Budget: {stats.avgCostVariance}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Log Detail Modal */}
      {selectedLog && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Solution Details - {selectedLog.id}</CardTitle>
              <p className="text-muted-foreground">Flight {selectedLog.flightNumber} • {selectedLog.route}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)}>
              ×
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Execution Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedLog.status)}>
                        {selectedLog.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{selectedLog.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Executed By:</span>
                      <span>{selectedLog.executedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved By:</span>
                      <span>{selectedLog.approvedBy}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cost Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Estimated Cost:</span>
                      <span>${selectedLog.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Actual Cost:</span>
                      <span>${selectedLog.actualCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance:</span>
                      <span className={`font-medium ${selectedLog.costVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedLog.costVariance > 0 ? '+' : ''}{selectedLog.costVariance}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Passenger Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Affected Passengers:</span>
                      <span className="font-medium">{selectedLog.affectedPassengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebookings:</span>
                      <span>{selectedLog.details.passengerRebookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel Vouchers:</span>
                      <span>{selectedLog.details.hotelVouchers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meal Vouchers:</span>
                      <span>{selectedLog.details.mealVouchers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compensation:</span>
                      <span>${selectedLog.details.compensation.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Passenger Satisfaction:</span>
                      <span className="font-medium">{selectedLog.passengerSatisfaction}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rebooking Success:</span>
                      <span className="font-medium text-green-600">{selectedLog.rebookingSuccess}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>OTP Impact:</span>
                      <span className="font-medium text-red-600">{selectedLog.otpImpact}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Solution Description</h4>
              <p className="text-sm text-muted-foreground">{selectedLog.details.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}