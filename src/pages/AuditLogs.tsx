
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Filter, Download } from 'lucide-react'

export function AuditLogs() {
  const auditLogs = [
    {
      id: 'LOG-2025-001',
      timestamp: '2025-01-10 14:32:15',
      action: 'Recovery plan executed',
      user: 'ops.manager@flydubai.com',
      flight: 'FZ123',
      details: 'Option B selected and executed successfully via AERON for DXB-BOM route',
      status: 'Success'
    },
    {
      id: 'LOG-2025-002', 
      timestamp: '2025-01-10 14:15:22',
      action: 'Solution override',
      user: 'supervisor@flydubai.com',
      flight: 'FZ456',
      details: 'Manual override from Option A to Option C for weather contingency at KHI',
      status: 'Warning'
    },
    {
      id: 'LOG-2025-003',
      timestamp: '2025-01-10 13:45:10',
      action: 'Recovery plan generated',
      user: 'system.aeron',
      flight: 'FZ789',
      details: 'AERON auto-generated 4 recovery options for DXB-DEL technical delay',
      status: 'Success'
    },
    {
      id: 'LOG-2025-004',
      timestamp: '2025-01-10 13:20:45',
      action: 'Predictive alert triggered',
      user: 'system.aeron',
      flight: 'FZ234',
      details: 'Weather disruption predicted for IST-DXB route, proactive measures initiated',
      status: 'Success'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-flydubai-navy">Audit Trail</h2>
          <p className="text-muted-foreground">Complete log of AERON system actions and user decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-flydubai-blue text-flydubai-blue hover:bg-blue-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter Logs
          </Button>
          <Button className="btn-flydubai-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-flydubai-navy">Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-flydubai">
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-blue-50">
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge className="badge-flydubai">{log.flight}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md">{log.details}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        log.status === 'Success' ? 'status-success' :
                        log.status === 'Warning' ? 'status-warning' : 'status-error'
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
