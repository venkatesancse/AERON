
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecoveryOptionsGenerator } from '../components/RecoveryOptionsGenerator'

export function RecoveryOptions() {
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState(null)

  useEffect(() => {
    // Get flight data from localStorage or navigation state
    const flightData = localStorage.getItem('selectedFlight')
    if (flightData) {
      setSelectedFlight(JSON.parse(flightData))
    }
  }, [])

  const handleSelectPlan = (plan: any) => {
    localStorage.setItem('selectedRecoveryPlan', JSON.stringify(plan))
    navigate('/detailed')
  }

  const handleCompare = () => {
    navigate('/comparison')
  }

  return (
    <RecoveryOptionsGenerator 
      selectedFlight={selectedFlight}
      onSelectPlan={handleSelectPlan}
      onCompare={handleCompare}
    />
  )
}
