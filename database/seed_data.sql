
-- AERON Flight Disruption Management - Seed Data
-- Initial data for development and testing

-- Insert Airlines
INSERT INTO airlines (iata_code, icao_code, name, country) VALUES
('FZ', 'FDB', 'flydubai', 'UAE'),
('EK', 'UAE', 'Emirates', 'UAE'),
('QR', 'QTR', 'Qatar Airways', 'Qatar'),
('SV', 'SVA', 'Saudi Arabian Airlines', 'Saudi Arabia'),
('MS', 'MSR', 'EgyptAir', 'Egypt');

-- Insert Major Airports
INSERT INTO airports (iata_code, icao_code, name, city, country, timezone, latitude, longitude) VALUES
('DXB', 'OMDB', 'Dubai International Airport', 'Dubai', 'UAE', 'Asia/Dubai', 25.2532, 55.3657),
('JFK', 'KJFK', 'John F. Kennedy International Airport', 'New York', 'USA', 'America/New_York', 40.6413, -73.7781),
('LHR', 'EGLL', 'London Heathrow Airport', 'London', 'UK', 'Europe/London', 51.4700, -0.4543),
('DEL', 'VIDP', 'Indira Gandhi International Airport', 'New Delhi', 'India', 'Asia/Kolkata', 28.5665, 77.1031),
('BOM', 'VABB', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India', 'Asia/Kolkata', 19.0896, 72.8656),
('DOH', 'OTHH', 'Hamad International Airport', 'Doha', 'Qatar', 'Asia/Qatar', 25.2731, 51.6080),
('RUH', 'OERK', 'King Khalid International Airport', 'Riyadh', 'Saudi Arabia', 'Asia/Riyadh', 24.9576, 46.6988),
('CAI', 'HECA', 'Cairo International Airport', 'Cairo', 'Egypt', 'Africa/Cairo', 30.1219, 31.4056),
('IST', 'LTFM', 'Istanbul Airport', 'Istanbul', 'Turkey', 'Europe/Istanbul', 41.2619, 28.7417),
('KHI', 'OPKC', 'Jinnah International Airport', 'Karachi', 'Pakistan', 'Asia/Karachi', 24.9056, 67.1608);

-- Insert Aircraft Types
INSERT INTO aircraft (registration, aircraft_type, manufacturer, model, seats_economy, seats_business, seats_first, total_seats, cargo_capacity_kg, fuel_capacity_liters, range_km) VALUES
('A6-FMA', 'B737-800', 'Boeing', '737-800', 162, 12, 0, 174, 4500, 26020, 5400),
('A6-FMB', 'B737-800', 'Boeing', '737-800', 162, 12, 0, 174, 4500, 26020, 5400),
('A6-FMC', 'B737 MAX 8', 'Boeing', '737 MAX 8', 166, 12, 0, 178, 4500, 25816, 6570),
('A6-FMD', 'B737 MAX 8', 'Boeing', '737 MAX 8', 166, 12, 0, 178, 4500, 25816, 6570),
('A6-FME', 'B737-900ER', 'Boeing', '737-900ER', 180, 12, 0, 192, 5000, 28988, 6045),
('A6-EUA', 'A380-800', 'Airbus', 'A380-800', 427, 76, 14, 517, 25000, 320000, 15200),
('A6-EUB', 'A380-800', 'Airbus', 'A380-800', 427, 76, 14, 517, 25000, 320000, 15200),
('A6-EWA', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650),
('A6-EWB', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650),
('A6-EVA', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650);

-- Insert Disruption Types
INSERT INTO disruption_types (code, name, category, severity_weight, auto_recovery_eligible, description) VALUES
('WX_STORM', 'Severe Weather - Thunderstorm', 'weather', 1.5, false, 'Thunderstorms affecting departure or arrival airport'),
('WX_FOG', 'Poor Visibility - Fog', 'weather', 1.2, false, 'Low visibility conditions due to fog'),
('WX_WIND', 'High Winds', 'weather', 1.3, false, 'Wind speeds exceeding operational limits'),
('WX_SAND', 'Sandstorm', 'weather', 1.4, false, 'Sandstorm conditions affecting operations'),
('TECH_ENG', 'Engine Technical Issue', 'technical', 1.8, true, 'Engine-related technical problems'),
('TECH_HYD', 'Hydraulic System Issue', 'technical', 1.6, true, 'Hydraulic system malfunction'),
('TECH_AVIONICS', 'Avionics Issue', 'technical', 1.4, true, 'Avionics or electronic system problems'),
('CREW_DUTY', 'Crew Duty Time Limitation', 'crew', 1.3, true, 'Crew exceeding maximum duty time'),
('CREW_SICK', 'Crew Illness', 'crew', 1.5, true, 'Crew member illness or unavailability'),
('ATC_DELAY', 'Air Traffic Control Delay', 'atc', 1.1, false, 'ATC-imposed delays or restrictions'),
('AIRPORT_CLOSURE', 'Airport Closure', 'airport', 2.0, false, 'Complete airport closure'),
('SECURITY_ALERT', 'Security Alert', 'security', 1.7, false, 'Security-related operational disruption');

-- Insert Sample Crew Members
INSERT INTO crew_members (employee_id, first_name, last_name, role, license_number, base_location, phone, email, qualifications, status) VALUES
('FZ001', 'Sarah', 'Johnson', 'captain', 'CPL-12345', 'DXB', '+971-50-123-4567', 'sarah.johnson@flydubai.com', '{"aircraft_types": ["B737-800", "B737 MAX 8"], "languages": ["en", "ar"]}', 'available'),
('FZ002', 'Ahmed', 'Al-Rashid', 'first_officer', 'CPL-12346', 'DXB', '+971-50-123-4568', 'ahmed.alrashid@flydubai.com', '{"aircraft_types": ["B737-800", "B737 MAX 8"], "languages": ["en", "ar"]}', 'available'),
('FZ003', 'Maria', 'Rodriguez', 'senior_flight_attendant', 'FA-5678', 'DXB', '+971-50-123-4569', 'maria.rodriguez@flydubai.com', '{"languages": ["en", "es", "ar"], "special_training": ["medical", "security"]}', 'available'),
('FZ004', 'John', 'Smith', 'flight_attendant', 'FA-5679', 'DXB', '+971-50-123-4570', 'john.smith@flydubai.com', '{"languages": ["en"], "special_training": ["safety"]}', 'available'),
('FZ005', 'Fatima', 'Hassan', 'flight_attendant', 'FA-5680', 'DXB', '+971-50-123-4571', 'fatima.hassan@flydubai.com', '{"languages": ["ar", "en"], "special_training": ["medical"]}', 'available');

-- Insert Optimization Parameters
INSERT INTO optimization_parameters (parameter_name, parameter_category, weight, description) VALUES
('cost_minimization', 'financial', 25.0, 'Minimize total recovery costs'),
('time_efficiency', 'operational', 25.0, 'Minimize time to resolution'),
('passenger_satisfaction', 'service', 25.0, 'Maximize passenger satisfaction scores'),
('otp_impact', 'performance', 25.0, 'Minimize impact on on-time performance'),
('resource_optimization', 'operational', 0.0, 'Optimize resource utilization'),
('risk_minimization', 'operational', 0.0, 'Minimize operational risk');

-- Insert Sample Weather Data
INSERT INTO weather_data (airport_code, observation_time, temperature_celsius, humidity_percent, pressure_hpa, wind_speed_kmh, wind_direction, visibility_km, weather_conditions) VALUES
('DXB', NOW() - INTERVAL '1 hour', 28.5, 65, 1013.2, 15, 120, 10.0, 'Clear'),
('JFK', NOW() - INTERVAL '1 hour', 18.2, 78, 1015.5, 25, 270, 8.0, 'Partly Cloudy'),
('LHR', NOW() - INTERVAL '1 hour', 12.1, 85, 1012.8, 18, 220, 5.0, 'Overcast'),
('DEL', NOW() - INTERVAL '1 hour', 32.5, 45, 1011.2, 8, 90, 6.0, 'Hazy'),
('BOM', NOW() - INTERVAL '1 hour', 29.8, 72, 1009.5, 12, 200, 9.0, 'Clear');
