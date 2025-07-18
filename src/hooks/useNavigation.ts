
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()
  const [selectedDisruption, setSelectedDisruption] = useState(null)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedRecoveryPlan, setSelectedRecoveryPlan] = useState(null)

  const handleCreateRecoveryPlan = (disruption: any) => {
    setSelectedDisruption(disruption)
    setSelectedFlight(null)
    navigate('/disruption')
  }

  const handleSelectFlight = (flight: any) => {
    setSelectedFlight(flight)
    navigate('/recovery')
  }

  const handleSelectRecoveryPlan = (plan: any) => {
    setSelectedRecoveryPlan(plan)
    navigate('/detailed')
  }

  return {
    selectedDisruption,
    selectedFlight,
    selectedRecoveryPlan,
    handleCreateRecoveryPlan,
    handleSelectFlight,
    handleSelectRecoveryPlan,
    setSelectedDisruption,
    setSelectedFlight,
    setSelectedRecoveryPlan
  }
}
