
// Database service for connecting to PostgreSQL
export class DatabaseService {
  private baseUrl: string;

  constructor() {
    // In production, this would be your deployed API endpoint
    this.baseUrl = process.env.VITE_API_URL || 'http://0.0.0.0:3001/api';
  }

  async getActiveDisruptions() {
    try {
      const response = await fetch(`${this.baseUrl}/disruptions/active`);
      if (!response.ok) throw new Error('Failed to fetch disruptions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching active disruptions:', error);
      throw error;
    }
  }

  async getFlightOperationsDashboard() {
    try {
      const response = await fetch(`${this.baseUrl}/flights/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch flight dashboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching flight dashboard:', error);
      throw error;
    }
  }

  async getPassengerPriorityScores(flightId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/passengers/priority/${flightId}`);
      if (!response.ok) throw new Error('Failed to fetch passenger priorities');
      return await response.json();
    } catch (error) {
      console.error('Error fetching passenger priorities:', error);
      throw error;
    }
  }

  async getAircraftUtilization() {
    try {
      const response = await fetch(`${this.baseUrl}/aircraft/utilization`);
      if (!response.ok) throw new Error('Failed to fetch aircraft utilization');
      return await response.json();
    } catch (error) {
      console.error('Error fetching aircraft utilization:', error);
      throw error;
    }
  }

  async getKPIDashboard() {
    try {
      const response = await fetch(`${this.baseUrl}/kpi/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch KPI dashboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching KPI dashboard:', error);
      throw error;
    }
  }

  async getRecoveryPerformance() {
    try {
      const response = await fetch(`${this.baseUrl}/recovery/performance`);
      if (!response.ok) throw new Error('Failed to fetch recovery performance');
      return await response.json();
    } catch (error) {
      console.error('Error fetching recovery performance:', error);
      throw error;
    }
  }
}

export const dbService = new DatabaseService();
