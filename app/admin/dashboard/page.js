'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { 
  BarChart3, 
  Users, 
  TreePine, 
  AlertTriangle, 
  Settings, 
  Database, 
  Upload, 
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  CheckCircle
} from 'lucide-react'
import dataManager from '../../../lib/dataManager'

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newAlert, setNewAlert] = useState({ type: 'info', title: '', message: '', region: '', severity: 'Low' })

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
      return
    }
    loadData()
  }, [user, router])

  const loadData = () => {
    const currentData = dataManager.getData()
    setData(currentData)
  }

  const updateClimateData = (field, subfield, value) => {
    const updatedData = { ...data }
    if (subfield) {
      updatedData.climateData[field][subfield] = parseFloat(value) || value
    } else {
      updatedData.climateData[field] = parseFloat(value) || value
    }
    setData(updatedData)
  }

  const updateCommunityData = (field, value) => {
    const updatedData = { ...data }
    updatedData.communityData[field] = parseInt(value) || value
    setData(updatedData)
  }

  const addAlert = () => {
    if (!newAlert.title || !newAlert.message) return
    
    const success = dataManager.addAlert(newAlert, user.name)
    if (success) {
      setNewAlert({ type: 'info', title: '', message: '', region: '', severity: 'Low' })
      loadData()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const deleteAlert = (alertId) => {
    if (confirm('Are you sure you want to delete this alert?')) {
      const success = dataManager.deleteAlert(alertId, user.name)
      if (success) {
        loadData()
      }
    }
  }

  const saveAllData = () => {
    setLoading(true)
    const success = dataManager.updateData(data, user.name)
    
    setTimeout(() => {
      setLoading(false)
      if (success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    }, 1000)
  }

  const exportData = () => {
    const exportedData = dataManager.exportData()
    if (exportedData) {
      const blob = new Blob([exportedData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tac-hub-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const success = dataManager.importData(e.target.result, user.name)
          if (success) {
            loadData()
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
          } else {
            alert('Error importing data. Please check the file format.')
          }
        } catch (error) {
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const resetData = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      dataManager.resetToDefaults()
      loadData()
    }
  }

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading data...</div>
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'climate', name: 'Climate Data', icon: TreePine },
    { id: 'community', name: 'Community Data', icon: Users },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
    { id: 'data-management', name: 'Data Management', icon: Database }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TreePine className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Forest Coverage</p>
              <p className="text-2xl font-semibold text-gray-900">67.9%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Connected Communities</p>
              <p className="text-2xl font-semibold text-gray-900">{data.communityData?.connectedCommunities || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-semibold text-gray-900">{data.alerts?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Data Entries</p>
              <p className="text-2xl font-semibold text-gray-900">{data.communityData?.traditionalKnowledgeEntries || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Data updated successfully</p>
              <p className="text-sm text-gray-600">Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">New community connected</p>
              <p className="text-sm text-gray-600">Mbandaka Village joined the network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderClimateData = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Climate Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data.climateData || {}).map(([key, values]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                  <input
                    type="number"
                    step="0.1"
                    value={values.current || ''}
                    onChange={(e) => updateClimateData(key, 'current', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trend</label>
                  <input
                    type="text"
                    value={values.trend || ''}
                    onChange={(e) => updateClimateData(key, 'trend', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., +1.2°C, -8%, +12ppm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCommunityData = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(data.communityData || {}).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="number"
                value={value || ''}
                onChange={(e) => updateCommunityData(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Alert</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
            <select
              value={newAlert.type}
              onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={newAlert.severity}
              onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newAlert.title}
              onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Alert title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <input
              type="text"
              value={newAlert.region}
              onChange={(e) => setNewAlert({...newAlert, region: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Équateur Province, DRC"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            value={newAlert.message}
            onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Alert message"
          ></textarea>
        </div>
        <button
          onClick={addAlert}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Alert
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Alerts</h3>
        <div className="space-y-3">
          {(data.alerts || []).map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${
              alert.type === 'critical' ? 'bg-red-50 border-red-200' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-gray-600 mt-1">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Region: {alert.region}</span>
                    <span>Severity: {alert.severity}</span>
                    <span>Date: {alert.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(!data.alerts || data.alerts.length === 0) && (
            <p className="text-gray-500 text-center py-4">No alerts currently active</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderDataManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={exportData}
            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          
          <label className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Import Data
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          
          <button
            onClick={resetData}
            className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Last Updated:</strong> {new Date(data.lastUpdated).toLocaleString()}</p>
          <p><strong>Updated By:</strong> {data.updatedBy}</p>
          <p><strong>Total Data Entries:</strong> {Object.keys(data).length}</p>
          <p><strong>Storage Used:</strong> {(JSON.stringify(data).length / 1024).toFixed(2)} KB</p>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview()
      case 'climate': return renderClimateData()
      case 'community': return renderCommunityData()
      case 'alerts': return renderAlerts()
      case 'data-management': return renderDataManagement()
      default: return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TAC-HUB Admin Dashboard</h1>
              <p className="text-gray-600">Manage climate data and community information</p>
            </div>
            <div className="flex items-center space-x-4">
              {saved && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Saved</span>
                </div>
              )}
              <a
                href="/analytics"
                target="_blank"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <Eye className="w-4 h-4" />
                <span>View Dashboard</span>
              </a>
              <button
                onClick={saveAllData}
                disabled={loading}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <nav className="w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>

          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
