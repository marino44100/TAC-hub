'use client'
import { useState, useEffect } from 'react'
import { 
  Download, Upload, RefreshCw, AlertCircle, CheckCircle, 
  XCircle, Clock, TrendingUp, Users, FileText, ShoppingBag,
  DollarSign, Activity, Calendar, Mail, Settings, Database
} from 'lucide-react'

export function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
            <p className="text-xs text-green-600">{stats.activeUsers || 0} active this month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Projects</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProjects || 0}</p>
            <p className="text-xs text-blue-600">{stats.activeProjects || 0} active, {stats.pendingProjects || 0} pending</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
            <p className="text-xs text-green-600">${(stats.avgOrderValue || 0).toFixed(2)} avg value</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue || 0).toFixed(2)}</p>
            <p className="text-xs text-green-600">Total earnings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminActions() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [lastBackup, setLastBackup] = useState(null)

  useEffect(() => {
    const backup = localStorage.getItem('tac-hub-last-backup')
    if (backup) {
      setLastBackup(new Date(backup).toLocaleString())
    }
  }, [])

  const exportData = (type) => {
    setIsExporting(true)
    
    setTimeout(() => {
      let data = []
      let filename = ''
      
      switch (type) {
        case 'users':
          data = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
          filename = 'tac-hub-users.json'
          break
        case 'projects':
          data = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
          filename = 'tac-hub-projects.json'
          break
        case 'orders':
          data = JSON.parse(localStorage.getItem('tac-hub-orders') || '[]')
          filename = 'tac-hub-orders.json'
          break
        case 'all':
          data = {
            users: JSON.parse(localStorage.getItem('tac-hub-users') || '[]'),
            projects: JSON.parse(localStorage.getItem('tac-hub-projects') || '[]'),
            orders: JSON.parse(localStorage.getItem('tac-hub-orders') || '[]'),
            exportDate: new Date().toISOString()
          }
          filename = 'tac-hub-full-backup.json'
          break
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)

      if (type === 'all') {
        localStorage.setItem('tac-hub-last-backup', new Date().toISOString())
        setLastBackup(new Date().toLocaleString())
      }

      setIsExporting(false)
    }, 1000)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsImporting(true)
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.users && data.projects && data.orders) {
          // Full backup restore
          localStorage.setItem('tac-hub-users', JSON.stringify(data.users))
          localStorage.setItem('tac-hub-projects', JSON.stringify(data.projects))
          localStorage.setItem('tac-hub-orders', JSON.stringify(data.orders))
          alert('Full backup restored successfully!')
        } else if (Array.isArray(data)) {
          // Single data type import
          const filename = file.name.toLowerCase()
          if (filename.includes('users')) {
            localStorage.setItem('tac-hub-users', JSON.stringify(data))
            alert('Users data imported successfully!')
          } else if (filename.includes('projects')) {
            localStorage.setItem('tac-hub-projects', JSON.stringify(data))
            alert('Projects data imported successfully!')
          } else if (filename.includes('orders')) {
            localStorage.setItem('tac-hub-orders', JSON.stringify(data))
            alert('Orders data imported successfully!')
          }
        }
        
        window.location.reload()
      } catch (error) {
        alert('Error importing data: Invalid file format')
      }
      
      setIsImporting(false)
    }
    
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) {
      if (confirm('This will delete all users, projects, and orders. Are you absolutely sure?')) {
        localStorage.removeItem('tac-hub-users')
        localStorage.removeItem('tac-hub-projects')
        localStorage.removeItem('tac-hub-orders')
        alert('All data cleared successfully!')
        window.location.reload()
      }
    }
  }

  const populateSampleData = () => {
    if (confirm('This will add sample data for testing. Continue?')) {
      // Run the populate script
      fetch('/scripts/populate-admin-data.js')
        .then(response => response.text())
        .then(script => {
          eval(script)
          alert('Sample data added successfully!')
          window.location.reload()
        })
        .catch(() => {
          // Fallback: add basic sample data
          const sampleUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joinedAt: '2024-01-15', lastLogin: new Date().toISOString() },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', joinedAt: '2024-02-10', lastLogin: new Date().toISOString() },
            { id: 3, name: 'Admin User', email: 'admin@tac-hub.org', role: 'admin', joinedAt: '2024-01-01', lastLogin: new Date().toISOString() }
          ]
          
          const sampleProjects = [
            { id: 1, title: 'Forest Restoration', category: 'Reforestation', submittedBy: 'John Doe', status: 'active', fundingGoal: 50000, currentFunding: 32000, createdAt: '2024-02-15' },
            { id: 2, title: 'Weather Monitoring', category: 'Climate', submittedBy: 'Jane Smith', status: 'pending', fundingGoal: 25000, currentFunding: 5000, createdAt: '2024-03-01' }
          ]
          
          const sampleOrders = [
            { id: 1001, customerName: 'John Doe', customerEmail: 'john@example.com', items: [{ name: 'Seeds Kit', price: 25 }], total: 25, status: 'delivered', createdAt: '2024-03-10' },
            { id: 1002, customerName: 'Jane Smith', customerEmail: 'jane@example.com', items: [{ name: 'Solar Lantern', price: 45 }], total: 45, status: 'shipped', createdAt: '2024-03-12' }
          ]
          
          localStorage.setItem('tac-hub-users', JSON.stringify(sampleUsers))
          localStorage.setItem('tac-hub-projects', JSON.stringify(sampleProjects))
          localStorage.setItem('tac-hub-orders', JSON.stringify(sampleOrders))
          
          alert('Sample data added successfully!')
          window.location.reload()
        })
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Export Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Export Data</h4>
          <button 
            onClick={() => exportData('users')}
            disabled={isExporting}
            className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Users</span>
          </button>
          <button 
            onClick={() => exportData('projects')}
            disabled={isExporting}
            className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Projects</span>
          </button>
          <button 
            onClick={() => exportData('orders')}
            disabled={isExporting}
            className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Orders</span>
          </button>
        </div>

        {/* Backup Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Backup & Restore</h4>
          <button 
            onClick={() => exportData('all')}
            disabled={isExporting}
            className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            <span>Full Backup</span>
          </button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
              id="import-data"
            />
            <label
              htmlFor="import-data"
              className="w-full btn-secondary text-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>Restore Backup</span>
            </label>
          </div>
          {lastBackup && (
            <p className="text-xs text-gray-500">Last backup: {lastBackup}</p>
          )}
        </div>

        {/* Development Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Development</h4>
          <button 
            onClick={populateSampleData}
            className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Add Sample Data</span>
          </button>
          <button 
            onClick={clearAllData}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-lg flex items-center justify-center space-x-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Clear All Data</span>
          </button>
        </div>

        {/* System Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">System Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Database: Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">AI Assistant: Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">Uptime: 24h 15m</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">Performance: Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminQuickActions() {
  const quickActions = [
    { name: 'Add New User', icon: Users, action: () => alert('Add User feature coming soon!') },
    { name: 'Create Project', icon: FileText, action: () => alert('Create Project feature coming soon!') },
    { name: 'Process Orders', icon: ShoppingBag, action: () => alert('Process Orders feature coming soon!') },
    { name: 'Send Newsletter', icon: Mail, action: () => alert('Newsletter feature coming soon!') },
    { name: 'System Settings', icon: Settings, action: () => alert('Settings feature coming soon!') },
    { name: 'View Analytics', icon: TrendingUp, action: () => alert('Analytics feature coming soon!') }
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <IconComponent className="w-6 h-6 text-gray-600" />
              <span className="text-xs text-gray-600 text-center">{action.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
