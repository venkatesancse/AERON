
export interface DisruptionData {
  id: string
  flightNumber: string
  route: string
  status: string
  affectedPassengers: number
  estimatedDelay: number
  priority: 'low' | 'medium' | 'high'
}

export interface RecoveryPlan {
  id: string
  title: string
  description: string
  estimatedCost: number
  estimatedTime: number
  feasibility: number
  passengerImpact: number
}

export interface FilterState {
  flightNumber: string
  station: string
  region: string
  dateTime: string
}

export interface ScreenSettings {
  id: string
  name: string
  icon: any
  category: string
  enabled: boolean
  required: boolean
}
