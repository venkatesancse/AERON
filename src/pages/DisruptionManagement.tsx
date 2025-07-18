
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DisruptionInput } from '../components/DisruptionInput'

export function DisruptionManagement() {
  const navigate = useNavigate()

  const handleSelectFlight = (flight: any) => {
    // Store flight data in localStorage or context for the next page
    localStorage.setItem('selectedFlight', JSON.stringify(flight))
    navigate('/recovery')
  }

  return (
    <DisruptionInput 
      disruption={null}
      onSelectFlight={handleSelectFlight}
    />
  )
}
