-- AERON Flight Disruption Management - Fixed Sample Data with proper UUIDs
-- Populating all tables with realistic sample data

-- Clear existing data (in proper order to respect foreign keys)
TRUNCATE TABLE audit_logs, decision_logs, kpi_metrics, weather_data, optimization_parameters, 
                maintenance_events, vouchers, hotel_bookings, passenger_rebookings, 
                recovery_tasks, recovery_plans, recovery_options, disruptions, 
                flight_crew, crew_members, flight_passengers, passengers, 
                flight_status_history, flights, aircraft, disruption_types, 
                airports, airlines CASCADE;

-- Insert Airlines first
INSERT INTO airlines (id, iata_code, icao_code, name, country, active) VALUES
(uuid_generate_v4(), 'FZ', 'FDB', 'flydubai', 'UAE', true),
(uuid_generate_v4(), 'EK', 'UAE', 'Emirates', 'UAE', true),
(uuid_generate_v4(), 'QR', 'QTR', 'Qatar Airways', 'Qatar', true),
(uuid_generate_v4(), 'SV', 'SVA', 'Saudi Arabian Airlines', 'Saudi Arabia', true),
(uuid_generate_v4(), 'MS', 'MSR', 'EgyptAir', 'Egypt', true),
(uuid_generate_v4(), 'TK', 'THY', 'Turkish Airlines', 'Turkey', true),
(uuid_generate_v4(), 'AI', 'AIC', 'Air India', 'India', true),
(uuid_generate_v4(), 'PK', 'PIA', 'Pakistan International Airlines', 'Pakistan', true),
(uuid_generate_v4(), 'IY', 'IYE', 'Yemenia', 'Yemen', true),
(uuid_generate_v4(), 'RJ', 'RJA', 'Royal Jordanian', 'Jordan', true);

-- Insert Airports
INSERT INTO airports (id, iata_code, icao_code, name, city, country, timezone, latitude, longitude, elevation_ft, active, weather_station_id) VALUES
(uuid_generate_v4(), 'DXB', 'OMDB', 'Dubai International Airport', 'Dubai', 'UAE', 'Asia/Dubai', 25.2532, 55.3657, 62, true, 'DXB_WS001'),
(uuid_generate_v4(), 'JFK', 'KJFK', 'John F. Kennedy International Airport', 'New York', 'USA', 'America/New_York', 40.6413, -73.7781, 13, true, 'JFK_WS001'),
(uuid_generate_v4(), 'LHR', 'EGLL', 'London Heathrow Airport', 'London', 'UK', 'Europe/London', 51.4700, -0.4543, 83, true, 'LHR_WS001'),
(uuid_generate_v4(), 'DEL', 'VIDP', 'Indira Gandhi International Airport', 'New Delhi', 'India', 'Asia/Kolkata', 28.5665, 77.1031, 777, true, 'DEL_WS001'),
(uuid_generate_v4(), 'BOM', 'VABB', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India', 'Asia/Kolkata', 19.0896, 72.8656, 39, true, 'BOM_WS001'),
(uuid_generate_v4(), 'DOH', 'OTHH', 'Hamad International Airport', 'Doha', 'Qatar', 'Asia/Qatar', 25.2731, 51.6080, 13, true, 'DOH_WS001'),
(uuid_generate_v4(), 'RUH', 'OERK', 'King Khalid International Airport', 'Riyadh', 'Saudi Arabia', 'Asia/Riyadh', 24.9576, 46.6988, 2049, true, 'RUH_WS001'),
(uuid_generate_v4(), 'CAI', 'HECA', 'Cairo International Airport', 'Cairo', 'Egypt', 'Africa/Cairo', 30.1219, 31.4056, 382, true, 'CAI_WS001'),
(uuid_generate_v4(), 'IST', 'LTFM', 'Istanbul Airport', 'Istanbul', 'Turkey', 'Europe/Istanbul', 41.2619, 28.7417, 325, true, 'IST_WS001'),
(uuid_generate_v4(), 'KHI', 'OPKC', 'Jinnah International Airport', 'Karachi', 'Pakistan', 'Asia/Karachi', 24.9056, 67.1608, 100, true, 'KHI_WS001'),
(uuid_generate_v4(), 'COK', 'VOCI', 'Cochin International Airport', 'Kochi', 'India', 'Asia/Kolkata', 10.1520, 76.4019, 93, true, 'COK_WS001'),
(uuid_generate_v4(), 'AMM', 'OJAI', 'Queen Alia International Airport', 'Amman', 'Jordan', 'Asia/Amman', 31.7226, 35.9939, 2395, true, 'AMM_WS001');

-- Insert Aircraft
INSERT INTO aircraft (id, registration, aircraft_type, manufacturer, model, seats_economy, seats_business, seats_first, total_seats, cargo_capacity_kg, fuel_capacity_liters, range_km, max_speed_kmh, status, home_base, last_maintenance, next_maintenance_due, flight_hours_total, cycles_total) VALUES
(uuid_generate_v4(), 'A6-FMA', 'B737-800', 'Boeing', '737-800', 162, 12, 0, 174, 4500, 26020, 5400, 842, 'active', 'DXB', '2024-12-15', '2025-03-15', 25680, 8500),
(uuid_generate_v4(), 'A6-FMB', 'B737-800', 'Boeing', '737-800', 162, 12, 0, 174, 4500, 26020, 5400, 842, 'active', 'DXB', '2024-11-20', '2025-02-20', 28340, 9200),
(uuid_generate_v4(), 'A6-FMC', 'B737 MAX 8', 'Boeing', '737 MAX 8', 166, 12, 0, 178, 4500, 25816, 6570, 839, 'active', 'DXB', '2024-12-01', '2025-03-01', 12450, 4100),
(uuid_generate_v4(), 'A6-FMD', 'B737 MAX 8', 'Boeing', '737 MAX 8', 166, 12, 0, 178, 4500, 25816, 6570, 839, 'maintenance', 'DXB', '2024-12-25', '2025-01-05', 15230, 5200),
(uuid_generate_v4(), 'A6-FME', 'B737-900ER', 'Boeing', '737-900ER', 180, 12, 0, 192, 5000, 28988, 6045, 842, 'active', 'DXB', '2024-10-30', '2025-01-30', 32560, 11200),
(uuid_generate_v4(), 'A6-EUA', 'A380-800', 'Airbus', 'A380-800', 427, 76, 14, 517, 25000, 320000, 15200, 945, 'active', 'DXB', '2024-11-15', '2025-05-15', 45200, 12800),
(uuid_generate_v4(), 'A6-EUB', 'A380-800', 'Airbus', 'A380-800', 427, 76, 14, 517, 25000, 320000, 15200, 945, 'active', 'DXB', '2024-12-10', '2025-06-10', 42800, 12200),
(uuid_generate_v4(), 'A6-EWA', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650, 945, 'active', 'DXB', '2024-12-05', '2025-04-05', 38900, 10500),
(uuid_generate_v4(), 'A6-EWB', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650, 945, 'active', 'DXB', '2024-11-25', '2025-03-25', 41200, 11800),
(uuid_generate_v4(), 'A6-EVA', 'B777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650, 945, 'active', 'DXB', '2024-12-20', '2025-04-20', 35600, 9800);

-- Insert Disruption Types
INSERT INTO disruption_types (id, code, name, category, severity_weight, auto_recovery_eligible, description, active) VALUES
(uuid_generate_v4(), 'WX_STORM', 'Severe Weather - Thunderstorm', 'weather', 1.5, false, 'Thunderstorms affecting departure or arrival airport operations', true),
(uuid_generate_v4(), 'WX_FOG', 'Poor Visibility - Fog', 'weather', 1.2, false, 'Low visibility conditions due to fog affecting aircraft operations', true),
(uuid_generate_v4(), 'WX_WIND', 'High Winds', 'weather', 1.3, false, 'Wind speeds exceeding operational safety limits for takeoff/landing', true),
(uuid_generate_v4(), 'WX_SAND', 'Sandstorm', 'weather', 1.4, false, 'Sandstorm conditions reducing visibility and affecting engine operations', true),
(uuid_generate_v4(), 'TECH_ENG', 'Engine Technical Issue', 'technical', 1.8, true, 'Engine-related technical problems requiring maintenance intervention', true),
(uuid_generate_v4(), 'TECH_HYD', 'Hydraulic System Issue', 'technical', 1.6, true, 'Hydraulic system malfunction affecting flight control systems', true),
(uuid_generate_v4(), 'TECH_AVIONICS', 'Avionics Issue', 'technical', 1.4, true, 'Avionics or electronic system problems affecting navigation/communication', true),
(uuid_generate_v4(), 'CREW_DUTY', 'Crew Duty Time Limitation', 'crew', 1.3, true, 'Crew exceeding maximum allowable duty time per regulations', true),
(uuid_generate_v4(), 'CREW_SICK', 'Crew Illness', 'crew', 1.5, true, 'Crew member illness or sudden unavailability affecting flight operations', true),
(uuid_generate_v4(), 'ATC_DELAY', 'Air Traffic Control Delay', 'atc', 1.1, false, 'ATC-imposed delays or restrictions due to traffic congestion', true),
(uuid_generate_v4(), 'AIRPORT_CLOSURE', 'Airport Closure', 'airport', 2.0, false, 'Complete airport closure due to emergency or security situations', true),
(uuid_generate_v4(), 'SECURITY_ALERT', 'Security Alert', 'security', 1.7, false, 'Security-related operational disruption requiring immediate attention', true);

-- Insert Sample Crew Members with all fields populated
INSERT INTO crew_members (id, employee_id, first_name, last_name, role, license_number, license_expiry, base_location, phone, email, emergency_contact, qualifications, duty_time_limit, rest_time_required, status) VALUES
(uuid_generate_v4(), 'FZ001', 'Sarah', 'Johnson', 'captain', 'CPL-12345', '2026-06-15', 'DXB', '+971-50-123-4567', 'sarah.johnson@flydubai.com', '{"name": "Michael Johnson", "phone": "+1-555-0123", "relation": "spouse"}', '{"aircraft_types": ["B737-800", "B737 MAX 8"], "languages": ["en", "ar"], "certifications": ["ICAO Level 6", "CRM"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'FZ002', 'Ahmed', 'Al-Rashid', 'first_officer', 'CPL-12346', '2025-12-20', 'DXB', '+971-50-123-4568', 'ahmed.alrashid@flydubai.com', '{"name": "Fatima Al-Rashid", "phone": "+971-50-987-6543", "relation": "wife"}', '{"aircraft_types": ["B737-800", "B737 MAX 8"], "languages": ["en", "ar"], "certifications": ["ICAO Level 5", "CRM"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'FZ003', 'Maria', 'Rodriguez', 'senior_flight_attendant', 'FA-5678', '2025-08-30', 'DXB', '+971-50-123-4569', 'maria.rodriguez@flydubai.com', '{"name": "Carlos Rodriguez", "phone": "+34-600-123-456", "relation": "brother"}', '{"languages": ["en", "es", "ar"], "special_training": ["medical", "security"], "certifications": ["First Aid", "Security"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'FZ004', 'John', 'Smith', 'flight_attendant', 'FA-5679', '2025-11-15', 'DXB', '+971-50-123-4570', 'john.smith@flydubai.com', '{"name": "Emma Smith", "phone": "+44-7700-900123", "relation": "mother"}', '{"languages": ["en"], "special_training": ["safety"], "certifications": ["Basic Safety"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'FZ005', 'Fatima', 'Hassan', 'flight_attendant', 'FA-5680', '2026-01-10', 'DXB', '+971-50-123-4571', 'fatima.hassan@flydubai.com', '{"name": "Omar Hassan", "phone": "+971-50-555-7890", "relation": "husband"}', '{"languages": ["ar", "en"], "special_training": ["medical"], "certifications": ["Medical Emergency"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'EK001', 'David', 'Thompson', 'captain', 'CPL-45678', '2026-03-25', 'DXB', '+971-50-456-7890', 'david.thompson@emirates.com', '{"name": "Lisa Thompson", "phone": "+1-555-0456", "relation": "wife"}', '{"aircraft_types": ["A380-800", "B777-300ER"], "languages": ["en"], "certifications": ["ICAO Level 6", "CRM", "A380 Type Rating"]}', 480, 600, 'on_duty'),
(uuid_generate_v4(), 'EK002', 'Priya', 'Sharma', 'first_officer', 'CPL-45679', '2025-09-18', 'DXB', '+971-50-456-7891', 'priya.sharma@emirates.com', '{"name": "Raj Sharma", "phone": "+91-98765-43210", "relation": "father"}', '{"aircraft_types": ["A380-800", "B777-300ER"], "languages": ["en", "hi"], "certifications": ["ICAO Level 5", "CRM"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'QR001', 'Mohammed', 'Al-Thani', 'captain', 'CPL-78901', '2026-07-12', 'DOH', '+974-5555-1234', 'mohammed.althani@qatarairways.com', '{"name": "Aisha Al-Thani", "phone": "+974-5555-5678", "relation": "wife"}', '{"aircraft_types": ["A350-900", "B787-8"], "languages": ["ar", "en"], "certifications": ["ICAO Level 6", "CRM"]}', 480, 600, 'rest'),
(uuid_generate_v4(), 'TK001', 'Mehmet', 'Ozturk', 'captain', 'CPL-23456', '2025-10-05', 'IST', '+90-532-123-4567', 'mehmet.ozturk@turkishairlines.com', '{"name": "Ayse Ozturk", "phone": "+90-532-987-6543", "relation": "spouse"}', '{"aircraft_types": ["A330-300", "B737-800"], "languages": ["tr", "en"], "certifications": ["ICAO Level 5", "CRM"]}', 480, 600, 'available'),
(uuid_generate_v4(), 'AI001', 'Rajesh', 'Gupta', 'first_officer', 'CPL-34567', '2025-12-28', 'DEL', '+91-98888-12345', 'rajesh.gupta@airindia.in', '{"name": "Sunita Gupta", "phone": "+91-98888-54321", "relation": "mother"}', '{"aircraft_types": ["A320-200", "B787-8"], "languages": ["hi", "en"], "certifications": ["ICAO Level 5", "CRM"]}', 480, 600, 'available');

-- Insert Sample Passengers with all fields populated
INSERT INTO passengers (id, pnr, title, first_name, last_name, email, phone, date_of_birth, nationality, passport_number, loyalty_tier, frequent_flyer_number, special_requirements, preferred_language, travel_class, seat_assignment, check_in_status, boarding_pass_issued) VALUES
(uuid_generate_v4(), 'ABC123', 'Mr.', 'James', 'Wilson', 'james.wilson@email.com', '+1-555-0198', '1985-03-15', 'USA', 'US123456789', 'gold', 'FZ123456789', '{"meal": "vegetarian", "assistance": "none"}', 'en', 'business', '2A', true, true),
(uuid_generate_v4(), 'DEF456', 'Ms.', 'Sarah', 'Connor', 'sarah.connor@email.com', '+44-20-7946-0958', '1990-07-22', 'GBR', 'GB987654321', 'platinum', 'EK987654321', '{"meal": "kosher", "assistance": "wheelchair"}', 'en', 'first', '1A', true, true),
(uuid_generate_v4(), 'GHI789', 'Dr.', 'Ahmed', 'Abdullah', 'ahmed.abdullah@email.com', '+971-50-555-0123', '1978-12-10', 'UAE', 'AE555123456', 'silver', 'FZ555123456', '{"meal": "halal", "assistance": "none"}', 'ar', 'business', '3C', true, true),
(uuid_generate_v4(), 'JKL012', 'Mrs.', 'Priya', 'Patel', 'priya.patel@email.com', '+91-98765-43210', '1987-05-18', 'IND', 'IN789456123', 'bronze', 'AI789456123', '{"meal": "vegan", "assistance": "none"}', 'en', 'economy', '25F', false, false),
(uuid_generate_v4(), 'MNO345', 'Mr.', 'Hans', 'Mueller', 'hans.mueller@email.com', '+49-30-12345678', '1982-09-03', 'DEU', 'DE456789012', 'gold', 'LH456789012', '{"meal": "standard", "assistance": "none"}', 'de', 'business', '4D', true, true),
(uuid_generate_v4(), 'PQR678', 'Ms.', 'Fatima', 'Al-Zahra', 'fatima.alzahra@email.com', '+966-50-123-4567', '1992-11-25', 'SAU', 'SA321654987', 'silver', 'SV321654987', '{"meal": "halal", "assistance": "none"}', 'ar', 'economy', '18B', true, false),
(uuid_generate_v4(), 'STU901', 'Mr.', 'Roberto', 'Silva', 'roberto.silva@email.com', '+55-11-98765-4321', '1975-02-14', 'BRA', 'BR654321098', 'bronze', 'AA654321098', '{"meal": "standard", "assistance": "mobility"}', 'pt', 'economy', '22C', false, false),
(uuid_generate_v4(), 'VWX234', 'Prof.', 'Liu', 'Wei', 'liu.wei@email.com', '+86-138-0013-8000', '1980-08-07', 'CHN', 'CN147258369', 'platinum', 'CA147258369', '{"meal": "special", "assistance": "none"}', 'zh', 'first', '1F', true, true),
(uuid_generate_v4(), 'YZA567', 'Ms.', 'Aisha', 'Johnson', 'aisha.johnson@email.com', '+1-212-555-0147', '1988-04-12', 'USA', 'US258369147', 'gold', 'UA258369147', '{"meal": "gluten_free", "assistance": "none"}', 'en', 'business', '6A', true, true),
(uuid_generate_v4(), 'BCD890', 'Mr.', 'Olivier', 'Dubois', 'olivier.dubois@email.com', '+33-1-42-86-83-00', '1983-10-30', 'FRA', 'FR369258147', 'silver', 'AF369258147', '{"meal": "vegetarian", "assistance": "none"}', 'fr', 'economy', '19E', false, false);

-- Insert Sample Flights with active disruptions
INSERT INTO flights (id, flight_number, airline_id, aircraft_id, origin_airport, destination_airport, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival, estimated_departure, estimated_arrival, gate, terminal, status, passengers_booked, passengers_checked_in, crew_count, cargo_weight_kg, fuel_planned_liters, fuel_actual_liters, flight_time_scheduled, flight_time_actual, distance_km, route_waypoints, weather_conditions) 
VALUES
(uuid_generate_v4(), 'FZ215', (SELECT id FROM airlines WHERE iata_code = 'FZ'), (SELECT id FROM aircraft WHERE registration = 'A6-FMA'), (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'BOM'), '2025-01-21 15:30:00+04', '2025-01-21 20:15:00+05:30', NULL, NULL, '2025-01-21 17:30:00+04', '2025-01-21 22:15:00+05:30', 'B12', 'T2', 'delayed', 189, 156, 6, 2500, 12000, 12500, 165, NULL, 1850, '["DXB", "OMRK", "VABB"]', '{"departure": "sandstorm", "arrival": "clear"}'),
(uuid_generate_v4(), 'FZ203', (SELECT id FROM airlines WHERE iata_code = 'FZ'), (SELECT id FROM aircraft WHERE registration = 'A6-FMB'), (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'DEL'), '2025-01-21 16:45:00+04', '2025-01-21 21:20:00+05:30', NULL, NULL, NULL, NULL, 'A08', 'T2', 'cancelled', 195, 123, 6, 3200, 11500, 0, 155, NULL, 2200, '["DXB", "OPRN", "VIDP"]', '{"departure": "clear", "arrival": "fog"}'),
(uuid_generate_v4(), 'FZ235', (SELECT id FROM airlines WHERE iata_code = 'FZ'), (SELECT id FROM aircraft WHERE registration = 'A6-FMC'), (SELECT id FROM airports WHERE iata_code = 'KHI'), (SELECT id FROM airports WHERE iata_code = 'DXB'), '2025-01-21 08:30:00+05', '2025-01-21 10:15:00+04', NULL, NULL, '2025-01-21 11:00:00+05', '2025-01-21 12:45:00+04', 'C15', 'T1', 'delayed', 181, 164, 6, 1800, 9500, 9800, 105, NULL, 1200, '["OPKC", "OMRK", "OMDB"]', '{"departure": "clear", "arrival": "clear"}'),
(uuid_generate_v4(), 'FZ147', (SELECT id FROM airlines WHERE iata_code = 'FZ'), (SELECT id FROM aircraft WHERE registration = 'A6-FME'), (SELECT id FROM airports WHERE iata_code = 'IST'), (SELECT id FROM airports WHERE iata_code = 'DXB'), '2025-01-21 21:15:00+03', '2025-01-22 05:30:00+04', NULL, NULL, '2025-01-21 21:45:00+03', '2025-01-22 06:00:00+04', 'D22', 'T1', 'delayed', 189, 145, 6, 2800, 14000, 14200, 255, NULL, 3200, '["LTFM", "LTAC", "OMDB"]', '{"departure": "overcast", "arrival": "clear"}'),
(uuid_generate_v4(), 'FZ181', (SELECT id FROM airlines WHERE iata_code = 'FZ'), (SELECT id FROM aircraft WHERE registration = 'A6-FMA'), (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'COK'), '2025-01-21 14:20:00+04', '2025-01-21 19:45:00+05:30', NULL, NULL, '2025-01-21 15:10:00+04', '2025-01-21 20:35:00+05:30', 'A15', 'T2', 'delayed', 175, 138, 6, 2200, 10800, 11000, 205, NULL, 1680, '["DXB", "OMRK", "VOCI"]', '{"departure": "clear", "arrival": "partly_cloudy"}');

-- Insert Flight Status History
INSERT INTO flight_status_history (id, flight_id, old_status, new_status, reason, changed_by, changed_at) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'scheduled', 'delayed', 'Sandstorm conditions at departure airport', 'ops_controller_001', NOW() - INTERVAL '2 hours'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ203'), 'scheduled', 'cancelled', 'Dense fog at destination airport', 'ops_manager_002', NOW() - INTERVAL '1 hour'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ235'), 'scheduled', 'delayed', 'ATC slot restrictions', 'ops_controller_003', NOW() - INTERVAL '3 hours'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'EK524'), 'departed', 'arrived', 'Flight completed successfully', 'system_auto', NOW() - INTERVAL '30 minutes'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'QR708'), 'en_route', 'arrived', 'Flight landed safely', 'system_auto', NOW() - INTERVAL '45 minutes');

-- Link passengers to flights  
INSERT INTO flight_passengers (id, flight_id, passenger_id, seat_number, travel_class, ticket_type, fare_amount, currency, booking_date, booking_channel, status, priority_score, connection_flight_id, connection_risk) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ215'), (SELECT id FROM passengers WHERE pnr = 'ABC123'), '2A', 'business', 'ticketed', 1250.00, 'USD', '2024-12-15 10:30:00', 'website', 'checked_in', 85, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ203'), (SELECT id FROM passengers WHERE pnr = 'DEF456'), '1A', 'first', 'ticketed', 2800.00, 'USD', '2024-11-20 14:45:00', 'mobile', 'checked_in', 95, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ215'), (SELECT id FROM passengers WHERE pnr = 'GHI789'), '3C', 'business', 'ticketed', 1180.00, 'USD', '2024-12-22 09:15:00', 'agent', 'checked_in', 80, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ235'), (SELECT id FROM passengers WHERE pnr = 'JKL012'), '25F', 'economy', 'ticketed', 450.00, 'USD', '2024-12-10 16:20:00', 'corporate', 'confirmed', 25, (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'high'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'EK524'), (SELECT id FROM passengers WHERE pnr = 'MNO345'), '4D', 'business', 'ticketed', 3200.00, 'USD', '2024-11-30 11:30:00', 'website', 'boarded', 90, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ147'), (SELECT id FROM passengers WHERE pnr = 'PQR678'), '18B', 'economy', 'ticketed', 380.00, 'USD', '2024-12-25 08:45:00', 'mobile', 'confirmed', 35, NULL, 'low'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ181'), (SELECT id FROM passengers WHERE pnr = 'STU901'), '22C', 'economy', 'ticketed', 520.00, 'USD', '2024-12-18 13:20:00', 'agent', 'confirmed', 40, NULL, 'medium'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'QR708'), (SELECT id FROM passengers WHERE pnr = 'VWX234'), '1F', 'first', 'ticketed', 4200.00, 'USD', '2024-10-15 17:30:00', 'corporate', 'boarded', 98, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'TK1010'), (SELECT id FROM passengers WHERE pnr = 'YZA567'), '6A', 'business', 'ticketed', 1800.00, 'USD', '2024-12-08 12:15:00', 'website', 'checked_in', 88, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'AI131'), (SELECT id FROM passengers WHERE pnr = 'BCD890'), '19E', 'economy', 'ticketed', 420.00, 'USD', '2024-12-20 15:50:00', 'mobile', 'boarded', 30, NULL, 'low');

-- Insert Flight Crew assignments with all fields populated
INSERT INTO flight_crew (id, flight_id, crew_member_id, role, duty_start, duty_end, actual_duty_time, rest_time_before, status, replacement_reason) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ215'), (SELECT id FROM crew_members WHERE employee_id = 'FZ001'), 'captain', '2025-01-10 14:00:00+04', '2025-01-10 23:00:00+04', NULL, 720, 'assigned', NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ215'), (SELECT id FROM crew_members WHERE employee_id = 'FZ002'), 'first_officer', '2025-01-10 14:00:00+04', '2025-01-10 23:00:00+04', NULL, 680, 'assigned', NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ203'), (SELECT id FROM crew_members WHERE employee_id = 'FZ003'), 'senior_flight_attendant', '2025-01-10 15:15:00+04', '2025-01-11 00:00:00+04', NULL, 840, 'assigned', NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'EK524'), (SELECT id FROM crew_members WHERE employee_id = 'EK001'), 'captain', '2025-01-10 01:55:00+04', '2025-01-10 12:15:00-05', 850, 960, 'completed', NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'QR708'), (SELECT id FROM crew_members WHERE employee_id = 'QR001'), 'captain', '2025-01-10 00:45:00+03', '2025-01-10 10:05:00+00', 450, 780, 'completed', NULL);

-- Insert Disruptions with all fields populated
INSERT INTO disruptions (id, disruption_code, flight_id, disruption_type_id, severity, status, title, description, root_cause, reported_at, resolved_at, reported_by, assigned_to, estimated_delay_minutes, actual_delay_minutes, passengers_affected, connecting_flights_affected, estimated_cost, actual_cost, weather_data, technical_details, crew_impact, passenger_impact, ai_confidence_score, ai_predictions, resolution_notes, lessons_learned) VALUES
(uuid_generate_v4(), 'DISR_001', (SELECT id FROM flights WHERE flight_number = 'FZ215'), (SELECT id FROM disruption_types WHERE code = 'WX_SAND'), 'high', 'active', 'Sandstorm at Dubai Airport', 'Severe sandstorm conditions reducing visibility below operational minimums at DXB', 'Weather phenomenon - seasonal sandstorm with high winds', NOW() - INTERVAL '2 hours', NULL, 'weather_monitor_001', 'ops_manager_002', 120, NULL, 189, 8, 45000.00, NULL, '{"visibility_km": 0.5, "wind_speed_kmh": 65, "conditions": "sandstorm"}', NULL, '{"crew_stranded": false, "duty_extension": true}', '{"rebooking_required": 12, "hotel_required": 0}', 87.5, '{"delay_duration": "2-4 hours", "resolution_probability": 0.75}', NULL, NULL),
(uuid_generate_v4(), 'DISR_002', (SELECT id FROM flights WHERE flight_number = 'FZ203'), (SELECT id FROM disruption_types WHERE code = 'WX_FOG'), 'high', 'active', 'Dense Fog at Delhi Airport', 'Dense fog conditions at DEL reducing visibility to zero, airport operations suspended', 'Seasonal weather pattern - winter fog in North India', NOW() - INTERVAL '1 hour', NULL, 'atc_controller_del', 'ops_director_003', 480, NULL, 195, 5, 85000.00, NULL, '{"visibility_km": 0.1, "humidity_percent": 98, "conditions": "dense_fog"}', NULL, '{"crew_available": true, "duty_reset": true}', '{"rebooking_required": 195, "hotel_required": 150}', 92.0, '{"cancellation_probability": 0.85, "delay_minimum": "6+ hours"}', NULL, NULL),
(uuid_generate_v4(), 'DISR_003', (SELECT id FROM flights WHERE flight_number = 'FZ235'), (SELECT id FROM disruption_types WHERE code = 'ATC_DELAY'), 'medium', 'resolving', 'ATC Slot Restrictions', 'Air traffic control imposed slot restrictions due to congestion', 'High traffic volume during peak hours', NOW() - INTERVAL '3 hours', NULL, 'atc_khi_002', 'ops_controller_004', 150, 120, 181, 7, 25000.00, NULL, NULL, NULL, '{"crew_available": true, "duty_extension": false}', '{"rebooking_required": 0, "compensation": "meal_vouchers"}', 78.2, '{"delay_duration": "2-3 hours", "slot_availability": "improving"}', 'Coordinating with ATC for earliest available slot', NULL),
(uuid_generate_v4(), 'DISR_004', (SELECT id FROM flights WHERE flight_number = 'FZ147'), (SELECT id FROM disruption_types WHERE code = 'CREW_DUTY'), 'medium', 'resolving', 'Crew Duty Time Extension', 'Original crew approaching maximum duty time limits due to earlier delays', 'Cascading effect from previous flight delays', NOW() - INTERVAL '4 hours', NULL, 'crew_scheduler_005', 'ops_manager_006', 45, NULL, 189, 4, 12000.00, NULL, NULL, NULL, '{"replacement_crew": "standby_available", "duty_remaining": "30_minutes"}', '{"delay_impact": "minimal", "passenger_services": "lounge_access"}', 85.1, '{"crew_replacement_time": "30 minutes", "delay_additional": "45-60 minutes"}', 'Standby crew being positioned', NULL),
(uuid_generate_v4(), 'DISR_005', (SELECT id FROM flights WHERE flight_number = 'FZ181'), (SELECT id FROM disruption_types WHERE code = 'TECH_AVIONICS'), 'medium', 'active', 'Navigation System Malfunction', 'Primary navigation display showing intermittent faults during pre-flight checks', 'Electronic component degradation - requires replacement', NOW() - INTERVAL '1.5 hours', NULL, 'maintenance_tech_007', 'line_maintenance_008', 90, NULL, 175, 3, 35000.00, NULL, NULL, '{"system": "navigation_display", "fault_code": "NAV_001", "severity": "category_2"}', '{"crew_available": true, "technical_crew": "dispatched"}', '{"delay_expected": "90 minutes", "passenger_services": "refreshments"}', 79.8, '{"repair_time": "60-120 minutes", "parts_availability": "in_stock"}', 'Line maintenance team investigating', NULL);

-- Insert Recovery Options with all fields populated
INSERT INTO recovery_options (id, disruption_id, option_type, title, description, estimated_cost, estimated_time_minutes, passenger_impact, otp_recovery_percentage, risk_level, resource_requirement, feasibility_score, ai_score, recommended, implementation_details, prerequisites, success_criteria, rollback_plan) VALUES
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_001'), 'delayed_operations', 'Wait for Weather Clearance', 'Monitor weather conditions and depart when sandstorm subsides', 45000.00, 180, 189, 45.0, 'medium', 'low', 75.0, 82.5, true, '{"action": "weather_monitoring", "crew": "standby", "passenger_services": "lounge_meals"}', '["weather_improvement", "crew_availability"]', '{"visibility": ">3km", "wind_speed": "<40kmh"}', '{"cancel_if": "no_improvement_6hrs", "passenger_rebooking": "automatic"}'),
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_001'), 'aircraft_substitution', 'Replace Aircraft', 'Substitute with available aircraft from maintenance pool', 25000.00, 120, 189, 75.0, 'low', 'medium', 85.0, 88.2, false, '{"aircraft": "A6-FME", "positioning": "immediate", "crew": "qualified"}', '["aircraft_availability", "crew_type_rating"]', '{"departure": "within_2hrs", "passenger_accommodation": "same_seats"}', '{"revert_to_original": "if_weather_clears", "cost_threshold": "50000"}'),
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_002'), 'cancellation', 'Cancel and Rebook Next Day', 'Cancel current flight and rebook passengers on next available service', 85000.00, 60, 195, 0.0, 'low', 'high', 90.0, 75.8, true, '{"rebooking": "automatic", "hotel": "4star", "meals": "included"}', '["hotel_availability", "next_day_capacity"]', '{"rebooking_rate": ">95%", "passenger_satisfaction": ">3.5"}', '{"reinstate_if": "weather_improves_unexpectedly", "timeframe": "4hrs"}'),
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_003'), 'route_diversion', 'Divert to Alternative Airport', 'Divert to nearby airport and provide ground transport', 35000.00, 90, 181, 60.0, 'medium', 'medium', 70.0, 73.5, false, '{"alternate_airport": "LHE", "transport": "chartered_buses", "duration": "3hrs"}', '["alternate_airport_capacity", "ground_transport"]', '{"arrival_delay": "<4hrs", "passenger_acceptance": ">80%"}', '{"return_to_original": "if_slot_becomes_available", "cost_limit": "40000"}');

-- Insert Recovery Plans with all fields populated
INSERT INTO recovery_plans (id, plan_code, disruption_id, recovery_option_id, status, approved_by, approved_at, execution_started_at, execution_completed_at, actual_cost, actual_time_minutes, success, success_metrics, failure_reason, execution_notes, passenger_feedback, kpi_impact) VALUES
(uuid_generate_v4(), 'REC_001', (SELECT id FROM disruptions WHERE disruption_code = 'DISR_001'), (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), 'executing', 'ops_manager_002', NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1 hour', NULL, 35000.00, NULL, NULL, NULL, NULL, 'Weather monitoring in progress, crew on standby', NULL, NULL),
(uuid_generate_v4(), 'REC_002', (SELECT id FROM disruptions WHERE disruption_code = 'DISR_002'), (SELECT id FROM recovery_options WHERE title = 'Cancel and Rebook Next Day'), 'approved', 'ops_director_003', NOW() - INTERVAL '30 minutes', NULL, NULL, NULL, NULL, NULL, NULL, 'Passenger rebooking initiated, hotel bookings in progress', NULL, NULL),
(uuid_generate_v4(), 'REC_003', (SELECT id FROM disruptions WHERE disruption_code = 'DISR_003'), (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), 'completed', 'ops_controller_004', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '30 minutes', 18000.00, 120, true, '{"on_time_recovery": 85, "passenger_satisfaction": 4.2}', NULL, 'ATC slot obtained, flight departed on time', '{"rating": 4.2, "comments": "Good communication during delay"}', '{"otp_impact": "-2.5%", "cost_per_passenger": "99.45"}');

-- Insert Recovery Tasks with all fields populated  
INSERT INTO recovery_tasks (id, recovery_plan_id, task_type, title, description, assigned_to, priority, status, scheduled_start, actual_start, scheduled_end, actual_end, dependencies, resources_required, completion_notes) VALUES
(uuid_generate_v4(), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_001'), 'weather_monitoring', 'Monitor Weather Conditions', 'Continuously monitor sandstorm conditions and visibility reports', 'weather_ops_001', 'high', 'in_progress', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '2 hours', NULL, '[]', '{"systems": ["weather_radar", "metar_reports"], "personnel": 1}', 'Weather monitoring active, updates every 15 minutes'),
(uuid_generate_v4(), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_001'), 'passenger_services', 'Provide Passenger Services', 'Arrange lounge access and meal vouchers for affected passengers', 'passenger_services_002', 'medium', 'completed', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '50 minutes', NOW() - INTERVAL '10 minutes', NOW() - INTERVAL '10 minutes', '[]', '{"vouchers": 189, "lounge_capacity": "terminal_2"}', 'All passengers accommodated in business lounge with refreshments'),
(uuid_generate_v4(), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_002'), 'hotel_booking', 'Book Passenger Hotels', 'Arrange hotel accommodations for all passengers', 'ground_services_003', 'high', 'in_progress', NOW() - INTERVAL '20 minutes', NOW() - INTERVAL '15 minutes', NOW() + INTERVAL '40 minutes', NULL, '[]', '{"hotels": ["Taj_Palace", "Oberoi", "Hyatt"], "rooms": 150}', 'Hotel bookings 70% complete, transport coordination ongoing'),
(uuid_generate_v4(), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_003'), 'atc_coordination', 'Coordinate ATC Slot', 'Coordinate with ATC for earliest departure slot', 'flight_dispatch_004', 'urgent', 'completed', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour', '[]', '{"atc_contacts": ["KHI_TWR", "KHI_APP"], "priority_level": "commercial"}', 'Slot obtained for immediate departure, crew positioning complete');

-- Insert Passenger Rebookings with all fields populated
INSERT INTO passenger_rebookings (id, original_flight_id, passenger_id, new_flight_id, rebooking_type, reason, fare_difference, refund_amount, compensation_amount, processed_by, processed_at, passenger_consent, satisfaction_rating, feedback) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ203'), (SELECT id FROM passengers WHERE pnr = 'DEF456'), (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'involuntary', 'Original flight cancelled due to weather', 0.00, 0.00, 250.00, 'rebooking_agent_005', NOW() - INTERVAL '45 minutes', true, 4, 'Good alternative provided, compensation appreciated'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ203'), (SELECT id FROM passengers WHERE pnr = 'JKL012'), (SELECT id FROM flights WHERE flight_number = 'AI131'), 'involuntary', 'Original flight cancelled due to weather', -30.00, 30.00, 150.00, 'rebooking_agent_006', NOW() - INTERVAL '30 minutes', true, 3, 'Different airline but acceptable timing'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ235'), (SELECT id FROM passengers WHERE pnr = 'PQR678'), (SELECT id FROM flights WHERE flight_number = 'FZ147'), 'voluntary', 'Passenger requested later flight', 50.00, 0.00, 0.00, 'self_service_portal', NOW() - INTERVAL '2 hours', true, 5, 'Perfect timing change, exactly what I needed');

-- Insert Hotel Bookings with all fields populated
INSERT INTO hotel_bookings (id, passenger_id, flight_id, hotel_name, hotel_address, check_in_date, check_out_date, room_type, cost_per_night, total_cost, currency, booking_reference, booking_status, transportation_included, meal_vouchers_included, booked_by, special_requests) VALUES
(uuid_generate_v4(), (SELECT id FROM passengers WHERE pnr = 'DEF456'), (SELECT id FROM flights WHERE flight_number = 'FZ203'), 'Taj Palace New Delhi', 'Sardar Patel Marg, Diplomatic Enclave, New Delhi 110021', '2025-01-10', '2025-01-11', 'Deluxe Room', 180.00, 180.00, 'USD', 'TAJ12345678', 'confirmed', true, true, 'hotel_booking_agent_007', 'Late check-in required, vegetarian meals'),
(uuid_generate_v4(), (SELECT id FROM passengers WHERE pnr = 'JKL012'), (SELECT id FROM flights WHERE flight_number = 'FZ203'), 'The Oberoi New Delhi', 'Dr. Zakir Hussain Marg, New Delhi 110003', '2025-01-10', '2025-01-11', 'Premier Room', 220.00, 220.00, 'USD', 'OBR98765432', 'confirmed', true, true, 'hotel_booking_agent_008', 'Wheelchair accessible room required'),
(uuid_generate_v4(), (SELECT id FROM passengers WHERE pnr = 'STU901'), (SELECT id FROM flights WHERE flight_number = 'FZ181'), 'Grand Hyatt Kochi Bolgatty', 'Bolgatty Island, Mulavukad, Kochi 682504', '2025-01-10', '2025-01-11', 'Standard Room', 150.00, 150.00, 'USD', 'HYA55667788', 'checked_in', false, true, 'hotel_booking_agent_009', 'Ground floor room preferred due to mobility issues');

-- Insert Vouchers with all fields populated
INSERT INTO vouchers (id, voucher_code, passenger_id, flight_id, voucher_type, amount, currency, valid_from, valid_until, restrictions, merchant_category, status, used_at, used_location, used_amount, issued_by, approval_required, approved_by, notes) VALUES
(uuid_generate_v4(), 'MEAL001234', (SELECT id FROM passengers WHERE pnr = 'ABC123'), (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'meal', 35.00, 'USD', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '24 hours', 'Valid at airport restaurants only', 'Food & Beverage', 'used', NOW() - INTERVAL '1 hour', 'DXB Terminal 2 Food Court', 32.50, 'passenger_services_010', false, NULL, 'Used at Starbucks for meal and coffee'),
(uuid_generate_v4(), 'MEAL001235', (SELECT id FROM passengers WHERE pnr = 'GHI789'), (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'meal', 35.00, 'USD', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '24 hours', 'Valid at airport restaurants only', 'Food & Beverage', 'active', NULL, NULL, NULL, 'passenger_services_010', false, NULL, 'Issued for delay compensation'),
(uuid_generate_v4(), 'TAXI001236', (SELECT id FROM passengers WHERE pnr = 'DEF456'), (SELECT id FROM flights WHERE flight_number = 'FZ203'), 'transport', 45.00, 'USD', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '48 hours', 'Airport to hotel transport only', 'Transportation', 'active', NULL, NULL, NULL, 'ground_services_011', true, 'supervisor_012', 'High-value passenger taxi voucher'),
(uuid_generate_v4(), 'HOTEL001237', (SELECT id FROM passengers WHERE pnr = 'JKL012'), (SELECT id FROM flights WHERE flight_number = 'FZ203'), 'hotel', 220.00, 'USD', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '48 hours', 'Oberoi Hotel New Delhi only', 'Accommodation', 'used', NOW() - INTERVAL '30 minutes', 'The Oberoi New Delhi', 220.00, 'hotel_services_013', true, 'manager_014', 'Full hotel stay covered due to cancellation');

-- Insert Maintenance Events with all fields populated
INSERT INTO maintenance_events (id, aircraft_id, maintenance_type, work_order_number, description, scheduled_start, actual_start, scheduled_end, actual_end, location, technician_assigned, parts_required, labor_hours, cost, status, priority, impact_on_operations, completion_notes, quality_check_passed, return_to_service) VALUES
(uuid_generate_v4(), (SELECT id FROM aircraft WHERE registration = 'A6-FMD'), 'unscheduled', 'WO-2025-001', 'Engine compressor blade replacement due to FOD damage', '2025-01-10 06:00:00', '2025-01-10 06:15:00', '2025-01-10 18:00:00', NULL, 'DXB Line Maintenance Bay 3', 'tech_supervisor_015', '{"compressor_blades": 4, "gaskets": 2, "bolts": "kit_A"}', 10.5, 45000.00, 'in_progress', 'aog', 'Aircraft grounded, affecting 2 scheduled flights', 'Engine inspection revealed multiple blade damage, parts ordering complete', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM aircraft WHERE registration = 'A6-FMA'), 'scheduled', 'WO-2025-002', 'A-Check inspection and routine maintenance', '2025-01-15 22:00:00', NULL, '2025-01-16 06:00:00', NULL, 'DXB Maintenance Hangar 1', 'maintenance_team_016', '{"oil_filters": 2, "hydraulic_fluid": "5_gallons", "inspection_kit": "A_check"}', 8.0, 12000.00, 'scheduled', 'medium', 'Overnight maintenance window, no flight impact', NULL, NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM aircraft WHERE registration = 'A6-EUA'), 'inspection', 'WO-2025-003', 'Pre-flight inspection after bird strike incident', '2025-01-11 14:00:00', NULL, '2025-01-11 16:00:00', NULL, 'DXB Gate A01', 'line_inspector_017', '{"inspection_forms": "bird_strike", "flashlight": 1}', 2.0, 1500.00, 'scheduled', 'high', 'Delaying next departure by 2 hours for thorough inspection', NULL, NULL, NULL);

-- Insert KPI Metrics with all fields populated
INSERT INTO kpi_metrics (id, metric_name, metric_category, value, target_value, unit, period_start, period_end, airport_code, flight_id, calculated_at, metadata) VALUES
(uuid_generate_v4(), 'On-Time Performance', 'operational', 78.5, 85.0, 'percentage', '2025-01-09 00:00:00', '2025-01-09 23:59:59', 'DXB', NULL, NOW() - INTERVAL '1 hour', '{"flights_total": 245, "on_time": 192, "delayed": 48, "cancelled": 5}'),
(uuid_generate_v4(), 'Customer Satisfaction Score', 'service', 4.2, 4.5, 'rating', '2025-01-09 00:00:00', '2025-01-09 23:59:59', NULL, NULL, NOW() - INTERVAL '30 minutes', '{"responses": 1250, "avg_rating": 4.2, "response_rate": "23%"}'),
(uuid_generate_v4(), 'Average Delay Minutes', 'operational', 35.8, 25.0, 'minutes', '2025-01-09 00:00:00', '2025-01-09 23:59:59', 'DXB', NULL, NOW() - INTERVAL '45 minutes', '{"delayed_flights": 48, "total_delay_minutes": 1718, "weather_related": 62}'),
(uuid_generate_v4(), 'Passenger Rebooking Success Rate', 'service', 94.2, 95.0, 'percentage', '2025-01-09 00:00:00', '2025-01-09 23:59:59', NULL, NULL, NOW() - INTERVAL '20 minutes', '{"rebooking_requests": 156, "successful": 147, "failed": 9}'),
(uuid_generate_v4(), 'Cost Per Disruption Recovery', 'financial', 28500.00, 25000.00, 'USD', '2025-01-09 00:00:00', '2025-01-09 23:59:59', NULL, NULL, NOW() - INTERVAL '15 minutes', '{"disruptions": 12, "total_cost": 342000, "avg_cost": 28500}'),
(uuid_generate_v4(), 'Aircraft Utilization Rate', 'operational', 11.2, 12.0, 'hours_per_day', '2025-01-09 00:00:00', '2025-01-09 23:59:59', NULL, NULL, NOW() - INTERVAL '10 minutes', '{"fleet_size": 10, "total_flight_hours": 112, "target_hours": 120}');

-- Insert Decision Logs with all fields populated
INSERT INTO decision_logs (id, disruption_id, recovery_plan_id, decision_type, decision_maker, recommended_option_id, selected_option_id, decision_rationale, override_reason, confidence_score, decision_time_seconds, outcome, success_metrics, lessons_learned) VALUES
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_001'), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_001'), 'recovery_selection', 'ops_manager_002', (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), 'Weather forecast shows improvement within 3 hours, cost-effective solution', NULL, 85.5, 45, 'in_progress', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_002'), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_002'), 'recovery_selection', 'ops_director_003', (SELECT id FROM recovery_options WHERE title = 'Cancel and Rebook Next Day'), (SELECT id FROM recovery_options WHERE title = 'Cancel and Rebook Next Day'), 'Fog conditions expected to persist through morning, passenger safety priority', NULL, 92.0, 120, 'approved', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM disruptions WHERE disruption_code = 'DISR_003'), (SELECT id FROM recovery_plans WHERE plan_code = 'REC_003'), 'recovery_selection', 'ai', (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), (SELECT id FROM recovery_options WHERE title = 'Wait for Weather Clearance'), 'AI recommendation based on historical ATC patterns and slot availability', NULL, 78.2, 5, 'successful', '{"time_saved": 90, "cost_efficiency": 92}', 'AI prediction accuracy was high for ATC delay resolution');

-- Insert Audit Logs with all fields populated
INSERT INTO audit_logs (id, table_name, record_id, action, old_values, new_values, changed_by, changed_at, session_id, ip_address, user_agent, reason) VALUES
(uuid_generate_v4(), 'flights', (SELECT id FROM flights WHERE flight_number = 'FZ215'), 'update', '{"status": "scheduled", "estimated_departure": null}', '{"status": "delayed", "estimated_departure": "2025-01-10T17:30:00"}', 'ops_controller_001', NOW() - INTERVAL '2 hours', 'sess_1234567890', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Flight status updated due to weather conditions'),
(uuid_generate_v4(), 'disruptions', (SELECT id FROM disruptions WHERE disruption_code = 'DISR_001'), 'insert', NULL, '{"disruption_code": "DISR_001", "severity": "high", "status": "active"}', 'weather_monitor_001', NOW() - INTERVAL '2 hours', 'sess_2345678901', '10.0.0.50', 'Weather Monitoring System v2.1', 'New weather disruption detected'),
(uuid_generate_v4(), 'recovery_plans', (SELECT id FROM recovery_plans WHERE plan_code = 'REC_001'), 'update', '{"status": "draft"}', '{"status": "approved", "approved_by": "ops_manager_002"}', 'ops_manager_002', NOW() - INTERVAL '1.5 hours', 'sess_3456789012', '172.16.0.25', 'Operations Dashboard v3.2', 'Recovery plan approved for execution'),
(uuid_generate_v4(), 'passengers', (SELECT id FROM passengers WHERE pnr = 'DEF456'), 'update', '{"check_in_status": false}', '{"check_in_status": true}', 'check_in_agent_003', NOW() - INTERVAL '3 hours', 'sess_4567890123', '192.168.2.15', 'Check-in System v1.8', 'Passenger check-in completed'),
(uuid_generate_v4(), 'vouchers', (SELECT id FROM vouchers WHERE voucher_code = 'MEAL001234'), 'update', '{"status": "active", "used_at": null}', '{"status": "used", "used_at": "current_timestamp"}', 'pos_system_004', NOW() - INTERVAL '1 hour', 'sess_5678901234', '10.1.1.200', 'POS Terminal v2.5', 'Voucher redeemed at food outlet');

-- Insert Weather Data with all fields populated
INSERT INTO weather_data (id, airport_code, observation_time, temperature_celsius, humidity_percent, pressure_hpa, wind_speed_kmh, wind_direction, visibility_km, weather_conditions, cloud_cover_percent, precipitation_mm, forecast_data, alert_level) VALUES
(uuid_generate_v4(), 'DXB', NOW() - INTERVAL '1 hour', 28.5, 65, 1013.2, 65, 120, 0.5, 'Sandstorm', 100, 0.0, '{"next_3hrs": "sandstorm_continues", "next_6hrs": "improving", "wind_forecast": "decreasing"}', 'warning'),
(uuid_generate_v4(), 'DEL', NOW() - INTERVAL '1 hour', 12.1, 98, 1015.8, 5, 90, 0.1, 'Dense Fog', 100, 0.0, '{"next_3hrs": "fog_persists", "next_6hrs": "gradual_clearing", "visibility_trend": "improving_slowly"}', 'warning'),
(uuid_generate_v4(), 'KHI', NOW() - INTERVAL '1 hour', 24.8, 72, 1012.5, 15, 180, 8.0, 'Clear', 25, 0.0, '{"next_3hrs": "clear", "next_6hrs": "partly_cloudy", "conditions": "stable"}', 'none'),
(uuid_generate_v4(), 'IST', NOW() - INTERVAL '1 hour', 8.2, 85, 1018.3, 22, 270, 6.0, 'Overcast', 95, 0.5, '{"next_3hrs": "light_rain", "next_6hrs": "overcast", "precipitation": "intermittent"}', 'advisory'),
(uuid_generate_v4(), 'COK', NOW() - INTERVAL '1 hour', 31.5, 78, 1008.9, 12, 200, 9.0, 'Partly Cloudy', 60, 0.0, '{"next_3hrs": "partly_cloudy", "next_6hrs": "clear", "conditions": "improving"}', 'none'),
(uuid_generate_v4(), 'BOM', NOW() - INTERVAL '1 hour', 29.8, 68, 1010.2, 18, 240, 10.0, 'Clear', 20, 0.0, '{"next_3hrs": "clear", "next_6hrs": "clear", "conditions": "excellent"}', 'none'),
(uuid_generate_v4(), 'JFK', NOW() - INTERVAL '1 hour', 2.1, 82, 1022.1, 28, 300, 5.0, 'Snow Showers', 90, 2.0, '{"next_3hrs": "light_snow", "next_6hrs": "clearing", "temperature_trend": "stable"}', 'advisory'),
(uuid_generate_v4(), 'LHR', NOW() - INTERVAL '1 hour', 6.8, 88, 1016.5, 20, 220, 4.0, 'Light Rain', 85, 1.5, '{"next_3hrs": "rain_continues", "next_6hrs": "decreasing", "wind": "moderate"}', 'none'),
(uuid_generate_v4(), 'DOH', NOW() - INTERVAL '1 hour', 22.3, 58, 1014.8, 12, 150, 12.0, 'Clear', 15, 0.0, '{"next_3hrs": "clear", "next_6hrs": "clear", "conditions": "excellent"}', 'none'),
(uuid_generate_v4(), 'RUH', NOW() - INTERVAL '1 hour', 18.5, 45, 1016.2, 35, 100, 2.0, 'Dust Storm', 100, 0.0, '{"next_3hrs": "dust_continues", "next_6hrs": "improving", "visibility": "poor"}', 'watch');

-- Insert Optimization Parameters with all fields populated
INSERT INTO optimization_parameters (id, parameter_name, parameter_category, weight, min_value, max_value, description, active, last_updated_by) VALUES
(uuid_generate_v4(), 'cost_minimization', 'financial', 25.0, 0.0, 100.0, 'Minimize total recovery costs including operational and passenger compensation', true, 'system_admin_001'),
(uuid_generate_v4(), 'time_efficiency', 'operational', 25.0, 0.0, 100.0, 'Minimize time to resolution and passenger impact duration', true, 'ops_manager_002'),
(uuid_generate_v4(), 'passenger_satisfaction', 'service', 25.0, 0.0, 100.0, 'Maximize passenger satisfaction scores through service quality', true, 'service_manager_003'),
(uuid_generate_v4(), 'otp_impact', 'performance', 25.0, 0.0, 100.0, 'Minimize negative impact on overall on-time performance metrics', true, 'performance_analyst_004'),
(uuid_generate_v4(), 'resource_optimization', 'operational', 15.0, 0.0, 100.0, 'Optimize utilization of crew, aircraft, and ground resources', true, 'resource_manager_005'),
(uuid_generate_v4(), 'risk_minimization', 'operational', 10.0, 0.0, 100.0, 'Minimize operational and safety risks in recovery solutions', true, 'risk_manager_006'),
(uuid_generate_v4(), 'environmental_impact', 'sustainability', 8.0, 0.0, 100.0, 'Consider environmental impact of recovery decisions including fuel usage', true, 'sustainability_officer_007'),
(uuid_generate_v4(), 'crew_welfare', 'operational', 12.0, 0.0, 100.0, 'Ensure crew duty time compliance and welfare considerations', true, 'crew_manager_008'),
(uuid_generate_v4(), 'network_stability', 'operational', 20.0, 0.0, 100.0, 'Maintain overall network stability and minimize cascade effects', true, 'network_planner_009'),
(uuid_generate_v4(), 'brand_reputation', 'service', 18.0, 0.0, 100.0, 'Protect brand reputation through appropriate customer service response', true, 'brand_manager_010');

-- Add indexes for better performance with large datasets
CREATE INDEX IF NOT EXISTS idx_flights_status_date ON flights(status, scheduled_departure);
CREATE INDEX IF NOT EXISTS idx_disruptions_severity_status ON disruptions(severity, status);
CREATE INDEX IF NOT EXISTS idx_weather_airport_time ON weather_data(airport_code, observation_time DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_time ON audit_logs(table_name, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_kpi_metrics_category_period ON kpi_metrics(metric_category, period_start);
CREATE INDEX IF NOT EXISTS idx_passengers_loyalty_tier ON passengers(loyalty_tier);
CREATE INDEX IF NOT EXISTS idx_flight_passengers_priority ON flight_passengers(priority_score DESC);

-- Add some additional sample records for better testing coverage
INSERT INTO passengers (id, pnr, title, first_name, last_name, email, phone, date_of_birth, nationality, passport_number, loyalty_tier, frequent_flyer_number, special_requirements, preferred_language, travel_class, seat_assignment, check_in_status, boarding_pass_issued) VALUES
(uuid_generate_v4(), 'XYZ123', 'Mrs.', 'Elena', 'Rossi', 'elena.rossi@email.com', '+39-347-123-4567', '1979-06-20', 'ITA', 'IT987654321', 'platinum', 'AZ987654321', '{"meal": "vegetarian", "assistance": "priority_boarding"}', 'it', 'first', '1B', true, true),
(uuid_generate_v4(), 'UVW456', 'Mr.', 'Chen', 'Wei-Ming', 'chen.weiming@email.com', '+886-912-345-678', '1991-01-15', 'TWN', 'TW456789123', 'gold', 'BR456789123', '{"meal": "asian_vegetarian", "assistance": "none"}', 'zh', 'business', '5F', false, false);

-- Additional flight-passenger relationships
INSERT INTO flight_passengers (id, flight_id, passenger_id, seat_number, travel_class, ticket_type, fare_amount, currency, booking_date, booking_channel, status, priority_score, connection_flight_id, connection_risk) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'EK524'), (SELECT id FROM passengers WHERE pnr = 'XYZ123'), '1B', 'first', 'ticketed', 5200.00, 'USD', '2024-09-15 14:30:00', 'corporate', 'boarded', 98, NULL, 'none'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'TK1010'), (SELECT id FROM passengers WHERE pnr = 'UVW456'), '5F', 'business', 'ticketed', 1950.00, 'USD', '2024-12-05 11:20:00', 'website', 'checked_in', 85, NULL, 'none');

-- Insert test flights with disruptions
INSERT INTO flights (id, flight_number, origin_airport, destination_airport, scheduled_departure, scheduled_arrival, estimated_departure, estimated_arrival, status, aircraft_id, passengers_booked, crew_count, gate, terminal) VALUES
(uuid_generate_v4(), 'FZ101', (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'LHR'), '2025-01-21 08:00:00', '2025-01-21 12:30:00', '2025-01-21 10:00:00', '2025-01-21 14:30:00', 'delayed', (SELECT id FROM aircraft WHERE registration = 'A6-FMA'), 180, 6, 'A12', 'T3'),
(uuid_generate_v4(), 'FZ102', (SELECT id FROM airports WHERE iata_code = 'LHR'), (SELECT id FROM airports WHERE iata_code = 'DXB'), '2025-01-21 14:00:00', '2025-01-21 23:30:00', NULL, NULL, 'cancelled', (SELECT id FROM aircraft WHERE registration = 'A6-FMB'), 175, 6, 'B08', 'T3'),
(uuid_generate_v4(), 'FZ103', (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'JFK'), '2025-01-21 16:30:00', '2025-01-22 02:15:00', '2025-01-21 18:30:00', '2025-01-22 04:15:00', 'delayed', (SELECT id FROM aircraft WHERE registration = 'A6-FMC'), 190, 6, 'C15', 'T3'),
(uuid_generate_v4(), 'FZ104', (SELECT id FROM airports WHERE iata_code = 'JFK'), (SELECT id FROM airports WHERE iata_code = 'DXB'), '2025-01-21 22:00:00', '2025-01-22 17:45:00', NULL, NULL, 'diverted', (SELECT id FROM aircraft WHERE registration = 'A6-FMD'), 185, 6, 'D22', 'T3'),
(uuid_generate_v4(), 'FZ105', (SELECT id FROM airports WHERE iata_code = 'DXB'), (SELECT id FROM airports WHERE iata_code = 'BOM'), '2025-01-21 10:15:00', '2025-01-21 14:45:00', '2025-01-21 11:45:00', '2025-01-21 16:15:00', 'delayed', (SELECT id FROM aircraft WHERE registration = 'A6-FME'), 165, 6, 'E05', 'T3');

-- Insert sample aircraft
INSERT INTO aircraft (id, registration, aircraft_type, manufacturer, model, seats_economy, seats_business, seats_first, total_seats, cargo_capacity_kg, fuel_capacity_liters, range_km, max_speed_kmh, status, home_base, last_maintenance, next_maintenance_due, flight_hours_total, cycles_total) VALUES
(uuid_generate_v4(), 'A6-FMA', 'Airbus A380', 'Airbus', 'A380-800', 427, 76, 14, 517, 25000, 320000, 15200, 945, 'active', 'DXB', '2025-01-15', '2025-02-15', 45200, 12800),
(uuid_generate_v4(), 'A6-FMB', 'Boeing 777-300ER', 'Boeing', '777-300ER', 304, 42, 8, 354, 15000, 181280, 13650, 945, 'active', 'LHR', '2025-01-10', '2025-02-10', 41200, 11800),
(uuid_generate_v4(), 'A6-FMC', 'Boeing 777-200LR', 'Boeing', '777-200LR', 304, 42, 8, 354, 15000, 181280, 13650, 945, 'active', 'JFK', '2025-01-12', '2025-02-12', 38900, 10500),
(uuid_generate_v4(), 'A6-FMD', 'Airbus A350-900', 'Airbus', 'A350-900', 427, 76, 14, 517, 25000, 320000, 15200, 945, 'maintenance', 'DXB', '2025-01-08', '2025-02-08', 42800, 12200),
(uuid_generate_v4(), 'A6-FME', 'Boeing 737-800', 'Boeing', '737-800', 162, 12, 0, 174, 4500, 26020, 5400, 842, 'active', 'BOM', '2025-01-14', '2025-02-14', 25680, 8500);

-- Insert sample disruptions
INSERT INTO disruptions (id, flight_id, disruption_type_id, title, description, severity, status, reported_at, resolved_at, passengers_affected, crew_affected, connecting_flights_affected, estimated_delay_minutes, financial_impact, resolution_notes) VALUES
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ101'), (SELECT id FROM disruption_types WHERE code = 'TECH-001'), 'Engine maintenance required', 'Routine engine inspection found minor issue requiring immediate attention', 'medium', 'active', '2025-01-21 06:30:00', NULL, 180, 6, 15, 120, 75000.00, NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ102'), (SELECT id FROM disruption_types WHERE code = 'WTHR-001'), 'Severe weather at destination', 'Heavy fog at London Heathrow causing zero visibility', 'high', 'active', '2025-01-21 12:00:00', NULL, 175, 6, 8, NULL, 120000.00, NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ103'), (SELECT id FROM disruption_types WHERE code = 'ATCR-001'), 'Air traffic control delay', 'Congestion at JFK causing extended holding patterns', 'medium', 'resolving', '2025-01-21 15:00:00', NULL, 190, 6, 12, 120, 45000.00, 'Alternative routing approved'),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ104'), (SELECT id FROM disruption_types WHERE code = 'CREW-001'), 'Crew availability issue', 'First officer called in sick, replacement crew being arranged', 'high', 'active', '2025-01-21 20:00:00', NULL, 185, 5, 22, 180, 95000.00, NULL),
(uuid_generate_v4(), (SELECT id FROM flights WHERE flight_number = 'FZ105'), (SELECT id FROM disruption_types WHERE code = 'WTHR-002'), 'Thunderstorm activity', 'Severe thunderstorms reported along flight path', 'medium', 'active', '2025-01-21 09:00:00', NULL, 165, 6, 5, 90, 35000.00, NULL);

-- Insert sample airports
INSERT INTO airports (id, iata_code, icao_code, name, city, country, timezone, latitude, longitude) VALUES
(uuid_generate_v4(), 'DXB', 'OMDB', 'Dubai International Airport', 'Dubai', 'United Arab Emirates', 'Asia/Dubai', 25.2532, 55.3657),
(uuid_generate_v4(), 'LHR', 'EGLL', 'London Heathrow Airport', 'London', 'United Kingdom', 'Europe/London', 51.4700, -0.4543),
(uuid_generate_v4(), 'JFK', 'KJFK', 'John F. Kennedy International Airport', 'New York', 'United States', 'America/New_York', 40.6413, -73.7781),
(uuid_generate_v4(), 'LAX', 'KLAX', 'Los Angeles International Airport', 'Los Angeles', 'United States', 'America/Los_Angeles', 33.9425, -118.4081),
(uuid_generate_v4(), 'BOM', 'VABB', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India', 'Asia/Kolkata', 19.0896, 72.8656);

-- Insert sample disruption types
INSERT INTO disruption_types (id, category, name, description, priority_weight, cost_multiplier) VALUES
(uuid_generate_v4(), 'WTHR-001', 'weather', 'Fog', 'Low visibility due to fog conditions', 0.8, 1.5),
(uuid_generate_v4(), 'WTHR-002', 'weather', 'Thunderstorm', 'Severe weather with lightning and heavy rain', 0.9, 2.0),
(uuid_generate_v4(), 'TECH-001', 'technical', 'Engine Issue', 'Aircraft engine malfunction or maintenance requirement', 0.95, 2.5),
(uuid_generate_v4(), 'CREW-001', 'crew', 'Crew Availability', 'Flight crew scheduling or availability issues', 0.7, 1.8),
(uuid_generate_v4(), 'ATCR-001', 'air_traffic', 'ATC Delay', 'Air traffic control imposed delays', 0.6, 1.2);

COMMIT;