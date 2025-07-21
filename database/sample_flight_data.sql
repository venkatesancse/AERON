
-- Sample flight data with disruptions for the affected flights display
-- This matches the data shown in the screenshot

-- First, insert some sample flights
INSERT INTO flights (
    id, flight_number, airline_id, aircraft_id, origin_airport, destination_airport,
    scheduled_departure, scheduled_arrival, estimated_departure, estimated_arrival,
    status, passengers_booked, crew_count, gate, terminal
) VALUES 
-- FZ203: DXB → DEL (Cancelled)
(
    '550e8400-e29b-41d4-a716-446655440001',
    'FZ203',
    (SELECT id FROM airlines WHERE iata_code = 'FZ'),
    (SELECT id FROM aircraft WHERE registration = 'A6-FMC'),
    'DXB', 'DEL',
    '2025-01-10 16:45:00+04:00',
    '2025-01-10 21:20:00+05:30',
    NULL, -- No estimated times for cancelled flight
    NULL,
    'cancelled',
    195, 6, 'T2-A08', 'T2'
),
-- FZ215: DXB → BOM (Delayed)
(
    '550e8400-e29b-41d4-a716-446655440002',
    'FZ215',
    (SELECT id FROM airlines WHERE iata_code = 'FZ'),
    (SELECT id FROM aircraft WHERE registration = 'A6-FMA'),
    'DXB', 'BOM',
    '2025-01-10 15:30:00+04:00',
    '2025-01-10 20:15:00+05:30',
    '2025-01-10 17:30:00+04:00', -- 2 hour delay
    '2025-01-10 22:15:00+05:30',
    'delayed',
    189, 6, 'T2-B12', 'T2'
),
-- FZ235: KHI → DXB (Diverted)
(
    '550e8400-e29b-41d4-a716-446655440003',
    'FZ235',
    (SELECT id FROM airlines WHERE iata_code = 'FZ'),
    (SELECT id FROM aircraft WHERE registration = 'A6-FMB'),
    'KHI', 'DXB',
    '2025-01-10 08:30:00+05:00',
    '2025-01-10 11:45:00+04:00',
    '2025-01-10 11:30:00+05:00', -- 3 hour delay
    '2025-01-10 14:45:00+04:00',
    'diverted',
    181, 6, 'T2-C15', 'T2'
),
-- FZ147: IST → DXB (Delayed)
(
    '550e8400-e29b-41d4-a716-446655440004',
    'FZ147',
    (SELECT id FROM airlines WHERE iata_code = 'FZ'),
    (SELECT id FROM aircraft WHERE registration = 'A6-FMD'),
    'IST', 'DXB',
    '2025-01-10 21:15:00+03:00',
    '2025-01-11 03:30:00+04:00',
    '2025-01-10 22:00:00+03:00', -- 45 min delay
    '2025-01-11 04:15:00+04:00',
    'delayed',
    189, 6, 'T2-A15', 'T2'
),
-- FZ181: DXB → COK (Delayed)
(
    '550e8400-e29b-41d4-a716-446655440005',
    'FZ181',
    (SELECT id FROM airlines WHERE iata_code = 'FZ'),
    (SELECT id FROM aircraft WHERE registration = 'A6-FME'),
    'DXB', 'COK',
    '2025-01-10 14:20:00+04:00',
    '2025-01-10 19:45:00+05:30',
    '2025-01-10 15:50:00+04:00', -- 90 min delay
    '2025-01-10 21:15:00+05:30',
    'delayed',
    175, 6, 'T2-B12', 'T2'
);

-- Add some missing airports
INSERT INTO airports (iata_code, icao_code, name, city, country, timezone) VALUES
('COK', 'VOCI', 'Cochin International Airport', 'Kochi', 'India', 'Asia/Kolkata')
ON CONFLICT (iata_code) DO NOTHING;

-- Now insert the disruptions for these flights
INSERT INTO disruptions (
    id, disruption_code, flight_id, disruption_type_id, severity, status,
    title, description, reported_at, passengers_affected, connecting_flights_affected,
    estimated_delay_minutes, actual_delay_minutes
) VALUES
-- FZ203 Cancellation due to severe fog
(
    '660e8400-e29b-41d4-a716-446655440001',
    'DIS-FZ203-20250110-001',
    '550e8400-e29b-41d4-a716-446655440001',
    (SELECT id FROM disruption_types WHERE code = 'WX_FOG'),
    'high',
    'active',
    'Flight cancelled due to severe fog at DEL',
    'Dense fog conditions at Delhi airport causing zero visibility. All arrivals suspended.',
    NOW() - INTERVAL '5 minutes',
    195, 5, NULL, NULL
),
-- FZ215 Delay due to sandstorm
(
    '660e8400-e29b-41d4-a716-446655440002',
    'DIS-FZ215-20250110-001',
    '550e8400-e29b-41d4-a716-446655440002',
    (SELECT id FROM disruption_types WHERE code = 'WX_SAND'),
    'high',
    'active',
    'Departure delayed due to sandstorm at DXB',
    'Severe sandstorm conditions affecting visibility and ground operations at Dubai International.',
    NOW() - INTERVAL '2 minutes',
    189, 8, 120, 120
),
-- FZ235 Diversion due to DXB closure
(
    '660e8400-e29b-41d4-a716-446655440003',
    'DIS-FZ235-20250110-001',
    '550e8400-e29b-41d4-a716-446655440003',
    (SELECT id FROM disruption_types WHERE code = 'AIRPORT_CLOSURE'),
    'medium',
    'active',
    'Diverted to AUH due to DXB closure',
    'Dubai International Airport temporarily closed due to weather conditions. Flight diverted to Abu Dhabi.',
    NOW() - INTERVAL '8 minutes',
    181, 7, 180, 180
),
-- FZ147 Technical delay
(
    '660e8400-e29b-41d4-a716-446655440004',
    'DIS-FZ147-20250110-001',
    '550e8400-e29b-41d4-a716-446655440004',
    (SELECT id FROM disruption_types WHERE code = 'TECH_AVIONICS'),
    'medium',
    'active',
    'Aircraft maintenance check delay',
    'Routine pre-flight maintenance check taking longer than expected. Technical team investigating avionics system.',
    NOW() - INTERVAL '12 minutes',
    189, 4, 45, 45
),
-- FZ181 Crew duty time issue
(
    '660e8400-e29b-41d4-a716-446655440005',
    'DIS-FZ181-20250110-001',
    '550e8400-e29b-41d4-a716-446655440005',
    (SELECT id FROM disruption_types WHERE code = 'CREW_DUTY'),
    'medium',
    'active',
    'Crew duty time limitation',
    'Original crew exceeded maximum duty time limits. Replacement crew being assigned.',
    NOW() - INTERVAL '15 minutes',
    175, 3, 90, 90
);
