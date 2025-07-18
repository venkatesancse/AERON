'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Alert, AlertDescription } from './ui/alert'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { 
  Settings, 
  Monitor, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  UserPlus,
  UserCheck,
  Lock,
  Unlock,
  Mail,
  Phone,
  Building,
  Globe,
  Brain,
  Zap,
  Clock,
  DollarSign,
  Target,
  AlertCircle,
  TrendingUp,
  Plane,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Ban,
  CheckSquare,
  XCircle,
  FileCheck,
  Gavel
} from 'lucide-react'

export function SettingsPanel({ screenSettings, onScreenSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(screenSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [users, setUsers] = useState([
    {
      id: 'usr-001',
      name: 'John Smith',
      email: 'john.smith@airline.com',
      role: 'Operations Manager',
      department: 'Flight Operations',
      phone: '+1 (555) 123-4567',
      status: 'active',
      lastLogin: '2025-06-06 14:30',
      createdAt: '2025-05-15',
      assignedScreens: ['dashboard', 'disruption', 'recovery', 'comparison', 'detailed', 'pending', 'past-logs', 'passengers', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: true
      }
    },
    {
      id: 'usr-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@airline.com',
      role: 'System Administrator',
      department: 'IT Operations',
      phone: '+1 (555) 987-6543',
      status: 'active',
      lastLogin: '2025-06-06 13:45',
      createdAt: '2025-04-20',
      assignedScreens: ['dashboard', 'settings', 'audit', 'reports', 'maintenance', 'fuel-optimization'],
      permissions: {
        canManageUsers: true,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: false
      }
    },
    {
      id: 'usr-003',
      name: 'Mike Chen',
      email: 'mike.chen@airline.com',
      role: 'Passenger Services',
      department: 'Customer Service',
      phone: '+1 (555) 456-7890',
      status: 'active',
      lastLogin: '2025-06-06 12:15',
      createdAt: '2025-03-10',
      assignedScreens: ['dashboard', 'passengers', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: false,
        canExecuteRecovery: false
      }
    }
  ])

  const [ruleSettings, setRuleSettings] = useState({
    aiFlexibility: 75,
    costThreshold: 50000,
    delayThreshold: 120,
    passengerThreshold: 100,
    autoExecuteThreshold: 85,
    weatherOverride: true,
    crewConstraints: true,
    maintenanceAlerts: true,
    fuelOptimization: true,
    customRules: [
      {
        id: 'rule-001',
        name: 'High Value Passenger Priority',
        description: 'Prioritize solutions for flights with business/first class passengers over 50%',
        condition: 'premium_passenger_ratio > 0.5',
        action: 'boost_priority',
        active: true,
        category: 'passenger'
      },
      {
        id: 'rule-002',
        name: 'Weather Delay Auto-Recovery',
        description: 'Automatically execute recovery plans for weather delays under 2 hours',
        condition: 'weather_delay < 120 AND confidence > 0.9',
        action: 'auto_execute',
        active: true,
        category: 'weather'
      },
      {
        id: 'rule-003',
        name: 'Cost-Sensitive Routes',
        description: 'Apply stricter cost controls for routes with thin margins',
        condition: 'route_margin < 0.15',
        action: 'limit_cost_options',
        active: false,
        category: 'cost'
      }
    ],
    legalityRules: {
      hardRules: [
        {
          id: 'hard-001',
          name: 'Flight Duty Time Limits',
          description: 'Crew cannot exceed maximum flight duty time as per CAA regulations',
          regulation: 'CAA-OPS 1.1090',
          condition: 'crew_duty_time <= max_duty_time',
          priority: 'critical',
          active: true,
          lastUpdated: '2025-05-15',
          complianceRate: 100,
          violations: 0
        },
        {
          id: 'hard-002',
          name: 'Minimum Rest Period',
          description: 'Mandatory minimum rest period between duty periods',
          regulation: 'ICAO Annex 6',
          condition: 'rest_period >= minimum_rest_hours',
          priority: 'critical',
          active: true,
          lastUpdated: '2025-05-10',
          complianceRate: 100,
          violations: 0
        },
        {
          id: 'hard-003',
          name: 'Aircraft Maintenance Due',
          description: 'Aircraft cannot fly beyond mandatory maintenance intervals',
          regulation: 'Part 145',
          condition: 'hours_since_maintenance < maintenance_interval',
          priority: 'critical',
          active: true,
          lastUpdated: '2025-04-28',
          complianceRate: 98.7,
          violations: 2
        },
        {
          id: 'hard-004',
          name: 'Passenger Rights Compensation',
          description: 'Automatic compensation for delays over 3 hours (EU261)',
          regulation: 'EU Regulation 261/2004',
          condition: 'delay_time > 180 AND origin_eu = true',
          priority: 'high',
          active: true,
          lastUpdated: '2025-06-01',
          complianceRate: 95.2,
          violations: 8
        }
      ],
      softRules: [
        {
          id: 'soft-001',
          name: 'Preferred Crew Rotation',
          description: 'Optimize crew rotation to maintain work-life balance',
          guideline: 'Company Policy HR-2024',
          condition: 'crew_consecutive_days <= 4',
          priority: 'medium',
          active: true,
          overridable: true,
          lastUpdated: '2025-05-20',
          complianceRate: 87.3,
          overrides: 24
        },
        {
          id: 'soft-002',
          name: 'Cost Optimization Target',
          description: 'Target to keep recovery costs under budget thresholds',
          guideline: 'Finance Directive FD-2025-03',
          condition: 'recovery_cost < budget_threshold',
          priority: 'medium',
          active: true,
          overridable: true,
          lastUpdated: '2025-05-18',
          complianceRate: 78.9,
          overrides: 45
        },
        {
          id: 'soft-003',
          name: 'Environmental Impact Minimization',
          description: 'Prefer solutions with lower carbon footprint when possible',
          guideline: 'Sustainability Policy SP-2025',
          condition: 'carbon_footprint < baseline_emissions',
          priority: 'low',
          active: true,
          overridable: true,
          lastUpdated: '2025-06-05',
          complianceRate: 62.1,
          overrides: 67
        },
        {
          id: 'soft-004',
          name: 'Customer Satisfaction Score',
          description: 'Prioritize solutions that maintain high customer satisfaction',
          guideline: 'Customer Service Standard CSS-2024',
          condition: 'customer_satisfaction_score >= 4.0',
          priority: 'medium',
          active: true,
          overridable: true,
          lastUpdated: '2025-05-25',
          complianceRate: 91.4,
          overrides: 18
        }
      ]
    }
  })

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    assignedScreens: [],
    permissions: {
      canManageUsers: false,
      canModifySettings: false,
      canViewReports: false,
      canExecuteRecovery: false
    }
  })

  const roleTemplates = {
    'Operations Manager': {
      screens: ['dashboard', 'disruption', 'recovery', 'comparison', 'detailed', 'pending', 'past-logs', 'passengers', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: true
      }
    },
    'System Administrator': {
      screens: ['dashboard', 'settings', 'audit', 'reports', 'maintenance', 'fuel-optimization'],
      permissions: {
        canManageUsers: true,
        canModifySettings: true,
        canViewReports: true,
        canExecuteRecovery: false
      }
    },
    'Passenger Services': {
      screens: ['dashboard', 'passengers', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: false,
        canExecuteRecovery: false
      }
    },
    'Maintenance Supervisor': {
      screens: ['dashboard', 'maintenance', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: true,
        canExecuteRecovery: false
      }
    },
    'Fuel Analyst': {
      screens: ['dashboard', 'fuel-optimization', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: true,
        canExecuteRecovery: false
      }
    },
    'Auditor': {
      screens: ['dashboard', 'audit', 'reports'],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: true,
        canExecuteRecovery: false
      }
    }
  }

  const departments = [
    'Flight Operations',
    'IT Operations', 
    'Customer Service',
    'Maintenance',
    'Fuel Management',
    'Quality Assurance',
    'Safety & Compliance',
    'Ground Operations',
    'Crew Operations'
  ]

  const categories = {
    main: { name: 'Main', color: 'text-blue-600' },
    operations: { name: 'Operations', color: 'text-green-600' },
    monitoring: { name: 'Monitoring', color: 'text-orange-600' },
    services: { name: 'Services', color: 'text-purple-600' },
    analytics: { name: 'Analytics', color: 'text-indigo-600' },
    system: { name: 'System', color: 'text-gray-600' }
  }

  const handleSettingChange = (screenId, enabled) => {
    const newSettings = localSettings.map(screen => 
      screen.id === screenId ? { ...screen, enabled } : screen
    )
    setLocalSettings(newSettings)
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    onScreenSettingsChange(localSettings)
    setHasChanges(false)
  }

  const handleResetChanges = () => {
    setLocalSettings(screenSettings)
    setHasChanges(false)
  }

  const handleRoleChange = (role) => {
    if (roleTemplates[role]) {
      const template = roleTemplates[role]
      setNewUser(prev => ({
        ...prev,
        role,
        assignedScreens: template.screens,
        permissions: template.permissions
      }))
    } else {
      setNewUser(prev => ({ ...prev, role }))
    }
  }

  const handleScreenToggle = (screenId, checked) => {
    setNewUser(prev => ({
      ...prev,
      assignedScreens: checked 
        ? [...prev.assignedScreens, screenId]
        : prev.assignedScreens.filter(id => id !== screenId)
    }))
  }

  const handlePermissionToggle = (permission, checked) => {
    setNewUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }))
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      return
    }

    const user = {
      id: `usr-${String(users.length + 1).padStart(3, '0')}`,
      ...newUser,
      status: 'active',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setUsers(prev => [...prev, user])
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      phone: '',
      assignedScreens: [],
      permissions: {
        canManageUsers: false,
        canModifySettings: false,
        canViewReports: false,
        canExecuteRecovery: false
      }
    })
    setShowAddUserDialog(false)
  }

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
  }

  const getEnabledScreensForUser = () => {
    return localSettings.filter(screen => screen.enabled)
  }

  const handleRuleSettingChange = (setting, value) => {
    setRuleSettings(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const toggleCustomRule = (ruleId) => {
    setRuleSettings(prev => ({
      ...prev,
      customRules: prev.customRules.map(rule =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    }))
    setHasChanges(true)
  }

  const toggleHardRule = (ruleId) => {
    setRuleSettings(prev => ({
      ...prev,
      legalityRules: {
        ...prev.legalityRules,
        hardRules: prev.legalityRules.hardRules.map(rule =>
          rule.id === ruleId ? { ...rule, active: !rule.active } : rule
        )
      }
    }))
    setHasChanges(true)
  }

  const toggleSoftRule = (ruleId) => {
    setRuleSettings(prev => ({
      ...prev,
      legalityRules: {
        ...prev.legalityRules,
        softRules: prev.legalityRules.softRules.map(rule =>
          rule.id === ruleId ? { ...rule, active: !rule.active } : rule
        )
      }
    }))
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-muted-foreground">Configure AERON system preferences and user access</p>
        </div>
        
        {hasChanges && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="screens" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="screens" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Screen Management
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="passenger-priority" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Passenger Priority
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Rules Configuration
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screens">
          <ScreenManagementTab
            localSettings={localSettings}
            categories={categories}
            onSettingChange={handleSettingChange}
          />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementTab
            users={users}
            onToggleUserStatus={toggleUserStatus}
            onDeleteUser={deleteUser}
            onAddUser={() => setShowAddUserDialog(true)}
          />
        </TabsContent>

        <TabsContent value="passenger-priority">
          <PassengerPriorityTab />
        </TabsContent>

        <TabsContent value="rules">
          <RulesConfigurationTab
            ruleSettings={ruleSettings}
            onRuleSettingChange={handleRuleSettingChange}
            onToggleCustomRule={toggleCustomRule}
            onToggleHardRule={toggleHardRule}
            onToggleSoftRule={toggleSoftRule}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New User
            </DialogTitle>
            <DialogDescription>
              Create a new user account and assign screen access permissions based on their role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.smith@airline.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={newUser.role} onValueChange={handleRoleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(roleTemplates).map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                        <SelectItem value="Custom">Custom Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={newUser.department} 
                      onValueChange={(value) => setNewUser(prev => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={newUser.phone}
                      onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screen Access */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Screen Access Permissions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select which screens this user can access. Only enabled screens are available for assignment.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(categories).map(([categoryKey, category]) => {
                    const categoryScreens = getEnabledScreensForUser().filter(screen => screen.category === categoryKey)
                    
                    if (categoryScreens.length === 0) return null
                    
                    return (
                      <div key={categoryKey}>
                        <h4 className={`font-medium mb-3 ${category.color}`}>{category.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoryScreens.map(screen => {
                            const Icon = screen.icon
                            const isChecked = newUser.assignedScreens.includes(screen.id)
                            
                            return (
                              <div key={screen.id} className="flex items-center space-x-3">
                                <Checkbox
                                  id={`screen-${screen.id}`}
                                  checked={isChecked}
                                  onCheckedChange={(checked) => handleScreenToggle(screen.id, checked)}
                                  disabled={screen.required}
                                />
                                <Label
                                  htmlFor={`screen-${screen.id}`}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <Icon className="h-4 w-4" />
                                  {screen.name}
                                  {screen.required && (
                                    <Badge variant="outline" className="text-xs">Required</Badge>
                                  )}
                                </Label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Permissions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure what actions this user can perform within the system.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Manage Users</Label>
                      <p className="text-sm text-muted-foreground">Create and manage user accounts</p>
                    </div>
                    <Switch
                      checked={newUser.permissions.canManageUsers}
                      onCheckedChange={(checked) => handlePermissionToggle('canManageUsers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Modify Settings</Label>
                      <p className="text-sm text-muted-foreground">Change system configuration</p>
                    </div>
                    <Switch
                      checked={newUser.permissions.canModifySettings}
                      onCheckedChange={(checked) => handlePermissionToggle('canModifySettings', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>View Reports</Label>
                      <p className="text-sm text-muted-foreground">Access analytics and reports</p>
                    </div>
                    <Switch
                      checked={newUser.permissions.canViewReports}
                      onCheckedChange={(checked) => handlePermissionToggle('canViewReports', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Execute Recovery</Label>
                      <p className="text-sm text-muted-foreground">Execute recovery plans and solutions</p>
                    </div>
                    <Switch
                      checked={newUser.permissions.canExecuteRecovery}
                      onCheckedChange={(checked) => handlePermissionToggle('canExecuteRecovery', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || !newUser.role}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ScreenManagementTab({ localSettings, categories, onSettingChange }) {
  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Enable or disable specific screens for all users. Users can only be assigned to enabled screens.
          Required screens cannot be disabled.
        </AlertDescription>
      </Alert>

      {Object.entries(categories).map(([categoryKey, category]) => {
        const categoryScreens = localSettings.filter(screen => screen.category === categoryKey)
        
        return (
          <Card key={categoryKey}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                {category.name} Screens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryScreens.map(screen => {
                  const Icon = screen.icon
                  return (
                    <div key={screen.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{screen.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {screen.category} • {screen.id}
                            {screen.required && ' • Required'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {screen.enabled && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        {!screen.enabled && (
                          <Badge variant="outline" className="text-muted-foreground">
                            Disabled
                          </Badge>
                        )}
                        <Switch 
                          checked={screen.enabled}
                          onCheckedChange={(checked) => onSettingChange(screen.id, checked)}
                          disabled={screen.required}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function UserManagementTab({ users, onToggleUserStatus, onDeleteUser, onAddUser }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">User Accounts</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and their access permissions
          </p>
        </div>
        <Button onClick={onAddUser} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Screen Access</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.role}</p>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }>
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{user.lastLogin}</p>
                      <p className="text-xs text-muted-foreground">Created: {user.createdAt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{user.assignedScreens.length} screens</p>
                      <div className="flex flex-wrap gap-1 max-w-32">
                        {user.assignedScreens.slice(0, 3).map(screenId => (
                          <Badge key={screenId} variant="outline" className="text-xs">
                            {screenId}
                          </Badge>
                        ))}
                        {user.assignedScreens.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.assignedScreens.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleUserStatus(user.id)}
                      >
                        {user.status === 'active' ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-medium">Total Users</h4>
            </div>
            <p className="text-2xl font-semibold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Active Users</h4>
            </div>
            <p className="text-2xl font-semibold">{users.filter(u => u.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-purple-600" />
              <h4 className="text-sm font-medium">Departments</h4>
            </div>
            <p className="text-2xl font-semibold">{new Set(users.map(u => u.department)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <h4 className="text-sm font-medium">Admins</h4>
            </div>
            <p className="text-2xl font-semibold">
              {users.filter(u => u.permissions.canManageUsers).length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RulesConfigurationTab({ ruleSettings, onRuleSettingChange, onToggleCustomRule, onToggleHardRule, onToggleSoftRule }) {
  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>AI Rules Engine:</strong> Configure how AERON makes decisions and handles various scenarios.
          Changes to these settings will affect future recovery recommendations.
        </AlertDescription>
      </Alert>

      {/* Legality Rules Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-red-600" />
            Legality Rules Configuration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure compliance rules for aviation regulations and operational guidelines
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hard Rules */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-medium">Hard Rules (Non-Overridable)</h3>
              <Badge className="bg-red-100 text-red-700">
                Mandatory Compliance
              </Badge>
            </div>
            <Alert className="border-red-200 bg-red-50 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Critical:</strong> Hard rules cannot be overridden and must be strictly followed. 
                These are regulatory requirements with legal implications.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {ruleSettings.legalityRules.hardRules.map((rule) => (
                <div key={rule.id} className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge className={
                          rule.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          rule.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {rule.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rule.regulation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Compliance Rate</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  rule.complianceRate >= 95 ? 'bg-green-500' :
                                  rule.complianceRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${rule.complianceRate}%` }}
                              />
                            </div>
                            <span className="font-medium">{rule.complianceRate}%</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Violations (30 days)</Label>
                          <p className="font-medium">{rule.violations}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Last Updated</Label>
                          <p className="font-medium">{rule.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="text-xs font-mono bg-white p-2 rounded mt-3 border">
                        Condition: {rule.condition}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="flex items-center gap-1">
                        <Ban className="h-4 w-4 text-red-600" />
                        <span className="text-xs text-red-600">Non-Overridable</span>
                      </div>
                      <Switch
                        checked={rule.active}
                        onCheckedChange={() => onToggleHardRule(rule.id)}
                        disabled={rule.priority === 'critical'} // Critical rules cannot be disabled
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Soft Rules */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-medium">Soft Rules (Guidelines)</h3>
              <Badge className="bg-orange-100 text-orange-700">
                Flexible Guidelines
              </Badge>
            </div>
            <Alert className="border-orange-200 bg-orange-50 mb-4">
              <Info className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Guidelines:</strong> Soft rules are flexible guidelines that can be overridden based on operational context. 
                Override decisions are tracked for review.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {ruleSettings.legalityRules.softRules.map((rule) => (
                <div key={rule.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge className={
                          rule.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          rule.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {rule.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rule.guideline}
                        </Badge>
                        {rule.overridable && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckSquare className="h-3 w-3 mr-1" />
                            Overridable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Compliance Rate</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  rule.complianceRate >= 85 ? 'bg-green-500' :
                                  rule.complianceRate >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${rule.complianceRate}%` }}
                              />
                            </div>
                            <span className="font-medium">{rule.complianceRate}%</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Overrides (30 days)</Label>
                          <p className="font-medium">{rule.overrides}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Last Updated</Label>
                          <p className="font-medium">{rule.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="text-xs font-mono bg-white p-2 rounded mt-3 border">
                        Condition: {rule.condition}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="flex items-center gap-1">
                        <Unlock className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">Overridable</span>
                      </div>
                      <Switch
                        checked={rule.active}
                        onCheckedChange={() => onToggleSoftRule(rule.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gavel className="h-4 w-4 text-red-600" />
                  <h4 className="text-sm font-medium">Hard Rules Summary</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Hard Rules:</span>
                    <span className="font-medium">{ruleSettings.legalityRules.hardRules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Rules:</span>
                    <span className="font-medium">
                      {ruleSettings.legalityRules.hardRules.filter(r => r.active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Compliance:</span>
                    <span className="font-medium">
                      {(ruleSettings.legalityRules.hardRules.reduce((acc, r) => acc + r.complianceRate, 0) / 
                        ruleSettings.legalityRules.hardRules.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-4 w-4 text-orange-600" />
                  <h4 className="text-sm font-medium">Soft Rules Summary</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Soft Rules:</span>
                    <span className="font-medium">{ruleSettings.legalityRules.softRules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Rules:</span>
                    <span className="font-medium">
                      {ruleSettings.legalityRules.softRules.filter(r => r.active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Compliance:</span>
                    <span className="font-medium">
                      {(ruleSettings.legalityRules.softRules.reduce((acc, r) => acc + r.complianceRate, 0) / 
                        ruleSettings.legalityRules.softRules.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Hard Rule
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Soft Rule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Flexibility & Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            AI Decision Parameters
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure AI flexibility and decision thresholds for automated recovery
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>AI Flexibility Level</Label>
                  <span className="text-sm font-medium">{ruleSettings.aiFlexibility}%</span>
                </div>
                <Slider
                  value={[ruleSettings.aiFlexibility]}
                  onValueChange={(value) => onRuleSettingChange('aiFlexibility', value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Higher values allow more creative solutions but may deviate from standard procedures
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Auto-Execute Confidence</Label>
                  <span className="text-sm font-medium">{ruleSettings.autoExecuteThreshold}%</span>
                </div>
                <Slider
                  value={[ruleSettings.autoExecuteThreshold]}
                  onValueChange={(value) => onRuleSettingChange('autoExecuteThreshold', value[0])}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence level required for automatic execution of recovery plans
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cost-threshold">Cost Impact Threshold</Label>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cost-threshold"
                    type="number"
                    value={ruleSettings.costThreshold}
                    onChange={(e) => onRuleSettingChange('costThreshold', parseInt(e.target.value))}
                    placeholder="50000"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum cost impact for auto-approved solutions (USD)
                </p>
              </div>

              <div>
                <Label htmlFor="delay-threshold">Delay Threshold</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="delay-threshold"
                    type="number"
                    value={ruleSettings.delayThreshold}
                    onChange={(e) => onRuleSettingChange('delayThreshold', parseInt(e.target.value))}
                    placeholder="120"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum delay for auto-approved recovery solutions
                </p>
              </div>

              <div>
                <Label htmlFor="passenger-threshold">Passenger Impact Threshold</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="passenger-threshold"
                    type="number"
                    value={ruleSettings.passengerThreshold}
                    onChange={(e) => onRuleSettingChange('passengerThreshold', parseInt(e.target.value))}
                    placeholder="100"
                  />
                  <span className="text-sm text-muted-foreground">passengers</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum passenger count for auto-approved solutions
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Constraints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Operational Constraints
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enable or disable specific operational constraints for recovery decisions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <div>
                  <Label>Weather Override Priority</Label>
                  <p className="text-sm text-muted-foreground">Prioritize weather-safe options</p>
                </div>
              </div>
              <Switch
                checked={ruleSettings.weatherOverride}
                onCheckedChange={(checked) => onRuleSettingChange('weatherOverride', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <Label>Crew Constraint Enforcement</Label>
                  <p className="text-sm text-muted-foreground">Respect crew duty time limits</p>
                </div>
              </div>
              <Switch
                checked={ruleSettings.crewConstraints}
                onCheckedChange={(checked) => onRuleSettingChange('crewConstraints', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Consider maintenance schedules</p>
                </div>
              </div>
              <Switch
                checked={ruleSettings.maintenanceAlerts}
                onCheckedChange={(checked) => onRuleSettingChange('maintenanceAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <Label>Fuel Optimization</Label>
                  <p className="text-sm text-muted-foreground">Optimize for fuel efficiency</p>
                </div>
              </div>
              <Switch
                checked={ruleSettings.fuelOptimization}
                onCheckedChange={(checked) => onRuleSettingChange('fuelOptimization', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-indigo-600" />
            Custom Business Rules
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure custom rules specific to your airline's operational policies
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ruleSettings.customRules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{rule.name}</h4>
                      <Badge className={
                        rule.category === 'passenger' ? 'bg-purple-100 text-purple-700' :
                        rule.category === 'weather' ? 'bg-blue-100 text-blue-700' :
                        rule.category === 'cost' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }>
                        {rule.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                    <div className="text-xs font-mono bg-muted p-2 rounded">
                      Condition: {rule.condition}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Action: {rule.action}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      checked={rule.active}
                      onCheckedChange={() => onToggleCustomRule(rule.id)}
                    />
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Automatic logout after inactivity</p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Password Policy</Label>
              <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GeneralTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>System Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Default Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Data Retention Period</Label>
            <Select defaultValue="365">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
                <SelectItem value="1095">3 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PassengerPriorityTab() {
  const [prioritySettings, setPrioritySettings] = useState({
    weights: {
      frequentFlyer: 25,
      ticketClass: 30,
      specialNeeds: 20,
      connectionRisk: 10,
      bookingChannel: 5,
      businessTravel: 5,
      medicalClearance: 5
    },
    thresholds: {
      vipMinScore: 95,
      criticalMinScore: 85,
      highMinScore: 70,
      mediumMinScore: 50
    },
    specialConditions: {
      infantsHighPriority: true,
      wheelchairHighPriority: true,
      medicalEquipmentHighPriority: true,
      connectionUnder60MinCritical: true,
      firstClassAutoVIP: true,
      platinumAutoHigh: true
    }
  })

  return (
    <div className="space-y-6">
      <Alert>
        <UserCheck className="h-4 w-4" />
        <AlertDescription>
          Configure passenger prioritization rules and weighting factors. Changes affect how passengers are ranked during disruptions and rebooking scenarios.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Priority Factor Weights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Adjust the importance of each factor in calculating passenger priority scores.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Frequent Flyer Status ({prioritySettings.weights.frequentFlyer}%)</Label>
                <Slider
                  value={[prioritySettings.weights.frequentFlyer]}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Bronze: 5pts, Silver: 10pts, Gold: 15pts, Platinum: 20pts</p>
              </div>

              <div>
                <Label>Ticket Class ({prioritySettings.weights.ticketClass}%)</Label>
                <Slider
                  value={[prioritySettings.weights.ticketClass]}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Economy: 5pts, Business: 15pts, First: 25pts</p>
              </div>

              <div>
                <Label>Special Needs ({prioritySettings.weights.specialNeeds}%)</Label>
                <Slider
                  value={[prioritySettings.weights.specialNeeds]}
                  max={40}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Wheelchair, medical equipment, infants, etc.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Connection Risk ({prioritySettings.weights.connectionRisk}%)</Label>
                <Slider
                  value={[prioritySettings.weights.connectionRisk]}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Based on connection time and risk</p>
              </div>

              <div>
                <Label>Booking Channel ({prioritySettings.weights.bookingChannel}%)</Label>
                <Slider
                  value={[prioritySettings.weights.bookingChannel]}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Corporate, Premium Service, Website, etc.</p>
              </div>

              <div className="p-3 bg-muted rounded">
                <p className="text-sm font-medium">
                  Total Weight: {Object.values(prioritySettings.weights).reduce((sum, weight) => sum + weight, 0)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Priority Level Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>VIP Level (Min Score: {prioritySettings.thresholds.vipMinScore})</Label>
                <Slider
                  value={[prioritySettings.thresholds.vipMinScore]}
                  min={80}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <Badge className="bg-purple-100 text-purple-700">VIP Treatment</Badge>
              </div>

              <div>
                <Label>Critical Level (Min Score: {prioritySettings.thresholds.criticalMinScore})</Label>
                <Slider
                  value={[prioritySettings.thresholds.criticalMinScore]}
                  min={70}
                  max={95}
                  step={1}
                  className="w-full"
                />
                <Badge className="bg-red-100 text-red-700">Immediate Attention</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>High Priority (Min Score: {prioritySettings.thresholds.highMinScore})</Label>
                <Slider
                  value={[prioritySettings.thresholds.highMinScore]}
                  min={50}
                  max={85}
                  step={1}
                  className="w-full"
                />
                <Badge className="bg-orange-100 text-orange-700">High Priority</Badge>
              </div>

              <div>
                <Label>Medium Priority (Min Score: {prioritySettings.thresholds.mediumMinScore})</Label>
                <Slider
                  value={[prioritySettings.thresholds.mediumMinScore]}
                  min={30}
                  max={70}
                  step={1}
                  className="w-full"
                />
                <Badge className="bg-yellow-100 text-yellow-700">Standard Processing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Special Priority Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Infants High Priority</Label>
                <p className="text-sm text-muted-foreground">Passengers traveling with infants</p>
              </div>
              <Switch checked={prioritySettings.specialConditions.infantsHighPriority} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Wheelchair Assistance</Label>
                <p className="text-sm text-muted-foreground">Passengers requiring wheelchair service</p>
              </div>
              <Switch checked={prioritySettings.specialConditions.wheelchairHighPriority} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Medical Equipment</Label>
                <p className="text-sm text-muted-foreground">Passengers with medical devices</p>
              </div>
              <Switch checked={prioritySettings.specialConditions.medicalEquipmentHighPriority} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>First Class Auto-VIP</Label>
                <p className="text-sm text-muted-foreground">First class passengers automatic VIP</p>
              </div>
              <Switch checked={prioritySettings.specialConditions.firstClassAutoVIP} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}