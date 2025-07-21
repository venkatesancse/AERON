const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://0.0.0.0:5000",
      "https://c030c1b4-4afa-4473-9503-70afe9390bef-00-1z8g4lnqh0ais.pike.replit.dev",
      /^https:\/\/.*\.replit\.dev$/,
      /^https:\/\/.*\.pike\.replit\.dev$/,
    ],
    credentials: true,
  }),
);

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

// API Routes

// Get active disruptions with flight details
app.get("/api/disruptions/active", async (req, res) => {
  try {
    const query = `
      SELECT * FROM active_disruptions_detail 
      ORDER BY severity DESC, reported_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching active disruptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get flight operations dashboard
app.get("/api/flights/dashboard", async (req, res) => {
  try {
    const query = `
      SELECT * FROM flight_operations_dashboard 
      ORDER BY scheduled_departure ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching flight dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get passenger priority scores for a flight
app.get("/api/passengers/priority/:flightId", async (req, res) => {
  try {
    const { flightId } = req.params;
    const query = `
      SELECT * FROM passenger_priority_scores 
      WHERE flight_id = $1 
      ORDER BY priority_score DESC
    `;
    const result = await pool.query(query, [flightId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching passenger priorities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get aircraft utilization
app.get("/api/aircraft/utilization", async (req, res) => {
  try {
    const query = `SELECT * FROM aircraft_utilization ORDER BY registration`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching aircraft utilization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get KPI dashboard
app.get("/api/kpi/dashboard", async (req, res) => {
  try {
    const query = `
      SELECT * FROM kpi_dashboard 
      ORDER BY metric_date DESC 
      LIMIT 30
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching KPI dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get recovery performance
app.get("/api/recovery/performance", async (req, res) => {
  try {
    const query = `
      SELECT * FROM recovery_performance 
      ORDER BY execution_completed_at DESC 
      LIMIT 50
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recovery performance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get flights with disruptions (for affected flights list)
app.get("/api/flights/affected", async (req, res) => {
  try {
    const query = `
      SELECT 
        f.id,
        f.flight_number,
        f.origin_airport || ' → ' || f.destination_airport as route,
        orig.name as origin_city,
        dest.name as destination_city,
        f.scheduled_departure,
        f.scheduled_arrival,
        f.estimated_departure,
        f.estimated_arrival,
        f.status as current_status,
        f.passengers_booked as passengers,
        f.crew_count as crew,
        f.gate,
        f.terminal,
        a.registration as aircraft,
        a.aircraft_type,
        CASE 
          WHEN f.estimated_departure IS NOT NULL AND f.scheduled_departure IS NOT NULL 
          THEN EXTRACT(EPOCH FROM (f.estimated_departure - f.scheduled_departure))/60 
          ELSE 0 
        END as delay,
        d.severity,
        d.title as disruption_reason,
        dt.category as disruption_type,
        d.status as disruption_status,
        d.passengers_affected,
        d.connecting_flights_affected as connection_flights,
        CASE 
          WHEN d.severity = 'critical' THEN 'Critical'
          WHEN d.severity = 'high' THEN 'High'
          WHEN d.severity = 'medium' THEN 'Medium'
          ELSE 'Low'
        END as priority,
        d.updated_at as last_update
      FROM flights f
      LEFT JOIN airports orig ON f.origin_airport = orig.iata_code
      LEFT JOIN airports dest ON f.destination_airport = dest.iata_code
      LEFT JOIN aircraft a ON f.aircraft_id = a.id
      LEFT JOIN disruptions d ON f.id = d.flight_id
      LEFT JOIN disruption_types dt ON d.disruption_type_id = dt.id
      WHERE d.status IN ('active', 'resolving')
        AND f.scheduled_departure >= CURRENT_DATE - INTERVAL '1 day'
        AND f.scheduled_departure <= CURRENT_DATE + INTERVAL '2 days'
      ORDER BY d.severity DESC, f.scheduled_departure ASC
    `;
    const result = await pool.query(query);

    // Transform the data to match the frontend format
    const transformedData = result.rows.map((row) => ({
      id: row.id,
      flightNumber: row.flight_number,
      route: row.route,
      originCity: row.origin_city,
      destinationCity: row.destination_city,
      scheduledDeparture: row.scheduled_departure,
      scheduledArrival: row.scheduled_arrival,
      estimatedDeparture: row.estimated_departure,
      estimatedArrival: row.estimated_arrival,
      currentStatus: row.current_status,
      delay: Math.round(row.delay),
      aircraft: row.aircraft,
      aircraftType: row.aircraft_type,
      gate: row.gate,
      terminal: row.terminal,
      passengers: row.passengers,
      crew: row.crew,
      disruptionType: row.disruption_type,
      severity: row.severity,
      impact: row.disruption_reason,
      lastUpdate: this.getTimeAgo(row.last_update),
      priority: row.priority,
      connectionFlights: row.connection_flights || 0,
      vipPassengers: Math.floor(row.passengers * 0.02), // Estimate 2% VIP passengers
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching affected flights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to calculate time ago
function getTimeAgo(date) {
  const now = new Date();
  const updated = new Date(date);
  const diffMs = now - updated;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} mins ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

app.listen(port, "0.0.0.0", () => {
  console.log(`API server running on http://0.0.0.0:${port}`);
});
