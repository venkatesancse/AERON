
# AERON Flight Disruption Management - Database Documentation

## Overview

This database schema is designed to support a comprehensive flight disruption management system with AI-powered recovery recommendations, passenger services, crew management, and operational analytics.

## Database Requirements

- **Database Engine**: PostgreSQL 13+ (recommended)
- **Extensions Required**: uuid-ossp
- **Estimated Storage**: 50GB+ for production with historical data
- **Backup Strategy**: Daily full backups with point-in-time recovery

## Schema Components

### Core Entities

1. **Airlines**: Airline information and codes
2. **Airports**: Airport details, locations, and operational data
3. **Aircraft**: Fleet management with specifications and status
4. **Flights**: Flight operations, schedules, and status tracking
5. **Passengers**: Customer information and profiles
6. **Crew Members**: Staff information and qualifications

### Operational Data

1. **Disruptions**: Flight disruption incidents and details
2. **Recovery Options**: AI-generated recovery solutions
3. **Recovery Plans**: Selected and executed recovery strategies
4. **Maintenance Events**: Aircraft maintenance tracking
5. **Weather Data**: Real-time weather information

### Passenger Services

1. **Passenger Rebooking**: Flight changes and rebooking records
2. **Hotel Bookings**: Accommodation arrangements
3. **Vouchers**: Meal, transport, and service vouchers

### Analytics & Reporting

1. **KPI Metrics**: Performance indicators and measurements
2. **Decision Logs**: AI and human decision tracking
3. **Audit Logs**: Complete audit trail for all changes

## Key Features

### 1. Priority-Based Passenger Management
- Automated priority scoring based on loyalty tier, ticket class, special needs
- Support for connection risk assessment
- VIP and special assistance tracking

### 2. AI Integration Support
- Confidence scoring for AI recommendations
- Parameter weighting for optimization algorithms
- Decision tracking and learning capabilities

### 3. Comprehensive Disruption Management
- Multi-category disruption classification
- Cost impact tracking and estimation
- Recovery option generation and comparison

### 4. Real-time Operations
- Flight status tracking with timestamps
- Crew duty time monitoring
- Weather data integration

## Setup Instructions

### 1. Database Creation
```sql
CREATE DATABASE aeron_disruption_management;
CREATE USER aeron_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE aeron_disruption_management TO aeron_user;
```

### 2. Schema Installation
```bash
# Connect to database and run schema files in order:
psql -U aeron_user -d aeron_disruption_management -f database/schema.sql
psql -U aeron_user -d aeron_disruption_management -f database/views.sql
psql -U aeron_user -d aeron_disruption_management -f database/seed_data.sql
```

### 3. Performance Optimization
- Regular VACUUM and ANALYZE operations
- Monitor index usage and query performance
- Consider partitioning for historical data tables

## Data Retention Policies

### Recommended Retention Periods

- **Active Flight Data**: 7 days in hot storage
- **Historical Flight Data**: 2 years
- **Disruption Records**: 5 years for analysis
- **Passenger Data**: Per privacy regulations (GDPR compliance)
- **Audit Logs**: 7 years for compliance
- **Weather Data**: 1 year detailed, 5 years aggregated

## Security Considerations

### 1. Data Privacy
- Passenger PII encryption at rest and in transit
- Access control based on roles and responsibilities
- Regular security audits and compliance checks

### 2. Access Control
```sql
-- Example role-based access
CREATE ROLE operations_staff;
GRANT SELECT, INSERT, UPDATE ON flights, disruptions, recovery_plans TO operations_staff;

CREATE ROLE analytics_team;
GRANT SELECT ON ALL TABLES TO analytics_team;
GRANT ALL ON kpi_metrics, decision_logs TO analytics_team;
```

## Integration Points

### 1. External Systems
- **Flight Operations System**: Real-time flight data sync
- **Crew Management System**: Duty time and availability
- **Weather Services**: Automated weather data updates
- **Customer Service**: Passenger rebooking and voucher systems

### 2. API Endpoints
Common database queries should be wrapped in API endpoints:
- GET /flights/active - Active flight operations
- GET /disruptions/current - Current disruptions requiring attention
- POST /recovery-plans - Create new recovery plan
- GET /passengers/{id}/priority - Passenger priority information

## Monitoring and Maintenance

### 1. Database Health Checks
- Connection pool monitoring
- Query performance analysis
- Storage usage tracking
- Backup verification

### 2. Key Metrics to Monitor
- Average query response time
- Database connection count
- Storage growth rate
- Index usage efficiency

## Backup and Recovery

### 1. Backup Strategy
```bash
# Daily full backup
pg_dump -U aeron_user -h localhost aeron_disruption_management > backup_$(date +%Y%m%d).sql

# Continuous archiving for point-in-time recovery
# Configure WAL archiving in postgresql.conf
```

### 2. Recovery Procedures
- Document step-by-step recovery processes
- Regular recovery testing
- RPO (Recovery Point Objective): 15 minutes
- RTO (Recovery Time Objective): 2 hours

## Development vs Production

### Development Environment
- Smaller dataset for testing
- Relaxed security constraints
- Additional debugging tables/views

### Production Environment
- Full security implementation
- Performance-optimized configurations
- Comprehensive monitoring and alerting
- High availability setup (if required)

This database schema provides a robust foundation for the AERON flight disruption management application with scalability, performance, and maintainability in mind.
