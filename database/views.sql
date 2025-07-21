
-- AERON Flight Disruption Management - Database Views
-- Commonly used queries as views for better performance and consistency

-- Flight operations dashboard view
CREATE OR REPLACE VIEW flight_operations_dashboard AS
SELECT 
    f.id,
    f.flight_number,
    f.scheduled_departure,
    f.scheduled_arrival,
    f.estimated_departure,
    f.estimated_arrival,
    f.status,
    f.passengers_booked,
    f.gate,
    f.terminal,
    orig.iata_code as origin_code,
    orig.name as origin_airport,
    dest.iata_code as destination_code,
    dest.name as destination_airport,
    a.registration as aircraft_registration,
    a.aircraft_type,
    al.name as airline_name,
    CASE 
        WHEN f.estimated_departure IS NOT NULL AND f.scheduled_departure IS NOT NULL 
        THEN EXTRACT(EPOCH FROM (f.estimated_departure - f.scheduled_departure))/60 
        ELSE 0 
    END as delay_minutes,
    CASE 
        WHEN EXISTS (SELECT 1 FROM disruptions d WHERE d.flight_id = f.id AND d.status = 'active') 
        THEN true ELSE false 
    END as has_active_disruption
FROM flights f
LEFT JOIN airports orig ON f.origin_airport = orig.iata_code
LEFT JOIN airports dest ON f.destination_airport = dest.iata_code
LEFT JOIN aircraft a ON f.aircraft_id = a.id
LEFT JOIN airlines al ON f.airline_id = al.id
WHERE f.scheduled_departure >= CURRENT_DATE - INTERVAL '1 day'
  AND f.scheduled_departure <= CURRENT_DATE + INTERVAL '2 days';

-- Active disruptions with details
CREATE OR REPLACE VIEW active_disruptions_detail AS
SELECT 
    d.id,
    d.disruption_code,
    d.title,
    d.description,
    d.severity,
    d.status,
    d.reported_at,
    d.estimated_delay_minutes,
    d.passengers_affected,
    d.estimated_cost,
    d.ai_confidence_score,
    f.flight_number,
    f.scheduled_departure,
    f.origin_airport,
    f.destination_airport,
    dt.name as disruption_type_name,
    dt.category as disruption_category,
    COUNT(ro.id) as recovery_options_count,
    CASE 
        WHEN EXISTS (SELECT 1 FROM recovery_plans rp WHERE rp.disruption_id = d.id AND rp.status IN ('approved', 'executing')) 
        THEN true ELSE false 
    END as has_active_plan
FROM disruptions d
LEFT JOIN flights f ON d.flight_id = f.id
LEFT JOIN disruption_types dt ON d.disruption_type_id = dt.id
LEFT JOIN recovery_options ro ON d.id = ro.disruption_id
WHERE d.status IN ('active', 'resolving')
GROUP BY d.id, d.disruption_code, d.title, d.description, d.severity, d.status, 
         d.reported_at, d.estimated_delay_minutes, d.passengers_affected, d.estimated_cost,
         d.ai_confidence_score, f.flight_number, f.scheduled_departure, f.origin_airport,
         f.destination_airport, dt.name, dt.category;

-- Passenger priority scoring view
CREATE OR REPLACE VIEW passenger_priority_scores AS
SELECT 
    fp.flight_id,
    fp.passenger_id,
    p.first_name,
    p.last_name,
    p.pnr,
    p.loyalty_tier,
    fp.travel_class,
    fp.booking_channel,
    p.special_requirements,
    fp.connection_flight_id,
    fp.connection_risk,
    -- Priority scoring calculation
    CASE p.loyalty_tier
        WHEN 'platinum' THEN 30
        WHEN 'gold' THEN 25
        WHEN 'silver' THEN 20
        WHEN 'bronze' THEN 5
        ELSE 0
    END +
    CASE fp.travel_class
        WHEN 'first' THEN 35
        WHEN 'business' THEN 30
        WHEN 'premium_economy' THEN 20
        WHEN 'economy' THEN 15
        ELSE 10
    END +
    CASE 
        WHEN p.special_requirements IS NOT NULL AND jsonb_array_length(p.special_requirements) > 0 THEN 20
        ELSE 0
    END +
    CASE fp.connection_risk
        WHEN 'high' THEN 15
        WHEN 'medium' THEN 10
        WHEN 'low' THEN 5
        ELSE 0
    END +
    CASE fp.booking_channel
        WHEN 'corporate' THEN 10
        WHEN 'premium_service' THEN 10
        WHEN 'website' THEN 5
        ELSE 0
    END as priority_score,
    -- Priority rank based on score
    CASE 
        WHEN (
            CASE p.loyalty_tier WHEN 'platinum' THEN 30 WHEN 'gold' THEN 25 WHEN 'silver' THEN 20 WHEN 'bronze' THEN 5 ELSE 0 END +
            CASE fp.travel_class WHEN 'first' THEN 35 WHEN 'business' THEN 30 WHEN 'premium_economy' THEN 20 WHEN 'economy' THEN 15 ELSE 10 END +
            CASE WHEN p.special_requirements IS NOT NULL AND jsonb_array_length(p.special_requirements) > 0 THEN 20 ELSE 0 END +
            CASE fp.connection_risk WHEN 'high' THEN 15 WHEN 'medium' THEN 10 WHEN 'low' THEN 5 ELSE 0 END +
            CASE fp.booking_channel WHEN 'corporate' THEN 10 WHEN 'premium_service' THEN 10 WHEN 'website' THEN 5 ELSE 0 END
        ) >= 95 THEN 'VIP'
        WHEN (
            CASE p.loyalty_tier WHEN 'platinum' THEN 30 WHEN 'gold' THEN 25 WHEN 'silver' THEN 20 WHEN 'bronze' THEN 5 ELSE 0 END +
            CASE fp.travel_class WHEN 'first' THEN 35 WHEN 'business' THEN 30 WHEN 'premium_economy' THEN 20 WHEN 'economy' THEN 15 ELSE 10 END +
            CASE WHEN p.special_requirements IS NOT NULL AND jsonb_array_length(p.special_requirements) > 0 THEN 20 ELSE 0 END +
            CASE fp.connection_risk WHEN 'high' THEN 15 WHEN 'medium' THEN 10 WHEN 'low' THEN 5 ELSE 0 END +
            CASE fp.booking_channel WHEN 'corporate' THEN 10 WHEN 'premium_service' THEN 10 WHEN 'website' THEN 5 ELSE 0 END
        ) >= 80 THEN 'Critical'
        WHEN (
            CASE p.loyalty_tier WHEN 'platinum' THEN 30 WHEN 'gold' THEN 25 WHEN 'silver' THEN 20 WHEN 'bronze' THEN 5 ELSE 0 END +
            CASE fp.travel_class WHEN 'first' THEN 35 WHEN 'business' THEN 30 WHEN 'premium_economy' THEN 20 WHEN 'economy' THEN 15 ELSE 10 END +
            CASE WHEN p.special_requirements IS NOT NULL AND jsonb_array_length(p.special_requirements) > 0 THEN 20 ELSE 0 END +
            CASE fp.connection_risk WHEN 'high' THEN 15 WHEN 'medium' THEN 10 WHEN 'low' THEN 5 ELSE 0 END +
            CASE fp.booking_channel WHEN 'corporate' THEN 10 WHEN 'premium_service' THEN 10 WHEN 'website' THEN 5 ELSE 0 END
        ) >= 60 THEN 'High'
        WHEN (
            CASE p.loyalty_tier WHEN 'platinum' THEN 30 WHEN 'gold' THEN 25 WHEN 'silver' THEN 20 WHEN 'bronze' THEN 5 ELSE 0 END +
            CASE fp.travel_class WHEN 'first' THEN 35 WHEN 'business' THEN 30 WHEN 'premium_economy' THEN 20 WHEN 'economy' THEN 15 ELSE 10 END +
            CASE WHEN p.special_requirements IS NOT NULL AND jsonb_array_length(p.special_requirements) > 0 THEN 20 ELSE 0 END +
            CASE fp.connection_risk WHEN 'high' THEN 15 WHEN 'medium' THEN 10 WHEN 'low' THEN 5 ELSE 0 END +
            CASE fp.booking_channel WHEN 'corporate' THEN 10 WHEN 'premium_service' THEN 10 WHEN 'website' THEN 5 ELSE 0 END
        ) >= 40 THEN 'Medium'
        ELSE 'Low'
    END as priority_rank
FROM flight_passengers fp
JOIN passengers p ON fp.passenger_id = p.id;

-- KPI dashboard view
CREATE OR REPLACE VIEW kpi_dashboard AS
WITH daily_metrics AS (
    SELECT 
        DATE(scheduled_departure) as flight_date,
        COUNT(*) as total_flights,
        COUNT(CASE WHEN actual_departure IS NOT NULL AND actual_departure <= scheduled_departure + INTERVAL '15 minutes' THEN 1 END) as on_time_flights,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_flights,
        AVG(CASE 
            WHEN actual_departure IS NOT NULL AND actual_departure > scheduled_departure 
            THEN EXTRACT(EPOCH FROM (actual_departure - scheduled_departure))/60 
            ELSE 0 
        END) as avg_delay_minutes
    FROM flights 
    WHERE scheduled_departure >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY DATE(scheduled_departure)
),
disruption_metrics AS (
    SELECT 
        DATE(reported_at) as disruption_date,
        COUNT(*) as total_disruptions,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_disruptions,
        AVG(CASE 
            WHEN resolved_at IS NOT NULL 
            THEN EXTRACT(EPOCH FROM (resolved_at - reported_at))/60 
        END) as avg_resolution_time_minutes,
        SUM(actual_cost) as total_disruption_cost
    FROM disruptions 
    WHERE reported_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY DATE(reported_at)
)
SELECT 
    COALESCE(dm.flight_date, drm.disruption_date) as metric_date,
    dm.total_flights,
    dm.on_time_flights,
    dm.cancelled_flights,
    CASE WHEN dm.total_flights > 0 THEN (dm.on_time_flights::DECIMAL / dm.total_flights * 100) ELSE 0 END as otp_percentage,
    CASE WHEN dm.total_flights > 0 THEN (dm.cancelled_flights::DECIMAL / dm.total_flights * 100) ELSE 0 END as cancellation_rate,
    dm.avg_delay_minutes,
    drm.total_disruptions,
    drm.resolved_disruptions,
    drm.avg_resolution_time_minutes,
    drm.total_disruption_cost
FROM daily_metrics dm
FULL OUTER JOIN disruption_metrics drm ON dm.flight_date = drm.disruption_date
ORDER BY metric_date DESC;

-- Active disruptions with complete flight details for affected flights display
CREATE OR REPLACE VIEW active_disruptions_detail AS
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
        WHEN d.severity = 'high' THEN 'Critical'
        WHEN d.severity = 'medium' THEN 'High'
        ELSE 'Medium'
    END as priority,
    CASE 
        WHEN d.updated_at > NOW() - INTERVAL '5 minutes' THEN EXTRACT(EPOCH FROM (NOW() - d.updated_at))/60 || ' mins ago'
        WHEN d.updated_at > NOW() - INTERVAL '1 hour' THEN EXTRACT(EPOCH FROM (NOW() - d.updated_at))/60 || ' mins ago'
        ELSE EXTRACT(EPOCH FROM (NOW() - d.updated_at))/3600 || ' hours ago'
    END as last_update,
    d.reported_at,
    d.updated_at
FROM flights f
LEFT JOIN airports orig ON f.origin_airport = orig.iata_code
LEFT JOIN airports dest ON f.destination_airport = dest.iata_code
LEFT JOIN aircraft a ON f.aircraft_id = a.id
LEFT JOIN disruptions d ON f.id = d.flight_id
LEFT JOIN disruption_types dt ON d.disruption_type_id = dt.id
WHERE d.status IN ('active', 'resolving')
    AND f.scheduled_departure >= CURRENT_DATE - INTERVAL '1 day'
    AND f.scheduled_departure <= CURRENT_DATE + INTERVAL '2 days'
ORDER BY d.severity DESC, f.scheduled_departure ASC;

-- Aircraft utilization view
CREATE OR REPLACE VIEW aircraft_utilization AS
SELECT 
    a.id,
    a.registration,
    a.aircraft_type,
    a.status,
    COUNT(f.id) as flights_scheduled,
    COUNT(CASE WHEN f.actual_departure IS NOT NULL THEN 1 END) as flights_completed,
    SUM(CASE WHEN f.actual_departure IS NOT NULL AND f.actual_arrival IS NOT NULL 
        THEN EXTRACT(EPOCH FROM (f.actual_arrival - f.actual_departure))/3600 
        ELSE 0 END) as flight_hours_month,
    AVG(f.passengers_booked) as avg_load,
    COUNT(CASE WHEN EXISTS (SELECT 1 FROM disruptions d WHERE d.flight_id = f.id) THEN 1 END) as flights_with_disruptions,
    MAX(f.scheduled_departure) as last_flight_date
FROM aircraft a
LEFT JOIN flights f ON a.id = f.aircraft_id 
    AND f.scheduled_departure >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, a.registration, a.aircraft_type, a.status
ORDER BY a.registration;

-- Recovery performance analysis
CREATE OR REPLACE VIEW recovery_performance AS
SELECT 
    rp.id,
    rp.plan_code,
    d.disruption_code,
    d.severity,
    ro.option_type,
    ro.title as option_title,
    ro.estimated_cost,
    rp.actual_cost,
    ro.estimated_time_minutes,
    rp.actual_time_minutes,
    ro.feasibility_score,
    rp.status,
    rp.success,
    CASE 
        WHEN rp.actual_cost IS NOT NULL AND ro.estimated_cost > 0 
        THEN ((rp.actual_cost - ro.estimated_cost) / ro.estimated_cost * 100)
        ELSE 0 
    END as cost_variance_percentage,
    CASE 
        WHEN rp.actual_time_minutes IS NOT NULL AND ro.estimated_time_minutes > 0 
        THEN ((rp.actual_time_minutes - ro.estimated_time_minutes) / ro.estimated_time_minutes * 100)
        ELSE 0 
    END as time_variance_percentage,
    rp.execution_started_at,
    rp.execution_completed_at
FROM recovery_plans rp
JOIN disruptions d ON rp.disruption_id = d.id
JOIN recovery_options ro ON rp.recovery_option_id = ro.id
WHERE rp.status IN ('completed', 'failed')
ORDER BY rp.execution_completed_at DESC;
