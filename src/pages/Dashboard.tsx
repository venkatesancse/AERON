'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/components/ui/card'
import { Button } from '../components/components/ui/button'
import { Badge } from '../components/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select'
import { Input } from '../components/components/ui/input'
import { Alert, AlertDescription } from '../components/components/ui/alert'
import { AlertTriangle, Filter, BarChart3, Plus, Brain, Calendar, ClockIcon, CheckSquare, UserCheck } from 'lucide-react'
import { WorldMap } from '../components/components/WorldMap'
import { FilterState, ScreenSettings } from '../types'

interface DashboardProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  onCreateRecoveryPlan: (disruption: any) => void
  enabledScreens: ScreenSettings[]
  navigateToScreen: (screenId: string) => void
}

export default function Dashboard({ 
  filters, 
  setFilters, 
  onCreateRecoveryPlan, 
  enabledScreens, 
  navigateToScreen 
}: DashboardProps) {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Alert Banner - flydubai specific */}
      <Alert className="border-flydubai-orange bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-flydubai-orange flex-shrink-0" />
        <AlertDescription className="text-orange-800">
          <strong>Active Disruptions:</strong> 18 Flydubai flights affected by sandstorm at DXB. AERON recovery plans available.
        </AlertDescription>
      </Alert>

      {/* Quick Analytics Banner - flydubai themed */}
      <Card className="bg-gradient-flydubai-light border-blue-200">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative flex-shrink-0">
                <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-flydubai-blue" />
                <div className="absolute -inset-1 bg-flydubai-blue rounded-lg opacity-10 blur-sm"></div>
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-flydubai-navy text-sm md:text-base">Flydubai AERON Performance Today</h3>
                <p className="text-xs md:text-sm text-muted-foreground">8 recovery decisions processed • 96.1% success rate</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-base md:text-lg font-semibold text-flydubai-blue">AED 312K</p>
                <p className="text-xs text-muted-foreground">Cost Savings</p>
              </div>
              <div className="text-center">
                <p className="text-base md:text-lg font-semibold text-flydubai-navy">7.8 min</p>
                <p className="text-xs text-muted-foreground">Avg Decision</p>
              </div>
              <div className="text-center">
                <p className="text-base md:text-lg font-semibold text-flydubai-orange">2,847</p>
                <p className="text-xs text-muted-foreground">Passengers Served</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigateToScreen('reports')} 
                className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">View Full Analytics</span>
                <span className="sm:hidden">Analytics</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters - flydubai destinations */}
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Filter className="h-4 w-4 md:h-5 md:w-5 text-flydubai-blue" />
            Flydubai Network Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Flight Number</label>
              <Input 
                placeholder="FZ123"
                value={filters.flightNumber}
                onChange={(e) => setFilters({...filters, flightNumber: e.target.value})}
                className="input-flydubai w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block">Station</label>
              <Select value={filters.station} onValueChange={(value) => setFilters({...filters, station: value})}>
                <SelectTrigger className="select-flydubai w-full">
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
                  <SelectItem value="ist">IST - Istanbul</SelectItem>
                  <SelectItem value="bcn">BCN - Barcelona</SelectItem>
                  <SelectItem value="prg">PRG - Prague</SelectItem>
                  <SelectItem value="tbz">TBZ - Tabriz</SelectItem>
                  <SelectItem value="beg">BEG - Belgrade</SelectItem>
                  <SelectItem value="skp">SKP - Skopje</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block">Region</label>
              <Select value={filters.region} onValueChange={(value) => setFilters({...filters, region: value})}>
                <SelectTrigger className="select-flydubai w-full">
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
            <div className="space-y-2">
              <label className="text-sm font-medium block">Date/Time</label>
              <Input 
                type="datetime-local"
                value={filters.dateTime}
                onChange={(e) => setFilters({...filters, dateTime: e.target.value})}
                className="input-flydubai w-full"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        <Button 
          onClick={() => onCreateRecoveryPlan(null)} 
          className="flex items-center justify-center gap-2 btn-flydubai-primary h-12"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">View Affected Flights</span>
          <span className="sm:hidden">Affected Flights</span>
        </Button>

        {enabledScreens.find(s => s.id === 'prediction-dashboard') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('prediction-dashboard')}
            className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-flydubai-navy border-blue-200 h-12"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Disruption Prediction</span>
            <span className="sm:hidden">Prediction</span>
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'flight-tracking') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('flight-tracking')}
            className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200 h-12"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Flight Tracking Gantt</span>
            <span className="sm:hidden">Tracking</span>
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'pending') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('pending')}
            className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200 h-12"
          >
            <ClockIcon className="h-4 w-4" />
            <span className="hidden sm:inline">View Pending Solutions</span>
            <span className="sm:hidden">Pending</span>
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'past-logs') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('past-logs')}
            className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200 h-12"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Past Recovery Logs</span>
            <span className="sm:hidden">Logs</span>
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'passengers') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('passengers')}
            className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200 h-12"
          >
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Passenger Services</span>
            <span className="sm:hidden">Passengers</span>
          </Button>
        )}

        {enabledScreens.find(s => s.id === 'reports') && (
          <Button 
            variant="outline" 
            onClick={() => navigateToScreen('reports')}
            className="flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-flydubai-blue border-blue-200 h-12"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics Dashboard</span>
            <span className="sm:hidden">Analytics</span>
          </Button>
        )}
      </div>
    </div>
  )
}