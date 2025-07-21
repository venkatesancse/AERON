
-- AERON Flight Disruption Management Database Schema
-- PostgreSQL Database Design

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE ENTITIES
-- =============================================

-- Airlines table
CREATE TABLE airlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iata_code VARCHAR(2) UNIQUE NOT NULL,
    icao_code VARCHAR(3) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Airports table
CREATE TABLE airports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iata_code VARCHAR(3) UNIQUE NOT NULL,
    icao_code VARCHAR(4) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    timezone VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    elevation_ft INTEGER,
    active BOOLEAN DEFAULT true,
    weather_station_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aircraft table
CREATE TABLE aircraft (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration VARCHAR(20) UNIQUE NOT NULL,
    aircraft_type VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    seats_economy INTEGER,
    seats_business INTEGER,
    seats_first INTEGER,
    total_seats INTEGER,
    cargo_capacity_kg INTEGER,
    fuel_capacity_liters INTEGER,
    range_km INTEGER,
    max_speed_kmh INTEGER,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'retired')),
    home_base VARCHAR(3) REFERENCES airports(iata_code),
    last_maintenance DATE,
    next_maintenance_due DATE,
    flight_hours_total INTEGER DEFAULT 0,
    cycles_total INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FLIGHT OPERATIONS
-- =============================================

-- Flights table
CREATE TABLE flights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_number VARCHAR(10) NOT NULL,
    airline_id UUID REFERENCES airlines(id),
    aircraft_id UUID REFERENCES aircraft(id),
    origin_airport VARCHAR(3) REFERENCES airports(iata_code),
    destination_airport VARCHAR(3) REFERENCES airports(iata_code),
    scheduled_departure TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_arrival TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_departure TIMESTAMP WITH TIME ZONE,
    actual_arrival TIMESTAMP WITH TIME ZONE,
    estimated_departure TIMESTAMP WITH TIME ZONE,
    estimated_arrival TIMESTAMP WITH TIME ZONE,
    gate VARCHAR(10),
    terminal VARCHAR(5),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'boarding', 'departed', 'en_route', 'arrived', 
        'delayed', 'cancelled', 'diverted', 'returned'
    )),
    passengers_booked INTEGER DEFAULT 0,
    passengers_checked_in INTEGER DEFAULT 0,
    crew_count INTEGER DEFAULT 0,
    cargo_weight_kg INTEGER DEFAULT 0,
    fuel_planned_liters INTEGER,
    fuel_actual_liters INTEGER,
    flight_time_scheduled INTEGER, -- minutes
    flight_time_actual INTEGER, -- minutes
    distance_km INTEGER,
    route_waypoints JSONB,
    weather_conditions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(flight_number, scheduled_departure)
);

-- Flight status history
CREATE TABLE flight_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID REFERENCES flights(id),
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    reason TEXT,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PASSENGERS & CREW
-- =============================================

-- Passengers table
CREATE TABLE passengers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pnr VARCHAR(10) NOT NULL,
    title VARCHAR(10),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    nationality VARCHAR(3),
    passport_number VARCHAR(50),
    loyalty_tier VARCHAR(20) DEFAULT 'bronze' CHECK (loyalty_tier IN ('bronze', 'silver', 'gold', 'platinum')),
    frequent_flyer_number VARCHAR(50),
    special_requirements JSONB, -- wheelchair, dietary, medical, etc.
    preferred_language VARCHAR(5) DEFAULT 'en',
    travel_class VARCHAR(20) CHECK (travel_class IN ('economy', 'premium_economy', 'business', 'first')),
    seat_assignment VARCHAR(5),
    check_in_status BOOLEAN DEFAULT false,
    boarding_pass_issued BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight passengers (many-to-many relationship)
CREATE TABLE flight_passengers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID REFERENCES flights(id),
    passenger_id UUID REFERENCES passengers(id),
    seat_number VARCHAR(5),
    travel_class VARCHAR(20),
    ticket_type VARCHAR(50), -- ticketed, ticketless, fim
    fare_amount DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    booking_date TIMESTAMP WITH TIME ZONE,
    booking_channel VARCHAR(50), -- website, mobile, agent, corporate
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN (
        'confirmed', 'checked_in', 'boarded', 'no_show', 'cancelled', 'standby'
    )),
    priority_score INTEGER DEFAULT 0,
    connection_flight_id UUID REFERENCES flights(id),
    connection_risk VARCHAR(10) CHECK (connection_risk IN ('none', 'low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(flight_id, passenger_id)
);

-- Crew members
CREATE TABLE crew_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'captain', 'first_officer', 'flight_engineer', 'senior_flight_attendant', 
        'flight_attendant', 'cabin_crew', 'security_officer'
    )),
    license_number VARCHAR(50),
    license_expiry DATE,
    base_location VARCHAR(3) REFERENCES airports(iata_code),
    phone VARCHAR(20),
    email VARCHAR(255),
    emergency_contact JSONB,
    qualifications JSONB, -- aircraft types, languages, certifications
    duty_time_limit INTEGER DEFAULT 480, -- minutes
    rest_time_required INTEGER DEFAULT 600, -- minutes
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN (
        'available', 'on_duty', 'rest', 'sick', 'vacation', 'training', 'inactive'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight crew assignments
CREATE TABLE flight_crew (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flight_id UUID REFERENCES flights(id),
    crew_member_id UUID REFERENCES crew_members(id),
    role VARCHAR(50),
    duty_start TIMESTAMP WITH TIME ZONE,
    duty_end TIMESTAMP WITH TIME ZONE,
    actual_duty_time INTEGER, -- minutes
    rest_time_before INTEGER, -- minutes
    status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN (
        'assigned', 'on_duty', 'completed', 'replaced', 'sick'
    )),
    replacement_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(flight_id, crew_member_id)
);

-- =============================================
-- DISRUPTIONS & RECOVERY
-- =============================================

-- Disruption types lookup
CREATE TABLE disruption_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'weather', 'technical', 'crew', 'atc', 'airport', 'security', 'medical', 'other'
    )),
    severity_weight DECIMAL(3, 2) DEFAULT 1.0,
    auto_recovery_eligible BOOLEAN DEFAULT false,
    description TEXT,
    active BOOLEAN DEFAULT true
);

-- Disruptions table
CREATE TABLE disruptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disruption_code VARCHAR(50) UNIQUE NOT NULL,
    flight_id UUID REFERENCES flights(id),
    disruption_type_id UUID REFERENCES disruption_types(id),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolving', 'resolved', 'escalated')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    root_cause TEXT,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    reported_by VARCHAR(255),
    assigned_to VARCHAR(255),
    estimated_delay_minutes INTEGER,
    actual_delay_minutes INTEGER,
    passengers_affected INTEGER DEFAULT 0,
    connecting_flights_affected INTEGER DEFAULT 0,
    estimated_cost DECIMAL(10, 2) DEFAULT 0,
    actual_cost DECIMAL(10, 2) DEFAULT 0,
    weather_data JSONB,
    technical_details JSONB,
    crew_impact JSONB,
    passenger_impact JSONB,
    ai_confidence_score DECIMAL(5, 2), -- 0-100
    ai_predictions JSONB,
    resolution_notes TEXT,
    lessons_learned TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recovery options
CREATE TABLE recovery_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disruption_id UUID REFERENCES disruptions(id),
    option_type VARCHAR(50) NOT NULL CHECK (option_type IN (
        'aircraft_substitution', 'flight_consolidation', 'route_diversion',
        'partner_airline_transfer', 'delayed_operations', 'cancellation'
    )),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    estimated_cost DECIMAL(10, 2) NOT NULL,
    estimated_time_minutes INTEGER NOT NULL,
    passenger_impact INTEGER DEFAULT 0,
    otp_recovery_percentage DECIMAL(5, 2),
    risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high')),
    resource_requirement VARCHAR(20) CHECK (resource_requirement IN ('low', 'medium', 'high')),
    feasibility_score DECIMAL(5, 2), -- 0-100
    ai_score DECIMAL(5, 2), -- 0-100
    recommended BOOLEAN DEFAULT false,
    implementation_details JSONB,
    prerequisites JSONB,
    success_criteria JSONB,
    rollback_plan JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recovery plans (selected and executed options)
CREATE TABLE recovery_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_code VARCHAR(50) UNIQUE NOT NULL,
    disruption_id UUID REFERENCES disruptions(id),
    recovery_option_id UUID REFERENCES recovery_options(id),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN (
        'draft', 'approved', 'executing', 'completed', 'failed', 'cancelled'
    )),
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE,
    execution_started_at TIMESTAMP WITH TIME ZONE,
    execution_completed_at TIMESTAMP WITH TIME ZONE,
    actual_cost DECIMAL(10, 2),
    actual_time_minutes INTEGER,
    success BOOLEAN,
    success_metrics JSONB,
    failure_reason TEXT,
    execution_notes TEXT,
    passenger_feedback JSONB,
    kpi_impact JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recovery plan tasks
CREATE TABLE recovery_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recovery_plan_id UUID REFERENCES recovery_plans(id),
    task_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to VARCHAR(255),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'in_progress', 'completed', 'failed', 'skipped'
    )),
    scheduled_start TIMESTAMP WITH TIME ZONE,
    actual_start TIMESTAMP WITH TIME ZONE,
    scheduled_end TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    dependencies JSONB, -- task IDs that must complete first
    resources_required JSONB,
    completion_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PASSENGER SERVICES
-- =============================================

-- Passenger rebooking
CREATE TABLE passenger_rebookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_flight_id UUID REFERENCES flights(id),
    passenger_id UUID REFERENCES passengers(id),
    new_flight_id UUID REFERENCES flights(id),
    rebooking_type VARCHAR(50) CHECK (rebooking_type IN (
        'same_day', 'next_day', 'voluntary', 'involuntary', 'upgrade', 'downgrade'
    )),
    reason TEXT,
    fare_difference DECIMAL(10, 2) DEFAULT 0,
    refund_amount DECIMAL(10, 2) DEFAULT 0,
    compensation_amount DECIMAL(10, 2) DEFAULT 0,
    processed_by VARCHAR(255),
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    passenger_consent BOOLEAN DEFAULT false,
    satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotel bookings for passengers
CREATE TABLE hotel_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passenger_id UUID REFERENCES passengers(id),
    flight_id UUID REFERENCES flights(id),
    hotel_name VARCHAR(255) NOT NULL,
    hotel_address TEXT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    room_type VARCHAR(100),
    cost_per_night DECIMAL(8, 2),
    total_cost DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    booking_reference VARCHAR(100),
    booking_status VARCHAR(20) DEFAULT 'confirmed' CHECK (booking_status IN (
        'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'
    )),
    transportation_included BOOLEAN DEFAULT false,
    meal_vouchers_included BOOLEAN DEFAULT false,
    booked_by VARCHAR(255),
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vouchers (meal, transport, service)
CREATE TABLE vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    voucher_code VARCHAR(50) UNIQUE NOT NULL,
    passenger_id UUID REFERENCES passengers(id),
    flight_id UUID REFERENCES flights(id),
    voucher_type VARCHAR(50) NOT NULL CHECK (voucher_type IN (
        'meal', 'snack', 'fine_dining', 'transport', 'taxi', 'hotel', 'general_service'
    )),
    amount DECIMAL(8, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    restrictions TEXT,
    merchant_category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN (
        'active', 'used', 'expired', 'cancelled', 'refunded'
    )),
    used_at TIMESTAMP WITH TIME ZONE,
    used_location VARCHAR(255),
    used_amount DECIMAL(8, 2),
    issued_by VARCHAR(255),
    approval_required BOOLEAN DEFAULT false,
    approved_by VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- MAINTENANCE & TECHNICAL
-- =============================================

-- Maintenance events
CREATE TABLE maintenance_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aircraft_id UUID REFERENCES aircraft(id),
    maintenance_type VARCHAR(50) NOT NULL CHECK (maintenance_type IN (
        'scheduled', 'unscheduled', 'inspection', 'repair', 'modification', 'overhaul'
    )),
    work_order_number VARCHAR(50) UNIQUE,
    description TEXT NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE,
    actual_start TIMESTAMP WITH TIME ZONE,
    scheduled_end TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    location VARCHAR(100),
    technician_assigned VARCHAR(255),
    parts_required JSONB,
    labor_hours DECIMAL(8, 2),
    cost DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'in_progress', 'completed', 'cancelled', 'deferred'
    )),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'aog')),
    impact_on_operations TEXT,
    completion_notes TEXT,
    quality_check_passed BOOLEAN,
    return_to_service TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ANALYTICS & REPORTING
-- =============================================

-- KPI metrics
CREATE TABLE kpi_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    metric_category VARCHAR(50) NOT NULL,
    value DECIMAL(10, 4) NOT NULL,
    target_value DECIMAL(10, 4),
    unit VARCHAR(20),
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    airport_code VARCHAR(3),
    flight_id UUID REFERENCES flights(id),
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Decision logs for AI/human decisions
CREATE TABLE decision_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disruption_id UUID REFERENCES disruptions(id),
    recovery_plan_id UUID REFERENCES recovery_plans(id),
    decision_type VARCHAR(50) NOT NULL,
    decision_maker VARCHAR(100) NOT NULL, -- 'ai' or user ID
    recommended_option_id UUID REFERENCES recovery_options(id),
    selected_option_id UUID REFERENCES recovery_options(id),
    decision_rationale TEXT,
    override_reason TEXT,
    confidence_score DECIMAL(5, 2),
    decision_time_seconds INTEGER,
    outcome VARCHAR(50),
    success_metrics JSONB,
    lessons_learned TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit trail
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    reason TEXT
);

-- =============================================
-- WEATHER & EXTERNAL DATA
-- =============================================

-- Weather data
CREATE TABLE weather_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    airport_code VARCHAR(3) REFERENCES airports(iata_code),
    observation_time TIMESTAMP WITH TIME ZONE NOT NULL,
    temperature_celsius DECIMAL(5, 2),
    humidity_percent INTEGER,
    pressure_hpa DECIMAL(7, 2),
    wind_speed_kmh DECIMAL(6, 2),
    wind_direction INTEGER,
    visibility_km DECIMAL(6, 2),
    weather_conditions VARCHAR(100),
    cloud_cover_percent INTEGER,
    precipitation_mm DECIMAL(6, 2),
    forecast_data JSONB,
    alert_level VARCHAR(20) CHECK (alert_level IN ('none', 'advisory', 'watch', 'warning')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- OPTIMIZATION PARAMETERS
-- =============================================

-- AI model parameters and weights
CREATE TABLE optimization_parameters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parameter_name VARCHAR(100) NOT NULL,
    parameter_category VARCHAR(50) NOT NULL,
    weight DECIMAL(5, 2) NOT NULL DEFAULT 25.0,
    min_value DECIMAL(10, 4) DEFAULT 0,
    max_value DECIMAL(10, 4) DEFAULT 100,
    description TEXT,
    active BOOLEAN DEFAULT true,
    last_updated_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Core business indexes
CREATE INDEX idx_flights_number_date ON flights(flight_number, scheduled_departure);
CREATE INDEX idx_flights_status ON flights(status);
CREATE INDEX idx_flights_departure ON flights(scheduled_departure);
CREATE INDEX idx_flights_origin_dest ON flights(origin_airport, destination_airport);

CREATE INDEX idx_disruptions_flight_id ON disruptions(flight_id);
CREATE INDEX idx_disruptions_status ON disruptions(status);
CREATE INDEX idx_disruptions_severity ON disruptions(severity);
CREATE INDEX idx_disruptions_reported_at ON disruptions(reported_at);

CREATE INDEX idx_passengers_pnr ON passengers(pnr);
CREATE INDEX idx_flight_passengers_flight_id ON flight_passengers(flight_id);
CREATE INDEX idx_flight_passengers_passenger_id ON flight_passengers(passenger_id);

CREATE INDEX idx_recovery_options_disruption_id ON recovery_options(disruption_id);
CREATE INDEX idx_recovery_plans_disruption_id ON recovery_plans(disruption_id);

CREATE INDEX idx_crew_members_status ON crew_members(status);
CREATE INDEX idx_flight_crew_flight_id ON flight_crew(flight_id);

CREATE INDEX idx_aircraft_status ON aircraft(status);
CREATE INDEX idx_maintenance_events_aircraft_id ON maintenance_events(aircraft_id);

-- Analytics indexes
CREATE INDEX idx_kpi_metrics_name_period ON kpi_metrics(metric_name, period_start, period_end);
CREATE INDEX idx_decision_logs_disruption_id ON decision_logs(disruption_id);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);

-- Weather indexes
CREATE INDEX idx_weather_airport_time ON weather_data(airport_code, observation_time);

-- =============================================
-- TRIGGERS AND FUNCTIONS
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_airlines_updated_at BEFORE UPDATE ON airlines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_airports_updated_at BEFORE UPDATE ON airports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aircraft_updated_at BEFORE UPDATE ON aircraft FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flights_updated_at BEFORE UPDATE ON flights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_passengers_updated_at BEFORE UPDATE ON passengers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flight_passengers_updated_at BEFORE UPDATE ON flight_passengers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crew_members_updated_at BEFORE UPDATE ON crew_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flight_crew_updated_at BEFORE UPDATE ON flight_crew FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disruptions_updated_at BEFORE UPDATE ON disruptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recovery_options_updated_at BEFORE UPDATE ON recovery_options FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recovery_plans_updated_at BEFORE UPDATE ON recovery_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recovery_tasks_updated_at BEFORE UPDATE ON recovery_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_bookings_updated_at BEFORE UPDATE ON hotel_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vouchers_updated_at BEFORE UPDATE ON vouchers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_events_updated_at BEFORE UPDATE ON maintenance_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_optimization_parameters_updated_at BEFORE UPDATE ON optimization_parameters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
