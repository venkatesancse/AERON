
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function verifyData() {
  const client = await pool.connect();
  try {
    console.log('Verifying database relationships...');
    
    // Check flights with proper relationships
    const flightsQuery = `
      SELECT 
        f.flight_number,
        a.name as airline_name,
        ac.registration as aircraft_reg,
        orig.name as origin_name,
        dest.name as dest_name
      FROM flights f
      LEFT JOIN airlines a ON f.airline_id = a.id
      LEFT JOIN aircraft ac ON f.aircraft_id = ac.id
      LEFT JOIN airports orig ON f.origin_airport = orig.iata_code
      LEFT JOIN airports dest ON f.destination_airport = dest.iata_code
      LIMIT 5
    `;
    
    const flights = await client.query(flightsQuery);
    console.log('\nSample flights with relationships:');
    flights.rows.forEach(flight => {
      console.log(`${flight.flight_number}: ${flight.airline_name} - ${flight.aircraft_reg} - ${flight.origin_name} → ${flight.dest_name}`);
    });
    
    // Check disruptions with flights
    const disruptionsQuery = `
      SELECT 
        d.disruption_code,
        f.flight_number,
        dt.name as disruption_type,
        d.severity,
        d.status
      FROM disruptions d
      LEFT JOIN flights f ON d.flight_id = f.id
      LEFT JOIN disruption_types dt ON d.disruption_type_id = dt.id
      LIMIT 5
    `;
    
    const disruptions = await client.query(disruptionsQuery);
    console.log('\nSample disruptions:');
    disruptions.rows.forEach(disruption => {
      console.log(`${disruption.disruption_code}: ${disruption.flight_number} - ${disruption.disruption_type} (${disruption.severity})`);
    });
    
    // Check affected flights endpoint data
    const affectedQuery = `
      SELECT 
        f.id,
        f.flight_number,
        f.origin_airport || ' → ' || f.destination_airport as route,
        orig.city as origin_city,
        dest.city as destination_city,
        f.status as current_status,
        d.severity,
        d.title as impact
      FROM flights f
      LEFT JOIN airports orig ON f.origin_airport = orig.iata_code
      LEFT JOIN airports dest ON f.destination_airport = dest.iata_code
      LEFT JOIN disruptions d ON f.id = d.flight_id
      WHERE d.status IN ('active', 'resolving')
      LIMIT 10
    `;
    
    const affected = await client.query(affectedQuery);
    console.log('\nAffected flights for frontend:');
    affected.rows.forEach(flight => {
      console.log(`${flight.flight_number}: ${flight.route} - ${flight.origin_city} → ${flight.destination_city} (${flight.current_status})`);
    });
    
    console.log('\nDatabase verification completed successfully!');
    
  } catch (error) {
    console.error('Error verifying data:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

verifyData();
