"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  AlertTriangle,
  Plane,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Filter,
  Search,
  Eye,
  RefreshCw,
  ArrowRight,
  Info,
  Star,
  Zap,
  Activity,
} from "lucide-react";
import { dbService } from "../../services/database";

export function DisruptionInput({ onSelectFlight }) {
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [affectedFlights, setAffectedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    origin: "all",
    search: "",
  });

  // Fetch affected flights from database
  useEffect(() => {
    fetchAffectedFlights();
  }, []);

  const fetchAffectedFlights = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from database API
      const isProduction = window.location.hostname.includes('replit.dev');
      let baseUrl;
      
      if (isProduction) {
        // In production, the API server runs on port 3001
        const hostname = window.location.hostname;
        const port = ':3001';
        baseUrl = `https://${hostname}${port}`;
      } else {
        // In development, use environment variable or fallback to localhost:3001
        baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      }
      
      const response = await fetch(`${baseUrl}/api/flights/affected`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights from database");
      }

      const data = await response.json();
      console.log("Fetched flights from database:", data);

      // Transform API data to match frontend format
      const transformedFlights = data.map((flight) => ({
        id: flight.id,
        flightNumber: flight.flightNumber || flight.flight_number,
        route: flight.route,
        origin: flight.route?.split(' → ')[0] || '',
        destination: flight.route?.split(' → ')[1] || '',
        originCity: flight.originCity || flight.origin_city,
        destinationCity: flight.destinationCity || flight.destination_city,
        scheduledDeparture: flight.scheduledDeparture || flight.scheduled_departure,
        scheduledArrival: flight.scheduledArrival || flight.scheduled_arrival,
        estimatedDeparture: flight.estimatedDeparture || flight.estimated_departure,
        estimatedArrival: flight.estimatedArrival || flight.estimated_arrival,
        currentStatus: flight.currentStatus || flight.current_status || 'Unknown',
        delay: flight.delay || 0,
        aircraft: flight.aircraft,
        aircraftType: flight.aircraftType || flight.aircraft_type,
        gate: flight.gate,
        terminal: flight.terminal,
        passengers: flight.passengers || 0,
        crew: flight.crew || 0,
        disruptionType: flight.disruptionType || flight.disruption_type || 'other',
        severity: flight.severity || 'medium',
        impact: flight.impact || 'Unknown impact',
        lastUpdate: flight.lastUpdate || flight.last_update || 'Unknown',
        priority: flight.priority || 'Medium',
        connectionFlights: flight.connectionFlights || flight.connection_flights || 0,
        vipPassengers: flight.vipPassengers || flight.vip_passengers || 0,
      }));

      setAffectedFlights(transformedFlights);
    } catch (error) {
      console.error("Database fetch failed:", error);
      setError(`Failed to connect to database: ${error.message}`);
      setAffectedFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "Delayed":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Diverted":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getDisruptionIcon = (type) => {
    switch (type) {
      case "weather":
        return "🌩️";
      case "technical":
        return "🔧";
      case "crew":
        return "👥";
      case "air_traffic":
        return "✈️";
      default:
        return "⚠️";
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Filter flights based on current filters
  const filteredFlights = affectedFlights.filter((flight) => {
    if (filters.status !== "all" && flight.currentStatus !== filters.status)
      return false;
    if (filters.priority !== "all" && flight.priority !== filters.priority)
      return false;
    if (filters.origin !== "all" && flight.origin !== filters.origin)
      return false;
    if (
      filters.search &&
      !flight.flightNumber
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !flight.originCity.toLowerCase().includes(filters.search.toLowerCase()) &&
      !flight.destinationCity
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  // Sort flights by priority
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const handleFlightSelection = (flightId, checked) => {
    if (checked) {
      setSelectedFlights([...selectedFlights, flightId]);
    } else {
      setSelectedFlights(selectedFlights.filter((id) => id !== flightId));
    }
  };

  const handleSelectAllFlights = (checked) => {
    if (checked) {
      setSelectedFlights(sortedFlights.map((flight) => flight.id));
    } else {
      setSelectedFlights([]);
    }
  };

  const getTotalImpact = () => {
    return {
      flights: selectedFlights.length,
      passengers: affectedFlights.reduce(
        (sum, flight) => sum + flight.passengers,
        0,
      ),
      connections: affectedFlights.reduce(
        (sum, flight) => sum + flight.connectionFlights,
        0,
      ),
    };
  };

  const impact = getTotalImpact();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Affected Flights Overview</h2>
          <p className="text-muted-foreground">
            Select flights to generate AERON recovery options
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            {affectedFlights.length} flights affected
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Context Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Critical Flights
                </p>
                <p className="text-lg font-semibold text-red-600">
                  {
                    affectedFlights.filter((f) => f.priority === "Critical")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Passengers
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {affectedFlights
                    .reduce((sum, f) => sum + f.passengers, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Plane className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-lg font-semibold text-green-600">
                  {affectedFlights.reduce(
                    (sum, f) => sum + f.connectionFlights,
                    0,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Delay</p>
                <p className="text-lg font-semibold text-purple-600">
                  {Math.round(
                    affectedFlights
                      .filter((f) => f.delay)
                      .reduce((sum, f) => sum + f.delay, 0) /
                      affectedFlights.filter((f) => f.delay).length || 0,
                  )}
                  m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Sort Flights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Flight, city..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Diverted">Diverted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select
                value={filters.priority}
                onValueChange={(value) =>
                  setFilters({ ...filters, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Origin</label>
              <Select
                value={filters.origin}
                onValueChange={(value) =>
                  setFilters({ ...filters, origin: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All origins" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Origins</SelectItem>
                  <SelectItem value="JFK">JFK</SelectItem>
                  <SelectItem value="LHR">LHR</SelectItem>
                  <SelectItem value="DXB">DXB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters({ ...filters, sortBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="passengers">Passenger Count</SelectItem>
                  <SelectItem value="delay">Delay Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Flight Selection ({selectedFlights.length} selected)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={
                  selectedFlights.length === sortedFlights.length &&
                  sortedFlights.length > 0
                }
                onCheckedChange={handleSelectAllFlights}
              />
              <span className="text-sm">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Flight</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delay</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Loading flight data from database...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : sortedFlights.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Plane className="h-8 w-8" />
                        <p>No affected flights found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchAffectedFlights}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry Loading
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedFlights.map((flight) => (
                    <TableRow
                      key={flight.id}
                      className={
                        selectedFlights.includes(flight.id) ? "bg-blue-50" : ""
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedFlights.includes(flight.id)}
                          onCheckedChange={(checked) =>
                            handleFlightSelection(flight.id, checked)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {flight.flightNumber}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.aircraft}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{flight.origin}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">
                            {flight.destination}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flight.originCity} → {flight.destinationCity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(flight.currentStatus)}>
                          {flight.currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {flight.delay && (
                          <div className="text-sm text-red-600">
                            +{flight.delay}m
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(flight.priority)}>
                          {flight.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{flight.passengers}</div>
                          <div className="text-sm text-muted-foreground">
                            {flight.connectionFlights} connections
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSelectFlight([flight])}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary and Actions */}
      {selectedFlights.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">
                    Recovery Planning Summary
                  </h4>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 font-medium">
                      {impact.flights}
                    </span>
                    <span className="text-blue-700 ml-1">flights selected</span>
                  </div>
                  <div>
                    <span className="text-blue-600 font-medium">
                      {impact.passengers.toLocaleString()}
                    </span>
                    <span className="text-blue-700 ml-1">
                      passengers affected
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600 font-medium">
                      {impact.connections}
                    </span>
                    <span className="text-blue-700 ml-1">
                      connections at risk
                    </span>
                  </div>
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="h-4 w-4 mr-2" />
                Generate Recovery Options
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}