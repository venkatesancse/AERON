
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComparisonMatrix as ComparisonMatrixComponent } from '../components/ComparisonMatrix'

export function ComparisonMatrix() {
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState(null)

  useEffect(() => {
    const flightData = localStorage.getItem('selectedFlight')
    if (flightData) {
      setSelectedFlight(JSON.parse(flightData))
    }
  }, [])

  const handleSelectPlan = (plan: any) => {
    localStorage.setItem('selectedRecoveryPlan', JSON.stringify(plan))
    navigate('/detailed')
  }

  return (
    <ComparisonMatrixComponent 
      selectedFlight={selectedFlight}
      onSelectPlan={handleSelectPlan}
    />
  )
}
