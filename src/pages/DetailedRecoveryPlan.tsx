
import React, { useState, useEffect } from 'react'
import { DetailedRecoveryPlan as DetailedRecoveryPlanComponent } from '../components/DetailedRecoveryPlan'

export function DetailedRecoveryPlan() {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    const flightData = localStorage.getItem('selectedFlight')
    const planData = localStorage.getItem('selectedRecoveryPlan')
    
    if (flightData) {
      setSelectedFlight(JSON.parse(flightData))
    }
    if (planData) {
      setSelectedPlan(JSON.parse(planData))
    }
  }, [])

  return (
    <DetailedRecoveryPlanComponent 
      plan={selectedPlan}
      flight={selectedFlight}
    />
  )
}
